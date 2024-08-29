'use client'

import { trpc } from "@/server/trpcClient";

import { signOut } from "next-auth/react";

export default function Home() {
  const { data, status } = trpc.hello.useQuery()
  return (
    <>
      <button onClick={() => signOut()}>
        logout
      </button>
    </>
  );
}
