"use client"

import type { Metadata } from "next";
import ThemeProvider from "./theme";
import "./globals.css";
import {Providers} from "@/app/GlobalRedux/Provider/Provider";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import React from "react";
import ScrollToTop from "@/app/components/ScrollToTop";
import {BaseOptionChartStyle} from "@/app/components/chart/BaseOptionChart";




export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}){


  return (
    <html lang="en">
      <body>
      <Providers>
          <AppRouterCacheProvider options={{ enableCssLayer: true }}>
      <ThemeProvider>
          <ScrollToTop />
          <BaseOptionChartStyle />
            {children}
      </ThemeProvider>
          </AppRouterCacheProvider>
        </Providers>
      </body>
    </html>
  );
}



