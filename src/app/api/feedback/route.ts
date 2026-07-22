import { NextResponse } from "next/server";

import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";
import type { FeedbackTargetType } from "@/lib/strapi";

const STRAPI_URL =
  process.env.STRAPI_URL ??
  process.env.NEXT_PUBLIC_STRAPI_URL ??
  "http://localhost:1337";
const MAX_NAME_LENGTH = 80;
const MAX_CONTENT_LENGTH = 4000;

type FeedbackPayload = {
  locale?: string;
  targetType?: FeedbackTargetType;
  targetSlug?: string;
  rating?: number;
  name?: string;
  content?: string;
  website?: string;
};

function trimValue(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function getLocale(value: unknown): Locale {
  return typeof value === "string" && isLocale(value) ? value : defaultLocale;
}

function getRating(value: unknown) {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return null;
  }

  const rounded = Math.round(value);

  return rounded >= 1 && rounded <= 5 ? rounded : null;
}

function getApiCollection(targetType: FeedbackTargetType) {
  return targetType === "product" ? "products" : "projects";
}

function getRelationField(targetType: FeedbackTargetType) {
  return targetType === "product" ? "product" : "project";
}

function normalizeEntityDocumentId(entry: unknown) {
  if (!entry || typeof entry !== "object") {
    return null;
  }

  const record = entry as Record<string, unknown>;

  if (typeof record.documentId === "string" && record.documentId.length > 0) {
    return record.documentId;
  }

  const attributes = record.attributes;

  if (
    attributes &&
    typeof attributes === "object" &&
    typeof (attributes as Record<string, unknown>).documentId === "string"
  ) {
    return (attributes as Record<string, string>).documentId;
  }

  return null;
}

async function findTargetDocumentId(
  targetType: FeedbackTargetType,
  targetSlug: string,
  locale: Locale,
) {
  const query = new URLSearchParams();

  query.set("locale", locale);
  query.set("filters[slug][$eq]", targetSlug);
  query.set("fields[0]", "documentId");

  const response = await fetch(`${STRAPI_URL}/api/${getApiCollection(targetType)}?${query.toString()}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to look up ${targetType}: ${response.status}`);
  }

  const payload = (await response.json()) as { data?: unknown[] };
  const [entry] = payload.data ?? [];

  return normalizeEntityDocumentId(entry);
}

export async function POST(request: Request) {
  let payload: FeedbackPayload;

  try {
    payload = (await request.json()) as FeedbackPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const locale = getLocale(payload.locale);
  const targetType = payload.targetType;
  const targetSlug = trimValue(payload.targetSlug);
  const rating = getRating(payload.rating);
  const name = trimValue(payload.name);
  const content = trimValue(payload.content);
  const website = trimValue(payload.website);

  if (website) {
    return NextResponse.json({ ok: true });
  }

  if (targetType !== "product" && targetType !== "project") {
    return NextResponse.json({ error: "Invalid feedback target." }, { status: 400 });
  }

  if (targetSlug.length === 0) {
    return NextResponse.json({ error: "Missing feedback target." }, { status: 400 });
  }

  if (rating === null) {
    return NextResponse.json({ error: "Rating must be between 1 and 5." }, { status: 400 });
  }

  if (name.length < 2 || name.length > MAX_NAME_LENGTH) {
    return NextResponse.json({ error: "Name must be between 2 and 80 characters." }, { status: 400 });
  }

  if (content.length < 10 || content.length > MAX_CONTENT_LENGTH) {
    return NextResponse.json(
      { error: "Feedback must be between 10 and 4000 characters." },
      { status: 400 },
    );
  }

  try {
    const documentId = await findTargetDocumentId(targetType, targetSlug, locale);

    if (!documentId) {
      return NextResponse.json({ error: "Feedback target not found." }, { status: 404 });
    }

    const relationField = getRelationField(targetType);
    const response = await fetch(`${STRAPI_URL}/api/feedbacks?status=draft`, {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          rating,
          name,
          content,
          [relationField]: {
            documentId,
          },
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Feedback create failed: ${response.status}`);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Feedback submission failed", error);

    return NextResponse.json(
      { error: "Unable to submit feedback right now." },
      { status: 500 },
    );
  }
}
