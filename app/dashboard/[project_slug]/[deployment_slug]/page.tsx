"use client"

import Link from "next/link"
import { useEffect } from "react";

import { trpc } from "@/server/trpcClient";

import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

import { GitHubLogoIcon } from "@radix-ui/react-icons";

import { calculate_time_since } from "@/lib/calculate_time_since";

import BuildLogsContainer from "@/components/ui/containers/build_logs_container";



export default function Page({ params }: { params: { project_slug: string, deployment_slug: string } }) {
  const { deployment_slug, project_slug } = params;

  const get_deployment_query = trpc?.deployment?.get_deployment?.useQuery({ id: deployment_slug }, { refetchOnWindowFocus: false })
  const { data: deployment_data, isFetching, isError, error } = get_deployment_query;

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
      <div className="max-w-2xl w-full mx-auto pb-3 flex-1 flex flex-col overflow-hidden">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between w-full pb-5 pt-2 md:p-0 md:min-h-[90px] px-3  border-b-2">
          <div className="font-bold">
            <Link href={`/dashboard/${project_slug}`} className="text-muted-foreground hover:underline">
              {project_slug}
            </Link>
            <div>
              {deployment_slug}
            </div>
          </div>
          <div className="flex gap-2">
            {isFetching && <Skeleton className="h-8 w-32 bg-[#333]" />}
            {!isFetching && <>
              <Link target="_blank" href={deployment_data?.project?.repo_url as string}>
                <Button variant='outline' size="sm" className="flex gap-1">
                  <GitHubLogoIcon />
                  Repo
                </Button>
              </Link>
              <Link target="_blank" href={`https://${deployment_data?.project?.domain}.skywaveapp.work.gd`}>
                <Button variant='default' size="sm">
                  Live
                </Button>
              </Link>
            </>}
          </div>
        </div>
        < div className='p-3 md:px-0 md:py-3 text-xs grid gap-3'>
          <div className="grid gap-0.5">
            <span className="text-muted-foreground">
              Status
            </span>
            <div className="flex gap-1">
              {isFetching && <Skeleton className="h-4 w-32 bg-[#333]" />}
              {!isFetching &&
                <>
                  <div>{deployment_data?.status}</div>
                  <div className="">({calculate_time_since(deployment_data?.created_at as string)} ago)</div>
                </>
              }
            </div>
          </div>
          <div className="grid gap-0.5">
            <div className="text-muted-foreground">
              Source
            </div>
            {isFetching && <Skeleton className="h-8 w-48 bg-[#333]" />}
            {!isFetching && <>
              <Link target="_blank" href={deployment_data?.commit_url as string} className="group/commit">
                <div className="flex gap-1">
                  <span>
                    {deployment_data?.source}
                  </span>
                  <span className="group-hover/commit:underline">
                    ({deployment_data?.commit_sha?.substring(0, 7)})
                  </span>
                </div>
                <div className="max-w-full truncate group-hover/commit:underline" title={deployment_data?.commit_message}>
                  {deployment_data?.commit_message}weghiuergierjgaegiud
                </div>
              </Link>
            </>
            }
          </div>
        </div >
        <BuildLogsContainer />
      </div >

    </>
  )
}

