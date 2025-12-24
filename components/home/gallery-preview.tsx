"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FadeIn, FadeInStagger } from "@/components/ui/motion-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { api } from "@/lib/api";
import { getImageUrl } from "@/lib/utils";
import { Album } from "@/types";
import { ArrowRight, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function GalleryPreview() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const result = await api.getAlbums({ per_page: 4 });
        setAlbums(result.data.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch albums:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, []);

  if (loading) {
     return (
       <Section className="bg-white">
         <Container>
           <FadeIn className="text-center max-w-3xl mx-auto mb-16 space-y-4">
             <h2 className="flex items-center justify-center gap-2 text-primary text-sm font-bold tracking-widest uppercase">
                <span className="w-8 h-[2px] bg-primary"></span>
                Galeri Foto
                <span className="w-8 h-[2px] bg-primary"></span>
             </h2>
             <h3 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Momen Kebersamaan</h3>
             <p className="text-lg text-gray-600 leading-relaxed">
               Dokumentasi kegiatan dan momen-momen berharga keluarga besar MAJAP Polindra.
             </p>
           </FadeIn>
           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
             {[1, 2, 3, 4].map((i) => (
               <Skeleton key={i} className="aspect-square" />
             ))}
           </div>
         </Container>
       </Section>
     );
  }

  return (
    <Section className="bg-white">
      <Container>
         <FadeIn className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="flex items-center justify-center gap-2 text-primary text-sm font-bold tracking-widest uppercase">
            <span className="w-8 h-[2px] bg-primary"></span>
            Galeri Foto
            <span className="w-8 h-[2px] bg-primary"></span>
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Momen Kebersamaan</h3>
          <p className="text-lg text-gray-600 leading-relaxed font-medium">
            Dokumentasi kegiatan dan momen-momen berharga keluarga besar MAJAP Polindra.
          </p>
         </FadeIn>

         <FadeInStagger className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[250px]">
          {albums.map((album, index) => (
             <FadeInStagger.Item
              key={album.id}
              className="group relative overflow-hidden rounded-3xl bg-gray-900 cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-300"
            >
              <Link href={`/galeri/${album.slug}`} className="block w-full h-full">
                {album.cover_image ? (
                   <Image
                   src={getImageUrl(album.cover_image) || ""}
                     alt={album.title}
                     fill
                     loading="lazy"
                     quality={75}
                     className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                   />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-gray-600 bg-gray-200">
                    <ImageIcon size={48} />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0">
                  <h4 className="text-white font-bold text-2xl line-clamp-1 mb-2">{album.title}</h4>
                  <p className="text-white/90 text-sm font-medium">{album.photos_count} Foto</p>
                </div>
              </Link>
             </FadeInStagger.Item>
          ))}
         </FadeInStagger>

         <FadeIn className="text-center mt-16" delay={0.2}>
          <Button variant="outline" size="lg" className="rounded-full px-8 border-2 border-gray-200 hover:border-primary hover:text-primary transition-all" asChild>
            <Link href="/galeri">
              Lihat Galeri Lengkap <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
         </FadeIn>
      </Container>
    </Section>
  );
}
