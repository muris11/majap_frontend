import { Skeleton } from "@/components/ui/skeleton";

function HeroLoading() {
  return (
    <section className="relative h-screen overflow-hidden bg-white flex flex-col items-center justify-center text-center px-4">
      <div className="relative z-10 flex flex-col items-center space-y-6">
        {/* Tagline skeleton */}
        <Skeleton className="h-4 w-44 rounded-full bg-gray-200" />
        
        {/* Title skeletons (2 lines) */}
        <div className="space-y-3">
          <Skeleton className="h-10 w-[280px] sm:h-12 sm:w-[420px] md:h-16 md:w-[540px] rounded-xl bg-gray-200" />
          <Skeleton className="h-10 w-[200px] sm:h-12 sm:w-[300px] md:h-16 md:w-[380px] rounded-xl bg-gray-200" />
        </div>

        {/* Description skeleton */}
        <Skeleton className="h-5 w-[280px] sm:w-[400px] rounded-full bg-gray-200" />

        {/* CTA buttons skeletons */}
        <div className="flex gap-3 pt-2">
          <Skeleton className="h-11 w-36 rounded-full bg-gray-200" />
          <Skeleton className="h-11 w-32 rounded-full bg-gray-200" />
        </div>
      </div>

      {/* Bottom Marquee loading skeletons to match actual hero marquee */}
      <div className="absolute inset-x-0 bottom-10 z-[3] overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] md:bottom-12">
        <div className="flex w-max items-center gap-4 pr-4 md:gap-5 md:pr-5">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="h-24 w-36 flex-shrink-0 rounded-xl bg-gray-100 animate-pulse md:h-32 md:w-52"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutLoading() {
  return (
    <section className="bg-white py-16 md:py-20 px-4 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center text-center lg:text-left">
          <div className="lg:col-span-3 space-y-6">
            <Skeleton className="h-7 w-36 rounded-full mx-auto lg:mx-0" />
            <Skeleton className="h-10 w-[min(100%,32rem)] rounded-lg mx-auto lg:mx-0" />
            <Skeleton className="h-4 w-[min(100%,40rem)] rounded-full mx-auto lg:mx-0" />
            <Skeleton className="h-4 w-[min(100%,36rem)] rounded-full mx-auto lg:mx-0" />
            <div className="flex flex-wrap gap-4 pt-2 justify-center lg:justify-start">
              <Skeleton className="h-16 w-40 rounded-xl" />
              <Skeleton className="h-16 w-36 rounded-xl" />
            </div>
            <Skeleton className="h-12 w-44 rounded-lg mx-auto lg:mx-0" />
          </div>
          <div className="lg:col-span-2 flex justify-center">
            <Skeleton className="aspect-[3/4] w-full max-w-sm rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineLoading() {
  return (
    <section className="bg-gray-50 py-16 md:py-20 px-4 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl space-y-3 text-center mb-12">
          <Skeleton className="h-7 w-32 rounded-full mx-auto" />
          <Skeleton className="h-10 w-72 rounded-lg mx-auto" />
          <Skeleton className="h-4 w-[min(100%,26rem)] rounded-full mx-auto" />
        </div>
        <div className="mx-auto max-w-4xl space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className={`flex gap-6 ${i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} flex-col`}>
              <div className="flex-1 space-y-3 p-6 rounded-2xl border border-gray-200 bg-white">
                <Skeleton className="h-4 w-20 rounded-full" />
                <Skeleton className="h-6 w-[min(100%,20rem)] rounded-lg" />
                <Skeleton className="h-4 w-[min(100%,18rem)] rounded-full" />
              </div>
              <div className="hidden lg:flex w-8 shrink-0 flex-col items-center">
                <Skeleton className="w-4 h-4 rounded-full" />
                <Skeleton className="w-0.5 flex-1" />
              </div>
              <div className="flex-1 hidden lg:block" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ActivitiesLoading() {
  return (
    <section className="bg-white py-16 md:py-20 px-4 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl space-y-3 text-center mb-10">
          <Skeleton className="h-7 w-36 rounded-full mx-auto" />
          <Skeleton className="h-10 w-64 rounded-lg mx-auto" />
          <Skeleton className="h-4 w-[min(100%,28rem)] rounded-full mx-auto" />
        </div>
        <div className="flex gap-4 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="shrink-0 w-[260px] space-y-3 p-5 rounded-2xl border border-gray-200 bg-white">
              <Skeleton className="h-40 w-full rounded-xl" />
              <Skeleton className="h-5 w-[min(100%,14rem)] rounded-lg" />
              <Skeleton className="h-4 w-[min(100%,10rem)] rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryLoading() {
  return (
    <section className="bg-gray-50 py-16 md:py-20 px-4 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl space-y-3 text-center mb-10">
          <Skeleton className="h-7 w-36 rounded-full mx-auto" />
          <Skeleton className="h-10 w-64 rounded-lg mx-auto" />
          <Skeleton className="h-4 w-[min(100%,28rem)] rounded-full mx-auto" />
        </div>
        <div className="flex justify-center">
          <div className="relative h-80 w-full max-w-lg">
            <Skeleton className="absolute top-0 left-4 right-4 h-72 rounded-2xl rotate-[-3deg]" />
            <Skeleton className="absolute top-2 left-2 right-2 h-72 rounded-2xl rotate-[-1deg]" />
            <Skeleton className="absolute top-4 left-0 right-0 h-72 rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

function CtaLoading() {
  return (
    <section className="bg-white py-16 md:py-20 px-4 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-10 lg:grid-cols-5 lg:gap-14">
          <div className="lg:col-span-3 space-y-5 text-center lg:text-left">
            <Skeleton className="h-7 w-28 rounded-full mx-auto lg:mx-0" />
            <Skeleton className="h-10 w-[min(100%,22rem)] rounded-lg mx-auto lg:mx-0" />
            <Skeleton className="h-4 w-[min(100%,30rem)] rounded-full mx-auto lg:mx-0" />
            <Skeleton className="h-12 w-40 rounded-lg mx-auto lg:mx-0" />
          </div>
          <div className="lg:col-span-2 grid grid-cols-2 gap-3">
            <Skeleton className="aspect-square rounded-2xl" />
            <Skeleton className="aspect-square rounded-2xl" />
            <Skeleton className="aspect-square rounded-2xl" />
            <Skeleton className="aspect-square rounded-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <HeroLoading />
      <AboutLoading />
      <TimelineLoading />
      <ActivitiesLoading />
      <GalleryLoading />
      <CtaLoading />
    </div>
  );
}
