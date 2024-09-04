import { z } from "zod";
import { router } from "@/server/trpc";

import { authedProcedure } from "@/server/procedures/authedProcedure";
import create_project_handler from "./create_project_handler";

export const project_router = router({
    create_project: authedProcedure
        .input(z.object({
            project_name: z.string(),
            repo_url: z.string(),
        }))
        .mutation(({ ctx: { session }, input }) => create_project_handler({ user_id: session?.user?.id, ...input }))

})