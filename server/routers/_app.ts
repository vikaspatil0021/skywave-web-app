import { router } from "./../trpc";
import { github_api_router } from "./github_api/_router";

export const appRouter = router({
    
    github: github_api_router
});


export type AppRouter = typeof appRouter