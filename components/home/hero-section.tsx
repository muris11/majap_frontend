"use client";

import { HeroSlide } from "@/types";
import { AnimatedMarqueeHero } from "@/components/ui/hero-3";
import { api } from "@/lib/api";
import { useEffect, useMemo, useState } from "react";

interface HeroSectionProps {
  slides?: HeroSlide[];
}

function areSameSlides(current: HeroSlide[], next: HeroSlide[]) {
  if (current.length !== next.length) return false;

  return current.every((slide, index) => {
    const nextSlide = next[index];
    return slide.id === nextSlide?.id && slide.image === nextSlide.image;
  });
}

export function HeroSection({ slides = [] }: HeroSectionProps) {
  const [liveSlides, setLiveSlides] = useState<HeroSlide[]>(slides);

  useEffect(() => {
    let isMounted = true;

    async function refreshSlides() {
      try {
        const nextSlides = await api.getHeroSlides();
        if (isMounted) {
          setLiveSlides((currentSlides) =>
            areSameSlides(currentSlides, nextSlides) ? currentSlides : nextSlides
          );
        }
      } catch {
      }
    }

    refreshSlides();
    const interval = window.setInterval(refreshSlides, 5000);

    return () => {
      isMounted = false;
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setLiveSlides((currentSlides) =>
      areSameSlides(currentSlides, slides) ? currentSlides : slides
    );
  }, [slides]);

  const images = useMemo(
    () => liveSlides.map((s) => s.image).filter(Boolean),
    [liveSlides]
  );

  return (
    <AnimatedMarqueeHero
      tagline="Selamat Datang di MAJAP Polindra"
      title={
        <>
          Kagak Ngaruh
          <br />
          <span className="bg-gradient-to-r from-primary via-primary-light to-white bg-clip-text text-transparent">
            Tapi Berpengaruh
          </span>
        </>
      }
      description="Mahasiswa Jabodetabek Politeknik Negeri Indramayu"
      ctaText="Lihat Kegiatan"
      ctaHref="/kegiatan"
      secondaryCtaText="Tentang Kami"
      secondaryCtaHref="/tentang"
      images={images}
    />
  );
}
