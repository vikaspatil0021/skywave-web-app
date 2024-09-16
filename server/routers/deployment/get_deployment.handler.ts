
import { TRPCError } from "@trpc/server";

import { getDeploymentById } from "@/lib/prisma/deployment/service";


type get_deployment_handler_params = {
    id: string,
}

export default async function get_deployment_handler({ id }: get_deployment_handler_params) {

    try {
        const deployment = await getDeploymentById(id)

        return deployment
    } catch (error: any) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error?.message as string })
    }
}