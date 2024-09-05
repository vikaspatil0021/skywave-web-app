import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth"

export const metadata: Metadata = {
    title: "New Project | Skywave.in",
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
            <div className="w-full flex flex-1 justify-center py-10 px-3 md:px-0">
                {children}
            </div>
        </>
    )
}

