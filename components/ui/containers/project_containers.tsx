"use client"
import Link from "next/link";
import { useEffect, useState } from "react";

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
    user_id: string,
    Deployment: {
        commit_message: string,
        id: string,
        created_at: string
    }[]
}

export default function ProjectsContainer({ search_input_val }: { search_input_val: string }) {
    const [filtered_projects, set_filtered_projects] = useState<Project[]>([]);

    const { data: projects, isFetching, isRefetching, isError, error } = trpc?.project?.get_projects?.useQuery(undefined, { refetchOnWindowFocus: false });

    useEffect(() => {

        if (isError) {
            toast({
                variant: "destructive",
                title: error?.message as string,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isError])

    useEffect(() => {

        if (projects) {
            const filtered_result = projects?.filter((project: Project) => {
                if (project?.name.includes(search_input_val)) {
                    return project
                }
            }) as Project[];

            set_filtered_projects(filtered_result)
        }
    }, [search_input_val])

    return (
        <>
            <div className="grid md:grid-cols-2 gap-3 p-1 pb-4">
                {isError && <div className="text-center mt-10 text-sm text-muted-foreground md:col-span-2">Something went wrong</div>}
                {!isError && !isRefetching && isFetching && <div className="flex mt-10 justify-center md:col-span-2"><LoadingIcon /></div>}
                {!isError && !isFetching && projects?.length === 0 && <div className="text-center mt-10 text-sm text-muted-foreground md:col-span-2">No Projects Found</div>}

                {!isError && (!isFetching || isRefetching) && search_input_val === '' &&
                    projects?.map((project: Project, index: number) => {
                        return (
                            <ProjectCard
                                key={"projects"}
                                project={project}
                                index={index}
                            />
                        )
                    })}
                {!isError && (!isFetching || isRefetching) && search_input_val !== '' &&
                    filtered_projects?.map((project: Project, index: number) => {
                        return (
                            <ProjectCard
                                key={"filtered_projects"}
                                project={project}
                                index={index}
                            />
                        )
                    })}
            </div >
        </>
    );
}

function ProjectCard({ project, index }: { project: Project, index: number }) {
    return (
        <>
            <div key={"project" + index} className="grid gap-2">

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

                        <div className="flex items-center gap-2 cursor-default ">
                            <Link href={`/dashboard/${project?.name}/${project?.Deployment[0]?.id}`}>
                                <div className="text-xs text-muted-foreground truncate max-w-[180px] hover:underline" title={project?.Deployment[0].commit_message}>
                                    {project?.Deployment[0].commit_message}
                                </div>
                            </Link>
                            <span className="cursor-default text-muted-foreground text-xs">
                                {calculate_time_since(project?.Deployment[0].created_at)} ago
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
}
