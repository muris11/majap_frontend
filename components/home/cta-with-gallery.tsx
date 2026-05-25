"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"

const SPRING_CONFIG = {
  type: "spring" as const,
  stiffness: 100,
  damping: 16,
  mass: 0.75,
  restDelta: 0.005,
}

const GRID_CONFIGS: Record<number, { classes: string[]; rows: string }> = {
  4: {
    rows: "grid-rows-[50px_150px_50px_150px_50px]",
    classes: [
      "col-start-2 col-end-3 row-start-1 row-end-3",
      "col-start-1 col-end-2 row-start-2 row-end-4",
      "col-start-1 col-end-2 row-start-4 row-end-6",
      "col-start-2 col-end-3 row-start-3 row-end-5",
    ],
  },
  3: {
    rows: "grid-rows-[60px_160px_60px_160px]",
    classes: [
      "col-start-2 col-end-3 row-start-1 row-end-3",
      "col-start-1 col-end-2 row-start-2 row-end-4",
      "col-start-1 col-end-2 row-start-4 row-end-6",
    ],
  },
  2: {
    rows: "grid-rows-[100px_200px]",
    classes: [
      "col-start-1 col-end-2 row-start-1 row-end-3",
      "col-start-2 col-end-3 row-start-1 row-end-3",
    ],
  },
  1: {
    rows: "grid-rows-[300px]",
    classes: [
      "col-start-1 col-end-3 row-start-1 row-end-2",
    ],
  },
}

interface CtaWithGalleryProps {
  images?: string[]
}

export function CtaWithGallery({ images: imageUrls }: CtaWithGalleryProps) {
  const count = imageUrls?.length ?? 0
  const config = GRID_CONFIGS[count] || GRID_CONFIGS[4]

  const gridImages = count > 0 ? imageUrls!.slice(0, Math.min(count, 4)) : []

  return (
    <Section className="bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-5 items-center gap-10 lg:gap-14">
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={SPRING_CONFIG}
              className="flex items-center gap-3 text-primary"
            >
              <span className="h-px w-12 bg-primary/45" />
              <span className="text-xs md:text-sm font-semibold tracking-[0.24em] uppercase">
                Gabung Sekarang
              </span>
              <span className="h-px w-12 bg-primary/45" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ ...SPRING_CONFIG, delay: 0.1 }}
              className="mt-4 max-w-xl text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-[1.04]"
            >
              <span className="relative block text-gray-900">Ingin</span>
              <span className="relative block bg-gradient-to-r from-primary via-primary-light to-gray-300 bg-clip-text text-transparent">
                Bergabung?
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ ...SPRING_CONFIG, delay: 0.2 }}
              className="mt-8 text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl"
            >
              Kami selalu terbuka untuk kolaborasi dan menyambut anggota baru dari wilayah Jabodetabek.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ ...SPRING_CONFIG, delay: 0.3 }}
              className="mt-8"
            >
              <Button
                size="lg"
                className="rounded-lg bg-primary text-white hover:bg-primary-dark shadow-sm group"
                asChild
              >
                <Link href="/kontak">
                  Hubungi Kami
                  <ArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
          </div>

          <div className={`lg:col-span-2 grid grid-cols-2 gap-4 ${config.rows}`}>
            {count > 0 ? (
              gridImages.map((url, index) => {
                const cls = config.classes[index]
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.15 }}
                    className={cls ? `relative overflow-hidden rounded-xl shadow-lg ${cls}` : "relative overflow-hidden rounded-xl shadow-lg col-span-1 row-span-1"}
                  >
                    <img
                      className="size-full object-cover object-center"
                      src={url}
                      alt=""
                    />
                  </motion.div>
                )
              })
            ) : (
              [...Array(4)].map((_, index) => {
                const cls = GRID_CONFIGS[4].classes[index]
                return (
                  <div
                    key={index}
                    className={`relative overflow-hidden rounded-xl bg-gray-200 animate-pulse shadow-sm ${cls}`}
                  />
                )
              })
            )}
          </div>
        </div>
      </Container>
    </Section>
  )
}
