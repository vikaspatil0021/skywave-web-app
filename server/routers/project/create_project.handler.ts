import { TRPCError } from "@trpc/server";

import { createProject, getProjectByName } from "@/lib/prisma/project/service";

import create_webhook_action from "@/lib/actions/create_webhook_action";
import create_deployment_action from "@/lib/actions/create_deployment_action";


type create_project_handler_params = {
    repo_id: number,
    user_id: string,
    project_name: string,
    repo_url: string,
    build_command?: string,
    output_dir?: string
}

type CreateProjectInputData = {
    domain: string,
    name: string,
    repo_id: number,
    repo_url: string,
    user_id: string,
    build_command?: string,
    output_dir?: string
}


export default async function create_project_handler({ repo_id, user_id, project_name, repo_url, build_command, output_dir }: create_project_handler_params) {

    try {
        const existing_project = await getProjectByName(project_name);

        if (existing_project) {
            throw new TRPCError({ code: 'BAD_REQUEST', message: 'Project name already exists.' })
        }

        const project_config = {
            name: project_name,
            repo_id,
            repo_url,
            user_id,
            domain: project_name
        } as CreateProjectInputData

        if (build_command) {
            project_config.build_command = build_command;
        }

        if (output_dir) {
            project_config.output_dir = output_dir;
        }

        const project = await createProject(project_config)

        const webhook_response = await create_webhook_action({
            project_name,
            repo_url,
            token: {
                encrypted_access_token: project?.user?.encrypted_access_token,
                token_iv: project?.user?.token_iv
            }
        })

        const result = await create_deployment_action({ project, repo_url, build_command, output_dir })

        return {
            ...result,
            webhook_response
        };

    } catch (error: any) {
        throw new TRPCError({ code: error?.code, message: error?.message as string })
    }
}