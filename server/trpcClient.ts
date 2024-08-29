import { createTRPCNext } from '@trpc/next';

import { httpBatchLink } from '@trpc/client';
import type { AppRouter } from './routers/_app';


export const trpc = createTRPCNext<AppRouter>({
    config(opts) {
        return {
            links: [
                httpBatchLink({
                    url: '/api/trpc'
                })
            ]
        }
    },
});
