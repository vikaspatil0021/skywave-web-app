import Link from "next/link";
import { Skeleton } from "../skeleton";
import { signOut } from "next-auth/react";
import UserNav from "./user-nav";
import ModeToggle from "../modeToggle";

export default function Header() {
    return (
        <>
            <div className="w-full h-14 px-5  py-2 flex justify-between items-center border-b-2">
                <Link href='/dashboard'>
                    <div className="gap-2 flex items-center">
                        <Skeleton className="h-5 w-5 bg-violet-500" />
                        <span>Skywave.in</span>
                    </div>
                </Link>
                <div className="flex items-center gap-3">
                    <ModeToggle />
                    <UserNav />
                </div>
            </div>
        </>
    )
}