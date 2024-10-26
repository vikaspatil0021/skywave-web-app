import prisma from "../client";

export const getProjectByName = async (name: string) => {
    return await prisma?.project.findUnique({
        where: {
            name
        },
        include: {
            Deployment: {
                orderBy: {
                    created_at: 'desc'
                }
            }
        }
    });
}

export const getProjectsByUserId = async (user_id: string) => {
    return await prisma?.project.findMany({
        where: {
            user_id
        },
        include: {
            Deployment: {
                take: 1,
                orderBy: {
                    created_at: 'desc'
                }
            }
        },
        orderBy: {
            created_at: 'desc'
        }
    });
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


export const createProject = async (data: CreateProjectInputData) => {
    return await prisma?.project.create({
        data,
        include: {
            user: true
        }
    });
}

