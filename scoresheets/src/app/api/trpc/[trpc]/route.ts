import { fetchRequestHandler } from "@trpc/server/adapters/fetch";

import { appRouter } from "@/app/server";

const handler = (request: Request) => 
    fetchRequestHandler({
        endpoint: "/api/trpc",
        req: request,
        router: appRouter,
        createContext: () => ({}),
    });

export { handler as GET, handler as POST };