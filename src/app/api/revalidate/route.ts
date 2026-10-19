import { revalidatePath } from "next/cache";
import type { NextRequest } from "next/server";

function isAuthorized(request: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;

  if (!secret) {
    return { authorized: false, configured: false };
  }

  return {
    authorized: request.headers.get("x-revalidate-secret") === secret,
    configured: true,
  };
}

export async function POST(request: NextRequest) {
  const { authorized, configured } = isAuthorized(request);

  if (!configured) {
    return Response.json(
      { revalidated: false, error: "Revalidation is not configured." },
      { status: 503 },
    );
  }

  if (!authorized) {
    return Response.json(
      { revalidated: false, error: "Unauthorized." },
      { status: 401 },
    );
  }

  revalidatePath("/[locale]", "layout");
  revalidatePath("/");
  revalidatePath("/sitemap.xml");

  return Response.json({ revalidated: true });
}
