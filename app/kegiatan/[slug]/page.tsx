import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { preloadActivity, preloadActivityRelated } from "@/lib/api";
import { getImageUrl } from "@/lib/utils";
import { ArrowLeft, Calendar, MapPin, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ActivityDetailPage({ params }: Props) {
  const { slug } = await params;
  
  const [activity, related] = await Promise.all([
    preloadActivity(slug),
    preloadActivityRelated(slug),
  ]);

  if (!activity) {
    notFound();
  }

  return (
    <>
      <PageHeader 
        title={activity.title}
        backgroundImage={activity.cover_image || undefined}
      />

      <Section className="bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-500 mb-8 pb-8 border-b border-gray-100">
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
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold">{activity.batch.name}</span>
                </div>
              </div>

              <div 
                className="prose-content"
                dangerouslySetInnerHTML={{ __html: activity.content || "" }} 
              />
              
              <div className="mt-16 pt-8 border-t border-gray-100">
                <Link 
                  href="/kegiatan"
                  className="inline-flex items-center px-6 py-3 rounded-full bg-gray-100 text-gray-700 font-bold hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <ArrowLeft size={16} className="mr-2" /> Kembali ke Daftar Kegiatan
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">Kegiatan Lainnya</h3>
                <div className="space-y-6">
                {(related || []).map((item) => (
                    <Link key={item.id} href={`/kegiatan/${item.slug}`} className="group block">
                      <div className="flex gap-4 p-2 rounded-xl hover:bg-gray-50 transition-colors">
                      <div className="w-24 h-24 rounded-xl bg-gray-200 shrink-0 overflow-hidden relative shadow-sm">
                          {item.cover_image && (
                            <Image
                              src={getImageUrl(item.cover_image) || ""}
                              alt={item.title}
                              width={80}
                              height={80}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          )}
                        </div>
                        <div className="flex flex-col justify-center">
                          <h4 className="font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 mb-2 leading-tight">
                            {item.title}
                          </h4>
                          <span className="text-xs font-medium text-gray-500 flex items-center gap-1">
                            <Calendar size={12} />
                            {item.event_date_formatted}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                {(!related || related.length === 0) && (
                  <p className="text-gray-500 text-sm">Tidak ada kegiatan terkait.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}