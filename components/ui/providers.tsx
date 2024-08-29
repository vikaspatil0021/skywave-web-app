'use client'

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";

export default function NextProviders({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <ThemeProvider
                defaultTheme="system"
                enableSystem
            >
                <SessionProvider>
                    {children}
                </SessionProvider>
            </ThemeProvider>
        </>
    );
}

