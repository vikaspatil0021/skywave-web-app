import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth"

import BuiltByMe from "@/components/ui/common/builtByMe";

export const metadata: Metadata = {
    title: "Auth | Skywave.in",
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getServerSession();
    if (session) redirect('/');

    return (
        <>
            <div className="flex h-screen flex-col items-center justify-center p-5">
                {children}
                <BuiltByMe />
            </div>
        </>
    )
}

