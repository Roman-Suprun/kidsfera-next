import {
  getSitemapEntries,
  renderSitemapXml,
} from "@/lib/sitemap";
import { getSiteOrigin, isPreviewDeployment } from "@/lib/strapi";

// The list is sourced from the CMS at request time, while the response is
// cached at the CDN using the explicit Cache-Control header below.
export const dynamic = "force-dynamic";

export async function GET() {
  const origin = getSiteOrigin();
  const entries = await getSitemapEntries(origin);
  const body = renderSitemapXml(entries);

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=300",
      ...(isPreviewDeployment() ? { "X-Robots-Tag": "noindex, nofollow" } : {}),
    },
  });
}
