import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { ArrowRightIcon } from "@/components/icons";
import { buildMetadata } from "@/lib/metadata";
import { getBaseSiteUrl, getAboutPage } from "@/lib/strapi";
import { isLocale, locales, type Locale, withLocale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{ locale: string }>;
};

const valueThemeClasses: Record<
  "orange" | "blue" | "yellow" | "green",
  { card: string; copy: string }
> = {
  orange: {
    card: "bg-[var(--color-primary)]",
    copy: "text-white/78",
  },
  blue: {
    card: "bg-[var(--color-secondary)]",
    copy: "text-white/78",
  },
  yellow: {
    card: "bg-[var(--color-accent)]",
    copy: "text-[color:rgba(20,18,16,0.72)]",
  },
  green: {
    card: "bg-[#00c853]",
    copy: "text-white/80",
  },
};

function localizeHref(locale: Locale, href: string) {
  if (/^(https?:|mailto:|tel:)/i.test(href)) {
    return href;
  }

  return withLocale(locale, href);
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const page = await getAboutPage(locale);

  if (!page) {
    return {};
  }

  return buildMetadata(page.seo, {
    title: page.heroEyebrow,
    description: page.heroDescription,
    baseUrl: getBaseSiteUrl(),
  });
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const page = await getAboutPage(typedLocale);

  if (!page) {
    notFound();
  }

  return (
    <div className="page-offset min-h-screen bg-[var(--color-background)]">
      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-[var(--color-surface-strong)]">
        {page.heroImage ? (
          <img
            alt={page.heroImage.alt}
            className="absolute inset-0 h-full w-full object-cover opacity-30"
            src={page.heroImage.url}
          />
        ) : null}
        <div className="relative mx-auto w-full max-w-7xl px-8 pb-20 md:px-16">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-accent)]">
            {page.heroEyebrow}
          </p>
          <h1 className="font-display mb-6 whitespace-pre-line text-5xl font-bold text-white md:text-7xl">
            {page.heroTitle}
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-white/60">{page.heroDescription}</p>
          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4">
            {page.heroStats.map((stat) => (
              <div key={`${stat.value}-${stat.label}`}>
                <div className="font-display text-3xl font-bold text-white">{stat.value}</div>
                <div className="mt-1 text-sm text-white/40">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-16 md:grid-cols-2 md:items-center">
        <div>
          <p className="eyebrow">{page.storyEyebrow}</p>
          <h2 className="font-display mb-8 whitespace-pre-line text-4xl font-bold md:text-5xl">
            {page.storyTitle}
          </h2>
          <p className="mb-5 leading-relaxed text-[var(--color-muted-foreground)]">
            {page.storyParagraph1}
          </p>
          <p className="leading-relaxed text-[var(--color-muted-foreground)]">
            {page.storyParagraph2}
          </p>
        </div>

        <div className="flex flex-col">
          {page.milestones.map((milestone, index) => (
            <div key={`${milestone.year}-${milestone.text}`} className="flex items-start gap-5">
              <div className="flex shrink-0 flex-col items-center">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white ${
                    index === page.milestones.length - 1
                      ? "bg-[var(--color-primary)]"
                      : "bg-[var(--color-surface-strong)]"
                  }`}
                >
                  {milestone.year.slice(-2)}
                </div>
                {index < page.milestones.length - 1 ? (
                  <div className="mt-1 h-8 w-px bg-[var(--color-border)]" />
                ) : null}
              </div>
              <div className="pb-8 pt-1.5">
                <p className="mb-0.5 text-xs font-bold text-[var(--color-muted-foreground)]">
                  {milestone.year}
                </p>
                <p className="text-sm">{milestone.text}</p>
              </div>
            </div>
          ))}
        </div>
        </div>
      </section>

      <section className="bg-[var(--color-panel)] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14">
            <p className="eyebrow">{page.valuesEyebrow}</p>
            <h2 className="font-display text-4xl font-bold md:text-5xl">{page.valuesTitle}</h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {page.values.map((value) => {
              const theme = valueThemeClasses[value.theme];

              return (
                <div
                  key={value.title}
                  className={`flex flex-col gap-4 rounded-3xl p-8 ${theme.card} ${
                    value.theme === "yellow" ? "text-[var(--color-foreground)]" : "text-white"
                  }`}
                >
                  <span className="text-3xl">{value.icon}</span>
                  <h3 className="font-display text-base font-bold">{value.title}</h3>
                  <p className={`text-sm leading-relaxed ${theme.copy}`}>{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto grid max-w-7xl gap-16 px-6 md:grid-cols-2 md:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[var(--color-panel)]">
            {page.factoryImage ? (
              <img
                alt={page.factoryImage.alt}
                className="h-full w-full object-cover"
                src={page.factoryImage.url}
              />
            ) : null}
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent" />
            <div className="absolute bottom-6 left-6">
              <p className="font-display text-sm font-bold text-white">{page.factoryLocationLabel}</p>
              <p className="text-xs text-white/60">{page.factoryAddress}</p>
            </div>
          </div>

          <div>
            <p className="eyebrow">{page.factoryEyebrow}</p>
            <h2 className="font-display mb-6 text-4xl font-bold md:text-5xl">
              {page.factoryTitle}
            </h2>
            <p className="mb-10 leading-relaxed text-[var(--color-muted-foreground)]">
              {page.factoryDescription}
            </p>
            <div className="grid grid-cols-2 gap-6">
              {page.factoryStats.map((stat) => (
                <div
                  key={`${stat.value}-${stat.label}`}
                  className="rounded-3xl bg-[var(--color-panel)] p-5"
                >
                  <div className="font-display text-2xl font-bold text-[var(--color-primary)]">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {page.showTeamSection ? (
        <section className="bg-[var(--color-surface-strong)] py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-14">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--color-accent)]">
                {page.teamEyebrow}
              </p>
              <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
                {page.teamTitle}
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {page.teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-white/5"
                >
                  <div className="relative aspect-square overflow-hidden bg-white/5">
                    {member.avatar ? (
                      <img
                        alt={member.avatar.alt}
                        className="h-full w-full object-cover opacity-80"
                        src={member.avatar.url}
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6">
                    <p className="font-display mb-0.5 text-sm font-bold text-white">
                      {member.name}
                    </p>
                    <p className="mb-3 text-xs font-medium text-[var(--color-accent)]">
                      {member.role}
                    </p>
                    <p className="text-xs leading-relaxed text-white/50">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {page.showCertificationsSection ? (
        <section className="mx-auto grid max-w-7xl gap-16 px-6 py-24 md:grid-cols-2 md:items-start">
          <div>
            <p className="eyebrow">{page.certificationsEyebrow}</p>
            <h2 className="font-display mb-8 text-4xl font-bold md:text-5xl">
              {page.certificationsTitle}
            </h2>
            <div className="flex flex-col gap-3">
              {page.certifications.map((certification) => (
                <div
                  key={certification.label}
                  className="flex items-start gap-3 rounded-3xl bg-[var(--color-panel)] p-4"
                >
                  <span className="mt-0.5 shrink-0 text-[var(--color-primary)]">✓</span>
                  <span className="text-sm">{certification.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-[var(--color-primary)] p-10 text-white">
            <div className="mb-6 text-5xl">{page.safetyCalloutIcon}</div>
            <h3 className="font-display mb-4 whitespace-pre-line text-2xl font-bold">
              {page.safetyCalloutTitle}
            </h3>
            <p className="mb-8 leading-relaxed text-white/72">{page.safetyCalloutDescription}</p>
            <div className="grid grid-cols-3 gap-4">
              {page.safetyBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="rounded-xl bg-white/20 py-2 text-center text-xs font-bold"
                >
                  {badge.label}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section
        className={`mx-6 overflow-hidden rounded-3xl bg-[var(--color-secondary)] ${
          page.showCertificationsSection ? "mb-24" : "mt-24 mb-24"
        }`}
      >
        <div className="relative">
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="absolute rounded-full bg-white"
                style={{
                  width: `${60 + index * 40}px`,
                  height: `${60 + index * 40}px`,
                  left: `${(index * 13) % 100}%`,
                  top: `${(index * 17) % 100}%`,
                  transform: "translate(-50%, -50%)",
                }}
              />
            ))}
          </div>

          <div className="relative flex flex-col items-center justify-between gap-8 px-8 py-16 md:flex-row md:px-16 md:py-20">
            <div>
              <h2 className="font-display mb-3 whitespace-pre-line text-3xl font-bold text-white md:text-5xl">
                {page.ctaTitle}
              </h2>
              <p className="max-w-md text-base text-white/70">{page.ctaDescription}</p>
            </div>

            <div className="flex shrink-0 flex-wrap gap-3">
              <Link
                className="inline-flex items-center justify-center rounded-xl bg-white/20 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/30"
                href={localizeHref(typedLocale, page.ctaSecondaryHref)}
              >
                {page.ctaSecondaryLabel}
              </Link>
              <Link
                className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent)] px-8 py-4 text-base font-bold text-[var(--color-foreground)] transition-colors hover:bg-yellow-300"
                href={localizeHref(typedLocale, page.ctaPrimaryHref)}
              >
                {page.ctaPrimaryLabel}
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
