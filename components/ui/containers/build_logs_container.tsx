import { ScrollArea } from "../scroll-area";

export default function BuildLogsContainer() {
    return (
        <>

            <div className="text-muted-foreground text-sm">
                Build logs
            </div>
            <ScrollArea className="relative flex-1 h-full mt-1 bg-[#333] rounded-sm p-3">
                <div className="h-[1000px]">
                    hi
                </div>
            </ScrollArea>
        </>
    )
}