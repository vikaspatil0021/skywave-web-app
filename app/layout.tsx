'use client'

import "./globals.css";
import { Inter } from "next/font/google";

import { trpc } from "@/server/trpcClient";

import NextProviders from "@/components/ui/providers";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/ui/header/header";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body className={inter.className}>
        <NextProviders>
          {(pathname.includes('auth')) ? null : <Header />}
          
          {children}
        </NextProviders>
        <Toaster />
      </body>
    </html>
  );
}

export default trpc.withTRPC(RootLayout);
