import prisma from "../client";

export const getUserByEmail = async (email: string) => {
    return await prisma?.user.findUnique({
        where: {
            email
        }
    });
}

type Data = {
    name: string,
    email: string,
    picture: string,
}

export const createUser = async (data: Data) => {
    return await prisma?.user.create({
        data
    });
} 