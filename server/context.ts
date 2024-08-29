import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export const createContext = async (_opts: FetchCreateContextFnOptions) => {
   const { req } = _opts

   return {
      req
   }
}

export type TRPCContext = Awaited<ReturnType<typeof createContext>>;
