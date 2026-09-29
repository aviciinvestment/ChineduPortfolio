"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Film } from "lucide-react";

export type Slide = { type: "image" | "video"; url: string };

const isHostedLocally = (url: string) =>
  url.startsWith("/") || url.includes("res.cloudinary.com");

function embedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, "");
    if (host === "youtube.com" || host === "m.youtube.com") {
      const id = parsed.searchParams.get("v") ?? parsed.pathname.split("/").filter(Boolean).pop();
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (host === "youtu.be") {
      const id = parsed.pathname.split("/").filter(Boolean)[0];
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (host === "vimeo.com" || host === "player.vimeo.com") {
      const id = parsed.pathname.split("/").filter(Boolean).pop();
      return id ? `https://player.vimeo.com/video/${id}` : null;
    }
  } catch {
    return null;
  }
  return null;
}

function ImageSlide({ url, alt, sizes }: { url: string; alt: string; sizes: string }) {
  if (isHostedLocally(url)) {
    return <Image src={url} alt={alt} fill sizes={sizes} className="object-contain pointer-events-none" draggable={false} />;
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={url} alt={alt} className="absolute inset-0 w-full h-full object-contain pointer-events-none" draggable={false} />;
}

function Thumb({ slide, alt }: { slide: Slide; alt: string }) {
  if (slide.type === "image" && isHostedLocally(slide.url)) {
    return (
      <div className="relative w-full h-full">
        <Image src={slide.url} alt={alt} fill sizes="80px" className="object-cover" />
      </div>
    );
  }
  if (slide.type === "image") {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={slide.url} alt={alt} className="w-full h-full object-cover" />;
  }
  return (
    <div className="w-full h-full flex items-center justify-center bg-panel-soft">
      <Film className="w-4 h-4 text-accent/70" />
    </div>
  );
}

export default function Slideshow({
  slides,
  title,
  cover,
}: {
  slides: Slide[];
  title: string;
  cover?: string | null;
}) {
  const items: Slide[] =
    slides.length > 0
      ? slides
      : cover
        ? [{ type: "image", url: cover }]
        : [];

  const [index, setIndex] = useState(0);

  if (items.length === 0) return null;

  const current = items[Math.min(index, items.length - 1)];
  const step = (delta: number) =>
    setIndex((prev) => (prev + delta + items.length) % items.length);
  const hasControls = items.length > 1;

  const controlClass =
    "absolute top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-black/50 text-white backdrop-blur-sm border border-white/20 hover:bg-warm hover:text-warm-fg hover:border-warm transition-colors";

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-2xl overflow-hidden border border-secondary/40 bg-secondary/10">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35 }}
            drag={hasControls ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = offset.x * velocity.x;
              if (swipe < -1000) step(1);
              else if (swipe > 1000) step(-1);
              else if (offset.x < -50) step(1);
              else if (offset.x > 50) step(-1);
            }}
            onClick={() => hasControls && step(1)}
            className={`absolute inset-0 ${hasControls ? "cursor-grab active:cursor-grabbing" : ""}`}
          >
            {current.type === "image" ? (
              <ImageSlide
                url={current.url}
                alt={`${title} — image ${index + 1} of ${items.length}`}
                sizes="(max-width: 768px) 100vw, 900px"
              />
            ) : embedUrl(current.url) ? (
              <iframe
                src={embedUrl(current.url) ?? ""}
                title={`${title} — video ${index + 1}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            ) : (
              <video
                key={current.url}
                src={current.url}
                controls
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-contain bg-black"
              />
            )}
          </motion.div>
        </AnimatePresence>

        {hasControls && (
          <>
            <button
              type="button"
              aria-label="Previous slide"
              onClick={() => step(-1)}
              className={`${controlClass} left-3`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={() => step(1)}
              className={`${controlClass} right-3`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm border border-white/20">
              {items.map((_, dotIndex) => (
                <button
                  key={dotIndex}
                  type="button"
                  aria-label={`Go to slide ${dotIndex + 1}`}
                  aria-current={dotIndex === index}
                  onClick={() => setIndex(dotIndex)}
                  className="flex h-7 items-center justify-center px-1.5 rounded-full"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all ${
                      dotIndex === index ? "w-5 bg-warm" : "w-1.5 bg-white/60 hover:bg-white"
                    }`}
                  />
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {hasControls && (
        <div className="flex items-center gap-3 overflow-x-auto pb-1">
          {items.map((slide, thumbIndex) => (
            <button
              key={`${slide.url}-${thumbIndex}`}
              type="button"
              aria-label={`Show slide ${thumbIndex + 1}`}
              onClick={() => setIndex(thumbIndex)}
              className={`relative shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                thumbIndex === index
                  ? "border-warm opacity-100 shadow-[0_0_18px_rgba(240,145,63,0.45)]"
                  : "border-transparent opacity-50 hover:opacity-80"
              }`}
            >
              <Thumb slide={slide} alt={`${title} thumbnail ${thumbIndex + 1}`} />
            </button>
          ))}
          <span className="shrink-0 text-xs font-bold uppercase tracking-widest text-accent/60 pl-1">
            {index + 1} / {items.length}
          </span>
        </div>
      )}
    </div>
  );
}
