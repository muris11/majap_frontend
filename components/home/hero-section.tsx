"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { FadeIn, FadeInStagger } from "@/components/ui/motion-wrapper";
import { HeroSlide } from "@/types";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface HeroSectionProps {
  slides?: HeroSlide[];
}

export function HeroSection({ slides = [] }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || slides.length === 0) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [isTransitioning, slides.length]);

  const nextSlide = useCallback(() => {
    if (slides.length === 0) return;
    goToSlide((currentIndex + 1) % slides.length);
  }, [currentIndex, slides.length, goToSlide]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [slides.length, nextSlide]);


  return (
    <section className="relative h-screen min-h-[600px] flex items-center overflow-hidden">
      {/* Background Images with Fade Transition */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 z-0 transition-opacity duration-500 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt="Hero slide"
            fill
            priority={index === 0}
            loading={index === 0 ? "eager" : "lazy"}
            quality={85}
            className="object-cover"
          />
        </div>
      ))}
      
      {/* Fallback background when no slides */}
      {slides.length === 0 && (
        <div className="absolute inset-0 z-0 bg-gray-900" />
      )}
      
      {/* Overlay */}
      <div className="absolute inset-0 z-[1]">
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
      </div>

      <Container className="relative z-10 pt-20">
        <FadeInStagger className="max-w-3xl text-white space-y-6 md:space-y-8">
          <FadeInStagger.Item>
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium backdrop-blur-sm shadow-lg">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Selamat Datang di MAJAP Polindra
            </span>
          </FadeInStagger.Item>
          
          <FadeInStagger.Item>
            <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tighter">
            Kagak Ngaruh <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-white">Tapi Berpengaruh</span>
            </h1>
          </FadeInStagger.Item>
          
          <FadeInStagger.Item>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-2xl font-light">
            Mahasiswa Jabodetabek Politeknik Indramayu
            </p>
          </FadeInStagger.Item>
          
          <FadeInStagger.Item className="flex flex-wrap gap-4">
            <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-primary hover:bg-primary-dark shadow-[0_0_20px_rgba(15,76,69,0.5)] hover:shadow-[0_0_30px_rgba(15,76,69,0.7)] transition-all duration-300 border-none" asChild>
              <Link href="/kegiatan">
                Lihat Kegiatan <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full bg-transparent border border-white/30 text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300" asChild>
              <Link href="/tentang">
                Tentang Kami
              </Link>
            </Button>
          </FadeInStagger.Item>
        </FadeInStagger>
      </Container>

      {/* Slide Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-primary w-8"
                  : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Scroll Indicator */}
      <div className="hidden md:flex absolute bottom-10 left-1/2 -translate-x-1/2 text-white flex-col items-center gap-2">
        <span className="text-xs uppercase tracking-widest opacity-70">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </div>
    </section>
  );
}
