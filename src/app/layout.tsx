import { ClerkProvider } from "@clerk/nextjs";
import { type Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { Toaster } from "react-hot-toast";
import UniversalBar from "@/components/UniversalBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arena",
  description: "Track and compare your financial holdings.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Toaster position="top-center" />
          <UniversalBar>{children}</UniversalBar>
        </body>
      </html>
    </ClerkProvider>
  );
}
