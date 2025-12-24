 "use client";
 
 import Image from "next/image";
 import { useState } from "react";
 import { Lightbox } from "@/components/ui/lightbox";
 import { getImageUrl } from "@/lib/utils";
 import { Photo } from "@/types";
 
 interface PhotoGridProps {
   photos: Photo[];
 }
 
 export function PhotoGrid({ photos }: PhotoGridProps) {
   const [lightboxOpen, setLightboxOpen] = useState(false);
   const [currentIndex, setCurrentIndex] = useState(0);
 
   const lightboxImages = photos.map((photo) => ({
     src: getImageUrl(photo.image_path) || "",
     caption: photo.caption,
   }));
 
   const openLightbox = (index: number) => {
     setCurrentIndex(index);
     setLightboxOpen(true);
   };
 
   if (!photos || photos.length === 0) {
     return (
       <div className="col-span-full text-center py-10 text-slate-500">
         Belum ada foto dalam album ini.
       </div>
     );
   }
 
   return (
     <>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
         {photos.map((photo, index) => (
           <div
             key={`photo-${photo.id}`}
             className="relative aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 group cursor-pointer"
             onClick={() => openLightbox(index)}
           >
             <Image
               src={getImageUrl(photo.image_path) || ""}
               alt={photo.caption || "Photo"}
               fill
               loading="lazy"
               quality={80}
               className="object-cover transition-transform duration-500 group-hover:scale-105"
             />
             {photo.caption && (
               <div className="absolute inset-x-0 bottom-0 bg-black/60 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                 <p className="text-white text-sm">{photo.caption}</p>
               </div>
             )}
             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
               <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium">
                 Klik untuk memperbesar
               </span>
             </div>
           </div>
         ))}
       </div>
 
       <Lightbox
         images={lightboxImages}
         initialIndex={currentIndex}
         isOpen={lightboxOpen}
         onClose={() => setLightboxOpen(false)}
       />
     </>
   );
 }
