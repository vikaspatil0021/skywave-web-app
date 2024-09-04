import { authOptions } from "@/lib/auth/options";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { Session, getServerSession } from "next-auth";

interface S extends Session {
   user: {
      name: string,
      git_username: string,
      id: string
   }
}

export const createContext = async (_opts: FetchCreateContextFnOptions) => {
   const { req } = _opts

   const session = req && (await getServerSession(authOptions))

   return {
      req,
      session
   } as { req: Request, session: S }
}

export type TRPCContext = Awaited<ReturnType<typeof createContext>>;
