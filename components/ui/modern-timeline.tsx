"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "lucide-react"
import Image from "next/image"

export interface TimelineItem {
  title: string
  description: string
  date?: string
  image?: string
  status?: "completed" | "current" | "upcoming"
  category?: string
}

export interface TimelineProps {
  items: TimelineItem[]
  className?: string
}

export function Timeline({ items, className }: TimelineProps) {
  if (!items || items.length === 0) {
    return (
      <p className="text-center py-10 text-gray-400 text-sm">
        No timeline items to display
      </p>
    )
  }

  return (
    <div className={cn("relative", className)}>
      <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-gray-200 via-gray-100 to-transparent" />

      <div className="space-y-8">
        {items.map((item, index) => {
          const isLeft = index % 2 === 0

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className={cn(
                "relative flex flex-col md:flex-row gap-4 md:gap-8",
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              )}
            >
              <div className="hidden md:block flex-1" />

              <div className="absolute left-[22px] md:left-1/2 md:-translate-x-1/2 top-1 z-10">
                <div className="w-2 h-2 rounded-full bg-gray-300 ring-4 ring-white" />
              </div>

              <div className="flex-1 pl-14 md:pl-0">
                <Card className={cn(
                  "border border-gray-100 shadow-sm transition-shadow hover:shadow-md",
                  isLeft ? "md:mr-8" : "md:ml-8"
                )}>
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      {item.image && (
                        <div className="hidden sm:block shrink-0">
                          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-gray-100 relative">
                            <Image
                              src={item.image}
                              alt=""
                              fill
                              sizes="48px"
                              className="object-cover"
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                        </div>
                      )}

                      <div className="min-w-0 flex-1 space-y-2">
                        <h4 className="text-base font-bold text-gray-900">{item.title}</h4>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-400">
                          {item.date && (
                            <span className="inline-flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {item.date}
                            </span>
                          )}
                        </div>

                        <p className="text-sm text-gray-500 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
