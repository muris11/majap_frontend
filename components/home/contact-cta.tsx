"use client";

import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/motion-wrapper";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import Link from "next/link";

export function ContactCTA() { 
  return (
    <Section className="relative bg-primary overflow-hidden py-32">
      {/* Pattern Background */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      
      <Container className="relative z-10 text-center">
         <FadeIn className="max-w-3xl mx-auto space-y-6 md:space-y-8" direction="up">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
          Ingin Bergabung atau Bekerja Sama?
          </h2>
          <p className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed max-w-2xl mx-auto font-medium">
          Kami selalu terbuka untuk kolaborasi dan menyambut anggota baru dari wilayah Jabodetabek. Hubungi kami untuk informasi lebih lanjut.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-8">
          <Button 
            size="lg" 
            className="h-14 px-10 text-lg rounded-full bg-white text-primary hover:bg-gray-100 hover:text-primary-dark shadow-xl hover:shadow-2xl transition-all duration-300 font-bold" 
            asChild
          >
            <Link href="/kontak">
              Hubungi Kami Sekarang
            </Link>
          </Button>
          </div>
         </FadeIn>
      </Container>
    </Section>
  );
}
