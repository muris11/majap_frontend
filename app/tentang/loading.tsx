import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/ui/container";

export default function TentangLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Visi Misi Section Skeleton */}
      <section className="bg-white !pt-40 md:!pt-52 pb-16 md:pb-20 px-4 md:px-6 lg:px-8">
        <Container>
          <div className="space-y-12">
            {/* Centered Heading Skeleton */}
            <div className="mx-auto max-w-3xl space-y-3 text-center mb-10">
              <Skeleton className="h-7 w-32 rounded-full mx-auto bg-primary/10" />
              <Skeleton className="h-10 w-80 rounded-lg mx-auto" />
            </div>

            <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 max-w-6xl mx-auto">
              {/* Left Image Skeleton (Matching max-w-[360px] aspect-square) */}
              <div className="shrink-0 w-full max-w-[360px]">
                <Skeleton className="aspect-square w-full rounded-2xl" />
              </div>

              {/* Right Content Skeleton */}
              <div className="space-y-6 flex-1 w-full max-w-xl">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-20 rounded-md" />
                  <Skeleton className="h-4 w-full rounded-full" />
                  <Skeleton className="h-4 w-11/12 rounded-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-5 w-20 rounded-md" />
                  <Skeleton className="h-4 w-full rounded-full" />
                  <Skeleton className="h-4 w-11/12 rounded-full" />
                  <Skeleton className="h-4 w-10/12 rounded-full" />
                </div>
                <Skeleton className="h-11 w-36 rounded-full pt-4" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* DidYouKnow Section Skeleton */}
      <section className="bg-amber-50/20 py-16 md:py-20 px-4 md:px-6 lg:px-8">
        <Container className="!px-0 md:!px-6 lg:!px-8">
          {/* Centered Heading Skeleton */}
          <div className="mx-auto max-w-3xl space-y-3 text-center mb-10 px-4 md:px-0">
            <Skeleton className="h-7 w-32 rounded-full mx-auto bg-primary/10" />
            <Skeleton className="h-10 w-64 rounded-lg mx-auto" />
          </div>

          <div className="relative max-w-[1600px] mx-auto space-y-8">
            {/* Grid layout matching actual slider grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start justify-center px-0 md:px-2">
              {/* First Fact Loading */}
              <div className="flex flex-col space-y-4 w-full">
                <Skeleton className="aspect-[4/3] w-full rounded-none md:rounded-2xl bg-gray-200" />
                <Skeleton className="h-6 w-3/4 rounded-md mx-auto" />
              </div>
              
              {/* Second Fact Loading (Desktop only) */}
              <div className="hidden md:flex flex-col space-y-4 w-full">
                <Skeleton className="aspect-[4/3] w-full rounded-2xl bg-gray-200" />
                <Skeleton className="h-6 w-3/4 rounded-md mx-auto" />
              </div>
            </div>

            {/* Dot Indicators */}
            <div className="flex justify-center gap-2">
              <Skeleton className="w-6 h-2.5 rounded-full" />
              <Skeleton className="w-2.5 h-2.5 rounded-full" />
              <Skeleton className="w-2.5 h-2.5 rounded-full" />
            </div>
          </div>
        </Container>
      </section>

      {/* OrgTree Section Skeleton */}
      <section className="bg-white py-16 md:py-20 px-4 md:px-6 lg:px-8">
        <Container>
          {/* Centered Heading Skeleton */}
          <div className="mx-auto max-w-3xl space-y-3 text-center mb-14">
            <Skeleton className="h-7 w-44 rounded-full mx-auto bg-primary/10" />
            <Skeleton className="h-10 w-72 rounded-lg mx-auto" />
          </div>

          <div className="max-w-4xl mx-auto flex flex-col items-center space-y-12">
            {/* Level 0 */}
            <Skeleton className="h-48 w-56 rounded-2xl shadow-sm" />
            
            {/* Level 1 */}
            <div className="flex gap-12">
              <Skeleton className="h-44 w-48 rounded-2xl shadow-sm" />
              <Skeleton className="h-44 w-48 rounded-2xl shadow-sm" />
            </div>
            
            {/* Level 2 */}
            <div className="flex gap-8">
              <Skeleton className="h-40 w-40 rounded-2xl shadow-sm" />
              <Skeleton className="h-40 w-40 rounded-2xl shadow-sm" />
              <Skeleton className="h-40 w-40 rounded-2xl shadow-sm" />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
