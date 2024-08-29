import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

import { appRouter } from '@/server/routers/_app';
import { createContext } from '@/server/context';

// export API handler
// @link https://trpc.io/docs/v11/server/adapters

const handler = (req: Request) => {
  return fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext
  })
}

export { handler as GET, handler as POST };