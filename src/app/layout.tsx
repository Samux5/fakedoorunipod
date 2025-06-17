import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Unipod - Revolutioniere dein Studium",
  description: "Alle Vorlesungen aller österreichischen Universitäten als Podcast - dein Study-to-Go Begleiter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
