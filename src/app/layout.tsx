import type { Metadata } from "next";
import { Inter, Unbounded } from "next/font/google";

import "./globals.css";

const bodyFont = Inter({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  display: "swap",
  variable: "--font-body",
});

const displayFont = Unbounded({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext"],
  display: "swap",
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Kidsfera",
  description: "Multilingual kids attraction storefront powered by Strapi.",
  icons: {
    icon: [
      { url: "/favicon-kidsfera.ico?v=2", sizes: "any" },
      { url: "/icon.svg?v=2", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${displayFont.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
