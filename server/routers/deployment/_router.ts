import { z } from "zod";
import { router } from "@/server/trpc";

import { authedProcedure } from "@/server/procedures/authedProcedure";
import get_deployment_handler from "./get_deployment.handler";

export const deployment_router = router({

    get_deployment: authedProcedure
        .input(z.object({ id: z.string() }))
        .query(({ input: { id } }) => get_deployment_handler({ id })),
})