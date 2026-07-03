"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { ArrowRightIcon, MapPinIcon } from "@/components/icons";
import type { Locale } from "@/lib/i18n";
import { withLocale } from "@/lib/i18n";
import {
  inferProjectThemeColor,
  projectPageCopy,
} from "@/lib/project-presentation";
import type { Project } from "@/lib/strapi";

type Props = {
  locale: Locale;
  projects: Project[];
};

export function ProjectsBrowser({ locale, projects }: Props) {
  const copy = projectPageCopy[locale];
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  const projectTypes = useMemo(
    () =>
      Array.from(
        new Map(
          projects.flatMap((project) =>
            project.categories.map((category) => [category.slug, category] as const),
          ),
        ).values(),
      ),
    [projects],
  );
  const projectTypeColors = useMemo(
    () =>
      new Map(
        projectTypes.map((category) => [category.slug, category.themeColor]),
      ),
    [projectTypes],
  );

  const filteredProjects = useMemo(() => {
    if (!typeFilter) {
      return projects;
    }

    return projects.filter((project) =>
      project.categories.some((category) => category.slug === typeFilter),
    );
  }, [projects, typeFilter]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <div className="mb-10 flex flex-wrap gap-2">
        <button
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
            typeFilter === null
              ? "bg-[var(--color-primary)] text-white"
              : "bg-[var(--color-panel)] text-[var(--color-muted-foreground)] hover:bg-[var(--color-panel-strong)]"
          }`}
          onClick={() => setTypeFilter(null)}
          type="button"
        >
          {copy.filterAll}
        </button>
        {projectTypes.map((projectType) => {
          const color =
            projectTypeColors.get(projectType.slug) ?? inferProjectThemeColor(projectType.name);
          const isActive = typeFilter === projectType.slug;

          return (
            <button
              key={projectType.slug}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                isActive
                  ? "text-white"
                  : "bg-[var(--color-panel)] text-[var(--color-muted-foreground)] hover:bg-[var(--color-panel-strong)]"
              }`}
              onClick={() => setTypeFilter(isActive ? null : projectType.slug)}
              style={isActive ? { backgroundColor: color } : undefined}
              type="button"
            >
              {projectType.name}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project) => {
          const themeColor =
            project.themeColor ??
            project.categories[0]?.themeColor ??
            inferProjectThemeColor(project.projectType);

          return (
            <Link
              key={project.slug}
              className="group overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white text-left transition-all hover:border-[color:rgba(255,69,0,0.24)] hover:shadow-xl"
              href={withLocale(locale, `/projects/${project.slug}`)}
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[var(--color-panel)]">
                {project.imageUrl ? (
                  <Image
                    alt={project.title}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    fill
                    sizes="(min-width: 1280px) 26vw, (min-width: 768px) 50vw, 100vw"
                    src={project.imageUrl}
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent" />
                <div className="absolute left-3 top-3 flex max-w-[70%] flex-wrap gap-1">
                  {project.categories.slice(0, 2).map((category) => (
                    <span
                      key={`${project.slug}-${category.slug}`}
                      className="inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold text-white"
                      style={{ backgroundColor: category.themeColor }}
                    >
                      {category.name}
                    </span>
                  ))}
                </div>
                {project.countryFlag ? (
                  <div className="absolute right-3 top-3 text-2xl">{project.countryFlag}</div>
                ) : null}
                <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
                  <p className="font-display text-sm font-bold text-white">{project.title}</p>
                  {project.yearLabel ? (
                    <p className="shrink-0 text-xs text-white/75">{project.yearLabel}</p>
                  ) : null}
                </div>
              </div>

              <div className="p-5">
                <div className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[var(--color-muted-foreground)]">
                  {project.location ? (
                    <span className="inline-flex items-center gap-1">
                      <MapPinIcon className="h-3.5 w-3.5" />
                      {project.location}
                    </span>
                  ) : null}
                  {project.area ? <span>{project.area}</span> : null}
                  {project.clientName ? <span>{project.clientName}</span> : null}
                </div>

                <p className="text-sm text-[var(--color-foreground)]/75">{project.subtitle}</p>

                {project.testimonial ? (
                  <p className="mt-3 text-xs italic text-[var(--color-muted-foreground)]">
                    “{project.testimonial.quote}”
                  </p>
                ) : null}

                <div className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[var(--color-primary)] transition-all group-hover:gap-2">
                  {copy.viewProject}
                  <ArrowRightIcon className="h-3 w-3" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
