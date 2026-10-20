import { type NextRequest, NextResponse } from "next/server";

const STRAPI_URL =
  process.env.STRAPI_URL ??
  process.env.NEXT_PUBLIC_STRAPI_URL ??
  "http://localhost:1337";
const MEDIA_CACHE_SECONDS = 2_678_400;

type RouteContext = {
  params: Promise<{
    asset?: string[];
  }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  const { asset = [] } = await context.params;

  if (!asset.length) {
    return new NextResponse("Missing asset path", { status: 400 });
  }

  const upstreamUrl = new URL(`/` + asset.join("/"), STRAPI_URL);

  if (request.nextUrl.search) {
    upstreamUrl.search = request.nextUrl.search;
  }

  const response = await fetch(upstreamUrl.toString(), {
    headers: {
      Accept: request.headers.get("accept") ?? "*/*",
    },
    cache: "force-cache",
    next: { revalidate: MEDIA_CACHE_SECONDS },
  });

  if (!response.ok) {
    return new NextResponse("Strapi media request failed", { status: response.status });
  }

  const headers = new Headers();
  const contentType = response.headers.get("content-type");

  if (contentType) {
    headers.set("content-type", contentType);
  }

  // Media URLs include a Strapi content hash. A replacement therefore gets a
  // new URL, making a long immutable CDN cache safe and inexpensive.
  headers.set(
    "cache-control",
    `public, max-age=${MEDIA_CACHE_SECONDS}, s-maxage=${MEDIA_CACHE_SECONDS}, immutable`,
  );

  return new NextResponse(response.body, {
    status: response.status,
    headers,
  });
}
