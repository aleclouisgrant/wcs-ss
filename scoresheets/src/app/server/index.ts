import { publicProcedure, router } from "./trpc";

export const appRouter = router({
    getUser: publicProcedure.query(async () => {
        return ;
    }),
});

export type AppRouter = typeof appRouter;