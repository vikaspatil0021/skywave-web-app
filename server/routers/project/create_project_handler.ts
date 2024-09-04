import { TRPCError } from "@trpc/server";

import { createProject, getProjectByName } from "@/lib/prisma/project/service";
import { nanoid } from "nanoid";
import { createDeployment } from "@/lib/prisma/deployment/service";

type create_project_handler_params = {
    user_id: string,
    project_name: string,
    repo_url: string,
}

export default async function create_project_handler({ user_id, project_name, repo_url }: create_project_handler_params) {

    try {
        const existing_project = await getProjectByName(project_name);

        if (existing_project) {
            throw new TRPCError({ code: 'BAD_REQUEST', message: 'Project name already exists.' })
        }

        const project = await createProject({
            name: project_name,
            repo_url,
            user_id,
            domain: `${project_name}-${nanoid(11)}`
        })

        const deployment = await createDeployment({
            duration: 0,
            project_id: project?.id,
            source: "Git",
            status: "Queued"
        })
        
        return {
            project,
            deployment
        }
    } catch (error: any) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error?.message as string })
    }
}