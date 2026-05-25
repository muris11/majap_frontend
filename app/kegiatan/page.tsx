"use client";

import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Reveal } from "@/components/ui/motion-wrapper";
import { api } from "@/lib/api";
import { getImageUrl } from "@/lib/utils";
import { Activity, Batch, PaginatedResponse } from "@/types";
import { Calendar, ChevronDown, ChevronLeft, ChevronRight, MapPin, Search } from "lucide-react";
import { ImageWithSkeleton } from "@/components/ui/image-with-skeleton";
import { useCallback, useEffect, useState } from "react";

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [meta, setMeta] = useState<PaginatedResponse<Activity>['meta'] | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchActivities = useCallback(async () => {
    setLoading(true);
    try {
      const result = await api.getActivities({
        batch_id: selectedBatch || undefined,
        search: searchQuery || undefined,
        page: currentPage,
        per_page: 12,
      });
      if ('meta' in result) {
        setActivities(result.data);
        setMeta(result.meta);
      } else {
        setActivities(result as Activity[]);
        setMeta(null);
      }
    } catch {
    } finally {
      setLoading(false);
    }
  }, [selectedBatch, searchQuery, currentPage]);

  useEffect(() => {
    api.getBatches().then(setBatches).catch(() => {});
  }, []);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchActivities();
  };

  return (
    <>
      <Section className="bg-gray-50 !pt-36 md:!pt-48">
        <Container>
          <SectionHeading
            tag="Kegiatan"
            title="Agenda & Aktivitas MAJAP"
            description="Dokumentasi agenda, program kerja, dan aktivitas yang telah dilaksanakan oleh keluarga besar MAJAP Polindra."
            center
          />

          <div className="mb-10 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  type="text"
                  placeholder="Cari kegiatan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11 rounded-xl border-gray-200 focus:border-primary text-sm"
                />
              </div>
              <Button type="submit" size="sm" className="h-11 px-5 rounded-xl bg-primary text-white hover:bg-primary-dark">Cari</Button>
            </form>

            <div className="relative">
              <select
                className="appearance-none bg-white border border-gray-200 text-gray-700 font-medium py-2.5 px-4 pr-10 rounded-xl text-sm focus:outline-none focus:border-primary cursor-pointer min-w-[200px]"
                value={selectedBatch || ""}
                onChange={(e) => {
                  setSelectedBatch(e.target.value ? Number(e.target.value) : null);
                  setCurrentPage(1);
                }}
              >
                <option value="">Semua Angkatan</option>
                {batches.map((batch) => (
                  <option key={batch.id} value={batch.id}>{batch.name}</option>
                ))}
              </select>
              <ChevronDown size={16} className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <Reveal>
          {loading && activities.length === 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => <Skeleton key={i} className="aspect-[4/3] rounded-xl" />)}
            </div>
          ) : activities.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activities.map((activity) => (
                  <Link key={activity.id} href={`/kegiatan/${activity.slug}`} className="group block">
                    <div className="relative h-[350px] rounded-xl overflow-hidden bg-gray-900 shadow-sm">
                      {activity.cover_image ? (
                        <ImageWithSkeleton
                          src={getImageUrl(activity.cover_image) || ""}
                          alt={activity.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-500 bg-gray-800">
                          MAJAP
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <span className="absolute top-3 right-3 bg-white/90 text-gray-900 text-xs font-semibold px-3 py-1 rounded-full">
                        {activity.batch.name}
                      </span>
                      <div className="absolute bottom-0 left-0 right-0 p-5">
                        <div className="flex items-center gap-3 text-white/70 text-xs mb-2">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} />
                            {activity.event_date_formatted}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin size={12} />
                            <span className="truncate max-w-[80px]">{activity.location}</span>
                          </span>
                        </div>
                        <h3 className="text-white font-bold text-lg leading-tight line-clamp-2">
                          {activity.title}
                        </h3>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
          ) : null}
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
