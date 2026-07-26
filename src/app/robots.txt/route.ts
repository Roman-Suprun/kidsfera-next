import type { NextRequest } from "next/server";

import { getRequestOrigin, renderRobotsTxt } from "@/lib/sitemap";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  const origin = getRequestOrigin(request);
  const body = renderRobotsTxt(origin);

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
