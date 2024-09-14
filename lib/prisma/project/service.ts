import prisma from "../client";

export const getProjectByName = async (name: string) => {
    return await prisma?.project.findUnique({
        where: {
            name
        },
        include: {
            Deployment: true
        }
    });
}

export const getProjectsByUserId = async (user_id: string) => {
    return await prisma?.project.findMany({
        where: {
            user_id
        },
        orderBy: {
            created_at: 'desc'
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

