"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { ChevronLeftIcon, ChevronRightIcon, XIcon } from "@/components/icons";
import type { ImageLink } from "@/lib/strapi";

type Props = {
  images: ImageLink[];
  productName: string;
};

export function ProductGallery({ images, productName }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    setActiveIndex(0);
    setIsPreviewOpen(false);
  }, [images]);

  useEffect(() => {
    if (!isPreviewOpen || !images.length) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsPreviewOpen(false);
        return;
      }

      if (images.length < 2) {
        return;
      }

      if (event.key === "ArrowLeft") {
        setActiveIndex((current) => (current - 1 + images.length) % images.length);
      }

      if (event.key === "ArrowRight") {
        setActiveIndex((current) => (current + 1) % images.length);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [images.length, isPreviewOpen]);

  if (!images.length) {
    return (
      <div className="soft-panel flex aspect-[4/3] items-center justify-center text-sm text-[var(--color-muted-foreground)]">
        {productName}
      </div>
    );
  }

  const activeImage = images[activeIndex] ?? images[0];
  const goToPrevious = () =>
    setActiveIndex((current) => (current - 1 + images.length) % images.length);
  const goToNext = () => setActiveIndex((current) => (current + 1) % images.length);
  const handlePreviewTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };
  const handlePreviewTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (images.length < 2 || touchStartX.current === null) {
      touchStartX.current = null;
      return;
    }

    const touchEndX = event.changedTouches[0]?.clientX;

    if (typeof touchEndX !== "number") {
      touchStartX.current = null;
      return;
    }

    const deltaX = touchEndX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(deltaX) < 48) {
      return;
    }

    if (deltaX > 0) {
      goToPrevious();
      return;
    }

    goToNext();
  };

  return (
    <div>
      <div className="relative overflow-hidden rounded-[2rem] bg-[var(--color-panel)]">
        <div className="relative aspect-[4/3]">
          <Image
            alt={activeImage.alt || productName}
            className="object-cover"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            src={activeImage.url}
          />
          <button
            aria-label={`Open preview for ${activeImage.alt || productName}`}
            className="absolute inset-0 z-10 cursor-zoom-in"
            onClick={() => setIsPreviewOpen(true)}
            type="button"
          >
            <span className="sr-only">Open image preview</span>
          </button>
        </div>
        {images.length > 1 ? (
          <>
            <button
              aria-label="Previous image"
              className="absolute left-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[var(--color-foreground)] shadow"
              onClick={goToPrevious}
              type="button"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              aria-label="Next image"
              className="absolute right-4 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[var(--color-foreground)] shadow"
              onClick={goToNext}
              type="button"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
            <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
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
      {isPreviewOpen ? (
        <div
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-6"
          onClick={() => setIsPreviewOpen(false)}
          role="dialog"
        >
          <button
            aria-label="Close preview"
            className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white/12 text-white transition-colors hover:bg-white/18"
            onClick={() => setIsPreviewOpen(false)}
            type="button"
          >
            <XIcon className="h-5 w-5" />
          </button>

          {images.length > 1 ? (
            <>
              <button
                aria-label="Previous image"
                className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/12 text-white transition-colors hover:bg-white/18"
                onClick={(event) => {
                  event.stopPropagation();
                  goToPrevious();
                }}
                type="button"
              >
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <button
                aria-label="Next image"
                className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/12 text-white transition-colors hover:bg-white/18"
                onClick={(event) => {
                  event.stopPropagation();
                  goToNext();
                }}
                type="button"
              >
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </>
          ) : null}

          <div
            className="relative h-[min(82vh,52rem)] w-full max-w-6xl"
            onClick={(event) => event.stopPropagation()}
            onTouchEnd={handlePreviewTouchEnd}
            onTouchStart={handlePreviewTouchStart}
          >
            <Image
              alt={activeImage.alt || productName}
              className="object-contain"
              fill
              priority
              sizes="100vw"
              src={activeImage.url}
            />
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/12 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
            {activeIndex + 1} / {images.length}
          </div>
        </div>
      ) : null}
    </div>
  );
}
