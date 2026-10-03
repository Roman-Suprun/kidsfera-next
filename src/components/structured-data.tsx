import type { Locale } from "@/lib/i18n";
import type { SiteSettings } from "@/lib/strapi";

type SchemaValue = Record<string, unknown> | Array<Record<string, unknown>>;

type BreadcrumbItem = {
  name: string;
  path: string;
};

const localeBySchemaLanguage: Record<Locale, string> = {
  en: "en-GB",
  uk: "uk-UA",
  ru: "ru-RU",
  pl: "pl-PL",
};

function absoluteUrl(origin: string, path: string) {
  return new URL(path, `${origin}/`).toString();
}

function serialize(data: SchemaValue) {
  return JSON.stringify(data).replaceAll("<", "\\u003c");
}

export function StructuredData({ data }: { data: SchemaValue }) {
  return (
    <script
      dangerouslySetInnerHTML={{ __html: serialize(data) }}
      type="application/ld+json"
    />
  );
}

export function buildSiteSchemas(settings: SiteSettings, locale: Locale, origin: string) {
  const organizationId = `${origin}/#organization`;
  const socialProfiles = settings.socialLinks
    .map((link) => link.href)
    .filter((href) => /^https?:\/\//i.test(href));

  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": organizationId,
      name: settings.siteName,
      url: origin,
      email: settings.contactEmail,
      telephone: settings.contactPhone,
      ...(settings.contactAddress
        ? {
            address: {
              "@type": "PostalAddress",
              streetAddress: settings.contactAddress,
            },
          }
        : {}),
      ...(socialProfiles.length ? { sameAs: socialProfiles } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${origin}/#website`,
      name: settings.siteName,
      url: origin,
      inLanguage: localeBySchemaLanguage[locale],
      publisher: { "@id": organizationId },
    },
  ];
}

export function buildBreadcrumbSchema(origin: string, items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(origin, item.path),
    })),
  };
}

