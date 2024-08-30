import prisma from "../client";

export const getUserByEmail = async (email: string) => {
    return await prisma?.user.findUnique({
        where: {
            email
        }
    });
}

type createInputData = {
    name: string,
    email: string,
    picture: string,
    git_user_id: string,
    git_username: string,
    repos_url: string,
}

export const createUser = async (data: createInputData) => {
    return await prisma?.user.create({
        data
    });
} 