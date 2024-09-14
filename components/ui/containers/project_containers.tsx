"use client"
import Link from "next/link";
import { useEffect } from "react";

import { trpc } from "@/server/trpcClient";

import { Button } from "../button";
import { toast } from "../use-toast";

import { LoadingIcon } from "@/components/icons/icons";
import { ExternalLinkIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { calculate_time_since } from "@/lib/calculate_time_since";

type Project = {
    id: string,
    name: string,
    domain: string,
    repo_url: string,
    created_at: string,
    user_id: string
}

export default function ProjectsContainer() {

    const { data: projects, isFetching, isError, error } = trpc?.project?.get_projects?.useQuery(undefined, { refetchOnWindowFocus: false });

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
            <div className="grid gap-3 p-1 pb-4">
                {isError && <div className="text-center mt-10 text-sm text-muted-foreground">Something went wrong</div>}
                {!isError && isFetching && <div className="flex mt-10 justify-center"><LoadingIcon /></div>}
                {!isError && !isFetching && projects?.length === 0 && <div className="text-center mt-10 text-sm text-muted-foreground">No Projects Found</div>}

                {!isError && !isFetching &&
                    projects?.map((project: Project, index: number) => {
                        return (
                            <>
                                <div className="grid gap-2">

                                    <Link target="_blank" href={project?.repo_url}>
                                        <div className="group/link flex gap-0.5 mt-2 items-center text-xs text-muted-foreground hover:underline cursor-pointer">
                                            <GitHubLogoIcon className="h-3 w-3 me-0.5" />
                                            <span className="truncate max-w-[200px] text-center" title={project?.repo_url.replace("https://github.com/", '').replace('.git', '')}>
                                                {project?.repo_url.replace("https://github.com/", '').replace('.git', '')}
                                            </span>
                                            <ExternalLinkIcon className="h-3 w-3 hidden group-hover/link:block" />
                                        </div>
                                    </Link>
                                    < div className="flex items-center justify-between gap-3 bg-[#333] border border-white/20 rounded-md p-3 w-full">
                                        <div className="grid gap-1">
                                            <Link href={`/dashboard/${project?.name}`}>
                                                <div className="text-sm hover:underline">{project?.name}</div>
                                            </Link>

                                            <div className="flex gap-2 cursor-default">
                                                <span className="text-xs text-muted-foreground truncate max-w-[180px]" title={'dashboard-project-container-ujhbjkkjnknnj'}>
                                                    dashboard-project-container
                                                </span>
                                                <span className="cursor-default text-muted-foreground text-xs">
                                                    {calculate_time_since(project?.created_at)} ago
                                                </span>
                                            </div>
                                        </div>
                                        <Link target="_blank" href={`https://${project?.domain}.skywaveapp.work.gd`}>
                                            <Button variant='default' size="sm">
                                                Live
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </>
                        )
                    })}

            </div >
        </>
    );
}
