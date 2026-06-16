import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/ui/container";

export default function KegiatanDetailLoading() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-white !pt-28 md:!pt-36 pb-16 md:pb-20">
        <Container>
          <div className="space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto items-start">
              <div className="lg:col-span-2 space-y-8">
                <div className="space-y-3 flex flex-col items-center text-center">
                  <Skeleton className="h-4 w-32 rounded-full bg-primary/10" />
                  <Skeleton className="h-10 w-3/4 rounded-lg" />
                  <Skeleton className="w-24 h-[3px] rounded-full bg-primary/20" />
                </div>
                <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
                <div className="flex flex-wrap justify-center gap-6 pb-6 border-b border-gray-100">
                  <Skeleton className="h-5 w-28 rounded-md" />
                  <Skeleton className="h-5 w-24 rounded-md" />
                  <Skeleton className="h-5 w-20 rounded-md" />
                </div>
                <div className="space-y-4 pt-2">
                  <Skeleton className="h-5 w-full rounded-full" />
                  <Skeleton className="h-5 w-11/12 rounded-full" />
                  <Skeleton className="h-5 w-10/12 rounded-full" />
                  <Skeleton className="h-5 w-full rounded-full" />
                  <Skeleton className="h-5 w-8/12 rounded-full" />
                </div>
                <div className="space-y-4 pt-6">
                  <Skeleton className="h-5 w-11/12 rounded-full" />
                  <Skeleton className="h-5 w-full rounded-full" />
                  <Skeleton className="h-5 w-9/12 rounded-full" />
                </div>
                <div className="pt-8 border-t border-gray-100 flex justify-center">
                  <Skeleton className="h-12 w-56 rounded-full" />
                </div>
              </div>
              <div className="lg:col-span-1 space-y-10">
                <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50/50 space-y-5">
                  <Skeleton className="h-6 w-36 rounded-md" />
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex gap-3">
                        <Skeleton className="h-16 w-20 rounded-lg shrink-0" />
                        <div className="space-y-2 flex-1 pt-1">
                          <Skeleton className="h-4 w-full rounded-full" />
                          <Skeleton className="h-3.5 w-16 rounded-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50/50 space-y-5">
                  <Skeleton className="h-6 w-44 rounded-md" />
                  <div className="grid grid-cols-2 gap-3">
                    {[...Array(4)].map((_, i) => (
                      <Skeleton key={i} className="aspect-square rounded-xl" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
