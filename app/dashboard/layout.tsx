import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth"

export const metadata: Metadata = {
    title: "Projects | Skywave.in",
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const session = await getServerSession();
    if (!session) redirect('/auth');

    return (
        <>
                {children}
        </>
    )
}

