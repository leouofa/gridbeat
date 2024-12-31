import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PreferencesProvider } from "@/contexts/PreferencesContext";
import { Menu } from "@/components/Menu";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "BeatGrid - Music Chord Calculator & Shape Visualizer | Free Music Theory Tool",
  description:
    "Learn, visualize, and master musical chords with BeatGrid's interactive chord calculator. Perfect for guitarists, pianists, and music producers. Create, save, and organize chord shapes easily with our free music theory tool.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PreferencesProvider>
          <Menu />
          <main className="pt-14">{children}</main>
        </PreferencesProvider>
      </body>
    </html>
  );
}
