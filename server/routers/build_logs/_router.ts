import { z } from "zod";
import { router } from "@/server/trpc";

import { authedProcedure } from "@/server/procedures/authedProcedure";

import get_logs_handler from "./get_logs.handler";

export const build_logs_router = router({
    get_logs: authedProcedure
        .input(z.object({ deployment_id: z.string() }))
        .query(({ input }) => get_logs_handler({ ...input }))
})