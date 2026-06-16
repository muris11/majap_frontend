"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ExpandCard {
  image: string;
  title: string;
  subtitle?: string;
  href?: string;
}

interface ExpandCardsProps {
  items: ExpandCard[];
}

export function ExpandCards({ items }: ExpandCardsProps) {
  const [expandedIndex, setExpandedIndex] = useState(0);

  if (!items.length) return null;

  return (
    <div className="w-full overflow-x-auto no-scrollbar">
      <div className="flex items-center justify-center gap-1.5 md:gap-2">
        {items.map((item, idx) => {
          const isExpanded = idx === expandedIndex;
          return (
            <div
              key={idx}
              className="relative shrink-0 cursor-pointer overflow-hidden rounded-xl md:rounded-2xl transition-all duration-500 ease-in-out"
              style={{
                width: isExpanded ? "min(24rem, 70vw)" : "min(5rem, 20vw)",
                height: isExpanded ? "min(20rem, 50vh)" : "min(20rem, 50vh)",
              }}
              onMouseEnter={() => setExpandedIndex(idx)}
              onClick={() => setExpandedIndex(idx)}
            >
              <img
                className="w-full h-full object-cover"
                src={item.image}
                alt={item.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
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
                  <p className="text-white/70 text-xs mt-0.5">
                    {item.subtitle}
                  </p>
                )}
                {item.href && (
                  <div
                    className={`mt-3 overflow-hidden transition-all duration-500 ease-in-out ${
                      isExpanded ? "max-h-12 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-medium rounded-lg backdrop-blur-sm transition-colors border border-white/10"
                    >
                      Lihat Detail <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
