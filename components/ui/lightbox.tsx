 "use client";
 
 import { X, ChevronLeft, ChevronRight } from "lucide-react";
 import { useCallback, useEffect, useState } from "react";
 
 interface LightboxProps {
   images: { src: string; caption?: string | null }[];
   initialIndex?: number;
   isOpen: boolean;
   onClose: () => void;
 }
 
 export function Lightbox({ images, initialIndex = 0, isOpen, onClose }: LightboxProps) {
   const [currentIndex, setCurrentIndex] = useState(initialIndex);
 
   useEffect(() => {
     setCurrentIndex(initialIndex);
   }, [initialIndex]);
 
   const handlePrev = useCallback(() => {
     setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
   }, [images.length]);
 
   const handleNext = useCallback(() => {
     setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
   }, [images.length]);
 
   useEffect(() => {
     if (!isOpen) return;
 
     const handleKeyDown = (e: KeyboardEvent) => {
       if (e.key === "Escape") onClose();
       if (e.key === "ArrowLeft") handlePrev();
       if (e.key === "ArrowRight") handleNext();
     };
 
     document.body.style.overflow = "hidden";
     window.addEventListener("keydown", handleKeyDown);
 
     return () => {
       document.body.style.overflow = "";
       window.removeEventListener("keydown", handleKeyDown);
     };
   }, [isOpen, onClose, handlePrev, handleNext]);
 
   if (!isOpen || images.length === 0) return null;
 
   const currentImage = images[currentIndex];
 
   return (
     <div 
     className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex items-center justify-center transition-all duration-300"
     style={{ cursor: 'default' }}
       onClick={onClose}
     >
       {/* Close button */}
       <button
         onClick={onClose}
       className="absolute top-6 right-6 text-white/70 hover:text-white z-[10001] p-2 hover:bg-white/10 rounded-full transition-all cursor-pointer"
       >
         <X size={32} />
       </button>
 
       {/* Navigation - Previous */}
       {images.length > 1 && (
         <button
           onClick={(e) => { e.stopPropagation(); handlePrev(); }}
         className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-[10001] p-3 hover:bg-white/10 rounded-full transition-all group cursor-pointer"
         >
          <ChevronLeft size={48} className="transition-transform group-hover:-translate-x-1" />
         </button>
       )}
 
       {/* Image */}
       <div 
       className="relative w-full h-full flex items-center justify-center p-4 md:p-12 cursor-default"
         onClick={(e) => e.stopPropagation()}
       >
         <img
           src={currentImage.src}
           alt={currentImage.caption || "Photo"}
          className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
         />
        
        {/* Caption Overlay */}
        <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none">
          <div className="inline-block bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 pointer-events-auto">
         {currentImage.caption && (
           <p className="text-white font-medium text-sm md:text-base mb-1">{currentImage.caption}</p>
         )}
         <p className="text-white/50 text-xs font-mono uppercase tracking-widest">
           {currentIndex + 1} <span className="mx-1">/</span> {images.length}
         </p>
          </div>
        </div>
       </div>
 
       {/* Navigation - Next */}
       {images.length > 1 && (
         <button
           onClick={(e) => { e.stopPropagation(); handleNext(); }}
         className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-[10001] p-3 hover:bg-white/10 rounded-full transition-all group cursor-pointer"
         >
          <ChevronRight size={48} className="transition-transform group-hover:translate-x-1" />
         </button>
       )}
     </div>
   );
 }
