"use client";
 
 import { Container } from "@/components/ui/container";
 import { Section } from "@/components/ui/section";
import { getImageUrl } from "@/lib/utils";
import { DidYouKnowFact } from "@/types";
 import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
 
interface DidYouKnowSectionProps {
  facts: DidYouKnowFact[];
}
 
export function DidYouKnowSection({ facts }: DidYouKnowSectionProps) {
   const [currentIndex, setCurrentIndex] = useState(0);
   const [imageError, setImageError] = useState(false);
  const factsLength = facts?.length ?? 0;

  const goToNext = useCallback(() => {
    if (factsLength === 0) return;
    setCurrentIndex((prev) => (prev === factsLength - 1 ? 0 : prev + 1));
  }, [factsLength]);

  const goToPrevious = useCallback(() => {
    if (factsLength === 0) return;
    setCurrentIndex((prev) => (prev === 0 ? factsLength - 1 : prev - 1));
  }, [factsLength]);
 
  useEffect(() => {
    if (factsLength <= 1) return;

    const interval = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [factsLength, goToNext]);

  if (!facts || facts.length === 0) return null;
 
   return (
     <Section className="bg-amber-50/50">
       <Container>
         <div className="text-center mb-10 space-y-4">
           <h2 className="text-primary text-xs md:text-sm font-semibold tracking-widest uppercase">
             Tahukah Kamu?
           </h2>
           <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
             Fakta Menarik MAJAP
           </h3>
         </div>
 
         <div className="relative max-w-3xl mx-auto">
           <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-amber-50 shadow-lg">
             {!imageError ? (
              <Image
                src={getImageUrl(facts[currentIndex].image) || ''}
                 alt={facts[currentIndex].title}
                fill
                className="object-contain"
                 onError={() => setImageError(true)}
                sizes="(max-width: 768px) 100vw, 768px"
               />
             ) : (
               <div className="w-full h-full flex items-center justify-center text-gray-400">
                 <p>Gambar tidak tersedia</p>
               </div>
             )}
           </div>
 
           <button
             onClick={goToPrevious}
            className="hidden md:flex absolute md:-left-14 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-md items-center justify-center text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
             aria-label="Sebelumnya"
           >
            <ChevronLeft className="w-6 h-6" />
           </button>
 
           <button
             onClick={goToNext}
            className="hidden md:flex absolute md:-right-14 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-md items-center justify-center text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
             aria-label="Selanjutnya"
           >
            <ChevronRight className="w-6 h-6" />
           </button>
 
           <div className="flex justify-center gap-2 mt-6">
             {facts.map((_, index) => (
               <button
                 key={index}
                 onClick={() => setCurrentIndex(index)}
                 className={`w-3 h-3 rounded-full transition-colors ${
                   index === currentIndex
                     ? "bg-primary"
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
