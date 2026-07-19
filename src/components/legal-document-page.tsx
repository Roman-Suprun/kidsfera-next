import { StrapiRichText } from "@/components/strapi-rich-text";
import type { LegalPage } from "@/lib/strapi";

type Props = {
  page: LegalPage;
};

export function LegalDocumentPage({ page }: Props) {
  return (
    <div className="page-offset min-h-screen bg-[var(--color-background)]">
      <section className="relative overflow-hidden bg-[var(--color-surface-strong)] px-6 py-20 md:py-28">
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[color:rgba(255,69,0,0.08)] blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-[color:rgba(0,85,255,0.08)] blur-3xl" />
        <div className="relative mx-auto max-w-4xl text-center">
          <p className="mb-5 text-xs font-semibold uppercase tracking-widest text-[var(--color-primary)]">
            {page.heroEyebrow}
          </p>
          <h1 className="font-display mb-5 text-3xl font-bold leading-tight text-white md:text-5xl">
            {page.title}
          </h1>
          <div className="mx-auto mb-5 h-1 w-12 rounded-full bg-[var(--color-primary)]" />
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
            {page.subtitle}
          </p>
        </div>
      </section>

      <section className="px-6 py-14 md:py-18">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-[var(--color-border)] bg-white p-8 shadow-sm md:p-12">
          <StrapiRichText
            content={page.content}
            className="space-y-5 text-sm leading-7 text-[var(--color-muted-foreground)] md:text-base [&_a]:text-[var(--color-primary)] [&_blockquote]:rounded-r-2xl [&_blockquote]:bg-[var(--color-panel)] [&_blockquote]:py-3 [&_blockquote]:pr-4 [&_h1]:text-[var(--color-foreground)] [&_h2]:mt-8 [&_h2]:text-[var(--color-foreground)] [&_h3]:mt-6 [&_h3]:text-[var(--color-foreground)] [&_li]:marker:text-[var(--color-primary)] [&_p]:text-[var(--color-muted-foreground)]"
          />
        </div>
      </section>
    </div>
  );
}
