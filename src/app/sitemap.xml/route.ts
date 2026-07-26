import type { NextRequest } from "next/server";

import {
  getRequestOrigin,
  getSitemapEntries,
  renderSitemapXml,
} from "@/lib/sitemap";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  const origin = getRequestOrigin(request);
  const entries = await getSitemapEntries(origin);
  const body = renderSitemapXml(entries);

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
