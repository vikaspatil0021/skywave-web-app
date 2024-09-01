import { TRPCError } from "@trpc/server";
import { middleware, publicProcedure } from "../trpc";
import { Session } from "next-auth";


interface S extends Session {
    user?: {
        name: string,
        id?: string,
        git_username?: string
    }
}

const isAuthed = middleware(({ ctx, next }) => {

    const { session } = ctx as { session: S };
    if (!session || !session?.user?.id) throw new TRPCError({ code: 'UNAUTHORIZED' });

    return next({
        ctx
    })
})

export const authedProcedure = publicProcedure.use(isAuthed);