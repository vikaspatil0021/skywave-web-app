import { nanoid } from "nanoid";
import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined
}


const prisma = global.prisma || new PrismaClient().$extends({
    query: {
        $allModels: {
            async create({ args, query }: any) {
                args = {
                    ...args.data,
                    id: nanoid(15)
                }
                return query(args);
            }
        }
    }
}) as PrismaClient

if (process.env.NODE_ENV === "development") global.prisma = prisma;

export default prisma;