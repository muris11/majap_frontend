"use client";

import Image, { ImageProps } from "next/image";
import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ImageWithSkeletonProps extends Omit<ImageProps, "onLoad"> {
  skeletonClassName?: string;
  containerClassName?: string;
}

export function ImageWithSkeleton({
  className,
  skeletonClassName,
  containerClassName,
  alt,
  ...props
}: ImageWithSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  const isSrcValid = typeof props.src === 'string' ? props.src.trim() !== '' : !!props.src;

  if (hasError || !isSrcValid) {
    return (
      <div className={cn("relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl border border-primary/10 bg-primary/5", containerClassName)}>
        <span className="text-xs font-medium text-primary/60">Gagal muat</span>
      </div>
    );
  }

  // Ensure src is explicitly a string or valid Next.js image object to satisfy Next.js types
  const finalSrc = typeof props.src === 'string' ? props.src : (props.src as any);

  return (
    <div className={cn("relative w-full h-full overflow-hidden", containerClassName)}>
      {isLoading && (
        <div
          className={cn(
            "absolute inset-0 bg-primary/8",
            skeletonClassName
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/45 to-transparent animate-shimmer" />
        </div>
      )}
      <Image
        {...props}
        src={finalSrc}
        alt={alt}
        className={cn(
          "transition-all duration-500",
          isLoading ? "opacity-0 scale-105" : "opacity-100 scale-100",
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}
