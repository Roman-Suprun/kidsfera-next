"use client";

import { useEffect, useState, type FormEvent } from "react";

import { ArrowRightIcon, StarIcon, XIcon } from "@/components/icons";
import { StrapiRichText } from "@/components/strapi-rich-text";
import { type Locale } from "@/lib/i18n";
import type {
  Feedback,
  FeedbackSummary,
  FeedbackTargetType,
} from "@/lib/strapi";

type Props = {
  locale: Locale;
  targetType: FeedbackTargetType;
  targetSlug: string;
  targetLabel: string;
  feedbacks: Feedback[];
  summary: FeedbackSummary;
  className?: string;
};

type FeedbackCopy = {
  sectionTitle: string;
  sectionDescription: string;
  leaveFeedback: string;
  moderationNote: string;
  noReviews: string;
  ratingLabel: string;
  ratingValueLabel: (value: number) => string;
  nameLabel: string;
  namePlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submit: string;
  cancel: string;
  submitting: string;
  success: string;
  error: string;
  dialogTitle: string;
  dialogDescription: string;
  close: string;
  approvedReviewLabel: (count: number) => string;
};

const feedbackCopy: Record<Locale, FeedbackCopy> = {
  en: {
    sectionTitle: "Customer feedback",
    sectionDescription: "Approved feedback from real clients appears here after moderation in Strapi.",
    leaveFeedback: "Leave feedback",
    moderationNote: "Every new review is saved as a draft and must be approved in Strapi before it appears on the site.",
    noReviews: "No approved feedback yet.",
    ratingLabel: "Rating",
    ratingValueLabel: (value) => `${value} out of 5`,
    nameLabel: "Name",
    namePlaceholder: "Your name",
    messageLabel: "Feedback",
    messagePlaceholder: "Share what you liked, what could be improved, or how this product/project worked for you.",
    submit: "Send",
    cancel: "Cancel",
    submitting: "Sending...",
    success: "Thank you. Your feedback was sent for moderation.",
    error: "We couldn’t send your feedback right now. Please try again.",
    dialogTitle: "Leave feedback",
    dialogDescription: "Your review will be saved as a draft first, then shown after approval.",
    close: "Close dialog",
    approvedReviewLabel: (count) => `${count} approved review${count === 1 ? "" : "s"}`,
  },
  uk: {
    sectionTitle: "Відгуки клієнтів",
    sectionDescription: "Тут з’являються лише схвалені відгуки реальних клієнтів після модерації.",
    leaveFeedback: "Залишити відгук",
    moderationNote: "",
    noReviews: "Поки немає схвалених відгуків.",
    ratingLabel: "Оцінка",
    ratingValueLabel: (value) => `${value} з 5`,
    nameLabel: "Ім'я",
    namePlaceholder: "Ваше ім'я",
    messageLabel: "Відгук",
    messagePlaceholder: "Напишіть, що вам сподобалося, що можна покращити або як цей продукт чи проєкт показав себе на практиці.",
    submit: "Надіслати",
    cancel: "Скасувати",
    submitting: "Надсилання...",
    success: "Дякуємо. Ваш відгук надіслано на модерацію.",
    error: "Не вдалося надіслати відгук. Спробуйте ще раз.",
    dialogTitle: "Залишити відгук",
    dialogDescription: "Спочатку відгук буде збережений як чернетка, а після схвалення з’явиться на сайті.",
    close: "Закрити діалог",
    approvedReviewLabel: (count) => {
      const mod10 = count % 10;
      const mod100 = count % 100;

      if (mod10 === 1 && mod100 !== 11) {
        return `${count} схвалений відгук`;
      }

      if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
        return `${count} схвалені відгуки`;
      }

      return `${count} схвалених відгуків`;
    },
  },
  ru: {
    sectionTitle: "Отзывы клиентов",
    sectionDescription: "Здесь показываются только одобренные отзывы реальных клиентов после модерации в Strapi.",
    leaveFeedback: "Оставить отзыв",
    moderationNote: "Каждый новый отзыв сохраняется как черновик и должен быть одобрен в Strapi перед публикацией.",
    noReviews: "Пока нет одобренных отзывов.",
    ratingLabel: "Оценка",
    ratingValueLabel: (value) => `${value} из 5`,
    nameLabel: "Имя",
    namePlaceholder: "Ваше имя",
    messageLabel: "Отзыв",
    messagePlaceholder: "Расскажите, что вам понравилось, что можно улучшить и как этот продукт или проект показал себя на практике.",
    submit: "Отправить",
    cancel: "Отмена",
    submitting: "Отправка...",
    success: "Спасибо. Ваш отзыв отправлен на модерацию.",
    error: "Не удалось отправить отзыв. Попробуйте еще раз.",
    dialogTitle: "Оставить отзыв",
    dialogDescription: "Сначала отзыв будет сохранен как черновик, а после одобрения появится на сайте.",
    close: "Закрыть диалог",
    approvedReviewLabel: (count) => {
      const mod10 = count % 10;
      const mod100 = count % 100;

      if (mod10 === 1 && mod100 !== 11) {
        return `${count} одобренный отзыв`;
      }

      if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
        return `${count} одобренных отзыва`;
      }

      return `${count} одобренных отзывов`;
    },
  },
  pl: {
    sectionTitle: "Opinie klientów",
    sectionDescription: "Tutaj pojawiają się tylko zatwierdzone opinie prawdziwych klientów po moderacji w Strapi.",
    leaveFeedback: "Dodaj opinię",
    moderationNote: "Każda nowa opinia jest zapisywana jako szkic i musi zostać zatwierdzona w Strapi przed publikacją.",
    noReviews: "Nie ma jeszcze zatwierdzonych opinii.",
    ratingLabel: "Ocena",
    ratingValueLabel: (value) => `${value} z 5`,
    nameLabel: "Imię",
    namePlaceholder: "Twoje imię",
    messageLabel: "Opinia",
    messagePlaceholder: "Napisz, co Ci się spodobało, co można poprawić i jak ten produkt lub projekt sprawdził się w praktyce.",
    submit: "Wyślij",
    cancel: "Anuluj",
    submitting: "Wysyłanie...",
    success: "Dziękujemy. Twoja opinia została wysłana do moderacji.",
    error: "Nie udało się wysłać opinii. Spróbuj ponownie.",
    dialogTitle: "Dodaj opinię",
    dialogDescription: "Najpierw opinia zostanie zapisana jako szkic, a na stronie pojawi się dopiero po zatwierdzeniu.",
    close: "Zamknij okno",
    approvedReviewLabel: (count) => `${count} zatwierdzon${count === 1 ? "a opinia" : count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 12 || count % 100 > 14) ? "e opinie" : "ych opinii"}`,
  },
};

function joinClassNames(...values: Array<string | undefined>) {
  return values.filter(Boolean).join(" ");
}

function formatDate(locale: Locale, value: string | null | undefined) {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(parsed);
}

function getFilledStars(rating: number) {
  return Math.max(0, Math.min(5, Math.round(rating)));
}

export function FeedbackSection({
  locale,
  targetType,
  targetSlug,
  targetLabel,
  feedbacks,
  summary,
  className,
}: Props) {
  const copy = feedbackCopy[locale];
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeydown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [isOpen]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("submitting");

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          locale,
          targetType,
          targetSlug,
          rating,
          name,
          content: message,
          website,
        }),
      });

      if (!response.ok) {
        throw new Error(`Feedback submit failed: ${response.status}`);
      }

      setStatus("success");
      setIsOpen(false);
      setRating(5);
      setName("");
      setMessage("");
      setWebsite("");
    } catch {
      setStatus("error");
    }
  }

  const averageRatingLabel =
    summary.averageRating !== null ? `${summary.averageRating.toFixed(1)} / 5` : null;
  const filledAverageStars = summary.averageRating !== null ? getFilledStars(summary.averageRating) : 0;

  return (
    <section
      className={joinClassNames(
        "rounded-[2rem] border border-[var(--color-border)] bg-white p-6 md:p-8",
        className,
      )}
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-2xl">
          <p className="small-label">{copy.sectionTitle}</p>
          <h2 className="font-display mt-3 text-2xl font-bold">
            {targetLabel}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
            {copy.sectionDescription}
          </p>
          {copy.moderationNote ? (
            <p className="mt-3 text-xs leading-relaxed text-[var(--color-muted-foreground)]">
              {copy.moderationNote}
            </p>
          ) : null}
        </div>

        <div className="rounded-3xl bg-[var(--color-panel)] p-5 lg:min-w-[18rem]">
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon
                  key={`summary-star-${index}`}
                  className={joinClassNames(
                    "h-4 w-4",
                    index < filledAverageStars
                      ? "fill-[var(--color-accent)] text-[var(--color-accent)]"
                      : "text-[var(--color-border)]",
                  )}
                />
              ))}
            </div>
            <div className="text-sm">
              {averageRatingLabel ? (
                <p className="font-semibold">{averageRatingLabel}</p>
              ) : (
                <p className="font-semibold">{copy.noReviews}</p>
              )}
              <p className="text-xs text-[var(--color-muted-foreground)]">
                {summary.totalCount > 0 ? copy.approvedReviewLabel(summary.totalCount) : copy.noReviews}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e03d00]"
          >
            {copy.leaveFeedback}
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>

      {status === "success" ? (
        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          {copy.success}
        </div>
      ) : null}

      {status === "error" ? (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {copy.error}
        </div>
      ) : null}

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {feedbacks.length ? (
          feedbacks.map((feedback) => {
            const publishedLabel = formatDate(locale, feedback.publishedAt ?? feedback.createdAt);
            const filledStars = getFilledStars(feedback.rating);

            return (
              <article
                key={feedback.documentId ?? feedback.id ?? `${feedback.name}-${feedback.createdAt ?? "feedback"}`}
                className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-background)] p-5"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-base font-bold">{feedback.name}</p>
                    {publishedLabel ? (
                      <p className="mt-1 text-xs text-[var(--color-muted-foreground)]">
                        {publishedLabel}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <StarIcon
                        key={`${feedback.documentId ?? feedback.id ?? feedback.name}-star-${index}`}
                        className={joinClassNames(
                          "h-3.5 w-3.5",
                          index < filledStars
                            ? "fill-[var(--color-accent)] text-[var(--color-accent)]"
                            : "text-[var(--color-border)]",
                        )}
                      />
                    ))}
                  </div>
                </div>
                <StrapiRichText
                  className="text-sm leading-relaxed text-[var(--color-muted-foreground)]"
                  content={feedback.content}
                />
              </article>
            );
          })
        ) : (
          <div className="rounded-3xl border border-dashed border-[var(--color-border)] bg-[var(--color-background)] p-6 text-sm text-[var(--color-muted-foreground)] md:col-span-2 xl:col-span-3">
            {copy.noReviews}
          </div>
        )}
      </div>

      {isOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(20,18,16,0.65)] px-4 py-8">
          <div className="max-h-full w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white p-6 shadow-2xl md:p-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="small-label">{copy.dialogTitle}</p>
                <h3 className="font-display mt-3 text-2xl font-bold">{targetLabel}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted-foreground)]">
                  {copy.dialogDescription}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--color-panel)] text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-panel-strong)]"
              >
                <span className="sr-only">{copy.close}</span>
                <XIcon className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted-foreground)]">
                  {copy.ratingLabel}
                </span>
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, index) => {
                      const starValue = index + 1;

                      return (
                        <button
                          key={`rating-${starValue}`}
                          type="button"
                          onClick={() => setRating(starValue)}
                          className="inline-flex rounded-full p-1 transition-transform hover:scale-105"
                          aria-label={copy.ratingValueLabel(starValue)}
                          aria-pressed={rating === starValue}
                        >
                          <StarIcon
                            className={joinClassNames(
                              "h-6 w-6",
                              starValue <= rating
                                ? "fill-[var(--color-accent)] text-[var(--color-accent)]"
                                : "text-[var(--color-border)]",
                            )}
                          />
                        </button>
                      );
                    })}
                  </div>
                  <span className="text-sm font-medium text-[var(--color-muted-foreground)]">
                    {copy.ratingValueLabel(rating)}
                  </span>
                </div>
              </div>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted-foreground)]">
                  {copy.nameLabel}
                </span>
                <input
                  required
                  maxLength={80}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder={copy.namePlaceholder}
                  className="rounded-2xl border-0 bg-[var(--color-panel)] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </label>

              <label className="hidden" aria-hidden="true">
                <span>Website</span>
                <input
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                />
              </label>

              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted-foreground)]">
                  {copy.messageLabel}
                </span>

                <textarea
                  required
                  rows={8}
                  minLength={10}
                  maxLength={4000}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder={copy.messagePlaceholder}
                  className="resize-y rounded-2xl border-0 bg-[var(--color-panel)] px-4 py-3 text-sm leading-relaxed outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
                />
              </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center rounded-2xl bg-[var(--color-panel)] px-5 py-3 text-sm font-semibold text-[var(--color-foreground)] transition-colors hover:bg-[var(--color-panel-strong)]"
                >
                  {copy.cancel}
                </button>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--color-primary)] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#e03d00] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "submitting" ? copy.submitting : copy.submit}
                  <ArrowRightIcon className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </section>
  );
}
