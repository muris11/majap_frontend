import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/ui/container";

export default function KontakLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Grid Content Skeleton */}
      <section className="bg-gray-50 !pt-36 md:!pt-48 pb-16 md:pb-20 px-4 md:px-6 lg:px-8">
        <Container>
          {/* Centered Heading Skeleton */}
          <div className="mx-auto max-w-3xl space-y-3 text-center mb-10">
            <Skeleton className="h-7 w-32 rounded-full mx-auto bg-primary/10" />
            <Skeleton className="h-10 w-72 rounded-lg mx-auto" />
            <Skeleton className="h-4 w-[min(100%,28rem)] rounded-full mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 md:gap-20">
            {/* Left Column (Contact Details) */}
            <div className="space-y-10">
              <div className="space-y-4">
                <Skeleton className="h-7 w-48 rounded-lg" />
                <Skeleton className="h-4 w-full rounded-full" />
                <Skeleton className="h-4 w-11/12 rounded-full" />
              </div>

              {/* Items */}
              <div className="space-y-6">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex gap-4">
                    <Skeleton className="w-14 h-14 rounded-xl shrink-0" />
                    <div className="space-y-2 flex-1 pt-1">
                      <Skeleton className="h-5 w-24 rounded-md" />
                      <Skeleton className="h-4 w-3/4 rounded-full" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Map Box */}
              <Skeleton className="h-80 md:h-96 w-full rounded-xl border border-gray-200" />
            </div>

            {/* Right Column (Message Form) */}
            <div className="lg:col-span-2">
              <div className="border shadow-sm bg-white rounded-2xl p-8 md:p-12 space-y-8">
                <Skeleton className="h-7 w-32 rounded-lg" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-24 rounded-full" />
                    <Skeleton className="h-12 w-full rounded-xl" />
                  </div>
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-16 rounded-full" />
                    <Skeleton className="h-12 w-full rounded-xl" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Skeleton className="h-4 w-20 rounded-full" />
                  <Skeleton className="h-12 w-full rounded-xl" />
                </div>

                <div className="space-y-3">
                  <Skeleton className="h-4 w-14 rounded-full" />
                  <Skeleton className="h-40 w-full rounded-xl" />
                </div>

                <Skeleton className="h-12 w-36 rounded-xl" />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
