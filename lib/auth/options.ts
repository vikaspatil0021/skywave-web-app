import { NextAuthOptions } from "next-auth";

import GithubProvider from "next-auth/providers/github";
import { createUser, getUserByEmail } from "../prisma/user/service";

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        })
    ],
    session: { strategy: 'jwt' },
    pages: {
        error: '/auth',
        signIn: '/auth'
    },
    callbacks: {
        async jwt({ token }) {
            const existingUser = await getUserByEmail(token?.email as string);

            if (!existingUser) {
                return token
            }
            return {
                ...token,
                id: existingUser.id,
            }
        },
        async signIn({ account, user }) {
            const existingUser = await getUserByEmail(user?.email as string);

            if (!existingUser) {
                const data = {
                    name: user?.name as string,
                    email: user?.email as string,
                    picture: user?.image as string,
                }

                await createUser(data)
            }

            return true
        },
        async session({ session, token }) {
            const user = session?.user as { id: String }
            user.id = token?.id as string
            return session
        }
    }
}