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

export default function BuildLogsContainer({ deployment_id }: { deployment_id: string }) {

    const { data: logs_data, isError, isFetching, error } = trpc?.build_logs?.get_logs.useQuery({ deployment_id }, { refetchOnWindowFocus: false })

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
            <div className="text-muted-foreground text-xs px-3 mt-2 md:p-0">
                Build logs
            </div>
            <ScrollArea className="relative flex-1 mt-1 bg-[#333] rounded-sm mx-3 md:mx-0 px-3">
                {isError && <div className="text-center mt-5 text-sm text-muted-foreground">Something went wrong</div>}
                {!isError && isFetching && <div className="flex mt-5 justify-center"><LoadingIcon /></div>}
                {!isError && !isFetching && logs_data?.length === 0 && <div className="text-center mt-5 text-sm text-muted-foreground">No Logs Found</div>}
                {!isError && !isFetching && logs_data &&
                    logs_data?.map((log_event: Log, index: number) => {
                        return (
                            <>
                                <div key={'logs' + index} className={`text-xs grid grid-cols-6 gap-2 ${index === 0 ? 'mt-4' : ''}${index === logs_data?.length - 1 ? 'mb-4' : ''}`}>
                                    <div className="col-span-1 text-center">
                                        <span>
                                            {formatTime(log_event?.created_at)}
                                        </span>
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