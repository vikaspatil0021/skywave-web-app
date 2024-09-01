import { TRPCError } from "@trpc/server";

type Repo = {
    id: string,
    name: string,
    updated_at: string,
    visibility: string,
    git_url: string,
    clone_url: string
}


export default async function get_repos_handler({ query, git_username }: { query: string, git_username: string }) {
    const q = query !== '' ? `${query}+in:name+` : ''
    const url = `https://api.github.com/search/repositories?q=${q}user:${git_username}+fork:true&sort=updated&order=desc&per_page=5`

    try {

        const result = await fetch(url);
        const data = await result?.json();

        if (data?.items) {

            const filtered_data = data.items.map((each: Repo) => {
                return {
                    id: each?.id,
                    name: each?.name,
                    updated_at: each?.updated_at,
                    visibility: each?.visibility,
                    git_url: each?.git_url,
                    clone_url: each?.clone_url
                }
            })

            return filtered_data
        } else {
            throw new Error(data?.message as string);
        }

    } catch (error: any) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: error?.message as string })
    }
}