"use client";

import { useEffect, useState, type FormEvent } from "react";

import { ArrowRightIcon } from "@/components/icons";
import { CONTACT_PREFILL_STORAGE_KEY } from "@/lib/contact-prefill";
import type { ContactForm } from "@/lib/strapi";

type Props = {
  email: string;
  formCopy: ContactForm;
};

function getValue(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}

function buildMailtoUrl(email: string, subject: string, body: string) {
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function MailtoContactForm({ email, formCopy }: Props) {
  const [message, setMessage] = useState("");
  const projectOptions = formCopy.projectOptions
    .split("\n")
    .map((option) => option.trim())
    .filter(Boolean);

  useEffect(() => {
    try {
      const prefilledMessage = window.sessionStorage.getItem(CONTACT_PREFILL_STORAGE_KEY) ?? "";

      if (prefilledMessage) {
        setMessage(prefilledMessage);
        window.sessionStorage.removeItem(CONTACT_PREFILL_STORAGE_KEY);
      }
    } catch {
      // Ignore storage access issues and keep the form empty.
    }
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const firstName = getValue(formData, "firstName");
    const lastName = getValue(formData, "lastName");
    const senderEmail = getValue(formData, "email");
    const projectType = getValue(formData, "projectType");
    const message = getValue(formData, "message");
    const fullName = [firstName, lastName].filter(Boolean).join(" ");
    const subject = fullName ? `Kidsfera enquiry from ${fullName}` : "Kidsfera enquiry";
    const body = [
      `${formCopy.firstNameLabel}: ${firstName || "-"}`,
      `${formCopy.lastNameLabel}: ${lastName || "-"}`,
      `${formCopy.emailLabel}: ${senderEmail || "-"}`,
      `${formCopy.projectTypeLabel}: ${projectType || "-"}`,
      "",
      `${formCopy.messageLabel}:`,
      message || "-",
    ].join("\n");

    window.location.href = buildMailtoUrl(email, subject, body);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-[var(--color-border)] bg-white p-8"
    >
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-2 gap-4">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted-foreground)]">
              {formCopy.firstNameLabel}
            </span>
            <input
              name="firstName"
              placeholder={formCopy.firstNamePlaceholder}
              className="rounded-xl border-0 bg-[var(--color-panel)] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted-foreground)]">
              {formCopy.lastNameLabel}
            </span>
            <input
              name="lastName"
              placeholder={formCopy.lastNamePlaceholder}
              className="rounded-xl border-0 bg-[var(--color-panel)] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </label>
        </div>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted-foreground)]">
            {formCopy.emailLabel}
          </span>
          <input
            name="email"
            type="email"
            placeholder={formCopy.emailPlaceholder}
            className="rounded-xl border-0 bg-[var(--color-panel)] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted-foreground)]">
            {formCopy.projectTypeLabel}
          </span>
          <select
            name="projectType"
            defaultValue=""
            className="rounded-xl border-0 bg-[var(--color-panel)] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          >
            <option value="">{formCopy.projectTypePlaceholder}</option>
            {projectOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted-foreground)]">
            {formCopy.messageLabel}
          </span>
          <textarea
            name="message"
            rows={4}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={formCopy.messagePlaceholder}
            className="resize-none rounded-xl border-0 bg-[var(--color-panel)] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </label>
        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] py-3.5 font-semibold text-white transition-colors hover:bg-[#e03d00]"
        >
          {formCopy.submitLabel}
          <ArrowRightIcon className="h-[18px] w-[18px]" />
        </button>
        <p className="text-center text-xs text-[var(--color-muted-foreground)]">{formCopy.note}</p>
      </div>
    </form>
  );
}
