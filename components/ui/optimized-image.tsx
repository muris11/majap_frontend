 "use client";
 
 import Image, { ImageProps } from "next/image";
 import { useState } from "react";
 import { cn } from "@/lib/utils";
 
 interface OptimizedImageProps extends Omit<ImageProps, "onLoad"> {
   containerClassName?: string;
 }
 
 export function OptimizedImage({ 
   src, 
   alt, 
   className, 
   containerClassName,
   ...props 
 }: OptimizedImageProps) {
   const [isLoading, setIsLoading] = useState(true);
 
   return (
     <div className={cn("relative overflow-hidden", containerClassName)}>
       <Image
         src={src}
         alt={alt}
         className={cn(
           "duration-700 ease-in-out",
           isLoading ? "scale-105 blur-sm" : "scale-100 blur-0",
           className
         )}
         onLoad={() => setIsLoading(false)}
         {...props}
       />
     </div>
   );
 }
