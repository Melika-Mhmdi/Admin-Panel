import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Providers} from "@/app/GlobalRedux/Provider/Provider";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import LogoOnlyLayout from './layouts/LogoOnlyLayout'
import React from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <Providers>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
            <LogoOnlyLayout>
            {children}
            </LogoOnlyLayout>
          </AppRouterCacheProvider>
        </Providers>
      </body>
    </html>
  );
}
