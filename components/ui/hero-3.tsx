"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface HeroImage {
  src: string;
  alt?: string;
}

interface AnimatedMarqueeHeroProps {
  tagline: string;
  title: React.ReactNode;
  description: string;
  ctaText: string;
  ctaHref: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  images: (string | HeroImage)[];
  className?: string;
}

const FADE_VARIANTS = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 20 } },
} as const;

export const AnimatedMarqueeHero: React.FC<AnimatedMarqueeHeroProps> = ({
  tagline,
  title,
  description,
  ctaText,
  ctaHref,
  secondaryCtaText,
  secondaryCtaHref,
  images,
  className,
}) => {
  const [duration, setDuration] = React.useState(60);
  const [activeImageIndex, setActiveImageIndex] = React.useState(0);
  
  const parsedImages: HeroImage[] = images.map(img => 
    typeof img === 'string' ? { src: img, alt: "" } : img
  );
  
  const supportingImages = parsedImages.length > 1 ? parsedImages : [...parsedImages, ...parsedImages, ...parsedImages];
  const marqueeGroups = [0, 1, 2, 3];

  React.useEffect(() => {
    const check = () => setDuration(window.innerWidth < 768 ? 26 : 54);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  React.useEffect(() => {
    setActiveImageIndex(0);

    if (images.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveImageIndex((current) => (current + 1) % parsedImages.length);
    }, 10000);

    return () => window.clearInterval(timer);
  }, [parsedImages.length, images.length]);

  return (
    <section
      className={cn(
        "relative flex min-h-[720px] w-full items-center overflow-hidden bg-gray-950 px-4 py-28 text-center md:h-screen md:min-h-[760px]",
        className
      )}
    >
      {parsedImages.length > 0 ? (
        <div className="absolute inset-0">
          {parsedImages.map((img, index) => (
            <Image
              key={`${img.src}-${index}`}
              src={img.src}
              alt={img.alt || ""}
              fill
              priority={index === 0}
              className={cn(
                "object-cover object-center transition-opacity duration-1000 ease-out",
                index === activeImageIndex ? "opacity-100" : "opacity-0"
              )}
            />
          ))}
        </div>
      ) : (
        <div className="absolute inset-0 bg-gray-900 animate-pulse" />
      )}

      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/24 via-black/34 to-black/62" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_40%,transparent_0%,rgba(0,0,0,0.08)_48%,rgba(0,0,0,0.42)_100%)]" />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center">
        <motion.p
          initial="hidden"
          animate="show"
          variants={FADE_VARIANTS}
          className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/80 md:text-sm"
        >
          {tagline}
        </motion.p>

        <motion.h1
          initial="hidden"
          animate="show"
          variants={FADE_VARIANTS}
          className="text-4xl font-black tracking-tight text-white drop-shadow-[0_5px_24px_rgba(0,0,0,0.38)] sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {title}
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="show"
          variants={FADE_VARIANTS}
          transition={{ delay: 0.4 }}
          className="mt-6 max-w-2xl text-base font-medium text-white/90 md:text-lg"
        >
          {description}
        </motion.p>

        <motion.div
          initial="hidden"
          animate="show"
          variants={FADE_VARIANTS}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-primary text-white font-medium text-sm shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all"
          >
            {ctaText}
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
          {secondaryCtaText && secondaryCtaHref && (
            <Link
              href={secondaryCtaHref}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-white text-gray-800 font-medium text-sm"
            >
              {secondaryCtaText}
            </Link>
          )}
        </motion.div>
      </div>

      {parsedImages.length > 0 ? (
        <div className="absolute inset-x-0 bottom-10 z-[3] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] md:bottom-12">
          <motion.div
            className="flex w-max items-center"
            animate={{
              x: ["-25%", "0%"],
              transition: { ease: "linear", duration, repeat: Infinity },
            }}
          >
            {marqueeGroups.map((group) => (
              <div key={group} className="flex items-center gap-4 pr-4 md:gap-5 md:pr-5">
                {supportingImages.map((img, index) => (
                  <div key={`${group}-${index}`} className="relative h-24 w-36 flex-shrink-0 md:h-32 md:w-52">
                    <Image
                      src={img.src}
                      alt={img.alt || ""}
                      fill
                      sizes="(min-width: 768px) 13rem, 9rem"
                      className="rounded-xl border border-white/20 object-cover object-center shadow-2xl shadow-black/35"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      ) : (
        <div className="absolute inset-x-0 bottom-10 z-[3] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] md:bottom-12">
          <div className="flex w-max items-center">
            {marqueeGroups.map((group) => (
              <div key={group} className="flex items-center gap-4 pr-4 md:gap-5 md:pr-5">
                {[0, 1, 2, 3].map((index) => (
                  <div
                    key={`${group}-${index}`}
                    className="h-24 w-36 flex-shrink-0 rounded-xl bg-white/10 animate-pulse md:h-32 md:w-52"
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-28 bg-gradient-to-b from-transparent to-white" />
    </section>
  );
};
