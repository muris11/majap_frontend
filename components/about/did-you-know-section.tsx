"use client";
 
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { getImageUrl } from "@/lib/utils";
import { DidYouKnowFact } from "@/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithSkeleton } from "@/components/ui/image-with-skeleton";
import { useCallback, useEffect, useState } from "react";
 
interface DidYouKnowSectionProps {
  facts: DidYouKnowFact[];
}
 
export function DidYouKnowSection({ facts }: DidYouKnowSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const factsLength = facts?.length ?? 0;

  const goToNext = useCallback(() => {
    if (factsLength === 0) return;
    setCurrentIndex((prev) => (prev === factsLength - 1 ? 0 : prev + 1));
  }, [factsLength]);

  const goToPrevious = useCallback(() => {
    if (factsLength === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? factsLength - 1 : prev - 1));
  }, [factsLength]);
 
  // Intelligent responsive auto-slide logic
  useEffect(() => {
    if (factsLength <= 1) return;

    const handleAutoSlide = () => {
      const isDesktop = window.innerWidth >= 768;
      // On desktop: if there are 2 or fewer facts, they are both visible, so don't slide
      // On mobile: if there are 2 facts, only 1 is visible, so it MUST slide
      if (isDesktop && factsLength <= 2) {
        return;
      }
      goToNext();
    };

    const interval = setInterval(handleAutoSlide, 5000);
    return () => clearInterval(interval);
  }, [factsLength, goToNext]);

  if (!facts || facts.length === 0) return null;

  const activeFact = facts[currentIndex];
  const nextFactIndex = (currentIndex + 1) % factsLength;
  const nextFact = factsLength > 1 ? facts[nextFactIndex] : null;

  // Navigation controls only needed on desktop if there are more than 2 facts
  const showNavigation = factsLength > 2;
 
  return (
    <Section className="bg-amber-50/20 py-16 md:py-20 relative overflow-hidden">
      {/* Backdrop soft blob from about.tsx concept */}
      <div className="size-[520px] -top-80 left-1/2 -translate-x-1/2 rounded-full absolute blur-[300px] -z-10 bg-[#FBFFE1] opacity-60"></div>
      
      <Container className="!px-0 md:!px-6 lg:!px-8">
        {/* Centered Heading with dash lines */}
        <SectionHeading
          tag="Tahukah Kamu?"
          title="Fakta Menarik MAJAP"
          center
          className="mb-8 px-4 md:px-0"
        />
 
        <div className="relative max-w-[1600px] mx-auto">
          {/* Main Slide Card Grid: Edge-to-edge on mobile (px-0), ultra-wide on desktop (md:px-2) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start justify-center px-0 md:px-2">
            
            {/* First Fact (Always visible) */}
            <div className="flex flex-col space-y-4 w-full">
              {/* aspect-[4/3] and rounded-none on mobile for massive edge-to-edge screen size; rounded-2xl aspect-[4/3] on desktop */}
              <div className="relative aspect-[4/3] rounded-none md:rounded-2xl overflow-hidden w-full bg-gray-50/40">
                <ImageWithSkeleton
                  src={getImageUrl(activeFact.image) || ''}
                  alt={activeFact.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 700px"
                />
              </div>
              <div className="text-center max-w-md mx-auto px-4 md:px-0">
                <h4 className="text-base md:text-lg font-bold text-gray-900 tracking-tight leading-snug">
                  {activeFact.title}
                </h4>
              </div>
            </div>

            {/* Second Fact (Visible on desktop only) */}
            {nextFact && (
              <div className="hidden md:flex flex-col space-y-4 w-full">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden w-full bg-gray-50/40">
                  <ImageWithSkeleton
                    src={getImageUrl(nextFact.image) || ''}
                    alt={nextFact.title}
                    fill
                    className="object-contain"
                    sizes="700px"
                  />
                </div>
                <div className="text-center max-w-md mx-auto">
                  <h4 className="text-base md:text-lg font-bold text-gray-900 tracking-tight leading-snug">
                    {nextFact.title}
                  </h4>
                </div>
              </div>
            )}
            
          </div>
 
          {/* Navigation Chevrons - Only rendered if more than 2 facts exist */}
          {showNavigation && (
            <>
              <button
                onClick={goToPrevious}
                className="hidden md:flex absolute -left-4 top-[calc(50%-24px)] -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-sm items-center justify-center text-gray-700 hover:bg-gray-50 hover:text-primary transition-all duration-200 border border-gray-100"
                aria-label="Sebelumnya"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
     
              <button
                onClick={goToNext}
                className="hidden md:flex absolute -right-4 top-[calc(50%-24px)] -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-sm items-center justify-center text-gray-700 hover:bg-gray-50 hover:text-primary transition-all duration-200 border border-gray-100"
                aria-label="Selanjutnya"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
 
          {/* Dot Indicators: Always show on mobile; only show on desktop if > 2 facts */}
          <div className={`flex justify-center gap-2 mt-8 ${factsLength <= 2 ? "md:hidden" : ""}`}>
            {facts.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "bg-primary w-6"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
