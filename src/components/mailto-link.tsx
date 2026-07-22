"use client";

import type { ReactNode } from "react";

type Props = {
  email: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
};

function openMailClient(email: string) {
  window.location.href = `mailto:${email}`;
}

export function MailtoLink({ email, className, children, ariaLabel }: Props) {
  return (
    <button
      type="button"
      className={className}
      aria-label={ariaLabel}
      onClick={() => openMailClient(email)}
    >
      {children}
    </button>
  );
}
