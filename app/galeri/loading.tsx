import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/ui/container";

export default function GaleriLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Filter & Card Grid Skeleton */}
      <section className="bg-white !pt-36 md:!pt-48 pb-16 md:pb-20 px-4 md:px-6 lg:px-8">
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-xl shadow-sm" />
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
