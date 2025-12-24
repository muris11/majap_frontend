import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Get image URL from backend response
 * Backend already returns FULL URL via asset(Storage::url())
 * This function only handles null/undefined and provides fallback
 */
export function getImageUrl(path: string | null | undefined) {
  // Backend returns full URL, so just return it directly
  // Only handle null/undefined cases
  return path || null;
}

/**
 * Get fallback image for when image is null or fails to load
 */
export function getFallbackImage(type: 'activity' | 'album' | 'profile' = 'activity'): string {
  const fallbacks = {
    activity: '/images/placeholder-activity.jpg',
    album: '/images/placeholder-gallery.jpg',
    profile: '/images/placeholder-profile.jpg',
  };
  return fallbacks[type] || fallbacks.activity;
}
