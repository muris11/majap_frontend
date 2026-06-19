import type { Metadata } from "next";
import { CarouselWithLightbox } from "@/components/gallery/carousel-with-lightbox";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { preloadAlbum, preloadAlbumOthers } from "@/lib/api";
import { getImageUrl } from "@/lib/utils";
import { SITE } from "@/lib/seo";
import { ArrowLeft, Camera } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const album = await preloadAlbum(slug);

  if (!album) {
    return { title: "Album Tidak Ditemukan" };
  }

  const title = album.title;
  const description = album.description || `Album foto MAJAP: ${album.title}`;
  const ogImage = album.cover_image ? getImageUrl(album.cover_image) : undefined;

  return {
    title,
    description,
    openGraph: {
      title: `${title} — ${SITE.name}`,
      description,
      images: ogImage ? [{ url: ogImage, alt: title }] : undefined,
    },
    twitter: {
      title: `${title} — ${SITE.name}`,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function AlbumDetailPage({ params }: Props) {
  const { slug } = await params;

  const [album, others] = await Promise.all([
    preloadAlbum(slug),
    preloadAlbumOthers(slug),
  ]);

  if (!album) {
    notFound();
  }

  const carouselImages = (album.photos || []).map((photo) => ({
    src: getImageUrl(photo.image_path) || "",
    alt: photo.caption || "Photo",
  }));
  
  const breadcrumbItems = [
    { name: "Beranda", url: "/" },
    { name: "Galeri", url: "/galeri" },
    { name: album.title, url: `/galeri/${album.slug}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <PageHeader
        title={album.title}
        description={album.description || undefined}
        breadcrumbs={[
          { label: "Galeri", href: "/galeri" },
          { label: album.title },
        ]}
        backgroundImage={album.cover_image || undefined}
      />

      {carouselImages.length > 0 && (
        <Section className="bg-gray-50 overflow-hidden py-16 md:py-20">
          <Container>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-semibold mb-4">
                <Camera className="w-3 h-3" />
                Tampilan Carousel
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">
                Jelajahi Foto
              </h2>
              <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
                Geser atau klik foto untuk melihat dalam ukuran penuh
              </p>
            </div>
          </Container>
          <div className="w-full">
            <CarouselWithLightbox images={carouselImages} />
          </div>
        </Section>
      )}

      {others && others.length > 0 && (
        <Section className="bg-white">
          <Container>
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-semibold mb-3">
                  Album Lainnya
                </span>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                  Jelajahi Album Lain
                </h2>
              </div>
              <Link
                href="/galeri"
                className="hidden md:inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline"
              >
                Lihat Semua <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {others.map((item) => (
                <Link key={item.id} href={`/galeri/${item.slug}`} className="group block">
                  <div className="aspect-square rounded-xl bg-gray-100 overflow-hidden relative shadow-sm ring-1 ring-black/5 group-hover:shadow-lg group-hover:ring-primary/20 transition-all duration-400">
                    {item.cover_image ? (
                      <div className="absolute inset-0">
                        <Image
                          src={getImageUrl(item.cover_image) || ""}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 50vw, 25vw"
                          className="object-cover transition-transform duration-400 group-hover:scale-105"
                          loading="lazy"
                          decoding="async"
                        />
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <Camera size={24} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="mt-3">
                    <h4 className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">{item.photos_count} Foto</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-8 md:hidden">
              <Link
                href="/galeri"
                className="inline-flex items-center gap-1 text-sm text-primary font-medium hover:underline"
              >
                Lihat Semua Album <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
              </Link>
            </div>
          </Container>
        </Section>
      )}
    </>
  );
}
