"use client";

import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { FadeInStagger } from "@/components/ui/motion-wrapper";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/lib/api";
import { getImageUrl } from "@/lib/utils";
import { Album, Batch, PaginatedResponse } from "@/types";
import { ChevronDown, ChevronLeft, ChevronRight, Image as ImageIcon, Search } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function GalleryPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [meta, setMeta] = useState<PaginatedResponse<Album>['meta'] | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAlbums = useCallback(async () => {
    setLoading(true);
    try {
      const result = await api.getAlbums({
        batch_id: selectedBatch || undefined,
        search: searchQuery || undefined,
        page: currentPage,
        per_page: 12,
      });
      
      setAlbums(result.data);
      setMeta(result.meta);
    } catch (error) {
      console.error("Failed to fetch albums:", error);
    } finally {
      setLoading(false);
    }
  }, [selectedBatch, searchQuery, currentPage]);

  useEffect(() => {
    api.getBatches().then(setBatches).catch(console.error);
  }, []);

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchAlbums();
  };

  return (
    <>
      <PageHeader 
        title="Galeri Foto" 
        description="Koleksi momen berharga dan dokumentasi kegiatan keluarga besar MAJAP Polindra."
      />

      <Section className="bg-white">
        <Container>
          {/* Search and Filter */}
          <div className="mb-12 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="text"
                  placeholder="Cari album..."
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

          {loading && albums.length === 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Skeleton key={i} className="aspect-square rounded-xl" />
              ))}
            </div>
          ) : albums.length > 0 ? (
            <FadeInStagger className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[250px]">
              {albums.map((album, index) => (
                <FadeInStagger.Item key={album.id}
                  className={`group relative overflow-hidden rounded-3xl bg-gray-900 cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-300 ${loading ? 'opacity-50' : ''}`}
                >
                  <Link href={`/galeri/${album.slug}`} className="block w-full h-full">
                    {album.cover_image ? (
                       <img
                         src={getImageUrl(album.cover_image) || undefined}
                         alt={album.title}
                         loading="eager"
                         className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                       />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-600 bg-gray-200">
                        <ImageIcon size={48} />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0">
                      <div className="mb-2">
                        <span className="inline-block text-xs text-white bg-primary/80 px-3 py-1.5 rounded-full backdrop-blur-sm border border-primary/20 font-bold mb-2">
                        {album.batch.name}
                      </span>
                      </div>
                      <h4 className="text-white font-bold text-2xl line-clamp-2 mb-2">{album.title}</h4>
                      <p className="text-white/80 text-sm font-medium">{album.photos_count} Foto</p>
                    </div>
                  </Link>
                </FadeInStagger.Item>
              ))}
            </FadeInStagger>
          ) : (
            <div className="text-center py-20 text-gray-500">
              <p>Belum ada album foto yang ditemukan.</p>
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
