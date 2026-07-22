"use client";

import Link from "next/link";
import { useState } from "react";

import { ArrowRightIcon } from "@/components/icons";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";
import type { DeliveryPaymentPage } from "@/lib/strapi";

type Props = {
  locale: Locale;
  page: DeliveryPaymentPage;
};

function localizeHref(locale: Locale, href: string) {
  if (/^(https?:|mailto:|tel:)/i.test(href)) {
    return href;
  }

  return withLocale(locale, href);
}

export function DeliveryPaymentTermsPage({ locale, page }: Props) {
  const [activeTab, setActiveTab] = useState<"local" | "international">("local");

  return (
    <div className="page-offset min-h-screen bg-[var(--color-background)]">
      <section className="relative overflow-hidden bg-[var(--color-surface-strong)] px-6 py-20 md:py-28">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[color:rgba(255,69,0,0.08)] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-[color:rgba(0,85,255,0.08)] blur-3xl" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)]">
            {page.heroEyebrow}
          </p>
          <h1 className="font-display mb-5 whitespace-pre-line text-3xl font-bold leading-tight text-white md:text-5xl">
            {page.title}
          </h1>
          <div className="mx-auto mb-5 h-1 w-12 rounded-full bg-[var(--color-primary)]" />
          <p className="mx-auto max-w-xl text-base leading-relaxed text-white/50 md:text-lg">
            {page.subtitle}
          </p>
        </div>
      </section>

      <section className="bg-[var(--color-accent)] px-6 py-5">
        <div className="mx-auto flex max-w-4xl items-center gap-4">
          <span aria-hidden="true" className="shrink-0 text-2xl">
            ⚠️
          </span>
          <div>
            <p className="font-display text-base font-bold text-[var(--color-foreground)]">
              {page.alertTitle}
            </p>
            <p className="mt-0.5 text-sm text-[color:rgba(20,18,16,0.72)]">
              {page.alertSubtitle}
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-4xl flex-col gap-16 px-6 py-14">
        <section>
          <h2 className="font-display mb-8 text-2xl font-bold">{page.deliveryTitle}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {page.deliveryMethods.map((method) => (
              <div
                key={`${method.title}-${method.icon}`}
                className="flex gap-4 rounded-[1.25rem] border border-[var(--color-border)] bg-white p-6 transition-all hover:border-[color:rgba(255,69,0,0.3)] hover:shadow-md"
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl"
                  style={{ backgroundColor: `${method.accentColor ?? "#0055FF"}18` }}
                >
                  {method.icon}
                </div>
                <div>
                  <p className="mb-1 text-sm font-bold">{method.title}</p>
                  <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                    {method.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="font-display mb-8 text-2xl font-bold">{page.paymentTitle}</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {page.paymentMethods.map((method) => (
              <div
                key={`${method.title}-${method.icon}`}
                className="relative flex gap-4 rounded-[1.25rem] border border-[var(--color-border)] bg-white p-6 transition-all hover:border-[color:rgba(255,69,0,0.3)] hover:shadow-md"
              >
                {method.badge ? (
                  <div className="absolute right-4 top-4">
                    <span
                      className="rounded-full px-2.5 py-1 text-[10px] font-bold text-white"
                      style={{ backgroundColor: method.accentColor ?? "#0055FF" }}
                    >
                      {method.badge}
                    </span>
                  </div>
                ) : null}
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl"
                  style={{ backgroundColor: `${method.accentColor ?? "#0055FF"}18` }}
                >
                  {method.icon}
                </div>
                <div className={method.badge ? "pr-20" : ""}>
                  <p className="mb-1 text-sm font-bold">{method.title}</p>
                  <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                    {method.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[2rem] bg-[var(--color-surface-strong)] p-8 md:p-10">
          <h2 className="font-display mb-8 text-xl font-bold text-white">{page.schemeTitle}</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="font-display flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-primary)] text-sm font-bold text-white">
                  1
                </div>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-[color:rgba(255,69,0,0.3)]">
                  <div className="h-full w-1/2 rounded-full bg-[var(--color-primary)]" />
                </div>
                <span className="font-display text-xl font-bold text-[var(--color-primary)]">
                  {page.schemeStep1Value}
                </span>
              </div>
              <p className="mb-2 font-bold text-white">{page.schemeStep1Title}</p>
              <p className="text-sm leading-relaxed text-white/60">
                {page.schemeStep1Description}
              </p>
            </div>

            <div className="rounded-[1.25rem] border border-white/10 bg-white/5 p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="font-display flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-secondary)] text-sm font-bold text-white">
                  2
                </div>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-[color:rgba(0,85,255,0.3)]">
                  <div className="h-full w-full rounded-full bg-[var(--color-secondary)]" />
                </div>
                <span className="font-display text-xl font-bold text-[var(--color-secondary)]">
                  {page.schemeStep2Value}
                </span>
              </div>
              <p className="mb-2 font-bold text-white">{page.schemeStep2Title}</p>
              <p className="text-sm leading-relaxed text-white/60">
                {page.schemeStep2Description}
              </p>
            </div>
          </div>

          <div className="mt-6 flex h-3 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-1/2 rounded-l-full bg-[var(--color-primary)]" />
            <div className="h-full w-1/2 rounded-r-full bg-[var(--color-secondary)]" />
          </div>
          <div className="mt-2 flex justify-between text-xs text-white/40">
            <span>{page.schemeStep1Title}</span>
            <span>{page.schemeStep2Title}</span>
          </div>
          <div className="mt-5 flex items-center gap-2">
            <span className="text-sm text-[#8ef0a3]">✓</span>
            <span className="text-xs text-white/50">{page.schemeBadge}</span>
          </div>
        </section>

        <section>
          <h2 className="font-display mb-6 text-2xl font-bold">{page.deliveryDetailTitle}</h2>

          <div className="mb-6 flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("local")}
              className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
                activeTab === "local"
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-[var(--color-panel)] text-[var(--color-muted-foreground)] hover:bg-[var(--color-panel-strong)]"
              }`}
            >
              🇺🇦 {page.localTabLabel}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("international")}
              className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
                activeTab === "international"
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-[var(--color-panel)] text-[var(--color-muted-foreground)] hover:bg-[var(--color-panel-strong)]"
              }`}
            >
              🌍 {page.internationalTabLabel}
            </button>
          </div>

          {activeTab === "local" ? (
            <div className="flex flex-col gap-5">
              <div className="rounded-[1.25rem] border border-[var(--color-border)] bg-white p-6">
                <p className="mb-3 text-sm font-semibold text-[var(--color-muted-foreground)]">
                  {page.localDeliveryIntro}
                </p>
                <p className="text-sm leading-relaxed">{page.localDeliveryLocations}</p>
              </div>
              <div className="rounded-[1.25rem] bg-[var(--color-panel)] p-6">
                <p className="mb-4 text-sm leading-relaxed">{page.deliveryNote}</p>
                <div className="flex flex-col gap-3">
                  {page.deliveryPickupNotes.map((item) => (
                    <div key={item.label} className="flex gap-3">
                      <span className="mt-0.5 shrink-0 font-bold text-[var(--color-primary)]">
                        →
                      </span>
                      <span className="text-sm">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              <p className="text-sm text-[var(--color-muted-foreground)]">
                {page.internationalDeliveryIntro}
              </p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {page.internationalCountries.map((country) => (
                  <div
                    key={country.label}
                    className="rounded-xl border border-[var(--color-border)] bg-white px-4 py-3 text-center text-sm font-medium transition-all hover:bg-[var(--color-panel)]"
                  >
                    {country.label}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[1.25rem] border border-[var(--color-border)] bg-white p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[color:rgba(139,0,255,0.15)] text-xl">
              📋
            </div>
            <p className="mb-2 text-[18px] font-bold leading-tight text-[var(--color-foreground)]">
              {page.paymentRequirementsTitle}
            </p>
            <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">
              {page.paymentRequirementsText}
            </p>
          </div>
          <div className="rounded-[1.25rem] border border-[var(--color-border)] bg-white p-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[color:rgba(0,200,83,0.15)] text-xl">
              💵
            </div>
            <p className="mb-2 text-[18px] font-bold leading-tight text-[var(--color-foreground)]">
              {page.cashTitle}
            </p>
            <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">
              {page.cashText}
            </p>
          </div>
        </section>

        <section className="rounded-[2rem] bg-[var(--color-secondary)] p-8 text-center md:p-10">
          <div className="mb-4 text-4xl">🚀</div>
          <h2 className="font-display mb-3 whitespace-pre-line text-2xl font-bold text-white">
            {page.ctaTitle}
          </h2>
          <p className="mb-7 text-white/70">{page.ctaSubtitle}</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={localizeHref(locale, page.ctaPrimaryHref)}
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent)] px-7 py-3.5 font-bold text-[var(--color-foreground)] transition-colors hover:bg-[#ffe347]"
            >
              {page.ctaPrimaryLabel}
              <ArrowRightIcon className="h-[18px] w-[18px]" />
            </Link>
            <Link
              href={localizeHref(locale, page.ctaSecondaryHref)}
              className="rounded-xl bg-white/20 px-7 py-3.5 font-semibold text-white transition-colors hover:bg-white/30"
            >
              {page.ctaSecondaryLabel}
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
