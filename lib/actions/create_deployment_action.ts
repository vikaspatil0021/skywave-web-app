import { createDeployment } from "../prisma/deployment/service";

import { ec2Client, ec2_run_instance_command } from "../aws/aws_client";


type Project = {
    id: string;
    name: string;
    domain: string;
    repo_url: string;
    build_command: string;
    output_dir: string;
    created_at: Date;
    user_id: string;
}

type Create_deployment_action = {
    project: Project,
    repo_url: string,
    build_command?: string,
    output_dir?: string
}

export default async function create_deployment_action({ project, repo_url, build_command, output_dir }: Create_deployment_action) {

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

    const deployment_metadata = {
        deployment_id: deployment?.id,
        domain: project?.domain,
        repo_url: project?.repo_url
    } as {
        deployment_id: string,
        domain: string,
        repo_url: string,
        build_command?: string,
        output_dir?: string
    }

    if (build_command) {
        deployment_metadata.build_command = build_command;
    }

    if (output_dir) {
        deployment_metadata.output_dir = output_dir;
    }

    const instance = await ec2Client.send(ec2_run_instance_command(JSON.stringify(deployment_metadata)))

    return {
        project,
        deployment,
        instance: instance.$metadata?.httpStatusCode
    }
} 