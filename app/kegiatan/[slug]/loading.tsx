import { Skeleton } from "@/components/ui/skeleton";
import { Container } from "@/components/ui/container";

export default function KegiatanDetailLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Main Content Layout */}
      <section className="bg-white !pt-40 md:!pt-52 pb-16 md:pb-20 px-4 md:px-6 lg:px-8">
        <Container>
          {/* Split layout starting directly from the top */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 max-w-6xl mx-auto items-start">
            
            {/* Left column (Main Content & Title Loading) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Left-aligned Editorial Heading Skeleton */}
              <div className="space-y-3">
                <Skeleton className="h-4 w-32 rounded-full bg-primary/10" />
                <Skeleton className="h-10 w-3/4 rounded-lg bg-primary/8" />
              </div>

              {/* Image skeleton inside left column (Matching aspect-[4/3]) */}
              <Skeleton className="aspect-[4/3] w-full rounded-2xl bg-gray-200" />
              
              {/* Metadata tags */}
              <div className="flex gap-6 pb-6 border-b border-gray-100">
                <Skeleton className="h-5 w-28 rounded-md" />
                <Skeleton className="h-5 w-24 rounded-md" />
                <Skeleton className="h-5 w-20 rounded-md" />
              </div>

              {/* Prose Content lines */}
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
            </div>

            {/* Right column (Sidebar Info & Gallery Loading) */}
            <div className="lg:col-span-1 space-y-10">
              {/* Sidebar 1: Related Activities Card Loading */}
              <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50/50 space-y-5">
                <Skeleton className="h-6 w-36 rounded-md" />
                
                {/* Related items list */}
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

              {/* Sidebar 2: Gallery Card Loading */}
              <div className="border border-gray-200 rounded-2xl p-6 bg-gray-50/50 space-y-5">
                <Skeleton className="h-6 w-44 rounded-md" />
                
                {/* 2-column small grid skeleton */}
                <div className="grid grid-cols-2 gap-3">
                  {[...Array(4)].map((_, i) => (
                    <Skeleton key={i} className="aspect-square rounded-xl bg-gray-200" />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </Container>
      </section>
    </div>
  );
}
