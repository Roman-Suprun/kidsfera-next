import { NextResponse } from "next/server";
import { startStrapiKeepAlive } from "@/lib/strapi-keep-alive";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    startStrapiKeepAlive();

    return NextResponse.json({
      ok: true,
      message: "Strapi keep-alive is running.",
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to ping Strapi.";

    return NextResponse.json(
      {
        ok: false,
        error: message,
      },
      {
        status: 500,
      },
    );
  }
}
