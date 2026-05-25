import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/ui/container";

export default function FaqLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Accordion Skeletons */}
      <section className="bg-gray-50 !pt-36 md:!pt-48 pb-16 md:pb-20 px-4 md:px-6 lg:px-8">
        <Container>
          {/* Centered Heading Skeleton */}
          <div className="mx-auto max-w-3xl space-y-3 text-center mb-10">
            <Skeleton className="h-7 w-32 rounded-full mx-auto bg-primary/10" />
            <Skeleton className="h-10 w-72 rounded-lg mx-auto" />
            <Skeleton className="h-4 w-[min(100%,28rem)] rounded-full mx-auto" />
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            {/* Search Input */}
            <Skeleton className="h-12 w-full rounded-xl" />

            {/* Accordion Cards */}
            <div className="space-y-3 pt-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-14 bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between">
                  <Skeleton className="h-4 w-3/4 rounded-full" />
                  <Skeleton className="h-5 w-5 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
