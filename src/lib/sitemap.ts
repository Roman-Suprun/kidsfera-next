import type { MetadataRoute } from "next";
import type { NextRequest } from "next/server";

import { defaultLocale, type Locale, withLocale } from "@/lib/i18n";
import {
  getFreshBlogPosts,
  getFreshProducts,
  getFreshProjects,
  getFreshSiteSettings,
  getSiteOrigin,
} from "@/lib/strapi";

type SitemapChangeFrequency = MetadataRoute.Sitemap[number]["changeFrequency"];

export type SitemapEntry = {
  url: string;
  lastModified?: Date;
  changeFrequency?: SitemapChangeFrequency;
  priority?: number;
  alternates?: {
    languages?: Record<string, string>;
  };
};

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

function buildAbsoluteUrl(origin: string, path: string) {
  return new URL(path, `${origin}/`).toString();
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

async function getEnabledLocales(): Promise<Locale[]> {
  const settings = await getFreshSiteSettings(defaultLocale);
  const enabledLocales = settings?.languageSwitcherLocales ?? [defaultLocale];

  return enabledLocales.length ? [...enabledLocales] : [defaultLocale];
}

async function getDynamicEntriesForLocale(locale: Locale): Promise<SitemapEntrySeed[]> {
  const [products, projects, blogPosts] = await Promise.all([
    getFreshProducts(locale),
    getFreshProjects(locale),
    getFreshBlogPosts(locale),
  ]);

  return [
    ...toSitemapEntries("product", "/products", locale, products, "weekly", 0.7),
    ...toSitemapEntries("project", "/projects", locale, projects, "monthly", 0.7),
    ...toSitemapEntries("blog", "/blogs", locale, blogPosts, "monthly", 0.6),
  ];
}

export function getRequestOrigin(request: NextRequest) {
  const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
  const forwardedProto = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();

  if (forwardedHost) {
    const protocol = forwardedProto || request.nextUrl.protocol.replace(/:$/, "") || "https";
    return `${protocol}://${forwardedHost}`;
  }

  const host = request.headers.get("host")?.trim();

  if (host) {
    const protocol = request.nextUrl.protocol.replace(/:$/, "") || "https";
    return `${protocol}://${host}`;
  }

  return request.nextUrl.origin || getSiteOrigin();
}

export async function getSitemapEntries(origin: string): Promise<SitemapEntry[]> {
  const enabledLocales = await getEnabledLocales();
  const staticEntries = enabledLocales.flatMap((locale) =>
    staticRoutes.map((route) => ({
      key: route.key,
      locale,
      path: withLocale(locale, route.path),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
  );
  const dynamicEntries = (
    await Promise.all(enabledLocales.map((locale) => getDynamicEntriesForLocale(locale)))
  ).flat();
  const groupedEntries = new Map<string, SitemapEntrySeed[]>();

  for (const entry of [...staticEntries, ...dynamicEntries]) {
    const siblings = groupedEntries.get(entry.key) ?? [];
    siblings.push(entry);
    groupedEntries.set(entry.key, siblings);
  }

  return [...groupedEntries.values()]
    .flatMap((siblings) =>
      siblings.map((entry) => ({
        url: buildAbsoluteUrl(origin, entry.path),
        lastModified: entry.lastModified ? new Date(entry.lastModified) : undefined,
        changeFrequency: entry.changeFrequency,
        priority: entry.priority,
        alternates: {
          languages: Object.fromEntries(
            siblings.map((sibling) => [sibling.locale, buildAbsoluteUrl(origin, sibling.path)]),
          ),
        },
      })),
    )
    .sort((left, right) => left.url.localeCompare(right.url));
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export function renderSitemapXml(entries: SitemapEntry[]) {
  const body = entries
    .map((entry) => {
      const alternates = Object.entries(entry.alternates?.languages ?? {})
        .map(
          ([locale, href]) =>
            `    <xhtml:link rel="alternate" hreflang="${escapeXml(locale)}" href="${escapeXml(href)}" />`,
        )
        .join("\n");

      return [
        "  <url>",
        `    <loc>${escapeXml(entry.url)}</loc>`,
        entry.lastModified ? `    <lastmod>${entry.lastModified.toISOString()}</lastmod>` : null,
        entry.changeFrequency ? `    <changefreq>${entry.changeFrequency}</changefreq>` : null,
        typeof entry.priority === "number"
          ? `    <priority>${entry.priority.toFixed(1)}</priority>`
          : null,
        alternates || null,
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    body,
    "</urlset>",
  ].join("\n");
}

export function renderRobotsTxt(origin: string) {
  const host = new URL(origin).host;

  return [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${origin}/sitemap.xml`,
    `Host: ${host}`,
  ].join("\n");
}
