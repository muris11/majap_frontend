import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/ui/container";

export default function AlbumDetailLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header Skeleton */}
      <div className="bg-gray-900 pt-28 pb-16 md:pt-32 md:pb-20 text-center relative overflow-hidden">
        <Container className="relative z-10">
          <div className="max-w-3xl mx-auto space-y-4">
            <Skeleton className="h-4 w-40 rounded-full mx-auto bg-white/20" />
            <Skeleton className="h-10 w-[min(100%,28rem)] rounded-lg mx-auto bg-white/20" />
            <Skeleton className="h-4 w-[min(100%,22rem)] rounded-full mx-auto bg-white/10" />
          </div>
        </Container>
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Carousel Section Skeleton */}
      <section className="bg-gray-50 py-16 md:py-20 px-4 md:px-6 lg:px-8">
        <Container>
          <div className="text-center mb-10 space-y-4">
            <Skeleton className="h-6 w-36 rounded-full mx-auto bg-primary/10" />
            <Skeleton className="h-10 w-80 rounded-lg mx-auto" />
          </div>
          
          {/* Main Large Carousel Block */}
          <div className="max-w-4xl mx-auto space-y-4">
            <Skeleton className="aspect-video w-full rounded-2xl shadow-lg bg-gray-200" />
            
            {/* Thumbnails list */}
            <div className="flex gap-3 overflow-hidden justify-center">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className="h-16 w-24 rounded-lg shrink-0" />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Other Albums List Skeleton */}
      <section className="bg-white py-16 md:py-20 px-4 md:px-6 lg:px-8">
        <Container>
          <div className="space-y-3 mb-10 text-center md:text-left">
            <Skeleton className="h-5 w-44 rounded-md mx-auto md:mx-0" />
            <Skeleton className="h-4 w-64 rounded-full mx-auto md:mx-0" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-xl bg-gray-200 shadow-sm" />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
