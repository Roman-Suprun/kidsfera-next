import type { Metadata } from "next";
import { headers } from "next/headers";
import { Inter, Unbounded } from "next/font/google";

import { browserLanguageFallbackLocale, isLocale } from "@/lib/i18n";
import { getSiteOrigin } from "@/lib/strapi";

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
  metadataBase: new URL(getSiteOrigin()),
  icons: {
    icon: [
      { url: "/favicon-kidsfera.ico?v=2", sizes: "any" },
      { url: "/icon.svg?v=2", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico?v=2",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerStore = await headers();
  const localeHeader = headerStore.get("x-kidsfera-locale");
  const htmlLang =
    localeHeader && isLocale(localeHeader) ? localeHeader : browserLanguageFallbackLocale;

  return (
    <html
      lang={htmlLang}
      className={`${bodyFont.variable} ${displayFont.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
