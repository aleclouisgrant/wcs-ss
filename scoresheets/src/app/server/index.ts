import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { db } from "../../db";
import { Competitor } from "@/classes/IPerson";
import { UserDbModel } from "@/db/schema";
import { Uuid } from "@/classes/Uuid";

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

            await db`
                INSERT INTO users(first_name, last_name, wsdc_id)
                VALUES (${input.FirstName}, ${input.LastName}, ${input.WsdcId});`;
            return {success: true};
        }),
});

export type AppRouter = typeof appRouter;