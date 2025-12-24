"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

interface ImageWithSkeletonProps extends Omit<ImageProps, "onLoad"> {
  skeletonClassName?: string;
}

export function ImageWithSkeleton({
  className,
  skeletonClassName,
  alt,
  ...props
}: ImageWithSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div
          className={`absolute inset-0 bg-gray-200 animate-pulse ${skeletonClassName || ""}`}
        />
      )}
      <Image
        {...props}
        alt={alt}
        className={`${className || ""} ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-300`}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
