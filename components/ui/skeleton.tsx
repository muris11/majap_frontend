import { cn } from "@/lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg bg-gray-200",
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
    </div>
  );
}

export function CardSkeleton({ className }: SkeletonProps) {
  return (
    <div className={cn("h-full overflow-hidden rounded-xl border border-primary/8 bg-white shadow-sm", className)}>
      <Skeleton className="h-52 rounded-none bg-primary/12" />
      <div className="space-y-4 p-5 md:p-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-3 w-16 rounded-full" />
          <Skeleton className="h-3 w-20 rounded-full" />
        </div>
        <Skeleton className="h-6 w-3/4 rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-11/12 rounded-md" />
        <div className="pt-2">
          <Skeleton className="h-4 w-28 rounded-full" />
        </div>
      </div>
    </div>
  );
}
