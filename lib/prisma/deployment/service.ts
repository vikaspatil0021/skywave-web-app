import prisma from "../client";

type CreateDeploymentInputData = {
    duration: number,
    project_id: string,
    source: "Git" | "Redeploy",
    status: "Ready" | "Error" | "Queued" | "Building",
    commit_url: string,
    commit_message: string,
    commit_sha: string
}

export const createDeployment = async (data: CreateDeploymentInputData) => {
    return await prisma?.deployment.create({
        data
    });
}