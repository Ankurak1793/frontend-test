"use client";

import type { PropsWithChildren } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const queryClient = new QueryClient();

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en" className={`${inter.className}`}>
        <body>{children}</body>
      </html>
    </QueryClientProvider>
  );
}
