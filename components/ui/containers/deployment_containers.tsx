import Link from "next/link";
import { usePathname } from "next/navigation";

import { LoadingIcon } from "@/components/icons/icons";
import { calculate_time_since } from "@/lib/calculate_time_since";

import { UseTRPCQueryResult } from "@trpc/react-query/shared";

import { TRPCClientErrorLike } from "@trpc/client";

type Deployment_container_props = {
    get_project_query: UseTRPCQueryResult<any, TRPCClientErrorLike<any>>,
}

type Deployment = {
    id: string
    duration: number,
    project_id: string,
    source: "Git" | "Redeploy",
    status: "Ready" | "Error" | "Queued" | "Building",
    commit_url: string,
    commit_message: string,
    commit_sha: string,
    created_at: string
}

export default function DeploymentContainer({ get_project_query }: Deployment_container_props) {
    const pathname = usePathname();

    const { data: project_data, isFetching,isError } = get_project_query;

    return (
        <>
            <div className={`text-xs ${!isFetching && "bg-[#111] border border-white/10"} rounded-md relative`}>
                {isError && <div className="text-center my-5 text-sm text-muted-foreground">Something went wrong</div>}
                {!isError && isFetching && <div className="flex mt-10 justify-center"><LoadingIcon /></div>}

                {!isError && !isFetching && project_data && project_data?.Deployment.map((deployment: Deployment, index: number) => {
                    return (
                        <>
                            <div key={'deployment' + index} className={`grid sm:grid-cols-3 py-3 px-3 gap-1 sm:gap-0 ${index !== (project_data?.Deployment.length - 1) ? "border-b border-white/10" : ''}`}>
                                <Link href={`${pathname}/${deployment?.id}`} className="hover:underline">
                                    {deployment?.id}
                                </Link>
                                <div className="text-xs text-muted-foreground grid grid-cols-2 sm:flex sm:flex-col gap-3 sm:gap-1">
                                    <div>{deployment?.status}</div>
                                    <div className="">{calculate_time_since(deployment?.created_at)} ago</div>
                                </div>
                                <Link target="_blank" href={deployment?.commit_url} className="group/commit text-xs text-muted-foreground grid grid-cols-2 sm:flex sm:flex-col gap-3 sm:gap-1">

                                    <div className="flex gap-1">
                                        <span>
                                            {deployment?.source}
                                        </span>
                                        <span className="group-hover/commit:underline">
                                            ({deployment?.commit_sha?.substring(0, 7)})
                                        </span>
                                    </div>
                                    <div className="max-w-full truncate group-hover/commit:underline" title={deployment?.commit_message}>
                                        {deployment?.commit_message}
                                    </div>
                                </Link>

                            </div >

                        </>
                    )
                })}
            </div>
        </>
    )
}