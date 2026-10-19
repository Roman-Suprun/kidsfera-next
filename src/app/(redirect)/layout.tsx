import { browserLanguageFallbackLocale } from "@/lib/i18n";

import "../globals.css";

// `/` immediately redirects to a localized route. It has its own root layout
// so that the localized document root can stay static and locale-specific.
export default function RedirectRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={browserLanguageFallbackLocale}>
      <body>{children}</body>
    </html>
  );
}
