
import { ch_client } from "@/lib/clickhouse_client/ch_client";
import { getDeploymentById } from "@/lib/prisma/deployment/service";
import { getProjectsByUserId } from "@/lib/prisma/project/service";
import { TRPCError } from "@trpc/server";




type get_logs_handler_params = {
    deployment_id: string,
}

type Log = {
    id: string,
    created_at: string,
    deployment_id: string,
    log: string
}
export default async function get_logs_handler({ deployment_id }: get_logs_handler_params) {

    try {
        const deployment = await getDeploymentById(deployment_id)

        if (!deployment) {
            throw new TRPCError({ code: 'NOT_FOUND', message: "'deployment_id' not found" })
        }

        const result = await ch_client?.query({
            query: `SELECT * FROM build_logs where deployment_id='${deployment?.id}' order by created_at`,
            format: 'JSONEachRow'
        })

        const logs = await result.json() as Log[]
        return logs;

    } catch (error: any) {
        throw new TRPCError({ code: error?.code, message: error?.message as string })
    }
}