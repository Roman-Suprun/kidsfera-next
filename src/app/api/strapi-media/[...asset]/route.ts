import { type NextRequest, NextResponse } from "next/server";

const STRAPI_URL =
  process.env.STRAPI_URL ??
  process.env.NEXT_PUBLIC_STRAPI_URL ??
  "http://localhost:1337";

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
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    return new NextResponse("Strapi media request failed", { status: response.status });
  }

  const headers = new Headers();
  const contentType = response.headers.get("content-type");
  const cacheControl = response.headers.get("cache-control");

  if (contentType) {
    headers.set("content-type", contentType);
  }

  headers.set("cache-control", cacheControl ?? "public, max-age=3600, s-maxage=3600");

  return new NextResponse(response.body, {
    status: response.status,
    headers,
  });
}
