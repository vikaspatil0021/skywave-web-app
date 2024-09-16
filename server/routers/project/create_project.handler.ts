
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

        const q = repo_url.replace("https://github.com/", '').replace('.git', '')
        const url = `https://api.github.com/repos/${q}/commits?sort=updated&order=desc&per_page=1`;

        const result = await fetch(url);
        const data = await result?.json();
        const commit_data = data[0];

        const deployment = await createDeployment({
            duration: 0,
            project_id: project?.id,
            source: "Git",
            status: "Queued",
            commit_message: commit_data?.commit?.message,
            commit_sha: commit_data?.sha,
            commit_url: commit_data?.html_url
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