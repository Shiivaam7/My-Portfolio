import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shivam Kumar | AI/ML Engineer Portfolio",
  description:
    "Portfolio of Shivam Kumar — AI/ML Engineer, Data Science Enthusiast, and B.Tech AI & ML Student. Built on SHIKO AI Operating System.",
  keywords: [
    "AI",
    "Machine Learning",
    "Data Science",
    "Portfolio",
    "Shivam Kumar",
    "SHIKO AI",
  ],
  authors: [{ name: "Shivam Kumar" }],
  openGraph: {
    title: "Shivam Kumar | AI/ML Engineer",
    description: "Futuristic AI/ML Engineer Portfolio — SHIKO AI OS",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#050816",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#050816] font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
