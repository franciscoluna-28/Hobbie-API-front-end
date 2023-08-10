import { queryClient } from "@/utils/queryClient";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { QueryClientProvider } from "react-query";

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
    <html className="bg-white" lang="en">
      <QueryClientProvider client={queryClient}>
        <body className={inter.className}>{children}</body>
      </QueryClientProvider>
    </html>
  );
}
