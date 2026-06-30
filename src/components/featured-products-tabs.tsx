"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";
import type { FeaturedProduct } from "@/lib/strapi";

type Props = {
  locale: Locale;
  eyebrow: string;
  title: string;
  items: FeaturedProduct[];
};

const themeMap = {
  orange: {
    section: "bg-[var(--color-primary)] text-white",
    badge: "bg-[var(--color-accent)] text-[var(--color-surface-strong)]",
    button: "bg-white text-[var(--color-surface-strong)]",
  },
  blue: {
    section: "bg-[var(--color-secondary)] text-white",
    badge: "bg-[var(--color-accent)] text-[var(--color-surface-strong)]",
    button: "bg-white text-[var(--color-surface-strong)]",
  },
  charcoal: {
    section: "bg-[var(--color-surface-strong)] text-white",
    badge: "bg-[var(--color-primary)] text-white",
    button: "bg-white text-[var(--color-surface-strong)]",
  },
  yellow: {
    section: "bg-[var(--color-accent)] text-[var(--color-surface-strong)]",
    badge: "bg-[var(--color-secondary)] text-white",
    button: "bg-[var(--color-surface-strong)] text-white",
  },
} as const;

export function FeaturedProductsTabs({ locale, eyebrow, title, items }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items.length) {
    return null;
  }

  const activeItem = items[activeIndex] ?? items[0];
  const styles = themeMap[activeItem.theme];
  const categoryHref = activeItem.linkedCategory?.slug
    ? withLocale(locale, `/catalog?category=${activeItem.linkedCategory.slug}`)
    : withLocale(locale, "/catalog");
  const activeImage = activeItem.image;

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className="mb-10">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)]">
          {eyebrow}
        </p>
        <h2 className="font-display whitespace-pre-line text-4xl font-bold md:text-5xl">
          {title}
        </h2>
      </div>

      <div className="mb-10 flex flex-wrap gap-3">
        {items.map((item, index) => (
          <button
            key={`${item.title}-${index}`}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
              index === activeIndex
                ? "bg-[var(--color-primary)] text-white"
                : "bg-[var(--color-panel)] text-[var(--color-muted-foreground)] hover:bg-[var(--color-panel-strong)] hover:text-[var(--color-foreground)]"
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      <div className="grid overflow-hidden rounded-3xl border border-[var(--color-border)] md:grid-cols-2">
          <div className={`${styles.section} flex min-h-[29rem] flex-col justify-between p-10 md:p-14`}>
            <div>
              <span
                className={`mb-6 inline-block rounded-full px-3 py-1 text-xs font-bold ${styles.badge}`}
              >
                {activeItem.badge}
              </span>
              <h3 className="font-display mb-2 text-3xl font-bold md:text-4xl">
                {activeItem.title}
              </h3>
              <p className="mb-6 text-base font-medium opacity-80">{activeItem.tagline}</p>
              <p className="max-w-sm text-sm leading-relaxed opacity-80">
                {activeItem.description}
              </p>
            </div>

            <Link
              href={categoryHref}
              className={`mt-10 inline-flex w-fit items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold ${styles.button}`}
            >
              {activeItem.ctaLabel}
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative min-h-[18rem] bg-[var(--color-panel)] md:min-h-[29rem]">
            {activeImage ? (
              <Image
                alt={activeImage.alt}
                className="object-cover"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                src={activeImage.url}
              />
            ) : null}
          </div>
      </div>
    </section>
  );
}
