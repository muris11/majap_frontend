 import { cn } from "@/lib/utils";
 
 interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
   className?: string;
 }
 
 export function Skeleton({ className, ...props }: SkeletonProps) {
   return (
     <div
       className={cn(
         "animate-pulse bg-gray-200 rounded-lg",
         className
       )}
       {...props}
     />
   );
 }
 
 export function CardSkeleton({ className }: SkeletonProps) {
   return (
     <div className={cn("h-full flex flex-col rounded-xl overflow-hidden bg-white", className)}>
       <Skeleton className="h-52 rounded-none" />
       <div className="p-6 flex-grow space-y-4">
         <div className="flex items-center gap-4 mb-5">
           <Skeleton className="h-4 w-20" />
           <Skeleton className="h-4 w-24" />
         </div>
         <Skeleton className="h-6 w-3/4" />
         <Skeleton className="h-4 w-full" />
         <Skeleton className="h-4 w-full" />
       </div>
       <div className="p-6 pt-0 mt-auto">
         <Skeleton className="h-4 w-32 mt-5" />
       </div>
     </div>
   );
 }
