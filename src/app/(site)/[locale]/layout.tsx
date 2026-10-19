import type { Metadata } from "next";
import { Inter, Unbounded } from "next/font/google";
import Script from "next/script";

import { browserLanguageFallbackLocale, isLocale } from "@/lib/i18n";
import { getSiteOrigin, isPreviewDeployment } from "@/lib/strapi";

import "../../globals.css";

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
  robots: isPreviewDeployment() ? { index: false, follow: false } : undefined,
  icons: {
    icon: [
      { url: "/favicon-kidsfera.ico?v=2", sizes: "any" },
      { url: "/icon.svg?v=2", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico?v=2",
  },
};

// Locale comes from the URL, so this document shell can remain statically
// rendered and participate in ISR. Request headers are intentionally not read
// here; browser-language detection belongs exclusively to the `/` redirect.
export const revalidate = 60;
export const dynamicParams = true;

export default async function LocaleDocumentLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const htmlLang = isLocale(locale) ? locale : browserLanguageFallbackLocale;

  return (
    <html
      lang={htmlLang}
      className={`${bodyFont.variable} ${displayFont.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {children}
        {!isPreviewDeployment() ? (
          <Script
            async
            data-key="IKhuTwBriCKgHlX2dgjhhQ"
            id="ahrefs-analytics"
            src="https://analytics.ahrefs.com/analytics.js"
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
