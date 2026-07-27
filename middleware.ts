import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { browserLanguageFallbackLocale, isLocale } from "@/lib/i18n";

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const [, localeSegment] = request.nextUrl.pathname.split("/");
  const locale = isLocale(localeSegment) ? localeSegment : browserLanguageFallbackLocale;

  requestHeaders.set("x-kidsfera-locale", locale);
  requestHeaders.set("x-kidsfera-pathname", request.nextUrl.pathname);
  requestHeaders.set("x-kidsfera-search", request.nextUrl.search);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
