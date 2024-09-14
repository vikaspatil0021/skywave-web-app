'use client'

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@/components/ui/scroll-area";

const data = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 0, 8, 6, 5, 3, 22,
]

export default function Page({ params }: { params: { project_slug: string } }) {
    return (
        <>
            <ScrollArea className="relative h-full w-full" >

                <div className="max-w-2xl w-full mx-auto">
                    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between w-full py-5 md:py-7 px-3 md:px-0 border-b-2">
                        <div className="text-3xl font-bold">
                            {params?.project_slug}
                        </div>
                        <div className="flex gap-2">
                            <Link href='/new'>
                                <Button variant='outline' size="sm" className="flex gap-1">
                                    <GitHubLogoIcon />
                                    Repo
                                </Button>
                            </Link>
                            <Link href='/new'>
                                <Button variant='default' size="sm">
                                    Live
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="px-3 md:px-0 pb-5">
                        <div className="text-muted-foreground text-sm my-3">
                            Deployments
                        </div>
                        <div className=" border border-white/20 text-xs bg-[#111] rounded-md relative">
                            {
                                data.map((repo: any, index: number) => {
                                    return (
                                        <>
                                            <div key={'repo' + index} className={`flex justify-between items-center py-3 px-3 ${index !== (data?.length - 1) ? "border-b border-white/20" : ''}`}>
                                                <div className="flex gap-2">
                                                    <span>{params?.project_slug}</span>
                                                </div>
                                            </div >

                                        </>
                                    )
                                })

                            }
                        </div>
                    </div>
                </div>
            </ScrollArea>
        </>
    );
}
