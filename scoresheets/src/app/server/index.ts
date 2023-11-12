import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { db } from "../../db";
import { Competitor } from "@/classes/IPerson";

export const appRouter = router({
    getCompetitors: publicProcedure
        .query(async() => {
            var competitors = await db.competitor.findMany();
            return competitors;
        }),
    getUser: publicProcedure
        .input((value: unknown) => {
            if (typeof value === 'string'){
                return value;
            }
            throw new Error();
        })
        .query(async (opts) => {
            const { input } = opts;

            var user = await db.competitor.findFirst({
                where: {firstName: input}
            });

            return {success: true, user: user};
        }),
    addCompetitor: publicProcedure
        .input(z.custom<Competitor>()).mutation(async (opts) => {
            await db.competitor.create({
                data: {
                    firstName: opts.input.FirstName,
                    lastName: opts.input.LastName
                }
            })
            return true;
        }),
});

export type AppRouter = typeof appRouter;