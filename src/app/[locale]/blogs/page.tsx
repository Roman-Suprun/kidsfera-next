import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { BlogsBrowser } from "@/components/blogs-browser";
import { buildMetadata } from "@/lib/metadata";
import { isLocale, locales, type Locale } from "@/lib/i18n";
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
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const page = await getBlogPage(locale);

  if (!page) {
    return {};
  }

  return buildMetadata(page.seo, {
    title: page.heroEyebrow,
    description: page.heroSubtitle,
    baseUrl: getBaseSiteUrl(),
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
