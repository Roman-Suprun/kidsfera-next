import {
  getSitemapEntries,
  renderSitemapXml,
} from "@/lib/sitemap";
import { getSiteOrigin, isPreviewDeployment } from "@/lib/strapi";

// Keep the sitemap in the same ISR model as public pages. A Strapi webhook
// invalidates this route immediately; otherwise it refreshes at most every
// minute when requested.
export const revalidate = 60;

export async function GET() {
  const origin = getSiteOrigin();
  const entries = await getSitemapEntries(origin);
  const body = renderSitemapXml(entries);

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=60, stale-while-revalidate=60",
      ...(isPreviewDeployment() ? { "X-Robots-Tag": "noindex, nofollow" } : {}),
    },
  });
}
