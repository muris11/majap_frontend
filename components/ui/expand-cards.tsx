"use client";

import { useState } from "react";

interface ExpandCard {
  image: string;
  title: string;
  subtitle?: string;
  href?: string;
}

interface ExpandCardsProps {
  items: ExpandCard[];
  onCardClick?: (index: number) => void;
}

export function ExpandCards({ items, onCardClick }: ExpandCardsProps) {
  const [expandedIndex, setExpandedIndex] = useState(0);

  if (!items.length) return null;

  return (
    <div className="w-full">
      <div className="flex items-center justify-center gap-1.5 md:gap-2">
        {items.map((item, idx) => {
          const isExpanded = idx === expandedIndex;
          return (
            <div
              key={idx}
              className="relative cursor-pointer overflow-hidden rounded-xl md:rounded-2xl transition-all duration-500 ease-in-out"
              style={{
                width: isExpanded ? "24rem" : "5rem",
                height: "20rem",
              }}
              onMouseEnter={() => setExpandedIndex(idx)}
              onClick={() => onCardClick?.(idx)}
            >
              <img
                className="w-full h-full object-cover"
                src={item.image}
                alt={item.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div
                className={`absolute bottom-0 left-0 right-0 p-4 md:p-5 transition-all duration-500 ease-in-out ${
                  isExpanded
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <p className="text-white font-semibold text-sm md:text-base line-clamp-1">
                  {item.title}
                </p>
                {item.subtitle && (
                  <p className="text-white/60 text-xs mt-0.5">
                    {item.subtitle}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
