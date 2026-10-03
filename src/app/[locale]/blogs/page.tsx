import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { BlogsBrowser } from "@/components/blogs-browser";
import { getEnabledLocaleStaticParams } from "@/lib/locale-routing";
import { buildMetadata } from "@/lib/metadata";
import { isLocale, type Locale, withLocale } from "@/lib/i18n";
import {
  getBaseSiteUrl,
  getBlogCategories,
  getBlogPage,
  getBlogPosts,
} from "@/lib/strapi";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return getEnabledLocaleStaticParams();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const [page, posts] = await Promise.all([getBlogPage(locale), getBlogPosts(locale)]);

  if (!page) {
    return {};
  }

  return buildMetadata(page.seo, {
    title: page.heroEyebrow,
    description: page.heroSubtitle,
    baseUrl: getBaseSiteUrl(),
    canonicalPath: withLocale(locale, "/blogs"),
    imageUrl: posts.find((post) => post.featured)?.coverImage?.url ?? posts[0]?.coverImage?.url,
  });
}

export default async function BlogsPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const [page, categories, posts] = await Promise.all([
    getBlogPage(typedLocale),
    getBlogCategories(typedLocale),
    getBlogPosts(typedLocale),
  ]);

  if (!page) {
    notFound();
  }

  return (
    <BlogsBrowser
      locale={typedLocale}
      page={page}
      categories={categories}
      posts={posts}
    />
  );
}
