import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ChallengeProvider } from '../context/ChallengeContext';
import { Toaster } from '@/components/ui/toaster';

const geistSans = Geist({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "MAXX Potential Tech Assessment",
  description: "Interactive platform to assess tech aptitude",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geistSans.className}>
        <ChallengeProvider>
          <main>{children}</main>
          <Toaster />
        </ChallengeProvider>
      </body>
    </html>
  );
}