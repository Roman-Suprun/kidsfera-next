import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getLocaleFromHeader } from "@/lib/i18n";

export default async function IndexPage() {
  const headerStore = await headers();
  const locale = getLocaleFromHeader(headerStore.get("accept-language"));

  redirect(`/${locale}`);
}
