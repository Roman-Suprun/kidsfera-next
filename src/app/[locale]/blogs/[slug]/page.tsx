import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { CalendarIcon, ChevronLeftIcon, ClockIcon } from "@/components/icons";
import { buildMetadata } from "@/lib/metadata";
import { isLocale, locales, type Locale, withLocale } from "@/lib/i18n";
import {
  getBaseSiteUrl,
  getBlogPage,
  getBlogPostBySlug,
  getBlogPosts,
} from "@/lib/strapi";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
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

export async function generateStaticParams() {
  const params = [];

  for (const locale of locales) {
    const posts = await getBlogPosts(locale);
    params.push(...posts.map((post) => ({ locale, slug: post.slug })));
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const post = await getBlogPostBySlug(locale, slug);

  if (!post) {
    return {};
  }

  return buildMetadata(post.seo, {
    title: post.title,
    description: post.excerpt,
    baseUrl: getBaseSiteUrl(),
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const [page, post, allPosts] = await Promise.all([
    getBlogPage(typedLocale),
    getBlogPostBySlug(typedLocale, slug),
    getBlogPosts(typedLocale),
  ]);

  if (!page || !post) {
    notFound();
  }

  const relatedPosts = allPosts
    .filter(
      (entry) =>
        entry.slug !== post.slug &&
        entry.category?.slug &&
        entry.category.slug === post.category?.slug,
    )
    .slice(0, 3);
  const categoryColor = post.category?.color ?? "#FF4500";
  const hasAuthor = post.authorName.length > 0;
  const hasAuthorRole = post.authorRole.length > 0;

  return (
    <section className="page-offset min-h-screen bg-[var(--color-background)]">
      <div className="relative h-[50vh] overflow-hidden bg-[var(--color-surface-strong)]">
        {post.coverImage ? (
          <img
            alt={post.coverImage.alt}
            className="h-full w-full object-cover opacity-80"
            src={post.coverImage.url}
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <Link
          href={withLocale(typedLocale, "/blogs")}
          className="absolute left-6 top-6 flex items-center gap-2 rounded-xl bg-white/15 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/25"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          {page.backToBlogLabel}
        </Link>

        <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-4xl px-6 pb-10">
          {post.category ? (
            <span
              className="mb-4 inline-block rounded-full px-3 py-1.5 text-xs font-bold text-white"
              style={{ backgroundColor: categoryColor }}
            >
              {post.category.name}
            </span>
          ) : null}
          <h1 className="font-display text-2xl font-bold leading-tight text-white md:text-4xl">
            {post.title}
          </h1>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="mb-10 flex flex-wrap items-center gap-5 border-b border-[var(--color-border)] pb-8">
          {hasAuthor ? (
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
                style={{
                  backgroundColor: `${categoryColor}30`,
                  color: categoryColor,
                }}
              >
                {post.authorName.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold">{post.authorName}</p>
                {hasAuthorRole ? (
                  <p className="text-xs text-[var(--color-muted-foreground)]">
                    {post.authorRole}
                  </p>
                ) : null}
              </div>
            </div>
          ) : null}

          <div
            className={`${hasAuthor ? "ml-auto " : ""}flex flex-wrap items-center gap-4 text-xs text-[var(--color-muted-foreground)]`}
          >
            <span className="inline-flex items-center gap-1.5">
              <CalendarIcon className="h-3.5 w-3.5" />
              {formatBlogDate(typedLocale, post.publishDate)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ClockIcon className="h-3.5 w-3.5" />
              {post.readTimeMinutes} {page.readTimeLabel}
            </span>
          </div>
        </div>

        <p
          className="mb-10 border-l-4 pl-5 text-lg font-medium leading-relaxed text-[var(--color-muted-foreground)]"
          style={{ borderColor: categoryColor }}
        >
          {post.excerpt}
        </p>

        <div className="flex flex-col gap-10">
          {post.bodySections.map((section) => (
            <div key={`${post.slug}-${section.heading}`}>
              <h2 className="font-display mb-4 text-lg font-bold">{section.heading}</h2>
              <p className="text-base leading-relaxed text-[color:rgba(20,18,16,0.8)]">
                {section.text}
              </p>
            </div>
          ))}
        </div>

        {hasAuthor ? (
          <div className="mt-16 flex items-start gap-5 rounded-[2rem] bg-[var(--color-panel)] p-8">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-xl font-bold text-white"
              style={{ backgroundColor: categoryColor }}
            >
              {post.authorName.charAt(0)}
            </div>
            <div>
              <p className="mb-1 text-xs uppercase tracking-widest text-[var(--color-muted-foreground)]">
                {page.authorLabel}
              </p>
              <p className="font-bold">{post.authorName}</p>
              {hasAuthorRole ? (
                <p className="text-sm text-[var(--color-muted-foreground)]">{post.authorRole}</p>
              ) : null}
            </div>
          </div>
        ) : null}

        {relatedPosts.length ? (
          <div className="mt-16">
            <h2 className="font-display mb-7 text-xl font-bold">{page.relatedArticlesTitle}</h2>
            <div className="grid gap-5 sm:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={withLocale(typedLocale, `/blogs/${relatedPost.slug}`)}
                  className="group overflow-hidden rounded-[1.5rem] border border-[var(--color-border)] bg-white transition-all hover:border-[color:rgba(255,69,0,0.2)] hover:shadow-md"
                >
                  <div className="relative aspect-video overflow-hidden bg-[var(--color-panel)]">
                    {relatedPost.coverImage ? (
                      <img
                        alt={relatedPost.coverImage.alt}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        src={relatedPost.coverImage.url}
                      />
                    ) : null}
                  </div>
                  <div className="p-4">
                    <p className="font-display text-xs font-bold leading-snug transition-colors group-hover:text-[var(--color-primary)]">
                      {relatedPost.title}
                    </p>
                    <p className="mt-2 text-xs text-[var(--color-muted-foreground)]">
                      {relatedPost.readTimeMinutes} {page.minutesShortLabel}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        <div className="mt-12 text-center">
          <Link
            href={withLocale(typedLocale, "/blogs")}
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-7 py-3.5 font-semibold text-white transition-colors hover:bg-[#e03d00]"
          >
            <ChevronLeftIcon className="h-4 w-4" />
            {page.backToBlogLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
