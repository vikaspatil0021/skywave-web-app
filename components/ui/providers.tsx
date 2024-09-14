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
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
            >
                <SessionProvider>
                    {children}
                </SessionProvider>
            </ThemeProvider>
        </>
    );
}

