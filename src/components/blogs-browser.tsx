"use client";

import { useState } from "react";
import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";
import { type Locale, withLocale } from "@/lib/i18n";
import type { BlogCategory, BlogPage, BlogPost } from "@/lib/strapi";

type Props = {
  locale: Locale;
  page: BlogPage;
  categories: BlogCategory[];
  posts: BlogPost[];
};

const dateLocales: Record<Locale, string> = {
  en: "en-GB",
  uk: "uk-UA",
  ru: "ru-RU",
  pl: "pl-PL",
};

function formatBlogDate(locale: Locale, isoDate: string) {
  return new Intl.DateTimeFormat(dateLocales[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(isoDate));
}

export function BlogsBrowser({ locale, page, categories, posts }: Props) {
  const [activeCategorySlug, setActiveCategorySlug] = useState<string | null>(null);
  const filteredPosts = activeCategorySlug
    ? posts.filter((post) => post.category?.slug === activeCategorySlug)
    : posts;
  const featuredPost =
    filteredPosts.find((post) => post.featured) ?? filteredPosts[0] ?? null;
  const remainingPosts = featuredPost
    ? filteredPosts.filter((post) => post.slug !== featuredPost.slug)
    : [];
  const featuredHasAuthor = featuredPost?.authorName.length ? true : false;
  const featuredHasAuthorRole = featuredPost?.authorRole.length ? true : false;

  function getCategory(slug: string | null | undefined) {
    return categories.find((category) => category.slug === slug) ?? null;
  }

  return (
    <section className="page-offset min-h-screen bg-[var(--color-background)]">
      <div className="relative overflow-hidden bg-[var(--color-surface-strong)] px-6 py-20 md:py-28">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[31.25rem] w-[31.25rem] rounded-full bg-[color:rgba(255,69,0,0.06)] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-[color:rgba(0,85,255,0.06)] blur-3xl" />

        <div className="relative mx-auto max-w-4xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)]">
            {page.heroEyebrow}
          </p>
          <h1 className="font-display mb-5 whitespace-pre-line text-4xl font-bold leading-tight text-white md:text-6xl">
            {page.heroTitle}
          </h1>
          <div className="mb-5 h-1 w-12 rounded-full bg-[var(--color-primary)]" />
          <p className="max-w-xl text-lg leading-relaxed text-white/50">{page.heroSubtitle}</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="mb-12 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveCategorySlug(null)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              !activeCategorySlug
                ? "bg-[var(--color-primary)] text-white"
                : "bg-[var(--color-panel)] text-[var(--color-muted-foreground)] hover:bg-[var(--color-panel-strong)]"
            }`}
          >
            {page.allCategoriesLabel}
          </button>

          {categories.map((category) => (
            <button
              key={category.slug}
              type="button"
              onClick={() =>
                setActiveCategorySlug((current) =>
                  current === category.slug ? null : category.slug,
                )
              }
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                activeCategorySlug === category.slug
                  ? "text-white"
                  : "bg-[var(--color-panel)] text-[var(--color-muted-foreground)] hover:bg-[var(--color-panel-strong)]"
              }`}
              style={
                activeCategorySlug === category.slug
                  ? { backgroundColor: category.color }
                  : undefined
              }
            >
              {category.name}
            </button>
          ))}
        </div>

        {featuredPost ? (
          <Link
            href={withLocale(locale, `/blogs/${featuredPost.slug}`)}
            className="group mb-12 grid overflow-hidden rounded-[2rem] border border-[var(--color-border)] transition-all hover:border-[color:rgba(255,69,0,0.2)] hover:shadow-xl md:grid-cols-2"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-panel)] md:aspect-auto">
              {featuredPost.coverImage ? (
                <img
                  alt={featuredPost.coverImage.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  src={featuredPost.coverImage.url}
                />
              ) : null}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              {featuredPost.category ? (
                <span
                  className="absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-bold text-white"
                  style={{ backgroundColor: featuredPost.category.color }}
                >
                  {featuredPost.category.name}
                </span>
              ) : null}
            </div>

            <div className="flex flex-col justify-between bg-white p-8 md:p-10">
              <div>
                <div className="mb-5 flex items-center gap-3 text-xs text-[var(--color-muted-foreground)]">
                  <span>{formatBlogDate(locale, featuredPost.publishDate)}</span>
                  <span>·</span>
                  <span>
                    {featuredPost.readTimeMinutes} {page.minutesShortLabel}
                  </span>
                </div>
                <h2 className="font-display mb-4 text-xl font-bold leading-snug transition-colors group-hover:text-[var(--color-primary)] md:text-2xl">
                  {featuredPost.title}
                </h2>
                <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                  {featuredPost.excerpt}
                </p>
              </div>

              <div
                className={`mt-8 flex items-center gap-4 ${
                  featuredHasAuthor ? "justify-between" : "justify-end"
                }`}
              >
                {featuredHasAuthor ? (
                  <div>
                    <p className="text-xs font-semibold">{featuredPost.authorName}</p>
                    {featuredHasAuthorRole ? (
                      <p className="text-xs text-[var(--color-muted-foreground)]">
                        {featuredPost.authorRole}
                      </p>
                    ) : null}
                  </div>
                ) : null}
                <span className="flex items-center gap-1 text-xs font-semibold text-[var(--color-primary)] transition-all group-hover:gap-2">
                  {page.readMoreLabel}
                  <ArrowRightIcon className="h-3 w-3" />
                </span>
              </div>
            </div>
          </Link>
        ) : null}

        {remainingPosts.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {remainingPosts.map((post) => {
              const category = getCategory(post.category?.slug);
              const hasAuthor = post.authorName.length > 0;

              return (
                <Link
                  key={post.slug}
                  href={withLocale(locale, `/blogs/${post.slug}`)}
                  className="group flex flex-col overflow-hidden rounded-[2rem] border border-[var(--color-border)] bg-white text-left transition-all hover:border-[color:rgba(255,69,0,0.2)] hover:shadow-lg"
                >
                  <div className="relative aspect-[16/9] shrink-0 overflow-hidden bg-[var(--color-panel)]">
                    {post.coverImage ? (
                      <img
                        alt={post.coverImage.alt}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        src={post.coverImage.url}
                      />
                    ) : null}
                    {category ? (
                      <span
                        className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold text-white"
                        style={{ backgroundColor: category.color }}
                      >
                        {category.name}
                      </span>
                    ) : null}
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex items-center gap-2 text-xs text-[var(--color-muted-foreground)]">
                      <span>{formatBlogDate(locale, post.publishDate)}</span>
                      <span>·</span>
                      <span>
                        {post.readTimeMinutes} {page.minutesShortLabel}
                      </span>
                    </div>
                    <h3 className="font-display mb-3 text-sm font-bold leading-snug transition-colors group-hover:text-[var(--color-primary)]">
                      {post.title}
                    </h3>
                    <p className="line-clamp-3 flex-1 text-xs leading-relaxed text-[var(--color-muted-foreground)]">
                      {post.excerpt}
                    </p>
                    <div
                      className={`mt-5 flex items-center gap-4 border-t border-[var(--color-border)] pt-4 ${
                        hasAuthor ? "justify-between" : "justify-end"
                      }`}
                    >
                      {hasAuthor ? (
                        <p className="text-xs text-[var(--color-muted-foreground)]">
                          {post.authorName}
                        </p>
                      ) : null}
                      <span className="flex items-center gap-1 text-xs font-semibold text-[var(--color-primary)] transition-all group-hover:gap-2">
                        {page.readMoreLabel}
                        <ArrowRightIcon className="h-2.5 w-2.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : null}

        {!filteredPosts.length ? (
          <div className="py-24 text-center text-[var(--color-muted-foreground)]">
            {page.emptyStateText}
          </div>
        ) : null}
      </div>
    </section>
  );
}
