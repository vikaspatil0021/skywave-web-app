import { Account, NextAuthOptions, Profile, User } from "next-auth";

import GithubProvider from "next-auth/providers/github";
import { createUser, getUserByEmail } from "../prisma/user/service";
import { AdapterUser } from "next-auth/adapters";
import { encryptToken } from "../encrypt_token";

interface P extends Profile {
    login?: string,
    repos_url?: string,
}

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
            authorization: {
                params: {
                    scope: 'read:user user:email admin:repo_hook'
                }
            }
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
                git_username: existingUser?.git_username
            }
        },
        async signIn({ account, user, profile }: { account: Account | null, user: User | AdapterUser, profile?: P | undefined }) {
            try {

                const existingUser = await getUserByEmail(user?.email as string);
                if (!existingUser) {
                    const { encrypted_access_token, token_iv } = await encryptToken(account?.access_token as string);

                    const data = {
                        name: user?.name as string,
                        email: user?.email as string,
                        picture: user?.image as string,
                        git_user_id: account?.providerAccountId as string,
                        git_username: profile?.login as string,
                        repos_url: profile?.repos_url as string,
                        encrypted_access_token,
                        token_iv
                    }
                    await createUser(data)
                }
                return true

            } catch (error: any) {
                throw new Error(error?.message)
            }
        },
        async session({ session, token }) {
            const user = session?.user as { id: string, git_username: string }
            user.id = token?.id as string
            user.git_username = token?.git_username as string
            return session
        }
    }
}