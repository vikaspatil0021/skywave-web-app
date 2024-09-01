import { z } from "zod";
import { router } from "@/server/trpc";

import { authedProcedure } from "@/server/procedures/authedProcedure";
import get_repos_handler from "./get_repos.handler";

export const github_api_router = router({
    get_repos: authedProcedure
        .input(z.object({ query: z.string() }))
        .query(async ({ ctx: { session }, input }) => get_repos_handler({ query: input?.query, git_username: session?.user?.git_username }))

})