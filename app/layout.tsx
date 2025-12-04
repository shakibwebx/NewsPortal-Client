import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Channel D.O - সর্বশেষ বাংলাদেশ ও আন্তর্জাতিক সংবাদ",
  description: "Channel D.O - বাংলাদেশের শীর্ষস্থানীয় অনলাইন সংবাদপত্র। জাতীয়, আন্তর্জাতিক, রাজনীতি, ব্যবসা, খেলাধুলা, বিনোদন এবং আরও অনেক বিষয়ে সর্বশেষ ও নির্ভরযোগ্য সংবাদ পড়ুন।",
  keywords: ["Channel D.O", "চ্যানেল ডি ও", "বাংলা নিউজ", "বাংলাদেশ সংবাদ", "সর্বশেষ খবর", "জাতীয় সংবাদ", "আন্তর্জাতিক সংবাদ", "রাজনীতি", "ব্যবসা", "খেলাধুলা"],
  authors: [{ name: "Channel D.O" }],
  creator: "Channel D.O",
  publisher: "Channel D.O",
  icons: {
    icon: '/fav.webp',
    shortcut: '/fav.webp',
    apple: '/fav.webp',
  },
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: "https://www.channeldonews.com",
    title: "Channel D.O - সর্বশেষ বাংলাদেশ ও আন্তর্জাতিক সংবাদ",
    description: "Channel D.O - বাংলাদেশের শীর্ষস্থানীয় অনলাইন সংবাদপত্র",
    siteName: "Channel D.O",
    images: ['/fav.webp'],
  },
  twitter: {
    card: "summary_large_image",
    title: "Channel D.O",
    description: "বাংলাদেশের শীর্ষস্থানীয় অনলাইন সংবাদপত্র",
    images: ['/fav.webp'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
