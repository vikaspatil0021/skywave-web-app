

export default function Page({ params }: { params: { project_slug: string } }) {
    return (
        <>
            <div>
                {params?.project_slug}
            </div>
        </>
    );
}
