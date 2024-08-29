'use client'

import "./globals.css";
import { Inter } from "next/font/google";

import { trpc } from "@/server/trpcClient";

import NextProviders from "@/components/ui/providers";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextProviders>
          {children}
        </NextProviders>
        <Toaster />
      </body>
    </html>
  );
}

export default trpc.withTRPC(RootLayout);
