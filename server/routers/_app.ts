import { router } from "./../trpc";

import { project_router } from "./project/_router";
import { deployment_router } from "./deployment/_router";
import { github_api_router } from "./github_api/_router";

export const appRouter = router({

    github: github_api_router,
    project: project_router,
    deployment: deployment_router
});


export type AppRouter = typeof appRouter