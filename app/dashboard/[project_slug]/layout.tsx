import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth"

type Props = {
    params: { project_slug: string }
}


export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    return {
        title: `${params?.project_slug} | Skywave.in`,
    }
}

export default async function RootLayout({
    children
}: {
    children: React.ReactNode,
}) {
    const session = await getServerSession();
    if (!session) redirect('/auth');

    return (
        <>
            {children}
        </>
    )
}

