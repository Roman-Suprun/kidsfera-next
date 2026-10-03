import { renderRobotsTxt } from "@/lib/sitemap";
import { getSiteOrigin, isPreviewDeployment } from "@/lib/strapi";

export const revalidate = 3600;

export async function GET() {
  const body = isPreviewDeployment()
    ? "User-agent: *\nDisallow: /"
    : renderRobotsTxt(getSiteOrigin());

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
