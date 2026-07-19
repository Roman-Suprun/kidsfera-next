"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import {
  localeFlags,
  localeLabels,
  locales,
  stripLocaleFromPath,
  type Locale,
  withLocale,
} from "@/lib/i18n";

type Props = {
  locale: Locale;
  visibleLocales?: readonly Locale[];
};

export function LanguageSwitcher({ locale, visibleLocales = locales }: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname() ?? withLocale(locale);
  const localizedPath = stripLocaleFromPath(pathname);
  const ref = useRef<HTMLDivElement>(null);
  const dropdownLocales = visibleLocales.length ? visibleLocales : locales;
  const switchableLocales = dropdownLocales.filter((item) => item !== locale);

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

      {open && switchableLocales.length ? (
        <div className="absolute right-0 top-full z-50 mt-1.5 min-w-[170px] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white shadow-[0_18px_40px_rgba(20,18,16,0.14)]">
          {switchableLocales.map((item) => {
            const href = withLocale(item, localizedPath);

            return (
              <Link
                key={item}
                href={href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-muted-foreground)] transition-colors hover:bg-[var(--color-panel)] hover:text-[var(--color-foreground)]"
              >
                <span className="text-base">{localeFlags[item]}</span>
                <span className="flex-1">{localeLabels[item]}</span>
              </Link>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
