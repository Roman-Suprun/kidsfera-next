import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  StarIcon,
} from "@/components/icons";
import { ProjectHeroGallery } from "@/components/project-hero-gallery";
import { QuoteRequestLink } from "@/components/quote-request-link";
import { StrapiRichText } from "@/components/strapi-rich-text";
import { buildMetadata } from "@/lib/metadata";
import {
  inferProjectThemeColor,
  projectPageCopy,
} from "@/lib/project-presentation";
import { isLocale, type Locale, locales, withLocale } from "@/lib/i18n";
import {
  getBaseSiteUrl,
  getProductPageLabels,
  getProjectBySlug,
  getProjects,
  type ImageLink,
} from "@/lib/strapi";

type PageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

function buildProjectInquiryMessage(
  locale: Locale,
  title: string,
  projectType: string,
  location: string | undefined,
) {
  const copy = projectPageCopy[locale];

  return [
    copy.requestIntro,
    "",
    `${copy.projectLabel}: ${title}`,
    `${copy.typeLabel}: ${projectType}`,
    `${copy.location}: ${location ?? "-"}`,
  ].join("\n");
}

export async function generateStaticParams() {
  const params = [];

  for (const locale of locales) {
    const projects = await getProjects(locale);

    params.push(...projects.map((project) => ({ locale, slug: project.slug })));
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const project = await getProjectBySlug(locale, slug);

  if (!project) {
    return {};
  }

  return buildMetadata(undefined, {
    title: project.title,
    description: project.description || project.subtitle,
    baseUrl: getBaseSiteUrl(),
  });
}

export default async function ProjectPage({ params }: PageProps) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const [project, allProjects, productLabels] = await Promise.all([
    getProjectBySlug(typedLocale, slug),
    getProjects(typedLocale),
    getProductPageLabels(typedLocale),
  ]);

  if (!project || !productLabels) {
    notFound();
  }

  const copy = projectPageCopy[typedLocale];
  const themeColor =
    project.themeColor ??
    project.categories[0]?.themeColor ??
    inferProjectThemeColor(project.projectType);
  const usedProducts = project.usedProducts ?? [];
  const relatedProjects = allProjects
    .filter(
      (item) =>
        item.slug !== project.slug &&
        item.categories.some((category) =>
          project.categories.some((projectCategory) => projectCategory.slug === category.slug),
        ),
    )
    .slice(0, 3);
  const primaryGallery =
    project.gallery.length > 0
      ? project.gallery
      : project.imageUrl
        ? [
            {
              url: project.imageUrl,
              alt: project.title,
            },
          ]
        : [];
  const heroGallery = primaryGallery.filter((image): image is ImageLink => Boolean(image));
  const uniqueGallery = heroGallery.filter(
    (image, index, list) => list.findIndex((candidate) => candidate.url === image.url) === index,
  );
  const inquiryMessage = buildProjectInquiryMessage(
    typedLocale,
    project.title,
    project.projectType,
    project.location,
  );

  return (
    <section className="page-offset min-h-screen bg-[var(--color-background)]">
      <div className="relative">
        <ProjectHeroGallery images={uniqueGallery} title={project.title} />
        <div className="absolute left-6 top-6">
          <Link
            className="inline-flex items-center gap-2 rounded-xl bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30"
            href={withLocale(typedLocale, "/projects")}
          >
            <ChevronLeftIcon className="h-4 w-4" />
            {copy.backToProjects}
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="mb-4 flex flex-wrap gap-2">
              {project.categories.map((category) => (
                <span
                  key={`${project.slug}-${category.slug}`}
                  className="inline-flex rounded-full px-3 py-1 text-xs font-bold text-white"
                  style={{ backgroundColor: category.themeColor }}
                >
                  {category.name}
                </span>
              ))}
              {project.yearLabel ? (
                <span className="rounded-full bg-[var(--color-panel)] px-2.5 py-1 text-xs font-medium text-[var(--color-muted-foreground)]">
                  {project.yearLabel}
                </span>
              ) : null}
              {project.area ? (
                <span className="rounded-full bg-[var(--color-panel)] px-2.5 py-1 text-xs font-medium text-[var(--color-muted-foreground)]">
                  {project.area}
                </span>
              ) : null}
            </div>

            <h1 className="font-display mb-2 text-3xl font-bold md:text-4xl">
              {project.countryFlag ? `${project.countryFlag} ` : ""}
              {project.title}
            </h1>

            <p className="mb-8 text-sm text-[var(--color-muted-foreground)]">
              {[project.clientName, project.location].filter(Boolean).join(" · ")}
            </p>

            <StrapiRichText
              className="mb-10 text-base leading-relaxed text-[var(--color-foreground)]/80"
              content={project.description || project.subtitle}
            />

            {project.testimonial ? (
              <div className="mb-10 rounded-3xl bg-[var(--color-surface-strong)] p-8">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <StarIcon
                      key={index}
                      className="h-4 w-4 fill-[var(--color-accent)] text-[var(--color-accent)]"
                    />
                  ))}
                </div>
                <p className="mb-5 text-base italic leading-relaxed text-white">
                  "{project.testimonial.quote}"
                </p>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {project.testimonial.author}
                  </p>
                  <p className="mt-0.5 text-xs text-white/50">
                    {project.testimonial.role}
                  </p>
                </div>
              </div>
            ) : null}

            {usedProducts.length ? (
              <div>
                <h2 className="font-display mb-5 text-lg font-bold">{copy.productsUsed}</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {usedProducts.map((product) => (
                    <Link
                      key={product.slug}
                      className="group flex gap-4 rounded-2xl border border-[var(--color-border)] bg-white p-4 transition-all hover:border-[color:rgba(255,69,0,0.24)] hover:shadow-md"
                      href={withLocale(typedLocale, `/products/${product.slug}`)}
                    >
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-[var(--color-panel)]">
                        {product.gallery[0] ? (
                          <Image
                            alt={product.gallery[0].alt}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            height={64}
                            src={product.gallery[0].url}
                            width={64}
                          />
                        ) : null}
                      </div>
                      <div>
                        <p className="font-display mb-1 text-xs font-bold">{product.name}</p>
                        <p className="text-xs text-[var(--color-muted-foreground)]">
                          {product.priceLabel}
                        </p>
                        <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-primary)] transition-all group-hover:gap-2">
                          {productLabels.requestQuoteLabel}
                          <ArrowRightIcon className="h-2.5 w-2.5" />
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-[calc(var(--site-header-height)+1.5rem)] rounded-3xl bg-[var(--color-panel)] p-6">
              <h2 className="font-display mb-5 text-sm font-bold">{copy.projectInfo}</h2>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-muted-foreground)]">
                    {copy.projectType}
                  </span>
                  <span className="text-sm font-medium">
                    {project.categories.map((category) => category.name).join(", ") || project.projectType}
                  </span>
                </div>
                {project.clientName ? (
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-muted-foreground)]">
                      {copy.client}
                    </span>
                    <span className="text-sm font-medium">{project.clientName}</span>
                  </div>
                ) : null}
                {project.location ? (
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-muted-foreground)]">
                      {copy.location}
                    </span>
                    <span className="inline-flex items-center gap-2 text-sm font-medium">
                      <MapPinIcon className="h-4 w-4 text-[var(--color-muted-foreground)]" />
                      {project.location}
                    </span>
                  </div>
                ) : null}
                {project.area ? (
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-muted-foreground)]">
                      {copy.area}
                    </span>
                    <span className="text-sm font-medium">{project.area}</span>
                  </div>
                ) : null}
                {project.yearLabel ? (
                  <div className="flex flex-col gap-0.5">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-muted-foreground)]">
                      {copy.year}
                    </span>
                    <span className="text-sm font-medium">{project.yearLabel}</span>
                  </div>
                ) : null}
              </div>

              <QuoteRequestLink
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
                locale={typedLocale}
                message={inquiryMessage}
                style={{ backgroundColor: themeColor }}
              >
                {copy.requestSimilar}
                <ArrowRightIcon className="h-4 w-4" />
              </QuoteRequestLink>
            </div>
          </div>
        </div>

        {relatedProjects.length ? (
          <div className="mt-16">
            <h2 className="font-display mb-6 text-xl font-bold">{copy.relatedProjects}</h2>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {relatedProjects.map((relatedProject) => {
                const relatedColor =
                  relatedProject.themeColor ??
                  relatedProject.categories[0]?.themeColor ??
                  inferProjectThemeColor(relatedProject.projectType);

                return (
                  <Link
                    key={relatedProject.slug}
                    className="group overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white transition-all hover:border-[color:rgba(255,69,0,0.24)] hover:shadow-md"
                    href={withLocale(typedLocale, `/projects/${relatedProject.slug}`)}
                  >
                    <div className="relative aspect-video bg-[var(--color-panel)]">
                      {relatedProject.imageUrl ? (
                        <Image
                          alt={relatedProject.title}
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          fill
                          sizes="(min-width: 768px) 33vw, 100vw"
                          src={relatedProject.imageUrl}
                        />
                      ) : null}
                    </div>
                    <div className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {relatedProject.categories.slice(0, 2).map((category) => (
                          <span
                            key={`${relatedProject.slug}-${category.slug}`}
                            className="inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold text-white"
                            style={{ backgroundColor: category.themeColor ?? relatedColor }}
                          >
                            {category.name}
                          </span>
                        ))}
                      </div>
                      <h3 className="font-display mt-3 text-sm font-bold">
                        {relatedProject.title}
                      </h3>
                      <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                        {relatedProject.subtitle}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-primary)] transition-all group-hover:gap-2">
                        {copy.viewProject}
                        <ChevronRightIcon className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
