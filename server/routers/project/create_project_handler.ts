import { customAlphabet } from "nanoid";

import { TRPCError } from "@trpc/server";

import { createDeployment } from "@/lib/prisma/deployment/service";
import { createProject, getProjectByName } from "@/lib/prisma/project/service";

import { sqsClient, sqs_send_message_command } from "@/lib/aws/aws_client";


type create_project_handler_params = {
    user_id: string,
    project_name: string,
    repo_url: string,
}

export default async function create_project_handler({ user_id, project_name, repo_url }: create_project_handler_params) {
    const custom_nano_id = customAlphabet("0123456789_abcdefghijklmnopqrstuvwxyz-", 15)
    try {
        const existing_project = await getProjectByName(project_name);

        if (existing_project) {
            throw new TRPCError({ code: 'BAD_REQUEST', message: 'Project name already exists.' })
        }

        const project = await createProject({
            name: project_name,
            repo_url,
            user_id,
            domain: project_name
        })

        const deployment = await createDeployment({
            duration: 0,
            project_id: project?.id,
            source: "Git",
            status: "Queued"
        })

        await sqsClient.send(sqs_send_message_command({ deployment_id: deployment?.id, domain: project?.domain, repo_url: project?.repo_url }))

        return {
            project,
            deployment
        }
    } catch (error: any) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error?.message as string })
    }
}