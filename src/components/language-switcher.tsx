"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import {
  localeFlags,
  localeLabels,
  locales,
  type Locale,
  withLocale,
} from "@/lib/i18n";

type Props = {
  locale: Locale;
};

export function LanguageSwitcher({ locale }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? withLocale(locale);
  const localizedPath = pathname.replace(/^\/(en|uk|ru|pl)(?=\/|$)/, "") || "/";
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium text-[var(--color-muted-foreground)] transition-all hover:bg-[var(--color-panel)] hover:text-[var(--color-foreground)]"
      >
        <span className="text-base leading-none">{localeFlags[locale]}</span>
        <span className="hidden sm:inline">{localeLabels[locale]}</span>
        <svg
          aria-hidden="true"
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open ? (
        <div className="absolute right-0 top-full z-50 mt-1.5 min-w-[170px] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[0_18px_40px_rgba(20,18,16,0.14)]">
          {locales.map((item) => {
            const href = withLocale(item, localizedPath);
            const isActive = item === locale;

            return (
              <Link
                key={item}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "bg-[var(--color-panel)] font-semibold text-[var(--color-foreground)]"
                    : "text-[var(--color-muted-foreground)] hover:bg-[var(--color-panel)] hover:text-[var(--color-foreground)]"
                }`}
              >
                <span className="text-base">{localeFlags[item]}</span>
                <span className="flex-1">{localeLabels[item]}</span>
                {isActive ? (
                  <svg
                    aria-hidden="true"
                    className="h-3.5 w-3.5 text-[var(--color-primary)]"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="m5 12 5 5L20 7" />
                  </svg>
                ) : null}
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
