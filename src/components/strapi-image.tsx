"use client";

import Image, { type ImageLoaderProps } from "next/image";

import type { MediaImage, MediaVariant } from "@/lib/strapi";

type Props = {
  image: MediaImage;
  alt: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
};

const LOCAL_URL_ORIGIN = "http://strapi-image.local";

function getCandidates(image: MediaImage): MediaVariant[] {
  const candidates = new Map<number, MediaVariant>();

  for (const variant of image.variants) {
    candidates.set(variant.width, variant);
  }

  if (image.width) {
    candidates.set(image.width, {
      url: image.url,
      width: image.width,
      height: image.height ?? 0,
    });
  }

  return [...candidates.values()].sort((left, right) => left.width - right.width);
}

function addRequestedWidth(url: string, width: number) {
  const parsedUrl = new URL(url, LOCAL_URL_ORIGIN);

  // Next validates that custom loaders use its requested width. Strapi has
  // already created the derivative, so this only distinguishes srcset entries;
  // the selected file itself comes from the list of Strapi formats below.
  parsedUrl.searchParams.set("w", String(width));

  return parsedUrl.origin === LOCAL_URL_ORIGIN
    ? `${parsedUrl.pathname}${parsedUrl.search}${parsedUrl.hash}`
    : parsedUrl.toString();
}

function createStrapiLoader(image: MediaImage) {
  const candidates = getCandidates(image);

  return ({ width }: ImageLoaderProps) => {
    const source =
      candidates.find((candidate) => candidate.width >= width)?.url ??
      candidates.at(-1)?.url ??
      image.url;

    return addRequestedWidth(source, width);
  };
}

// This stays on next/image for its generated srcset, stable layout, native
// lazy loading and LCP preload. Its custom loader selects only derivatives
// produced by Strapi, so it never uses Vercel Image Optimization.
export function StrapiImage({
  image,
  alt,
  className,
  fill = false,
  priority = false,
  sizes,
  width,
  height,
}: Props) {
  const loader = createStrapiLoader(image);

  if (fill) {
    return (
      <Image
        alt={alt}
        className={className}
        fill
        loader={loader}
        preload={priority}
        sizes={sizes}
        src={image.url}
      />
    );
  }

  return (
    <Image
      alt={alt}
      className={className}
      height={height ?? image.height ?? 1}
      loader={loader}
      preload={priority}
      sizes={sizes}
      src={image.url}
      width={width ?? image.width ?? 1}
    />
  );
}
