
import { getProjectsByUserId } from "@/lib/prisma/project/service";
import { TRPCError } from "@trpc/server";




type get_projects_handler_params = {
    user_id: string,
}

export default async function get_projects_handler({ user_id }: get_projects_handler_params) {

    try {
        const projects = await getProjectsByUserId(user_id)

        return projects
    } catch (error: any) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error?.message as string })
    }
}