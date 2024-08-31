'use client'

import { useSession } from "next-auth/react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { GitHubLogoIcon } from "@radix-ui/react-icons";



export default function Page() {
    const session = useSession();
    const user = session?.data?.user as { git_username: string }
    return (
        <>
            <div className=" flex-1 w-full max-w-lg min-w-fit mb-5">
                <span className="font-semibold text-3xl py-3 mb-5">
                    Let&apos;s build something.
                </span>
                <p className="text-muted-foreground mt-2 mb-5">
                    Import an existing Git Repository.
                </p>
                <div className="flex flex-col w-full gap-3 p-4 md:p-6 bg-[#333] text-sm text-white/90 rounded-md border border-white/10">
                    <div className=" inline-flex items-center gap-2 rounded-md">
                        <GitHubLogoIcon />
                        <span>
                            {user ? user?.git_username : <Skeleton className="h-5 w-28 bg-zinc-600"/>}
                        </span>
                    </div>

                    <Input type="text" placeholder="Search..." className="bg-[#111] text-xs text-white/80" />

                    <div className="border border-white/20 text-xs bg-[#111] rounded-md">
                        <div className="flex justify-between items-center py-3 px-3 border-b border-white/20">
                            <div className="flex gap-2">
                                <GitHubLogoIcon />

                                Skywave
                            </div>
                            <Button variant='default' size='sm' className="h-7">
                                Deploy
                            </Button>
                        </div>

                        <div className="flex justify-between items-center py-3 px-3 border-b border-white/20">
                            <div className="flex gap-2">
                                <GitHubLogoIcon />

                                Framesync
                            </div>
                            <Button variant='default' size='sm' className="h-7">
                                Deploy
                            </Button>
                        </div>

                        <div className="flex justify-between items-center py-3 px-3 border-b border-white/20">
                            <div className="flex gap-2">
                                <GitHubLogoIcon />

                                Framesync
                            </div>
                            <Button variant='default' size='sm' className="h-7">
                                Deploy
                            </Button>
                        </div>
                        <div className="flex justify-between items-center py-3 px-3 border-b border-white/20">
                            <div className="flex gap-2">
                                <GitHubLogoIcon />

                                meme-frontend
                            </div>
                            <Button variant='default' size='sm' className="h-7">
                                Deploy
                            </Button>
                        </div>

                        <div className="flex justify-between items-center py-3 px-3 border-white/20">
                            <div className="flex gap-2">
                                <GitHubLogoIcon />

                                meme-backend
                            </div>
                            <Button variant='default' size='sm' className="h-7">
                                Deploy
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}
