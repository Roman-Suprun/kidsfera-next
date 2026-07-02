import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { ProjectsBrowser } from "@/components/projects-browser";
import { buildMetadata } from "@/lib/metadata";
import { isLocale, type Locale, locales } from "@/lib/i18n";
import { getBaseSiteUrl, getProjects } from "@/lib/strapi";
import { projectPageCopy } from "@/lib/project-presentation";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const copy = projectPageCopy[locale];

  return buildMetadata(undefined, {
    title: copy.eyebrow,
    description: copy.subtitle,
    baseUrl: getBaseSiteUrl(),
  });
}

export default async function ProjectsPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const projects = await getProjects(typedLocale);
  const copy = projectPageCopy[typedLocale];

  if (!projects.length) {
    notFound();
  }

  const heroImage =
    "https://images.unsplash.com/photo-1759776050712-2b7880af8cd4?w=1600&h=600&fit=crop&auto=format";

  return (
    <section className="min-h-screen bg-[var(--color-background)] pt-16">
      <div className="relative h-72 overflow-hidden bg-[var(--color-surface-strong)] md:h-96">
        <img
          alt={copy.eyebrow}
          className="absolute inset-0 h-full w-full object-cover opacity-40"
          src={heroImage}
        />
        <div className="absolute inset-0 flex w-full flex-col justify-end px-8 pb-12 md:px-16">
          <div className="mx-auto w-full max-w-7xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
            {copy.eyebrow}
            </p>
            <h1 className="font-display whitespace-pre-line text-4xl font-bold text-white md:text-6xl">
              {copy.title}
            </h1>
            <p className="mt-4 max-w-xl text-base text-white/60">{copy.subtitle}</p>
          </div>
        </div>
      </div>

      <ProjectsBrowser locale={typedLocale} projects={projects} />
    </section>
  );
}
