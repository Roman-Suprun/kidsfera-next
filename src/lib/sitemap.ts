import type { MetadataRoute } from "next";

import { locales, type Locale, withLocale } from "@/lib/i18n";
import {
  getBlogPosts,
  getProducts,
  getProjects,
  getSiteOrigin,
} from "@/lib/strapi";

type SitemapChangeFrequency = MetadataRoute.Sitemap[number]["changeFrequency"];

type SitemapEntrySeed = {
  key: string;
  locale: Locale;
  path: string;
  changeFrequency: SitemapChangeFrequency;
  priority: number;
  lastModified?: string | null;
};

type DynamicSitemapEntity = {
  documentId?: string;
  slug: string;
  updatedAt?: string | null;
};

const staticRoutes: Array<{
  key: string;
  path: string;
  changeFrequency: SitemapChangeFrequency;
  priority: number;
}> = [
  {
    key: "home",
    path: "",
    changeFrequency: "daily",
    priority: 1,
  },
  {
    key: "about",
    path: "/about",
    changeFrequency: "monthly",
    priority: 0.8,
  },
  {
    key: "categories",
    path: "/categories",
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    key: "catalog",
    path: "/catalog",
    changeFrequency: "weekly",
    priority: 0.9,
  },
  {
    key: "projects",
    path: "/projects",
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    key: "blogs",
    path: "/blogs",
    changeFrequency: "weekly",
    priority: 0.8,
  },
  {
    key: "delivery-payment",
    path: "/delivery-payment",
    changeFrequency: "monthly",
    priority: 0.5,
  },
  {
    key: "privacy-policy",
    path: "/privacy-policy",
    changeFrequency: "yearly",
    priority: 0.3,
  },
  {
    key: "gdpr",
    path: "/gdpr",
    changeFrequency: "yearly",
    priority: 0.3,
  },
];

function buildAbsoluteUrl(path: string) {
  return new URL(path, `${getSiteOrigin()}/`).toString();
}

function toSitemapEntries(
  collectionKey: string,
  routePrefix: string,
  locale: Locale,
  entities: DynamicSitemapEntity[],
  changeFrequency: SitemapChangeFrequency,
  priority: number,
) {
  return entities.map((entity) => ({
    key: `${collectionKey}:${entity.documentId ?? `${locale}:${entity.slug}`}`,
    locale,
    path: withLocale(locale, `${routePrefix}/${entity.slug}`),
    changeFrequency,
    priority,
    lastModified: entity.updatedAt,
  }));
}

async function getDynamicEntriesForLocale(locale: Locale): Promise<SitemapEntrySeed[]> {
  const [products, projects, blogPosts] = await Promise.all([
    getProducts(locale),
    getProjects(locale),
    getBlogPosts(locale),
  ]);

  return [
    ...toSitemapEntries("product", "/products", locale, products, "weekly", 0.7),
    ...toSitemapEntries("project", "/projects", locale, projects, "monthly", 0.7),
    ...toSitemapEntries("blog", "/blogs", locale, blogPosts, "monthly", 0.6),
  ];
}

export async function getSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  const staticEntries = locales.flatMap((locale) =>
    staticRoutes.map((route) => ({
      key: route.key,
      locale,
      path: withLocale(locale, route.path),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
  );
  const dynamicEntries = (await Promise.all(locales.map((locale) => getDynamicEntriesForLocale(locale)))).flat();
  const groupedEntries = new Map<string, SitemapEntrySeed[]>();

  for (const entry of [...staticEntries, ...dynamicEntries]) {
    const siblings = groupedEntries.get(entry.key) ?? [];
    siblings.push(entry);
    groupedEntries.set(entry.key, siblings);
  }

  return [...groupedEntries.values()]
    .flatMap((siblings) =>
      siblings.map((entry) => ({
        url: buildAbsoluteUrl(entry.path),
        lastModified: entry.lastModified ? new Date(entry.lastModified) : undefined,
        changeFrequency: entry.changeFrequency,
        priority: entry.priority,
        alternates: {
          languages: Object.fromEntries(
            siblings.map((sibling) => [sibling.locale, buildAbsoluteUrl(sibling.path)]),
          ),
        },
      })),
    )
    .sort((left, right) => left.url.localeCompare(right.url));
}
