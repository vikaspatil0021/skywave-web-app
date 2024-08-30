import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react"
import { Skeleton } from "../skeleton";
import { Button } from "../button";
import { ExitIcon, HomeIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function UserNav() {
    const session = useSession();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline' className="h-6 w-6 rounded-full p-0">
                    <Avatar className="h-6 w-6 cursor-pointer">
                        <AvatarImage src={session?.data?.user?.image as string} alt="user image" />
                        <AvatarFallback>
                            <Skeleton className="h-full w-full relative bg-violet-400" />
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal cursor-default">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{session?.data?.user?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground truncate" title={session?.data?.user?.email as string}>{session?.data?.user?.email as string}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup className="text-muted-foreground">
                    <Link href='/dashboard'>
                        <DropdownMenuItem>
                            Dashboard
                        </DropdownMenuItem>
                    </Link>

                    <DropdownMenuItem>
                        Settings
                    </DropdownMenuItem>

                    <DropdownMenuSeparator />
                    <Link href='/home'>
                        <DropdownMenuItem>
                            Home Page
                            <DropdownMenuShortcut>
                                <HomeIcon />
                            </DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={() => signOut()}>
                        Log out
                        <DropdownMenuShortcut><ExitIcon /></DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}