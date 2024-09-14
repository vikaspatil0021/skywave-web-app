
import { TRPCError } from "@trpc/server";

import { getProjectByName } from "@/lib/prisma/project/service";




type get_project_handler_params = {
    project_name: string,
}

export default async function get_project_handler({ project_name }: get_project_handler_params) {

    try {
        const project = await getProjectByName(project_name)

        return project
    } catch (error: any) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error?.message as string })
    }
}