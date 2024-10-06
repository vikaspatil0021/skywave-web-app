import { z } from "zod";
import { router } from "@/server/trpc";

import { authedProcedure } from "@/server/procedures/authedProcedure";
import create_project_handler from "./create_project.handler";
import get_projects_handler from "./get_projects.handler";
import get_project_handler from "./get_project.handler";

export const project_router = router({

    create_project: authedProcedure
        .input(z.object({
            project_name: z.string(),
            repo_url: z.string(),
            build_command: z.string().optional(),
            output_dir: z.string().optional()
        }))
        .mutation(({ ctx: { session }, input }) => create_project_handler({ user_id: session?.user?.id, ...input })),

    get_project: authedProcedure
        .input(z.object({ project_name: z.string() }))
        .query(({ input: { project_name } }) => get_project_handler({ project_name })),

    get_projects: authedProcedure
        .query(({ ctx }) => get_projects_handler({ user_id: ctx?.session?.user?.id }))
})