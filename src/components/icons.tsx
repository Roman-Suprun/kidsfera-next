import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function BaseIcon(props: IconProps) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
      {...props}
    />
  );
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </BaseIcon>
  );
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m9 18 6-6-6-6" />
    </BaseIcon>
  );
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m15 18-6-6 6-6" />
    </BaseIcon>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m6 9 6 6 6-6" />
    </BaseIcon>
  );
}

export function ChevronUpIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m18 15-6-6-6 6" />
    </BaseIcon>
  );
}

export function SlidersHorizontalIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M3 6h18" />
      <path d="M3 12h18" />
      <path d="M3 18h18" />
      <circle cx="8" cy="6" r="2" fill="currentColor" stroke="none" />
      <circle cx="14" cy="12" r="2" fill="currentColor" stroke="none" />
      <circle cx="10" cy="18" r="2" fill="currentColor" stroke="none" />
    </BaseIcon>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m12 3.6 2.58 5.24 5.78.84-4.18 4.08.99 5.76L12 16.8 6.83 19.52l.99-5.76L3.64 9.68l5.78-.84L12 3.6Z" />
    </BaseIcon>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72l.34 2.72a2 2 0 0 1-.57 1.72L7.1 9.9a16 16 0 0 0 7 7l1.74-1.78a2 2 0 0 1 1.72-.57l2.72.34A2 2 0 0 1 22 16.92Z" />
    </BaseIcon>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 6.28a2 2 0 0 1-2.06 0L2 7" />
    </BaseIcon>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 21s7-4.35 7-11a7 7 0 1 0-14 0c0 6.65 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </BaseIcon>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5l3 1.75" />
    </BaseIcon>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect width="18" height="16" x="3" y="5" rx="2" />
      <path d="M16 3v4" />
      <path d="M8 3v4" />
      <path d="M3 10h18" />
    </BaseIcon>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
    </BaseIcon>
  );
}

export function WrenchIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m14.7 6.3 3 3" />
      <path d="M5 19a2 2 0 1 1 2.83-2.83l8.49-8.49a3 3 0 1 0-4.24-4.24L3.59 11.93A5 5 0 1 0 10.66 19Z" />
    </BaseIcon>
  );
}

export function ZapIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
    </BaseIcon>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15 15 0 0 1 0 20" />
      <path d="M12 2a15 15 0 0 0 0 20" />
    </BaseIcon>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </BaseIcon>
  );
}

export function XIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </BaseIcon>
  );
}

type FilledIconProps = SVGProps<SVGSVGElement>;

export function FacebookIcon(props: FilledIconProps) {
  return (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M13.5 21v-7h2.35l.4-2.92H13.5V9.22c0-.84.23-1.42 1.44-1.42h1.54V5.18c-.27-.04-1.18-.12-2.25-.12-2.22 0-3.73 1.35-3.73 3.84v2.18H8v2.92h2.5v7h3Z" />
    </svg>
  );
}

export function InstagramIcon(props: FilledIconProps) {
  return (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M7.75 3h8.5A4.75 4.75 0 0 1 21 7.75v8.5A4.75 4.75 0 0 1 16.25 21h-8.5A4.75 4.75 0 0 1 3 16.25v-8.5A4.75 4.75 0 0 1 7.75 3Zm0 1.75A3 3 0 0 0 4.75 7.75v8.5a3 3 0 0 0 3 3h8.5a3 3 0 0 0 3-3v-8.5a3 3 0 0 0-3-3h-8.5Zm8.8 1.3a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.75a3.25 3.25 0 1 0 0 6.5 3.25 3.25 0 0 0 0-6.5Z" />
    </svg>
  );
}

export function LinkedInIcon(props: FilledIconProps) {
  return (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M6.46 8.06a1.53 1.53 0 1 1 0-3.06 1.53 1.53 0 0 1 0 3.06ZM5.1 9.64h2.73V19H5.1V9.64Zm4.42 0h2.61v1.28h.04c.36-.69 1.25-1.41 2.57-1.41 2.76 0 3.27 1.82 3.27 4.18V19h-2.73v-4.74c0-1.13-.02-2.58-1.57-2.58-1.58 0-1.82 1.23-1.82 2.5V19H9.52V9.64Z" />
    </svg>
  );
}

export function YouTubeIcon(props: FilledIconProps) {
  return (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M21.58 7.19a2.83 2.83 0 0 0-1.98-2C17.86 4.75 12 4.75 12 4.75s-5.86 0-7.6.44a2.83 2.83 0 0 0-1.98 2 29.4 29.4 0 0 0-.42 4.81c0 1.63.14 3.24.42 4.81a2.83 2.83 0 0 0 1.98 2c1.74.44 7.6.44 7.6.44s5.86 0 7.6-.44a2.83 2.83 0 0 0 1.98-2c.28-1.57.42-3.18.42-4.81 0-1.63-.14-3.24-.42-4.81ZM10.1 15.1V8.9L15.55 12l-5.45 3.1Z" />
    </svg>
  );
}

export function TelegramIcon(props: FilledIconProps) {
  return (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M21.44 4.62 18.2 19.9c-.24 1.08-.89 1.35-1.79.84l-4.95-3.65-2.39 2.3c-.26.26-.48.48-.99.48l.36-5.09 9.27-8.37c.4-.36-.09-.56-.62-.2L5.64 13.4.71 11.86c-1.07-.34-1.09-1.07.22-1.58L20.18 2.9c.89-.33 1.67.2 1.26 1.72Z" />
    </svg>
  );
}

export function WhatsAppIcon(props: FilledIconProps) {
  return (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M12 3a8.88 8.88 0 0 0-7.7 13.32L3 21l4.82-1.26A8.99 8.99 0 1 0 12 3Zm0 16.25a7.17 7.17 0 0 1-3.65-1l-.26-.16-2.86.75.77-2.79-.17-.28A7.22 7.22 0 1 1 12 19.25Zm3.96-5.4c-.22-.11-1.31-.65-1.51-.72-.2-.07-.35-.11-.5.11-.14.22-.57.72-.7.87-.13.14-.26.16-.48.05a5.86 5.86 0 0 1-1.72-1.06 6.42 6.42 0 0 1-1.18-1.47c-.12-.22-.01-.34.1-.46.1-.1.22-.26.32-.39.11-.13.14-.22.22-.37.07-.14.03-.27-.02-.38-.06-.11-.5-1.21-.69-1.66-.18-.43-.37-.37-.5-.37l-.43-.01a.82.82 0 0 0-.6.28c-.2.22-.78.76-.78 1.86 0 1.09.8 2.15.9 2.3.11.15 1.57 2.4 3.8 3.36.53.23.95.37 1.27.47.53.17 1.01.14 1.39.08.42-.06 1.31-.54 1.5-1.06.18-.52.18-.96.13-1.06-.05-.09-.2-.14-.42-.25Z" />
    </svg>
  );
}

export function TikTokIcon(props: FilledIconProps) {
  return (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M14.87 3c.2 1.68 1.16 3.2 2.63 4.08.94.57 2.03.87 3.14.87v2.95a8.54 8.54 0 0 1-3.44-.73v5.39A5.56 5.56 0 1 1 11.64 10c.33 0 .65.03.96.09v3.03a2.62 2.62 0 1 0 1.67 2.44V3h2.6Z" />
    </svg>
  );
}

export function XSocialIcon(props: FilledIconProps) {
  return (
    <svg aria-hidden="true" fill="currentColor" viewBox="0 0 24 24" {...props}>
      <path d="M18.9 3H22l-6.77 7.74L23 21h-6.1l-4.77-6.24L6.67 21H3.56l7.24-8.28L3.38 3h6.25l4.3 5.68L18.9 3Zm-1.07 16.17h1.72L8.69 4.74H6.85l10.98 14.43Z" />
    </svg>
  );
}
