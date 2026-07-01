"use client";

import Link from "next/link";
import type { ReactNode } from "react";

import { withLocale, type Locale } from "@/lib/i18n";
import { CONTACT_PREFILL_STORAGE_KEY } from "@/lib/contact-prefill";

type Props = {
  children: ReactNode;
  className?: string;
  locale: Locale;
  message: string;
};

export function QuoteRequestLink({ children, className, locale, message }: Props) {
  function handleClick() {
    try {
      window.sessionStorage.setItem(CONTACT_PREFILL_STORAGE_KEY, message);
    } catch {
      // Ignore storage access issues and fall back to a plain redirect.
    }
  }

  return (
    <Link className={className} href={`${withLocale(locale)}#contact`} onClick={handleClick}>
      {children}
    </Link>
  );
}
