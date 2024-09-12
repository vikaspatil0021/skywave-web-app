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
            <div className="relative overflow-hidden w-full flex-1 flex flex-col items-center p-3 pt-6">
                {children}
            </div>
        </>
    )
}

