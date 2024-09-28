import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { db } from "../../db";
import { Competitor } from "@/classes/Competitor";
import { Judge } from "@/classes/Judge";
import { PrelimCompetition } from "@/classes/PrelimCompetition";
import { FinalCompetition } from "@/classes/FinalCompetition";
import { UserDbModel } from "@/db/schema";
import { Uuid, Role, Round  } from "wcs-ss-lib";
import { DanceConvention } from "@/classes/DanceConvention";

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
                    LastName: row["last_name"]
                } as UserDbModel;

                users.push(user);
            });

            return users;
        }),
    getCompetitors: publicProcedure 
        .query(async() => {
            var raw = await db`
                SELECT users.id, users.first_name, users.last_name, competitor_profiles.wsdc_id
                FROM users
                LEFT JOIN competitor_profiles ON users.id = competitor_profiles.user_id`;

            var competitors = new Array<{Id: string, FirstName: string, LastName: string, WsdcId: number}>();

            raw.map((row) => {
                var competitor = {
                    Id: row["id"],
                    FirstName: row["first_name"],
                    LastName: row["last_name"],
                    WsdcId: +row["wsdc_id"]
                };

                competitors.push(competitor);
            });

            return competitors;
        }),
    getJudges: publicProcedure 
        .query(async() => {
            var raw = await db`
                SELECT users.id, users.first_name, users.last_name
                FROM users
                LEFT JOIN judge_profiles ON users.id = judge_profiles.user_id`;

            var judges = new Array<{Id: string, FirstName: string, LastName: string}>();

            raw.map((row) => {
                var judge = {
                    Id: row["id"],
                    FirstName: row["first_name"],
                    LastName: row["last_name"],
                };

                judges.push(judge);
            });

            return judges;
        }),
    getDanceConventions: publicProcedure
        .query(async() => {
            var raw = await db`
                SELECT *
                FROM dance_conventions`;

            var danceConventions = new Array<{Id: string, Name: string, Date: string}>();

            raw.map((row) => {
                var danceConvention = {
                    Id: row["id"],
                    Name: row["name"],
                    Date: row["date"],
                };

                danceConventions.push(danceConvention);
            });

            return danceConventions;
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
                };
    
                return {success: true, user: user};
            }
            return;
        }),
    addUser: publicProcedure
        .input(z.custom<Competitor>()).mutation(async (opts) => {
            const { input } = opts;

            var response = await db`
                INSERT INTO users(first_name, last_name)
                VALUES (${input.FirstName}, ${input.LastName})
                RETURNING id;`;

            return {success: true, id: response[0]["id"]};
        }),
    addCompetitor: publicProcedure
        .input(z.custom<Competitor>()).mutation(async (opts) => {
            const { input } = opts;

            var response = await db`
                WITH newUser AS (
                    INSERT INTO users (first_name, last_name)
                    VALUES (${input.FirstName}, ${input.LastName})
                    RETURNING id
                )
                INSERT INTO competitor_profiles(user_id, wsdc_id)
                SELECT newUser.id, ${input.WsdcId} 
                FROM newUser
                RETURNING user_id`;
                
            return {success: true, id: response[0]["id"]};
        }),
    addJudge: publicProcedure
        .input(z.custom<Judge>()).mutation(async (opts) => {
            const { input } = opts;

            var response = await db`
                WITH newUser AS (
                    INSERT INTO users (first_name, last_name)
                    VALUES (${input.FirstName}, ${input.LastName})
                    RETURNING id
                )
                INSERT INTO judge_profiles(user_id)
                SELECT newUser.id FROM newUser
                RETURNING user_id`;
                
            return {success: true, id: response[0]["id"]};
        }),
    addDanceConvention: publicProcedure
        .input(z.custom<DanceConvention>()).mutation(async (opts) => {
            const { input } = opts;

            var response = await db`
                INSERT INTO dance_conventions (name, date)
                VALUES (${input.Name}, ${input.Date})
                RETURNING id`;
                
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