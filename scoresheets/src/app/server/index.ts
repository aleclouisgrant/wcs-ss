import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { db } from "../../db";
import { Competitor } from "@/classes/IPerson";
import { PrelimCompetition, FinalCompetition } from "@/classes/Competition";
import { UserDbModel } from "@/db/schema";
import { Uuid } from "@/classes/Uuid";
import { Role, Round } from "@/classes/Enums";

export const appRouter = router({
    getUsers: publicProcedure
        .query(async() => {
            var raw = await db`
                SELECT * FROM users
                `;

            var users = new Array<UserDbModel>();

            raw.map((row) => {
                var user = {
                    Id: row["id"],
                    FirstName: row["first_name"],
                    LastName: row["last_name"],
                    WsdcId: row["wsdc_id"],
                } as UserDbModel;

                users.push(user);
            });

            return users;
        }),
    getUserByName: publicProcedure
        .input(z.string()).query(async (opts) => {
            const { input } = opts;        
            const raw = await db`
                SELECT * FROM users 
                WHERE first_name = ${input};`;
                
            if (raw.count == 1) {
                const row = raw[0];
    
                var user = {
                    Id: new Uuid(row["id"]),
                    FirstName: row["first_name"],
                    LastName: row["last_name"],
                    WsdcId: row["wsdc_id"],
                };
    
                return {success: true, user: user};
            }
            return;
        }),
    addUser: publicProcedure
        .input(z.custom<Competitor>()).mutation(async (opts) => {
            const { input } = opts;

            var response = await db`
                INSERT INTO users(first_name, last_name, wsdc_id)
                VALUES (${input.FirstName}, ${input.LastName}, ${input.WsdcId})
                RETURNING id;`;

            return {success: true, id: response[0]["id"]};
        }),
    addCompetitor: publicProcedure
        .input(z.custom<Competitor>()).mutation(async (opts) => {
            const { input } = opts;

            var response = await db`
                WITH newUser AS (
                    INSERT INTO users (first_name, last_name, wsdc_id)
                    VALUES (${input.FirstName}, ${input.LastName}, ${input.WsdcId})
                    RETURNING id
                )
                INSERT INTO competitor_profiles(user_id) (
                    SELECT id FROM newUser
                )
                
                RETURNING user_id`;
                
            return {success: true, id: response[0]["id"]};
        }),
    addCompetition: publicProcedure
        .input(z.custom<{danceConventionId: Uuid, prelimCompetitions: PrelimCompetition[], finalCompetition: FinalCompetition}>()).mutation(async (opts) => {
            const { input } = opts;
            var inserts = "";
            var prelimScores = "";

            var leaderTier = input.prelimCompetitions.find(e => e.Round == Round.Prelims && e.Role == Role.Leader)?.Tier;
            var followerTier = input.prelimCompetitions.find(e => e.Round == Round.Prelims && e.Role == Role.Follower)?.Tier;
            var division = input.finalCompetition.Division;

            inserts += `
                INSERT INTO competitions (dance_convention_id, division, leader_tier, follower_tier)
                VALUES (${input.danceConventionId}, ${division}, ${leaderTier}, ${followerTier})
                RETURNING id
            `;

            inserts += `INSERT INTO prelim_competitions (competition_id, datetime, placements)`;
            
            input.prelimCompetitions.forEach((prelimCompetition) => {
                inserts += `
                    VALUES (id, ${prelimCompetition}, ${prelimCompetition})
                `;

                prelimCompetition.Scores.forEach((score) => {
                    prelimScores += `INSERT INTO `;
                });
            });

            inserts += `
                INSERT INTO final_competitions (competition_id, datetime, placements) 
                VALUES ()
            `;

            await db`
                BEGIN TRANSACTION;
                    ${inserts}
                COMMIT;
                `;

            return {success: true};
        }),
    getCompetition: publicProcedure
        .input(z.string()).query(async (opts) => {
            
            await db``;

            return;
        }),
});

export type AppRouter = typeof appRouter;