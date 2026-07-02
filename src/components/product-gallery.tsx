"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";
import type { ImageLink } from "@/lib/strapi";

type Props = {
  images: ImageLink[];
  productName: string;
};

export function ProductGallery({ images, productName }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  if (!images.length) {
    return (
      <div className="soft-panel flex aspect-[4/3] items-center justify-center text-sm text-[var(--color-muted-foreground)]">
        {productName}
      </div>
    );
  }

  const activeImage = images[activeIndex] ?? images[0];

  return (
    <div>
      <div className="relative overflow-hidden rounded-[2rem] bg-[var(--color-panel)]">
        <div className="relative aspect-[4/3]">
          <Image
            alt={activeImage.alt}
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            src={activeImage.url}
          />
        </div>
        {images.length > 1 ? (
          <>
            <button
              className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[var(--color-foreground)] shadow"
              onClick={() =>
                setActiveIndex((current) => (current - 1 + images.length) % images.length)
              }
              type="button"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[var(--color-foreground)] shadow"
              onClick={() => setActiveIndex((current) => (current + 1) % images.length)}
              type="button"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
              {images.map((image, index) => (
                <button
                  key={`${image.url}-${index}-dot`}
                  className={`h-2 rounded-full transition-all ${
                    index === activeIndex ? "w-5 bg-white" : "w-2 bg-white/50"
                  }`}
                  onClick={() => setActiveIndex(index)}
                  type="button"
                >
                  <span className="sr-only">{image.alt}</span>
                </button>
              ))}
            </div>
          </>
        ) : null}
      </div>
      {images.length > 1 ? (
        <div className="mt-3 grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={`${image.url}-${index}`}
              className={`overflow-hidden rounded-2xl border-2 ${
                index === activeIndex
                  ? "border-[var(--color-primary)]"
                  : "border-transparent"
              }`}
              onClick={() => setActiveIndex(index)}
              type="button"
            >
              <span className="sr-only">{image.alt}</span>
              <span className="relative block aspect-square">
                <Image
                  alt=""
                  className="object-cover"
                  fill
                  sizes="(min-width: 1024px) 8rem, 25vw"
                  src={image.url}
                />
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
