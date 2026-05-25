import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/ui/container";

export default function KegiatanLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Filter & Card Grid Skeleton */}
      <section className="bg-gray-50 !pt-36 md:!pt-48 pb-16 md:pb-20 px-4 md:px-6 lg:px-8">
        <Container>
          {/* Centered Heading Skeleton */}
          <div className="mx-auto max-w-3xl space-y-3 text-center mb-10">
            <Skeleton className="h-7 w-32 rounded-full mx-auto bg-primary/10" />
            <Skeleton className="h-10 w-72 rounded-lg mx-auto" />
            <Skeleton className="h-4 w-[min(100%,28rem)] rounded-full mx-auto" />
          </div>

          {/* Filter Bar */}
          <div className="mb-10 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
            <div className="flex gap-2 w-full md:w-auto">
              <Skeleton className="h-11 w-full md:w-72 rounded-xl" />
              <Skeleton className="h-11 w-20 rounded-xl" />
            </div>
            <Skeleton className="h-11 w-52 rounded-xl" />
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="relative h-[350px] rounded-xl overflow-hidden bg-white border border-gray-200 p-5 flex flex-col justify-end space-y-3">
                <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-3 w-16 rounded-full" />
                    <Skeleton className="h-3 w-20 rounded-full" />
                  </div>
                  <Skeleton className="h-6 w-11/12 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
