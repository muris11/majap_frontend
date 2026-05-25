"use client"

import { useState } from "react"
import { CardCarousel } from "@/components/ui/card-carousel"
import { Lightbox } from "@/components/ui/lightbox"

interface CarouselWithLightboxProps {
  images: { src: string; alt: string }[]
}

export function CarouselWithLightbox({ images }: CarouselWithLightboxProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const lightboxImages = images.map((img) => ({
    src: img.src,
    caption: img.alt,
  }))

  const handleImageClick = (index: number) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
  }

  return (
    <>
      <CardCarousel images={images} onImageClick={handleImageClick} autoplayDelay={2500} />
      <Lightbox
        images={lightboxImages}
        initialIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  )
}
