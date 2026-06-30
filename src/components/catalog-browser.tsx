"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";
import type { CatalogPage, Category, Product } from "@/lib/strapi";

type Props = {
  locale: Locale;
  page: CatalogPage;
  categories: Category[];
  products: Product[];
  initialCategory?: string | null;
};

const ageGroups = [
  { id: "all", min: null, max: null },
  { id: "1-4", min: 1, max: 4 },
  { id: "4-8", min: 4, max: 8 },
  { id: "8-16", min: 8, max: 16 },
] as const;

function parseAgeRange(input: string) {
  const clean = input.replace(/[^0-9-–]/g, "");
  const [min, max] = clean.split(/[-–]/).map((value) => Number(value));

  if (Number.isNaN(min) || Number.isNaN(max)) {
    return null;
  }

  return { min, max };
}

export function CatalogBrowser({
  locale,
  page,
  categories,
  products,
  initialCategory,
}: Props) {
  const [categoryFilter, setCategoryFilter] = useState<string | null>(initialCategory ?? null);
  const [ageFilter, setAgeFilter] = useState<(typeof ageGroups)[number]["id"]>("all");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      if (categoryFilter && product.category?.slug !== categoryFilter) {
        return false;
      }

      if (ageFilter !== "all") {
        const selectedRange = ageGroups.find((item) => item.id === ageFilter);
        const parsed = parseAgeRange(product.ageRange);

        if (!selectedRange || !parsed || selectedRange.min === null || selectedRange.max === null) {
          return false;
        }

        if (parsed.max < selectedRange.min || parsed.min > selectedRange.max) {
          return false;
        }
      }

      return true;
    });
  }, [ageFilter, categoryFilter, products]);

  return (
    <div className="flex gap-8">
      <aside className="hidden w-56 shrink-0 md:block">
        <div className="sticky top-24">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[var(--color-muted-foreground)]">
            {page.categoryLabel}
          </p>
          <div className="mb-8 flex flex-col gap-1">
            <button
              className={`rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                categoryFilter === null
                  ? "bg-[var(--color-primary)] font-semibold text-white"
                  : "text-[var(--color-muted-foreground)] hover:bg-[var(--color-panel)] hover:text-[var(--color-foreground)]"
              }`}
              onClick={() => setCategoryFilter(null)}
              type="button"
            >
              {page.allLabel}
            </button>
            {categories.map((category) => (
              <button
                key={category.slug}
                className={`rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                  categoryFilter === category.slug
                    ? "font-semibold"
                    : "text-[var(--color-muted-foreground)] hover:bg-[var(--color-panel)] hover:text-[var(--color-foreground)]"
                }`}
                onClick={() => setCategoryFilter(category.slug)}
                style={
                  categoryFilter === category.slug
                    ? {
                        backgroundColor: `${category.themeColor}22`,
                        color: category.themeColor,
                      }
                    : undefined
                }
                type="button"
              >
                {category.name}
              </button>
            ))}
          </div>

          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[var(--color-muted-foreground)]">
            {page.ageRangeLabel}
          </p>
          <div className="flex flex-col gap-1">
            {ageGroups.map((group) => (
              <button
                key={group.id}
                className={`rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                  ageFilter === group.id
                    ? "bg-[var(--color-primary)] font-semibold text-white"
                    : "text-[var(--color-muted-foreground)] hover:bg-[var(--color-panel)] hover:text-[var(--color-foreground)]"
                }`}
                onClick={() => setAgeFilter(group.id)}
                type="button"
              >
                {group.id === "all" ? page.allLabel : `${group.id} yrs`}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="mb-6 md:hidden">
          <button
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-panel)] px-4 py-2.5 text-sm font-medium"
            onClick={() => setShowFilters((value) => !value)}
            type="button"
          >
            {page.filtersLabel}
          </button>
          {showFilters ? (
            <div className="mt-4 grid grid-cols-2 gap-6 rounded-2xl border border-[var(--color-border)] bg-white p-4">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-wide text-[var(--color-muted-foreground)]">
                  {page.categoryLabel}
                </p>
                <div className="flex flex-col gap-1">
                  <button
                    className={`rounded-lg px-2 py-1.5 text-left text-xs ${
                      categoryFilter === null
                        ? "bg-[var(--color-primary)] font-bold text-white"
                        : "text-[var(--color-muted-foreground)]"
                    }`}
                    onClick={() => setCategoryFilter(null)}
                    type="button"
                  >
                    {page.allLabel}
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.slug}
                      className={`rounded-lg px-2 py-1.5 text-left text-xs ${
                        categoryFilter === category.slug
                          ? "font-bold"
                          : "text-[var(--color-muted-foreground)]"
                      }`}
                      onClick={() => setCategoryFilter(category.slug)}
                      style={
                        categoryFilter === category.slug
                          ? {
                              color: category.themeColor,
                            }
                          : undefined
                      }
                      type="button"
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-wide text-[var(--color-muted-foreground)]">
                  {page.ageRangeLabel}
                </p>
                <div className="flex flex-col gap-1">
                  {ageGroups.map((group) => (
                    <button
                      key={group.id}
                      className={`rounded-lg px-2 py-1.5 text-left text-xs ${
                        ageFilter === group.id
                          ? "bg-[var(--color-primary)] font-bold text-white"
                          : "text-[var(--color-muted-foreground)]"
                      }`}
                      onClick={() => setAgeFilter(group.id)}
                      type="button"
                    >
                      {group.id === "all" ? page.allLabel : `${group.id} yrs`}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="text-sm text-[var(--color-muted-foreground)]">
            {filteredProducts.length} {page.itemsLabel}
          </p>
        </div>

        {filteredProducts.length ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <article
                key={product.slug}
                className="overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white text-left transition-all hover:border-[color:rgba(255,69,0,0.3)] hover:shadow-lg"
              >
                <div className="relative aspect-[4/3] bg-[var(--color-panel)]">
                  {product.gallery[0] ? (
                    <Image
                      alt={product.gallery[0].alt}
                      className="object-cover"
                      fill
                      sizes="(min-width: 1280px) 20vw, (min-width: 640px) 50vw, 100vw"
                      src={product.gallery[0].url}
                    />
                  ) : null}
                </div>
                <div className="p-5">
                  {product.category ? (
                    <span
                      className="inline-flex rounded-full px-3 py-1 text-[10px] font-bold text-white"
                      style={{ backgroundColor: product.category.themeColor }}
                    >
                      {product.category.name}
                    </span>
                  ) : null}
                  <h3
                    className="font-display mb-1 mt-4 text-base font-bold"
                    style={{ fontSize: "0.85rem" }}
                  >
                    {product.name}
                  </h3>
                  <p className="mb-3 text-xs text-[var(--color-muted-foreground)]">
                    Ages {product.ageRange}
                  </p>
                  <div className="mt-5 flex items-center justify-between gap-4">
                    <span className="text-sm font-bold text-[var(--color-primary)]">
                      {product.priceLabel}
                    </span>
                    <Link
                      className="inline-flex items-center gap-1 text-xs text-[var(--color-muted-foreground)] transition-all hover:gap-2 hover:text-[var(--color-primary)]"
                      href={withLocale(locale, `/products/${product.slug}`)}
                    >
                      {page.viewDetailsLabel}
                      <ArrowRightIcon className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="py-24 text-center text-[var(--color-muted-foreground)]">
            {page.noResultsLabel}
          </div>
        )}
      </div>
    </div>
  );
}
