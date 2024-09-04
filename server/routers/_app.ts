import { router } from "./../trpc";
import { github_api_router } from "./github_api/_router";
import { project_router } from "./project/_router";

export const appRouter = router({

    github: github_api_router,
    project: project_router
});


export type AppRouter = typeof appRouter