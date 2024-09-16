'use client'

import Link from "next/link";
import { useEffect } from "react";

import { trpc } from "@/server/trpcClient";

import { GitHubLogoIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

import DeploymentContainer from "@/components/ui/containers/deployment_containers";




export default function Page({ params }: { params: { project_slug: string } }) {

    const get_project_query = trpc?.project?.get_project?.useQuery({ project_name: params?.project_slug }, { refetchOnWindowFocus: false })

    const { data: project_data, isFetching, isError, error } = get_project_query;

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
            <ScrollArea className="relative h-full w-full" >

                <div className="max-w-2xl w-full mx-auto">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between w-full py-5 md:h-[90px] px-3 md:p-0 border-b-2">
                        <div className="text-3xl font-bold">
                            {params?.project_slug}
                        </div>
                        <div className="flex gap-2">
                            {isFetching && <Skeleton className="h-8 w-32 bg-[#333]" />}
                            {!isFetching && <>
                                <Link target="_blank" href={project_data?.repo_url as string}>
                                    <Button variant='outline' size="sm" className="flex gap-1">
                                        <GitHubLogoIcon />
                                        Repo
                                    </Button>
                                </Link>
                                <Link target="_blank" href={`https://${project_data?.domain}.skywaveapp.work.gd`}>
                                    <Button variant='default' size="sm">
                                        Live
                                    </Button>
                                </Link>
                            </>}
                        </div>
                    </div>
                    <div className="px-3 md:px-0 pb-5">
                        <div className="text-muted-foreground text-sm my-3">
                            Deployments
                        </div>
                        <DeploymentContainer
                            get_project_query={get_project_query}
                        />
                    </div>
                </div>
            </ScrollArea>
        </>
    );
}
