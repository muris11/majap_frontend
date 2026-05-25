"use client";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function ContactCTA() {
  return (
    <Section className="bg-white">
      <Container>
        <div className="relative overflow-hidden bg-gray-950 px-5 py-14 text-center md:px-10 md:py-20">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-0 right-0 top-[38%] h-px bg-white/10" />
            <div className="absolute left-0 right-0 top-[62%] h-px bg-primary/15" />
            <div className="absolute bottom-0 left-1/2 top-0 w-px bg-white/10" />
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="flex items-center justify-center gap-3 text-primary-light">
              <span className="h-px w-12 bg-primary/45" />
              <span className="text-xs md:text-sm font-semibold tracking-[0.24em] uppercase">
                Gabung Sekarang
              </span>
              <span className="h-px w-12 bg-primary/45" />
            </div>

            <h2 className="mt-4 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.92]">
              <span className="block text-white">Ingin</span>
              <span className="block bg-gradient-to-r from-primary via-primary-light to-gray-100 bg-clip-text text-transparent">
                Bergabung?
              </span>
            </h2>

            <p className="mt-7 text-base md:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
              Kami selalu terbuka untuk kolaborasi dan menyambut anggota baru dari wilayah Jabodetabek.
            </p>

            <div className="mt-8">
              <Button
                size="default"
                className="rounded-lg bg-white text-primary hover:bg-gray-100 font-semibold shadow-sm group"
                asChild
              >
                <Link href="/kontak">
                  Hubungi Kami
                  <ArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
