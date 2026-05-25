"use client"

import React from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/effect-coverflow"
import "swiper/css/pagination"
import "swiper/css/navigation"
import { Autoplay, EffectCoverflow, Navigation, Pagination } from "swiper/modules"

interface CarouselProps {
  images: { src: string; alt: string }[]
  autoplayDelay?: number
  showPagination?: boolean
  showNavigation?: boolean
  onImageClick?: (index: number) => void
}

export const CardCarousel: React.FC<CarouselProps> = ({
  images,
  autoplayDelay = 2000,
  showPagination = true,
  showNavigation = true,
  onImageClick,
}) => {
  return (
    <div className="w-full">
      <style>{`
        .swiper {
          width: 100%;
          padding: 20px 0 50px 0;
        }
        .swiper-slide {
          background-position: center;
          background-size: cover;
          width: 280px;
          transition: all 0.3s ease;
        }
        @media (min-width: 768px) {
          .swiper-slide {
            width: 380px;
          }
        }
        @media (min-width: 1024px) {
          .swiper-slide {
            width: 450px;
          }
        }
        .swiper-slide img {
          display: block;
          width: 100%;
        }
        .swiper-3d .swiper-slide-shadow-left,
        .swiper-3d .swiper-slide-shadow-right {
          background: none;
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: white;
          background: rgba(0,0,0,0.3);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          backdrop-filter: blur(8px);
          transition: all 0.2s;
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 18px;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: rgba(0,0,0,0.5);
        }
        .swiper-pagination-bullet {
          background: rgba(0,0,0,0.2);
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: #0f4c45;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
      <Swiper
        spaceBetween={30}
        autoplay={{
          delay: autoplayDelay,
          disableOnInteraction: false,
        }}
        effect="coverflow"
        grabCursor
        centeredSlides
        loop
        slidesPerView="auto"
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 120,
          modifier: 2.5,
        }}
        pagination={showPagination ? { clickable: true } : false}
        navigation={
          showNavigation
            ? {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }
            : false
        }
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
        onTap={(swiper: any) => {
          const slide = swiper.clickedSlide;
          if (slide) {
            const realIndex = parseInt(
              slide.getAttribute("data-swiper-slide-index") || "0"
            );
            onImageClick?.(realIndex);
          }
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="rounded-2xl overflow-hidden shadow-xl cursor-pointer ring-1 ring-white/10 bg-white">
              <div className="relative aspect-[3/4]">
                <Image
                  src={image.src}
                  fill
                  className="object-cover"
                  alt={image.alt}
                  sizes="(max-width: 768px) 280px, (max-width: 1024px) 380px, 450px"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {showNavigation && (
        <>
          <div className="swiper-button-next !hidden md:!flex" />
          <div className="swiper-button-prev !hidden md:!flex" />
        </>
      )}
    </div>
  )
}
