import prisma from "../client";

export const getProjectByName = async (name: string) => {
    return await prisma?.project.findUnique({
        where: {
            name
        }
    });
}

type CreateProjectInputData = {
    domain: string,
    name: string,
    repo_url: string,
    user_id: string
}


export const createProject = async (data: CreateProjectInputData) => {
    return await prisma?.project.create({
        data
    });
}

