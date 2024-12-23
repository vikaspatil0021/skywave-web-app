'use client'

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";


import { GitHubLogoIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";

import { trpc } from "@/server/trpcClient";
import { useDebounce } from "@/lib/use_debounce";
import { calculate_time_since } from "@/lib/calculate_time_since";
import { LoadingIcon } from "@/components/icons/icons";
import { toast } from "@/components/ui/use-toast";
import { NewProjectDeployDrawerDialog } from "@/components/ui/dialog-and-drawer/new-project-deploy";

type Repo = {
    id: number,
    name: string,
    updated_at: string,
    visibility: string,
    git_url: string,
    clone_url: string
}

export default function Page() {
    const session = useSession();
    const user = session?.data?.user as { git_username: string }

    const [inputVal, setInputVal] = useState<string>('');

    const debouncedValue = useDebounce(inputVal)

    const { data, isFetching, isError, error } = trpc?.github?.get_repos?.useQuery({ query: debouncedValue }, { refetchOnWindowFocus: false })

    useEffect(() => {

        if (isError) {
            toast({
                variant: "destructive",
                title: error?.message as string,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError])

    return (
        <>
            <div className=" flex-1 w-full max-w-lg min-w-fit mb-5">
                <span className="font-semibold text-3xl py-3 mb-5">
                    Let&apos;s build something.
                </span>
                <p className="text-muted-foreground mt-2 mb-5">
                    Import an existing Git Repository.
                </p>
                <div className="flex flex-col w-full h-[380px] md:h-[395px] gap-3 p-4 md:p-6 dark:bg-[#333] bg-[#eee] text-sm dark:text-white/90 rounded-md border dark:border-white/10 border-black/10">
                    <div className=" inline-flex items-center gap-2 rounded-md">
                        <GitHubLogoIcon />
                        <span>
                            {user ? user?.git_username : <Skeleton className="h-5 w-28 bg-[#ccc] dark:bg-zinc-600" />}
                        </span>
                    </div>

                    <div className="relative flex items-center">
                        <MagnifyingGlassIcon className="absolute left-2" />
                        <Input type="text" placeholder="Search repo..." className="dark:bg-[#111] text-xs dark:text-white/80 ps-7"
                            value={inputVal}
                            onChange={(e) => setInputVal(e?.target?.value as string)} />
                    </div>


                    <div className={`flex-1 ${isFetching || isError || data.length === 0 ? "flex justify-center items-center" : ''} border dark:border-white/20 border-black/20 text-xs dark:bg-[#111] bg-[#fff] rounded-md relative`}>

                        {isError && <span>Something went wrong</span>}
                        {!isError && isFetching && <LoadingIcon />}
                        {!isError && !isFetching && data.length === 0 && <span>No Results Found</span>}

                        {!isError && !isFetching &&
                            data.map((repo: Repo, index: number) => {
                                return (
                                    <>
                                        <div key={'repo' + index} className={`flex justify-between items-center py-3 px-3 ${index !== 4 ? "border-b dark:border-white/20 border-black/20" : ''}`}>
                                            <div className="flex gap-2">
                                                <GitHubLogoIcon />

                                                <span className="truncate max-w-[150px] md:max-w-[260px]">{repo?.name}</span>
                                                <span className="text-zinc-400">{calculate_time_since(repo?.updated_at)}</span>
                                            </div>
                                            <NewProjectDeployDrawerDialog
                                                repo={repo}
                                                git_username={user?.git_username} />

                                        </div >

                                    </>
                                )
                            })

                        }
                    </div>
                </div>

            </div >
        </>
    );
}
