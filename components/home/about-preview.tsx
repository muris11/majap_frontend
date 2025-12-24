"use client";

import { Button } from "@/components/ui/button";
import { FadeIn, ScaleIn, SlideIn } from "@/components/ui/motion-wrapper";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Setting } from "@/types";
import { ArrowRight, Calendar, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface AboutPreviewProps {
  stats?: Setting;
  aboutImage?: string | null;
}

export function AboutPreview({ stats, aboutImage }: AboutPreviewProps) {
  return (
    <Section className="bg-white relative overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
           <SlideIn direction="left" className="space-y-8 order-1 lg:order-1 relative z-10">
            <div className="space-y-4">
              <h2 className="flex items-center gap-2 text-primary text-sm font-bold tracking-widest uppercase">
                <span className="w-8 h-[2px] bg-primary"></span>
                Tentang MAJAP
              </h2>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight leading-[1.1]">
                Membangun Solidaritas <br/><span className="text-primary">Mahasiswa Jabodetabek</span>
              </h3>
            </div>

            <div className="space-y-5">
              <p className="text-lg text-gray-600 leading-relaxed font-medium">
                MAJAP (Mahasiswa Jabodetabek Polindra) adalah organisasi daerah
                yang mewadahi mahasiswa asal Jakarta, Bogor, Depok, Tangerang,
                dan Bekasi yang menempuh pendidikan di Politeknik Negeri
                Indramayu.
              </p>
              <p className="text-base text-gray-500 leading-relaxed">
                Kami berkomitmen untuk menjadi rumah kedua bagi mahasiswa
                perantauan, serta menjadi wadah untuk mengembangkan soft skill,
                kepemimpinan, dan jaringan profesional.
              </p>
            </div>

            <div className="pt-4">
                <Button size="lg" className="rounded-full px-8 py-6 text-base font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all" asChild>
                    <Link href="/tentang">Pelajari Lebih Lanjut <ArrowRight className="ml-2 w-5 h-5"/></Link>
                </Button>
            </div>
           </SlideIn>

           <SlideIn direction="right" className="order-2 lg:order-2 relative w-full flex flex-col items-center lg:block">
                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-secondary/10 rounded-full blur-2xl -z-10"></div>

            {aboutImage ? (
              <div className="relative w-full max-w-sm lg:max-w-full mx-auto">
                <div className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
                    <Image
                    src={aboutImage}
                    alt="Tentang MAJAP"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                </div>
                
                {/* Floating Stats Card 1 */}
                <ScaleIn className="absolute -bottom-8 -left-8 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 min-w-[160px] z-20 hidden md:block" delay={0.3}>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="p-2 bg-primary/10 rounded-lg text-primary">
                            <Users className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-semibold text-gray-500">Anggota</span>
                    </div>
                    <div className="text-3xl font-bold text-gray-900">{stats?.active_members || "150+"}</div>
                </ScaleIn>

                {/* Floating Stats Card 2 */}
                <ScaleIn className="absolute -top-8 -right-8 bg-primary text-white p-5 rounded-2xl shadow-xl shadow-primary/20 min-w-[160px] z-20 hidden md:block" delay={0.5}>
                    <div className="flex items-center gap-3 mb-1">
                        <div className="p-2 bg-white/20 rounded-lg text-white">
                            <Calendar className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-semibold text-white/80">Berdiri</span>
                    </div>
                    <div className="text-3xl font-bold text-white">{stats?.established_year || "2015"}</div>
                </ScaleIn>
              </div>
            ) : (
              <div className="w-full aspect-square rounded-3xl bg-gray-100 flex items-center justify-center">
                <p className="text-gray-400">Image placeholder</p>
              </div>
            )}
            
            {/* Mobile Stats (Visible only on small screens) */}
            <div className="grid grid-cols-2 gap-4 mt-6 md:hidden">
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
                    <Users className="w-6 h-6 text-primary mb-2" />
                    <span className="text-2xl font-bold text-gray-900">{stats?.active_members || "150+"}</span>
                    <span className="text-xs font-semibold text-gray-500">Anggota Aktif</span>
                </div>
                <div className="bg-primary text-white p-4 rounded-xl shadow-sm flex flex-col items-center text-center">
                    <Calendar className="w-6 h-6 mb-2 text-white/80" />
                    <span className="text-2xl font-bold">{stats?.established_year || "2015"}</span>
                    <span className="text-xs font-semibold text-white/80">Tahun Berdiri</span>
                </div>
            </div>
           </SlideIn>
        </div>
      </Container>
    </Section>
  );
}
