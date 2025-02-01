import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Tech Trek",
  description: "Tech career assessment platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.className} bg-gray-50 antialiased`}>
        {children}
      </body>
    </html>
  );
}
