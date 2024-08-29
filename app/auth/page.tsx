"use client"

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";

import { GitHubLogoIcon } from "@radix-ui/react-icons"


export default function Auth() {
    const session = useSession();
    const searchParams = useSearchParams();

    const [githubBtnLoading, setGithubBtnLoading] = useState(false);

    useEffect(() => {

        // handle oauth errors with toast
        const error: string | null = searchParams.get('error');
        if (session?.status === 'unauthenticated' && error) {
            toast({
                variant: "destructive",
                title: error,
            });
        }
    }, [searchParams, session?.status])

    return (
        <>
            <div className="text-center w-full max-w-md min-w-fit mb-5">
                <div className="font-semibold text-4xl py-3 mb-5">
                    Skywave.in
                </div>
                <div className="flex flex-col w-full gap-3 p-6 bg-[#333] rounded-md border border-white/10">
                    <div className="text-sm text-white">
                        Authenticate with
                    </div>
                    {
                        (session.status === 'loading') ?
                            <>
                                <Skeleton className="h-10 w-full bg-zinc-500" />
                            </> :
                            <>
                                <Button variant="secondary" size='lg' loading={githubBtnLoading} className="gap-1" onClick={() => {
                                    signIn('github');
                                    setGithubBtnLoading(true);
                                }}>
                                    <GitHubLogoIcon />
                                    Continue with Github
                                </Button>
                            </>
                    }
                </div>

            </div>
        </>

    )
}