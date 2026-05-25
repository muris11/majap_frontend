"use client";

import { CardStack, CardStackItem } from "@/components/ui/card-stack";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { getImageUrl } from "@/lib/utils";
import { Album } from "@/types";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface GalleryPreviewProps {
  initialData: Album[];
}

export function GalleryPreview({ initialData }: GalleryPreviewProps) {
  const albums = initialData;

  const items: CardStackItem[] = albums.map((album) => ({
    id: album.id,
    title: album.title,
    description: `${album.photos_count} Foto · ${album.batch.name}`,
    imageSrc: getImageUrl(album.cover_image) || "",
    href: `/galeri/${album.slug}`,
  }));

  return (
    <Section className="bg-gray-50">
      <Container>
        <SectionHeading
          tag="Galeri"
          title="Momen Kebersamaan"
          description="Dokumentasi momen-momen berharga keluarga besar MAJAP Polindra."
          center
        />

        {items.length > 0 ? (
          <CardStack
            items={items}
            cardWidth={500}
            cardHeight={300}
            autoAdvance
            intervalMs={2000}
            pauseOnHover
            showDots
            loop
          />
        ) : (
          <div className="text-center py-10 text-gray-400 text-sm">
            Belum ada galeri.
          </div>
        )}

        <div className="text-center mt-6">
          <Button variant="outline" size="default" className="rounded-lg border-gray-200 hover:border-primary hover:text-primary group" asChild>
            <Link href="/galeri">
              Lihat Galeri Lengkap <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
