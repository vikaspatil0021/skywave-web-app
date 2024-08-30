import { authOptions } from "@/lib/auth/options";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
   const session = await getServerSession(authOptions);

   if (!session) redirect('/auth');

   return redirect('/dashboard')
}
