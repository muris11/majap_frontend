import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Setting } from "@/types";
import { ArrowUpRight, Calendar, Users } from "lucide-react";
import { ImageWithSkeleton } from "@/components/ui/image-with-skeleton";
import Link from "next/link";

interface AboutPreviewProps {
  stats?: Setting;
  aboutImage?: string | null;
}

export function AboutPreview({ stats, aboutImage }: AboutPreviewProps) {
  return (
    <Section className="relative -mt-12 bg-white md:-mt-16">
      <Container>
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-3 max-w-3xl text-center lg:text-left">
            <div className="flex items-center justify-center gap-3 text-primary lg:justify-start">
              <span className="h-px w-12 bg-primary/45" />
              <span className="text-xs md:text-sm font-semibold tracking-[0.24em] uppercase">
                Tentang MAJAP
              </span>
              <span className="h-px w-12 bg-primary/45" />
            </div>

            <h2 className="mt-4 mx-auto lg:mx-0 max-w-3xl text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-[1.02]">
              <span className="relative block">Membangun Solidaritas</span>
              <span className="relative block bg-gradient-to-r from-primary via-primary-light to-gray-300 bg-clip-text text-transparent">
                Mahasiswa Jabodetabek
              </span>
            </h2>

            <p className="mt-8 mx-auto lg:mx-0 text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl">
              MAJAP (Mahasiswa Jabodetabek Polindra) adalah organisasi daerah yang mewadahi mahasiswa asal Jakarta, Bogor, Depok, Tangerang, dan Bekasi yang menempuh pendidikan di Politeknik Negeri Indramayu.
            </p>

            <p className="mt-5 mx-auto lg:mx-0 text-base md:text-lg text-gray-600 leading-relaxed max-w-3xl">
              Kami berkomitmen untuk menjadi rumah kedua bagi mahasiswa perantauan, serta menjadi wadah untuk mengembangkan soft skill, kepemimpinan, dan jaringan profesional.
            </p>

            <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-4">
              <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900 leading-none">{stats?.active_members || "110+"}</div>
                  <div className="text-sm text-gray-500 mt-0.5">Anggota Aktif</div>
                </div>
              </div>
              <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-gray-50 border border-gray-100">
                <div className="p-2.5 rounded-lg bg-secondary/10 text-amber-700">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xl font-bold text-gray-900 leading-none">{stats?.established_year || "2018"}</div>
                  <div className="text-sm text-gray-500 mt-0.5">Berdiri</div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center lg:justify-start">
              <Button size="lg" className="rounded-lg group" asChild>
              <Link href="/tentang">
                Pelajari Lebih Lanjut
                <ArrowUpRight className="ml-1.5 w-4 h-4 group-hover:rotate-45 transition-transform" />
              </Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-2 lg:justify-self-end w-full flex justify-center lg:justify-end">
            {aboutImage && aboutImage.trim() !== "" ? (
              <div className="relative aspect-[3/4] w-full max-w-[420px] overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5">
                <ImageWithSkeleton
                  src={aboutImage}
                  alt="Tentang MAJAP"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            ) : (
              <div className="relative aspect-[3/4] w-full max-w-[420px] overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-gray-50 to-secondary/10 shadow-md ring-1 ring-black/5">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(15,76,69,0.16),transparent_34%),radial-gradient(circle_at_80%_80%,rgba(212,175,55,0.18),transparent_32%)]" />
                <div className="relative flex h-full items-end p-8">
                  <p className="text-4xl font-black tracking-tight text-primary">MAJAP</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
