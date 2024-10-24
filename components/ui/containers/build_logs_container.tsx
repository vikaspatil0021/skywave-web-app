import { useEffect } from "react";

import { trpc } from "@/server/trpcClient";

import { ScrollArea } from "../scroll-area";
import { LoadingIcon } from "@/components/icons/icons";

import { toast } from "../use-toast";
import { formatTime } from "@/lib/utils";


type Log = {
    id: string,
    created_at: string,
    deployment_id: string,
    log: string
}

export default function BuildLogsContainer({ deployment_id, deploying_status }: { deployment_id: string, deploying_status: boolean }) {

    const { data: logs_data, isError, isFetching, isRefetching, error, refetch } = trpc?.build_logs?.get_logs.useQuery({ deployment_id }, { refetchOnWindowFocus: false, refetchInterval: (deploying_status ? 6000 : false) })

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
        if (!deploying_status) {
            refetch()
        }
    }, [deploying_status])

    return (
        <>
            <div className="text-muted-foreground text-xs px-3 mt-2 md:p-0">
                Build logs
            </div>

            <ScrollArea className="relative flex-1 mt-1 dark:bg-[#333] bg-[#ddd] rounded-sm mx-3 md:mx-0 px-3">
                {isError && <div className="text-center mt-5 text-sm text-muted-foreground">Something went wrong</div>}
                {!isError && (deploying_status && logs_data?.length === 0 || (!isRefetching && isFetching)) && <div className="flex mt-5 justify-center"><LoadingIcon /></div>}
                {!isError && !isFetching && !isRefetching && !deploying_status && logs_data?.length === 0 && <div className="text-center mt-5 text-sm text-muted-foreground">No Logs Found</div>}
                {!isError && (!isFetching || isRefetching) && logs_data &&
                    logs_data?.map((log_event: Log, index: number) => {
                        return (
                            <>
                                <div key={'logs' + index} className={`text-xs grid grid-cols-6 gap-4 md:gap-2 ${index === 0 ? 'mt-4 ' : ''}${index === logs_data?.length - 1 ? 'mb-4' : ''}`}>
                                    <div className="col-span-1 text-center min-w-[48px]">
                                        {formatTime(log_event?.created_at)}
                                    </div>
                                    <div className="col-span-5">
                                        {log_event?.log}
                                    </div>
                                </div>
                            </>
                        )
                    })
                }
            </ScrollArea>
        </>
    )
}