"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FadeIn, FadeInStagger } from "@/components/ui/motion-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { api } from "@/lib/api";
import { getImageUrl } from "@/lib/utils";
import { Activity } from "@/types";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function ActivitiesPreview() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const result = await api.getActivitiesSimple({ limit: 3 });
        if (Array.isArray(result)) {
          setActivities(result);
        } else {
          setActivities((result as { data: Activity[] }).data || []);
        }
      } catch (error) {
        console.error("Failed to fetch activities:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return (
      <Section className="bg-gray-50">
        <Container>
          <FadeIn className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="flex items-center justify-center gap-2 text-primary text-sm font-bold tracking-widest uppercase">
              <span className="w-8 h-[2px] bg-primary"></span>
              Kegiatan Terbaru
              <span className="w-8 h-[2px] bg-primary"></span>
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Agenda & Aktivitas</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Rangkaian kegiatan dan aktivitas yang telah dilaksanakan oleh keluarga besar MAJAP Polindra.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {[1, 2, 3].map((i) => (
               <Skeleton key={i} className="aspect-[4/3] rounded-2xl" />
            ))}
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section className="bg-gray-50">
      <Container>
        <FadeIn className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="flex items-center justify-center gap-2 text-primary text-sm font-bold tracking-widest uppercase">
            <span className="w-8 h-[2px] bg-primary"></span>
            Kegiatan Terbaru
            <span className="w-8 h-[2px] bg-primary"></span>
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">Agenda & Aktivitas</h3>
          <p className="text-lg text-gray-600 leading-relaxed font-medium">
            Rangkaian kegiatan dan aktivitas yang telah dilaksanakan oleh keluarga besar MAJAP Polindra.
          </p>
        </FadeIn>

         <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {activities.map((activity) => (
             <FadeInStagger.Item key={activity.id}>
              <Link href={`/kegiatan/${activity.slug}`} className="group block h-full">
                <div className="relative h-[400px] rounded-3xl overflow-hidden bg-gray-900 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                  {activity.cover_image ? (
                     <Image
                       src={getImageUrl(activity.cover_image) || ""}
                       alt={activity.title}
                       fill
                       loading="lazy"
                       quality={75}
                        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                     />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-200">
                      No Image
                    </div>
                  )}
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                  
                  {/* Badge */}
                  <span className="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                    {activity.batch.name}
                  </span>
                  
                  {/* Content overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm font-medium mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={14} className="text-primary-light" />
                        {activity.event_date_formatted}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={14} className="text-primary-light" />
                        <span className="truncate max-w-[100px]">{activity.location}</span>
                      </span>
                    </div>
                    <h4 className="text-white font-bold text-2xl leading-tight line-clamp-2 mb-4 group-hover:text-primary-light transition-colors">
                      {activity.title}
                    </h4>
                    <span className="inline-flex items-center text-white font-semibold text-sm opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                      Baca Selengkapnya <ArrowRight className="ml-2 w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
             </FadeInStagger.Item>
          ))}
         </FadeInStagger>

        <FadeIn className="text-center mt-16" delay={0.2}>
          <Button variant="outline" size="lg" className="rounded-full px-8 border-2 border-gray-200 hover:border-primary hover:text-primary transition-all" asChild>
            <Link href="/kegiatan">
              Lihat Semua Kegiatan <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </FadeIn>
      </Container>
    </Section>
  );
}
