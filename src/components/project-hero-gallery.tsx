"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import type { ImageLink } from "@/lib/strapi";

type Props = {
  images: ImageLink[];
  title: string;
};

export function ProjectHeroGallery({ images, title }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  if (!images.length) {
    return <div className="relative h-[55vh] bg-[var(--color-surface-strong)]" />;
  }

  const activeImage = images[activeIndex] ?? images[0];
  const previewImages = images.slice(0, 5);

  return (
    <div className="relative h-[55vh] overflow-hidden bg-[var(--color-surface-strong)]">
      <Image
        alt={activeImage.alt || title}
        className="object-cover opacity-90"
        fill
        priority
        sizes="100vw"
        src={activeImage.url}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.28)_55%,rgba(0,0,0,0.5)_100%)]" />

      {images.length > 1 ? (
        <>
          <button
            aria-label="Previous image"
            className="absolute left-6 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/18 text-white backdrop-blur-sm transition-colors hover:bg-black/30"
            onClick={() =>
              setActiveIndex((current) => (current - 1 + images.length) % images.length)
            }
            type="button"
          >
            <ChevronLeftIcon className="h-5 w-5" />
          </button>
          <button
            aria-label="Next image"
            className="absolute right-6 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/18 text-white backdrop-blur-sm transition-colors hover:bg-black/30"
            onClick={() => setActiveIndex((current) => (current + 1) % images.length)}
            type="button"
          >
            <ChevronRightIcon className="h-5 w-5" />
          </button>

          <div className="absolute bottom-8 left-1/2 flex max-w-[calc(100%-3rem)] -translate-x-1/2 items-center gap-2.5 overflow-x-auto px-1 py-1">
            {previewImages.map((image, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={`${image.url}-${index}`}
                  aria-label={`Show image ${index + 1}`}
                  className={`group relative h-[3rem] w-[6.5rem] shrink-0 overflow-hidden rounded-full transition-all duration-200 sm:h-[3.15rem] sm:w-[6.8rem] ${
                    isActive
                      ? "scale-100 border-[3px] border-white shadow-[0_12px_28px_rgba(0,0,0,0.24)]"
                      : "scale-[0.98] border border-white/18 shadow-[0_10px_24px_rgba(0,0,0,0.18)] hover:scale-100"
                  }`}
                  onClick={() => setActiveIndex(index)}
                  type="button"
                >
                  <Image
                    alt={image.alt || title}
                    className="object-cover"
                    fill
                    sizes="(min-width: 640px) 109px, 104px"
                    src={image.url}
                  />
                  <span
                    className={`absolute inset-0 transition-colors duration-200 ${
                      isActive
                        ? "bg-transparent"
                        : "bg-[linear-gradient(180deg,rgba(44,36,24,0.14)_0%,rgba(31,24,15,0.3)_100%)] group-hover:bg-[linear-gradient(180deg,rgba(44,36,24,0.08)_0%,rgba(31,24,15,0.18)_100%)]"
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
}
