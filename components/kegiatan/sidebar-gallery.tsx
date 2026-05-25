"use client";

import { useState } from "react";
import { Camera } from "lucide-react";
import { ImageWithSkeleton } from "@/components/ui/image-with-skeleton";
import { Lightbox } from "@/components/ui/lightbox";
import { getImageUrl } from "@/lib/utils";
import { Photo } from "@/types";

interface SidebarGalleryProps {
  photos: Photo[];
}

export function SidebarGallery({ photos }: SidebarGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const lightboxImages = photos.map((photo) => ({
    src: getImageUrl(photo.image_path) || "",
    caption: photo.caption || "Dokumentasi Kegiatan",
  }));

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50/50 space-y-5">
        <div className="flex items-center gap-2 pb-2 border-b border-gray-100">
          <Camera size={18} className="text-primary" />
          <h3 className="text-lg font-bold text-gray-900">
            Galeri Foto Kegiatan
          </h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {photos.map((photo, index) => (
            <div 
              key={photo.id} 
              onClick={() => handleImageClick(index)}
              className="relative aspect-square rounded-xl overflow-hidden shadow-sm border border-gray-100 bg-white group cursor-pointer"
            >
              <ImageWithSkeleton
                src={getImageUrl(photo.image_path) || ""}
                alt={photo.caption || "Dokumentasi"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="180px"
              />
            </div>
          ))}
        </div>
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
