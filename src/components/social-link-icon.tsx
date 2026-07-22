import type { SVGProps } from "react";

import {
  FacebookIcon,
  GlobeIcon,
  InstagramIcon,
  LinkedInIcon,
  TelegramIcon,
  TikTokIcon,
  WhatsAppIcon,
  XSocialIcon,
  YouTubeIcon,
} from "@/components/icons";
import type { SocialLink } from "@/lib/strapi";

type Props = {
  platform: SocialLink["platform"];
  className?: string;
};

type IconComponent = (props: SVGProps<SVGSVGElement>) => ReturnType<typeof GlobeIcon>;

const socialIconMap: Record<SocialLink["platform"], IconComponent> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  linkedin: LinkedInIcon,
  youtube: YouTubeIcon,
  telegram: TelegramIcon,
  whatsapp: WhatsAppIcon,
  tiktok: TikTokIcon,
  x: XSocialIcon,
  custom: GlobeIcon,
};

export function SocialLinkIcon({ platform, className }: Props) {
  const Icon = socialIconMap[platform] ?? GlobeIcon;

  return <Icon className={className} />;
}
