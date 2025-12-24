"use client";

import Link from "next/link";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { LinkWithLoader } from "@/components/ui/link-with-loader";
import { FadeInStagger } from "@/components/ui/motion-wrapper";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";
import { getImageUrl } from "@/lib/utils";
import { Activity, Batch, PaginatedResponse } from "@/types";
import { Calendar, ChevronDown, ChevronLeft, ChevronRight, MapPin, Search } from "lucide-react";
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
    } catch (error) {
      console.error("Failed to fetch activities:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedBatch, searchQuery, currentPage]);

  useEffect(() => {
    api.getBatches().then(setBatches).catch(console.error);
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
      <PageHeader 
        title="Kegiatan Kami" 
        description="Dokumentasi agenda dan aktivitas yang telah dilaksanakan oleh MAJAP Polindra."
      />

      <Section className="bg-gray-50">
        <Container>
          {/* Search and Filter */}
          <div className="mb-12 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="text"
                  placeholder="Cari kegiatan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 h-12 rounded-full border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 shadow-sm"
                />
              </div>
              <Button type="submit" size="lg" className="h-12 px-6 rounded-full bg-primary text-white hover:bg-primary-dark shadow-md hover:shadow-lg transition-all duration-300">Cari</Button>
            </form>
            
            <div className="relative">
              <select 
                className="appearance-none bg-white border border-gray-200 text-gray-700 font-medium py-3 px-5 pr-12 rounded-full leading-tight focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-300 cursor-pointer min-w-[220px] shadow-sm hover:shadow-md"
                value={selectedBatch || ""}
                onChange={(e) => {
                  setSelectedBatch(e.target.value ? Number(e.target.value) : null);
                  setCurrentPage(1);
                }}
              >
                <option value="">Semua Angkatan</option>
                {batches.map((batch) => (
                  <option key={batch.id} value={batch.id}>
                    {batch.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-primary">
                <ChevronDown size={18} strokeWidth={2.5} />
              </div>
            </div>
          </div>

          {loading && activities.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="aspect-[4/3] rounded-2xl" />
              ))}
            </div>
          ) : activities.length > 0 ? (
            <FadeInStagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activities.map((activity) => (
                <FadeInStagger.Item key={activity.id}>
                <Link href={`/kegiatan/${activity.slug}`} className={`group block h-full ${loading ? 'opacity-50' : ''}`}>
                  <div className="relative h-[400px] rounded-3xl overflow-hidden bg-gray-900 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                      {activity.cover_image ? (
                         <img
                           src={getImageUrl(activity.cover_image) || undefined}
                           alt={activity.title}
                           loading="eager"
                           className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
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
                          Baca Selengkapnya <ChevronRight className="ml-2 w-4 h-4" />
                        </span>
                      </div>
                  </div>
                </Link>
                </FadeInStagger.Item>
              ))}
            </FadeInStagger>
          ) : (
            <div className="text-center py-20 text-gray-500">
              <p>Belum ada kegiatan yang ditemukan.</p>
            </div>
          )}

          {/* Pagination */}
          {meta && meta.last_page > 1 && (
            <div className="mt-12 flex justify-center items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft size={16} className="mr-1" />
                Sebelumnya
              </Button>
              <span className="text-sm text-gray-600">
                Halaman {currentPage} dari {meta.last_page}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(meta.last_page, p + 1))}
                disabled={currentPage === meta.last_page}
              >
                Selanjutnya
                <ChevronRight size={16} className="ml-1" />
              </Button>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
