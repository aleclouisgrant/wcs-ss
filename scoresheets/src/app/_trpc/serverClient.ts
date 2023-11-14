import { httpBatchLink } from "@trpc/react-query"

import { appRouter } from "@/app/server";

export const serverClient = appRouter.createCaller({
    links: [
        httpBatchLink({
            url: "http://localhost:3000/api/trpc",
        }),
    ],
});