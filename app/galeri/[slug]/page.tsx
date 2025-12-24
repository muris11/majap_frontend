import Image from "next/image";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { PhotoGrid } from "@/components/gallery/photo-grid";
import { preloadAlbum, preloadAlbumOthers } from "@/lib/api";
import { getImageUrl } from "@/lib/utils";
import { ArrowLeft, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
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

  return (
    <>
      <PageHeader 
        title={album.title}
        description={album.description || undefined}
        breadcrumbs={[
          { label: "Galeri", href: "/galeri" },
          { label: album.title }
        ]}
        backgroundImage={album.cover_image || undefined}
      />

      <Section className="bg-white">
        <Container>
          {/* Photos Grid */}
          <PhotoGrid photos={album.photos || []} />

          <div className="border-t pt-8 mb-12">
            <Link 
              href="/galeri"
              className="inline-flex items-center text-primary font-medium hover:underline"
            >
              <ArrowLeft size={16} className="mr-2" /> Kembali ke Galeri
            </Link>
          </div>

          {/* Other Albums */}
          {others && others.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold mb-6">Album Lainnya</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {others.map((item) => (
                  <Link key={item.id} href={`/galeri/${item.slug}`} className="group block">
                    <div className="aspect-square rounded-lg bg-slate-200 overflow-hidden mb-2 relative">
                      {item.cover_image ? (
                         <Image
                           src={getImageUrl(item.cover_image) || ""}
                           alt={item.title}
                           fill
                           loading="lazy"
                           quality={75}
                           className="object-cover transition-transform duration-300 group-hover:scale-110"
                         />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-slate-400">
                          <ImageIcon size={24} />
                        </div>
                      )}
                    </div>
                  <h4 className="font-medium text-gray-900 group-hover:text-primary transition-colors line-clamp-1">
                      {item.title}
                    </h4>
                  <span className="text-xs text-gray-500">{item.photos_count} Foto</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
