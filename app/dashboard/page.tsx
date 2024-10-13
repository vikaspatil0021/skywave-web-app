"use client"

import Link from "next/link";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import ProjectsContainer from "@/components/ui/containers/project_containers";


export default function Page() {
    const [search_input_val, set_input_val] = useState<string>('');

    return (
        <>
            <ScrollArea className="relative h-full w-full px-3" >
                <div className="w-full max-w-2xl mx-auto">

                    <div className="flex gap-2 items-center p-1 pt-6">
                        <div className="relative flex-1 flex items-center">
                            <MagnifyingGlassIcon className="absolute left-2" />
                            <Input type="text" placeholder="Search project..." className="dark:bg-[#111] text-xs dark:text-white/80 ps-7"
                                value={search_input_val}
                                onChange={(e) => set_input_val(e?.target?.value as string)} />
                        </div>
                        <Link href='/new'>
                            <Button variant='default' size="sm">
                                New Project
                            </Button>
                        </Link>
                    </div>
                    <ProjectsContainer
                        search_input_val={search_input_val}
                    />
                </div>
            </ScrollArea>
        </>
    );
}
