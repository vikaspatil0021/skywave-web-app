"use client"
import Link from "next/link";

import { Button } from "../button";

import { ExternalLinkIcon, GitHubLogoIcon } from "@radix-ui/react-icons";


export default function ProjectsContainer() {

    return (
        <>
            <div className="grid gap-3 p-1 mt-3">
                <div className="flex items-center justify-between gap-3 bg-[#333] border border-white/20 rounded-md p-3 w-full">
                    <div className="grid gap-0.5">
                        <Link href={'/dashboard/'}>
                            <div className="text-sm hover:underline">skywave-web-app</div>
                        </Link>
                        <Link target="_blank" href={'/'}>
                            <div className="group/link flex gap-0.5 items-center text-xs text-muted-foreground hover:underline cursor-pointer">
                                <GitHubLogoIcon className="h-3 w-3 me-0.5" />
                                <span className="truncate max-w-[200px] text-center">
                                    vikaspatil0021/skywave-web-app
                                </span>
                                <ExternalLinkIcon className="h-3 w-3 hidden group-hover/link:block" />
                            </div>
                        </Link>
                    </div>
                    <Link target="_blank" href='/'>
                        <Button variant='default' size="sm" className="gap-1">
                            Live
                        </Button>
                    </Link>
                </div>
                <div className="flex items-center justify-between gap-3 bg-[#333] border border-white/20 rounded-md p-3 w-full">
                    <div className="grid gap-0.5">
                        <Link href={'/dashboard/'}>
                            <div className="text-sm hover:underline">adidas-clone</div>
                        </Link>
                        <Link target="_blank" href={'/'}>
                            <div className="group/link flex gap-0.5 items-center text-xs text-muted-foreground hover:underline cursor-pointer">
                                <GitHubLogoIcon className="h-3 w-3 me-0.5" />
                                <span className="truncate max-w-[200px] text-center">
                                    vikaspatil0021/adidas-clone
                                </span>
                                <ExternalLinkIcon className="h-3 w-3 hidden group-hover/link:block" />
                            </div>
                        </Link>
                    </div>
                    <Link target="_blank" href='/'>
                        <Button variant='default' size="sm" className="gap-1">
                            Live
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
}
