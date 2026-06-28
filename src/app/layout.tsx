import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Kidsfera",
  description: "Multilingual kids attraction storefront powered by Strapi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
