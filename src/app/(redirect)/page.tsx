import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getLocaleFromHeader } from "@/lib/i18n";
import {
  getFreshEnabledLocales,
  getPreferredLocale,
} from "@/lib/locale-routing";

export default async function IndexPage() {
  const headerStore = await headers();
  const enabledLocales = await getFreshEnabledLocales();
  const locale = getLocaleFromHeader(
    headerStore.get("accept-language"),
    enabledLocales,
    getPreferredLocale(enabledLocales),
  );

  redirect(`/${locale}`);
}
