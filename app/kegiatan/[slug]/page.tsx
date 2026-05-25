import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SidebarGallery } from "@/components/kegiatan/sidebar-gallery";
import { preloadActivity, preloadActivityRelated, preloadAlbum } from "@/lib/api";
import { getImageUrl } from "@/lib/utils";
import { SITE } from "@/lib/seo";
import { ArrowLeft, Calendar, MapPin, User } from "lucide-react";
import { ImageWithSkeleton } from "@/components/ui/image-with-skeleton";
import { Reveal } from "@/components/ui/motion-wrapper";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const activity = await preloadActivity(slug);

  if (!activity) {
    return { title: "Kegiatan Tidak Ditemukan" };
  }

  const title = activity.title;
  const description = activity.short_description || `Kegiatan MAJAP: ${activity.title}`;
  const ogImage = activity.cover_image ? getImageUrl(activity.cover_image) : undefined;

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

export default async function ActivityDetailPage({ params }: Props) {
  const { slug } = await params;
  
  // Safely fetch activity, related, and the corresponding album sharing the same slug
  const [activity, related, album] = await Promise.all([
    preloadActivity(slug),
    preloadActivityRelated(slug),
    preloadAlbum(slug).catch(() => null),
  ]);

  if (!activity) {
    notFound();
  }

  const photos = album?.photos || [];

  return (
    <>
      <Section className="bg-white !pt-40 md:!pt-52">
        <Container>
          <Reveal>
            <div className="space-y-12">
              {/* Direct Split Layout starting from the top */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto items-start">
                
                {/* Left column (Main Content & Title) */}
                <div className="lg:col-span-2 space-y-8">
                  
                  {/* Left-aligned editorial heading inside the left section */}
                  <div className="space-y-3">
                    <span className="text-primary text-xs md:text-sm font-semibold tracking-[0.24em] uppercase">
                      Kegiatan Kami
                    </span>
                    <h1 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-[1.05]">
                      {activity.title}
                    </h1>
                    <div className="w-24 h-[3px] rounded-full bg-gradient-to-r from-primary to-secondary mt-1"></div>
                  </div>

                  {/* Activity Cover Image inside the left column, large aspect-[4/3] to make it big */}
                  {activity.cover_image && (
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-gray-100 bg-gray-50/40 w-full">
                      <ImageWithSkeleton
                        src={getImageUrl(activity.cover_image) || ""}
                        alt={activity.title}
                        fill
                        className="object-contain"
                        sizes="(max-width: 1024px) 100vw, 750px"
                      />
                    </div>
                  )}

                  {/* Metadata tags */}
                  <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-500 pb-6 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <Calendar className="text-primary" size={18} />
                      <span>{activity.event_date_formatted}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="text-primary" size={18} />
                      <span>{activity.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="text-primary" size={18} />
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">
                        {activity.batch.name}
                      </span>
                    </div>
                  </div>

                  {/* Main Prose Content */}
                  <div 
                    className="prose-content"
                    dangerouslySetInnerHTML={{ __html: activity.content || "" }} 
                  />
                  
                  {/* Kembali ke Daftar Kegiatan button at the bottom of the left column */}
                  <div className="pt-8 border-t border-gray-100">
                    <Link 
                      href="/kegiatan"
                      className="inline-flex items-center px-6 py-3 rounded-full bg-gray-100 text-gray-700 font-bold hover:bg-primary hover:text-white transition-all duration-300"
                    >
                      <ArrowLeft size={16} className="mr-2" /> Kembali ke Daftar Kegiatan
                    </Link>
                  </div>
                </div>

                {/* Right column (Sidebar Info & Gallery) */}
                <div className="lg:col-span-1 space-y-10">
                  
                  {/* Section 1: Kegiatan Lainnya */}
                  <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50/50 space-y-5">
                    <h3 className="text-lg font-bold text-gray-900 pb-2 border-b border-gray-100">
                      Kegiatan Lainnya
                    </h3>
                    
                    {related && related.length > 0 ? (
                      <div className="space-y-4">
                        {related.map((item) => (
                          <Link key={item.id} href={`/kegiatan/${item.slug}`} className="group block">
                            <div className="flex gap-4 p-1 rounded-xl hover:bg-white transition-colors">
                              <div className="w-20 h-20 rounded-xl bg-gray-200 shrink-0 overflow-hidden relative shadow-sm border border-gray-100">
                                {item.cover_image && (
                                  <ImageWithSkeleton
                                    src={getImageUrl(item.cover_image) || ""}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-115"
                                  />
                                )}
                              </div>
                              <div className="flex flex-col justify-center">
                                <h4 className="font-bold text-gray-900 text-sm group-hover:text-primary transition-colors line-clamp-2 mb-1 leading-tight">
                                  {item.title}
                                </h4>
                                <span className="text-[11px] font-medium text-gray-500 flex items-center gap-1">
                                  <Calendar size={11} />
                                  {item.event_date_formatted}
                                </span>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-sm">Tidak ada kegiatan terkait.</p>
                    )}
                  </div>

                  {/* Section 2: Dokumentasi (Galeri Foto Kegiatan) - In the sidebar directly below related activities */}
                  {photos.length > 0 && (
                    <SidebarGallery photos={photos} />
                  )}
                </div>

              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
