import { ScrollArea } from "../scroll-area";

export default function BuildLogsContainer() {
    return (
        <>

            <div className="text-muted-foreground text-xs px-3 mt-2 md:p-0">
                Build logs
            </div>
            <ScrollArea className="relative flex-1 h-full mt-1 bg-[#333] rounded-sm mx-3 md:mx-0 p-3">
                <div className="h-[1000px]">
                    hi
                </div>
            </ScrollArea>
        </>
    )
}