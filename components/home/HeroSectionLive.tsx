"use client";

import { useLiveData } from "@/lib/hooks";
import { api } from "@/lib/api";
import { HeroSlide } from "@/types";
import Image from "next/image";
import { useState, useEffect } from "react";

export function HeroSectionLive() {
  const { data: slides, isLoading, error, lastUpdated } = useLiveData<HeroSlide[]>({
    resource: "hero_slides",
    fetcher: () => api.getHeroSlides(),
    pollInterval: 10000, // Check every 10 seconds
  });

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!slides || slides.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides]);

  if (isLoading) {
    return (
      <div className="relative h-[60vh] md:h-[80vh] bg-gray-200 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-400">Loading...</div>
        </div>
      </div>
    );
  }

  if (error || !slides || slides.length === 0) {
    return (
      <div className="relative h-[60vh] md:h-[80vh] bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-4">MAJAP Polindra</h1>
          <p className="text-gray-300">Mahasiswa Jabodetabek Polindra</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={`Slide ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      ))}

      {/* Slide indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}

      {/* Live indicator (optional, for debugging) */}
      {lastUpdated && process.env.NODE_ENV === "development" && (
        <div className="absolute top-4 right-4 bg-green-500/80 text-white text-xs px-2 py-1 rounded">
          Live: {lastUpdated.toLocaleTimeString()}
        </div>
      )}
    </div>
  );
}
