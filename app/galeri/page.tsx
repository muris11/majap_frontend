"use client";

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
import { Album, Batch, PaginatedResponse } from "@/types";
import { ChevronDown, ChevronLeft, ChevronRight, Search } from "lucide-react";
import { ImageWithSkeleton } from "@/components/ui/image-with-skeleton";
import Link from "next/link";
import { useCallback, useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

function GalleryContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [albums, setAlbums] = useState<Album[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [selectedBatch, setSelectedBatch] = useState<number | null>(
    searchParams.get('batch_id') ? Number(searchParams.get('batch_id')) : null
  );
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || "");
  const [currentPage, setCurrentPage] = useState(
    searchParams.get('page') ? Number(searchParams.get('page')) : 1
  );
  const [meta, setMeta] = useState<PaginatedResponse<Album>['meta'] | null>(null);
  const [loading, setLoading] = useState(false);

  // Sync state with URL params when they change externally
  useEffect(() => {
    const page = searchParams.get('page');
    if (page) setCurrentPage(Number(page));
    
    const search = searchParams.get('search');
    if (search !== null) setSearchQuery(search);
    
    const batch = searchParams.get('batch_id');
    if (batch) setSelectedBatch(Number(batch));
  }, [searchParams]);

  const updateUrl = useCallback((page: number, search: string, batch: number | null) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (page > 1) params.set('page', page.toString());
    else params.delete('page');
    
    if (search) params.set('search', search);
    else params.delete('search');
    
    if (batch) params.set('batch_id', batch.toString());
    else params.delete('batch_id');
    
    const queryString = params.toString();
    const query = queryString ? `?${queryString}` : '';
    
    router.push(`${pathname}${query}`, { scroll: false });
  }, [pathname, router, searchParams]);

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
    } catch {
    } finally {
      setLoading(false);
    }
  }, [selectedBatch, searchQuery, currentPage]);

  useEffect(() => {
    api.getBatches().then(setBatches).catch(() => {});
  }, []);

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    updateUrl(1, searchQuery, selectedBatch);
  };

  const handleBatchChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const batchId = e.target.value ? Number(e.target.value) : null;
    setSelectedBatch(batchId);
    setCurrentPage(1);
    updateUrl(1, searchQuery, batchId);
  };
  
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    updateUrl(newPage, searchQuery, selectedBatch);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Section className="bg-white !pt-36 md:!pt-48 min-h-screen">
      <Container>
        <SectionHeading
          as="h1"
          tag="Galeri"
          title="Momen Kebersamaan MAJAP"
          description="Koleksi momen berharga dan dokumentasi kegiatan keluarga besar MAJAP Polindra."
          center
        />

        <div className="mb-10 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <form onSubmit={handleSearch} className="flex gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <Input
                  type="text"
                  placeholder="Cari album..."
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
                onChange={handleBatchChange}
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
          {loading && albums.length === 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => <Skeleton key={i} className="aspect-square rounded-xl" />)}
            </div>
          ) : albums.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {albums.map((album) => (
                  <Link
                    key={album.id}
                    href={`/galeri/${album.slug}`}
                    className="group relative aspect-square rounded-xl overflow-hidden bg-gray-900 shadow-sm"
                  >
                    {album.cover_image ? (
                      <ImageWithSkeleton
                        src={getImageUrl(album.cover_image) || ""}
                        alt={album.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-500 bg-gray-800">
                        MAJAP
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <h4 className="text-white font-bold text-sm line-clamp-1">{album.title}</h4>
                      <p className="text-white/70 text-xs">{album.photos_count} Foto</p>
                    </div>
                  </Link>
                ))}
              </div>
              
              {/* Pagination controls */}
              {meta && meta.last_page > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-10 w-10 p-0 rounded-full"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1 || loading}
                  >
                    <ChevronLeft size={16} />
                  </Button>
                  
                  <div className="flex gap-1">
                    {Array.from({ length: Math.min(5, meta.last_page) }, (_, i) => {
                      let pageNum = i + 1;
                      if (meta.last_page > 5 && currentPage > 3) {
                        pageNum = currentPage - 3 + i;
                        if (pageNum > meta.last_page - 5 + i) {
                           pageNum = meta.last_page - 4 + i;
                        }
                      }
                      
                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          className={`h-10 w-10 p-0 rounded-full ${currentPage === pageNum ? 'bg-primary text-white' : ''}`}
                          onClick={() => handlePageChange(pageNum)}
                          disabled={loading}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-10 w-10 p-0 rounded-full"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === meta.last_page || loading}
                  >
                    <ChevronRight size={16} />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-500 font-medium">Tidak ada album yang ditemukan.</p>
            </div>
          )}
          </Reveal>
        </Container>
      </Section>
  );
}

export default function GalleryPage() {
  return (
    <Suspense fallback={
      <Section className="bg-white !pt-36 md:!pt-48 min-h-screen">
        <Container>
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
        </Container>
      </Section>
    }>
      <GalleryContent />
    </Suspense>
  );
}
