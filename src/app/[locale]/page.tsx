import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { FeaturedProductsTabs } from "@/components/featured-products-tabs";
import {
  ArrowRightIcon,
  GlobeIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldIcon,
  WrenchIcon,
  ZapIcon,
} from "@/components/icons";
import { MailtoContactForm } from "@/components/mailto-contact-form";
import { MailtoLink } from "@/components/mailto-link";
import { isLocale, type Locale, locales, withLocale } from "@/lib/i18n";
import { buildMetadata } from "@/lib/metadata";
import {
  getBaseSiteUrl,
  getCategories,
  getCategoriesPage,
  getHomePage,
  getProducts,
  getProjects,
  getSiteSettings,
  getTestimonials,
  type ContactForm,
  type FeatureItem,
} from "@/lib/strapi";

const featureIcons = {
  shield: ShieldIcon,
  wrench: WrenchIcon,
  zap: ZapIcon,
  globe: GlobeIcon,
} as const;

const contactIcons = {
  phone: PhoneIcon,
  email: MailIcon,
  address: MapPinIcon,
} as const;

const testimonialCopy: Record<
  Locale,
  {
    eyebrow: string;
    title: string;
  }
> = {
  en: {
    eyebrow: "Client Stories",
    title: "Trusted by parks, malls & municipalities",
  },
  uk: {
    eyebrow: "Відгуки клієнтів",
    title: "Нам довіряють парки, молли та міста",
  },
  ru: {
    eyebrow: "Отзывы клиентов",
    title: "Нам доверяют парки, моллы и города",
  },
  pl: {
    eyebrow: "Opinie klientów",
    title: "Zaufali nam parki, galerie i miasta",
  },
};

const contactFormCopy: Record<
  Locale,
  {
    firstName: string;
    lastName: string;
    email: string;
    message: string;
    firstNamePlaceholder: string;
    lastNamePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    submit: string;
    note: string;
  }
> = {
  en: {
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    message: "Tell us about your project",
    firstNamePlaceholder: "Anna",
    lastNamePlaceholder: "Kowalska",
    emailPlaceholder: "anna@kidsfera.eu",
    messagePlaceholder: "Site area, location, budget, opening date...",
    submit: "Send Enquiry",
    note: "We respond within 24 hours · No spam, ever",
  },
  uk: {
    firstName: "Ім'я",
    lastName: "Прізвище",
    email: "Email",
    message: "Розкажіть про ваш проєкт",
    firstNamePlaceholder: "Анна",
    lastNamePlaceholder: "Коваленко",
    emailPlaceholder: "anna@kidsfera.ua",
    messagePlaceholder: "Площа, місто, бюджет, дата відкриття...",
    submit: "Надіслати запит",
    note: "Відповідаємо протягом 24 годин · Без спаму",
  },
  ru: {
    firstName: "Имя",
    lastName: "Фамилия",
    email: "Email",
    message: "Расскажите о вашем проекте",
    firstNamePlaceholder: "Анна",
    lastNamePlaceholder: "Коваленко",
    emailPlaceholder: "anna@kidsfera.ru",
    messagePlaceholder: "Площадь, город, бюджет, дата открытия...",
    submit: "Отправить запрос",
    note: "Отвечаем в течение 24 часов · Без спама",
  },
  pl: {
    firstName: "Imię",
    lastName: "Nazwisko",
    email: "Email",
    message: "Opowiedz o swoim projekcie",
    firstNamePlaceholder: "Anna",
    lastNamePlaceholder: "Kowalska",
    emailPlaceholder: "anna@kidsfera.pl",
    messagePlaceholder: "Powierzchnia, lokalizacja, budżet, data otwarcia...",
    submit: "Wyślij zapytanie",
    note: "Odpowiadamy w ciągu 24 godzin · Zero spamu",
  },
};

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

  const [page, settings] = await Promise.all([
    getHomePage(locale),
    getSiteSettings(locale),
  ]);

  if (!page || !settings) {
    return {};
  }

  return buildMetadata(page.seo, {
    title: settings.siteName,
    description: page.heroDescription,
    baseUrl: getBaseSiteUrl(),
  });
}

function renderFeatureIcon(item: FeatureItem["iconKey"]) {
  const Icon = featureIcons[item] ?? ShieldIcon;
  return <Icon className="h-6 w-6" />;
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;

  const [page, categories, products, projects, testimonials, categoriesPage, settings] =
    await Promise.all([
      getHomePage(typedLocale),
      getCategories(typedLocale),
      getProducts(typedLocale),
      getProjects(typedLocale),
      getTestimonials(typedLocale),
      getCategoriesPage(typedLocale),
      getSiteSettings(typedLocale),
    ]);

  if (!page || !settings) {
    notFound();
  }

  const testimonialFallback = testimonialCopy[typedLocale];
  const formCopy: ContactForm = page.contactForm ?? {
    firstNameLabel: contactFormCopy[typedLocale].firstName,
    lastNameLabel: contactFormCopy[typedLocale].lastName,
    emailLabel: contactFormCopy[typedLocale].email,
    messageLabel: contactFormCopy[typedLocale].message,
    firstNamePlaceholder: contactFormCopy[typedLocale].firstNamePlaceholder,
    lastNamePlaceholder: contactFormCopy[typedLocale].lastNamePlaceholder,
    emailPlaceholder: contactFormCopy[typedLocale].emailPlaceholder,
    messagePlaceholder: contactFormCopy[typedLocale].messagePlaceholder,
    submitLabel: contactFormCopy[typedLocale].submit,
    note: contactFormCopy[typedLocale].note,
  };
  const previewCategories = categories.slice(0, 6);
  const productCountByCategory = new Map<string, number>();

  for (const product of products) {
    for (const category of product.categories) {
      productCountByCategory.set(
        category.slug,
        (productCountByCategory.get(category.slug) ?? 0) + 1,
      );
    }
  }

  const galleryProjects = projects.slice(0, 4);
  return (
    <>
      <section className="page-offset grid min-h-[100svh] items-center md:grid-cols-2">
        <div className="flex flex-col justify-center px-8 py-20 md:px-16">
          <div className="mb-8 inline-flex items-center gap-2 self-start rounded-full bg-[var(--color-accent)] px-3 py-1.5 text-xs font-semibold text-[var(--color-surface-strong)]">
            <ZapIcon className="h-3.5 w-3.5" />
            {page.heroEyebrow}
          </div>

          <h1 className="font-display mb-6 text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl">
            {page.heroTitleLine1}
            <br />
            <span className="text-[var(--color-primary)]">{page.heroTitleLine2}</span>
            <br />
            {page.heroTitleLine3}
          </h1>

          <p className="mb-10 max-w-md text-lg leading-relaxed text-[var(--color-muted-foreground)]">
            {page.heroDescription}
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href={withLocale(typedLocale, page.heroPrimaryCtaHref)}
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#e03d00]"
            >
              {page.heroPrimaryCtaLabel}
              <ArrowRightIcon className="h-[18px] w-[18px]" />
            </Link>
            <Link
              href={withLocale(typedLocale, page.heroSecondaryCtaHref)}
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-panel)] px-7 py-3.5 text-base font-semibold text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-panel-strong)]"
            >
              {page.heroSecondaryCtaLabel}
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-6">
            {page.stats.slice(0, 2).map((item) => (
              <div key={`${item.value}-${item.label}`}>
                <div className="font-display text-3xl font-bold">
                  {item.value}
                </div>
                <div className="mt-1 text-sm text-[var(--color-muted-foreground)]">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative h-[60vw] overflow-hidden bg-[var(--color-panel)] md:h-[calc(100svh-var(--site-header-height))]">
          <Image
            alt={page.heroQuoteAttribution ?? page.heroTitleLine1}
            className="object-cover"
            fill
            priority
            sizes="100vw"
            src={page.heroImageUrl}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          {page.heroQuote ? (
            <div className="absolute bottom-8 left-8 right-8">
              <div className="max-w-xs rounded-2xl bg-white/90 p-5 backdrop-blur-sm">
                <div className="mb-1 flex items-center gap-1 text-[var(--color-accent)]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span key={index}>★</span>
                  ))}
                </div>
                <p className="text-sm font-medium text-[var(--color-foreground)]">
                  {page.heroQuote}
                </p>
                {page.heroQuoteAttribution ? (
                  <p className="mt-1 text-xs text-[var(--color-muted-foreground)]">
                    {page.heroQuoteAttribution}
                  </p>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <section className="bg-[var(--color-surface-strong)] py-12">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
          {page.stats.map((item) => (
            <div key={`${item.value}-${item.label}`} className="text-center">
              <div className="font-display text-4xl font-bold text-white">
                {item.value}
              </div>
              <div className="mt-1 text-sm text-white/50">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)]">
              {categoriesPage?.eyebrow ?? "All Categories"}
            </p>
            <h2 className="font-display text-4xl font-bold md:text-5xl">
              {page.productsSectionEyebrow}
            </h2>
          </div>
          <Link
            href={withLocale(typedLocale, "/categories")}
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-muted-foreground)] transition-colors hover:text-[var(--color-foreground)]"
          >
            {categoriesPage?.viewCatalogLabel ?? page.heroSecondaryCtaLabel}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {previewCategories.map((category) => (
            <Link
              key={category.slug}
              href={withLocale(typedLocale, `/catalog?category=${category.slug}`)}
              className="group relative overflow-hidden rounded-2xl text-left"
            >
              <div className="relative aspect-[4/3]">
                {category.imageUrl ? (
                  <Image
                    alt={category.name}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    fill
                    sizes="(min-width: 768px) 33vw, 50vw"
                    src={category.imageUrl}
                  />
                ) : null}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p
                  className="font-display text-sm font-bold text-white"
                  style={{ fontSize: "0.75rem" }}
                >
                  {category.name}
                </p>
                <p className="mt-0.5 text-xs text-white/50">
                  {productCountByCategory.get(category.slug) ?? 0} items
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <FeaturedProductsTabs
        eyebrow={page.productsSectionEyebrow}
        items={page.featuredProducts}
        locale={typedLocale}
        title={page.productsSectionTitle}
      />

      <section className="bg-[var(--color-panel)] py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-4">
          {page.features.map((feature) => (
            <div key={feature.title} className="flex flex-col gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-primary)] text-white">
                {renderFeatureIcon(feature.iconKey)}
              </div>
              <h3 className="text-base font-bold">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="process" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)]">
            {page.processEyebrow}
          </p>
          <h2 className="font-display whitespace-pre-line text-4xl font-bold md:text-5xl">
            {page.processTitle}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {page.processSteps.map((step) => (
            <article
              key={step.stepNumber}
              className={`rounded-3xl p-8 ${
                step.theme === "blue"
                  ? "bg-[var(--color-secondary)]"
                  : step.theme === "charcoal"
                    ? "bg-[var(--color-surface-strong)]"
                    : "bg-[var(--color-primary)]"
              }`}
            >
              <div className="font-display mb-4 text-5xl font-black leading-none text-white/20">
                {step.stepNumber}
              </div>
              <h3 className="font-display mb-3 text-lg font-bold text-white">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/75">{step.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-6 rounded-3xl bg-[var(--color-accent)] p-8 md:flex-row">
          <div>
            <h3 className="font-display text-xl font-bold text-[var(--color-surface-strong)]">
              {page.processTimelineTitle}
            </h3>
            <p className="mt-1 text-sm text-[var(--color-surface-strong)]/70">
              {page.processTimelineSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {page.processPhases.map((phase) => (
              <div
                key={`${phase.title}-${phase.subtitle}`}
                className="min-w-[80px] rounded-2xl bg-white/60 px-4 py-3 text-center"
              >
                <p className="text-xs font-semibold text-[var(--color-surface-strong)]">
                  {phase.title}
                </p>
                <p className="text-xs text-[var(--color-surface-strong)]/60">
                  {phase.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="bg-[var(--color-surface-strong)] py-24 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
              {page.projectsEyebrow}
            </p>
            <h2 className="font-display whitespace-pre-line text-4xl font-bold text-white md:text-5xl">
              {page.projectsTitle}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {galleryProjects.map((project, index) => (
              <Link
                key={project.slug}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl ${
                  index === 0 ? "aspect-square md:col-span-2 md:row-span-2" : "aspect-square"
                }`}
                href={withLocale(typedLocale, `/projects/${project.slug}`)}
              >
                {project.imageUrl ? (
                  <Image
                    alt={project.title}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    fill
                    sizes={index === 0 ? "(min-width: 768px) 50vw, 50vw" : "(min-width: 768px) 25vw, 50vw"}
                    src={project.imageUrl}
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  {project.categories.length ? (
                    <div className="mb-1.5 flex flex-wrap gap-1">
                      {project.categories.slice(0, 2).map((category) => (
                        <span
                          key={`${project.slug}-${category.slug}`}
                          className="inline-block rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
                          style={{ backgroundColor: category.themeColor }}
                        >
                          {category.name}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <p className="text-sm font-semibold text-white">{project.title}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href={withLocale(typedLocale, "/projects")}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-semibold text-[var(--color-surface-strong)] transition-colors hover:bg-[var(--color-background)]"
            >
              {page.projectsCtaLabel}
              <ArrowRightIcon className="h-[18px] w-[18px]" />
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)]">
            {page.testimonialsEyebrow ?? testimonialFallback.eyebrow}
          </p>
          <h2 className="font-display max-w-3xl whitespace-pre-line text-4xl font-bold md:text-5xl">
            {page.testimonialsTitle ?? testimonialFallback.title}
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => {
            const isAccent = index === 1;

            return (
              <article
                key={`${testimonial.author}-${testimonial.role}`}
                className={`rounded-3xl border border-[var(--color-border)] p-8 ${
                  isAccent ? "border-[var(--color-primary)] bg-[var(--color-primary)]" : "bg-white"
                }`}
              >
                <div className="mb-5 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                    <span
                      key={starIndex}
                      className={isAccent ? "text-[var(--color-accent)]" : "text-[var(--color-primary)]"}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p
                  className={`mb-6 text-sm leading-relaxed ${
                    isAccent ? "text-white" : "text-[var(--color-foreground)]"
                  }`}
                >
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div>
                  <div className={isAccent ? "text-sm font-semibold text-white" : "text-sm font-semibold text-[var(--color-foreground)]"}>
                    {testimonial.author}
                  </div>
                  <div
                    className={
                      isAccent
                        ? "mt-0.5 text-xs text-white/70"
                        : "mt-0.5 text-xs text-[var(--color-muted-foreground)]"
                    }
                  >
                    {testimonial.role}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="relative mx-6 mb-24 overflow-hidden rounded-3xl bg-[var(--color-secondary)]">
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
              {page.ctaHeading}
            </h2>
            <p className="max-w-md text-base text-white/70">{page.ctaSubtitle}</p>
          </div>
          <div className="shrink-0">
            <div>
              {page.ctaNote ? (
                <p className="mb-3 text-center text-xs text-white/50">{page.ctaNote}</p>
              ) : null}
            </div>
            <Link
              href={withLocale(typedLocale, page.ctaButtonHref)}
              className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-accent)] px-8 py-4 text-base font-bold text-[var(--color-surface-strong)] transition-colors hover:bg-yellow-300"
            >
              {page.ctaButtonLabel}
              <ArrowRightIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-16 md:grid-cols-2">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)]">
              {page.contactEyebrow}
            </p>
            <h2 className="font-display mb-6 whitespace-pre-line text-4xl font-bold md:text-5xl">
              {page.contactTitle}
            </h2>
            <p className="mb-10 leading-relaxed text-[var(--color-muted-foreground)]">
              {page.contactDescription}
            </p>

            <div className="flex flex-col gap-5">
              {page.contactItems.map((item) => {
                const Icon = contactIcons[item.type] ?? PhoneIcon;
                const href =
                  item.type === "phone" ? `tel:${item.value}` : undefined;

                return (
                  <div key={`${item.type}-${item.value}`} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-panel)]">
                      <Icon className="h-[18px] w-[18px] text-[var(--color-primary)]" />
                    </div>
                    <div>
                      <p className="text-xs text-[var(--color-muted-foreground)]">{item.label}</p>
                      {item.type === "email" ? (
                        <MailtoLink
                          email={item.value}
                          className="mt-0.5 block text-left text-sm font-medium"
                          ariaLabel={`Email ${item.value}`}
                        >
                          {item.value}
                        </MailtoLink>
                      ) : href ? (
                        <a className="mt-0.5 block text-sm font-medium" href={href}>
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-0.5 text-sm font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <MailtoContactForm
            email={settings.contactEmail}
            formCopy={formCopy}
          />
        </div>
      </section>
    </>
  );
}
