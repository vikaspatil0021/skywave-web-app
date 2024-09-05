import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function page() {
    return (
        <>
            <div>
                <Link href='/new'>
                    <Button variant='default'>
                        New Project
                    </Button>
                </Link>
            </div>
        </>
    );
}
