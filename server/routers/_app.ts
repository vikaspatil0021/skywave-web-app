import { z } from "zod";
import { publicProcedure, router } from "./../trpc";

export const appRouter = router({
    hello: publicProcedure
    
        .query((opts) => {
            return {
                greeting: `hello bro`,
            };
        }),
});


export type AppRouter = typeof appRouter