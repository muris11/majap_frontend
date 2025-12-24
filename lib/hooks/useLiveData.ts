"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { API_BASE_URL } from "../api";

interface CacheVersions {
  settings: number;
  hero_slides: number;
  did_you_know: number;
  timeline: number;
  batches: number;
  organization: number;
  activities: number;
  albums: number;
  schema: number;
  _updated_at?: string;
}

type ResourceKey = keyof Omit<CacheVersions, "_updated_at">;

interface UseLiveDataOptions<T> {
  resource: ResourceKey;
  fetcher: () => Promise<T>;
  pollInterval?: number; // in milliseconds, default 30 seconds
  enabled?: boolean;
}

interface UseLiveDataResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  lastUpdated: Date | null;
}

// Store versions globally to share across hooks
let globalVersions: CacheVersions | null = null;
let versionListeners: Set<() => void> = new Set();
let pollingInterval: ReturnType<typeof setInterval> | null = null;

async function fetchVersions(): Promise<CacheVersions> {
  const res = await fetch(`${API_BASE_URL}/cache/versions`, {
    headers: { Accept: "application/json" },
  });
  
  if (!res.ok) {
    throw new Error("Failed to fetch cache versions");
  }
  
  const json = await res.json();
  return (json.result?.data || json.data) as CacheVersions;
}

function startGlobalPolling(interval: number = 10000) {
  if (pollingInterval) return;
  
  pollingInterval = setInterval(async () => {
    try {
      const newVersions = await fetchVersions();
      const hasChanges = globalVersions && 
        Object.keys(newVersions).some((key) => {
          if (key === "_updated_at") return false;
          return newVersions[key as ResourceKey] !== globalVersions![key as ResourceKey];
        });
      
      globalVersions = newVersions;
      
      if (hasChanges) {
        // Notify all listeners
        versionListeners.forEach((listener) => listener());
      }
    } catch (error) {
      console.error("Failed to poll cache versions:", error);
    }
  }, interval);
}

function stopGlobalPolling() {
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
  }
}

/**
 * Hook for live data that auto-refreshes when admin makes changes
 */
export function useLiveData<T>({
  resource,
  fetcher,
  pollInterval = 10000,
  enabled = true,
}: UseLiveDataOptions<T>): UseLiveDataResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  
  const versionRef = useRef<number>(0);
  const isMountedRef = useRef(true);

  const refresh = useCallback(async () => {
    if (!isMountedRef.current) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await fetcher();
      if (isMountedRef.current) {
        setData(result);
        setLastUpdated(new Date());
        versionRef.current = globalVersions?.[resource] ?? 0;
      }
    } catch (err) {
      if (isMountedRef.current) {
        setError(err instanceof Error ? err : new Error("Unknown error"));
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, [fetcher, resource]);

  // Initial fetch
  useEffect(() => {
    if (!enabled) return;
    
    isMountedRef.current = true;
    refresh();
    
    return () => {
      isMountedRef.current = false;
    };
  }, [enabled, refresh]);

  // Subscribe to version changes
  useEffect(() => {
    if (!enabled) return;

    const handleVersionChange = () => {
      const currentVersion = globalVersions?.[resource] ?? 0;
      if (currentVersion > versionRef.current) {
        refresh();
      }
    };

    versionListeners.add(handleVersionChange);
    startGlobalPolling(pollInterval);

    return () => {
      versionListeners.delete(handleVersionChange);
      if (versionListeners.size === 0) {
        stopGlobalPolling();
      }
    };
  }, [enabled, pollInterval, refresh, resource]);

  return { data, isLoading, error, refresh, lastUpdated };
}

/**
 * Hook to manually trigger refresh for specific resources
 */
export function useRefreshResource() {
  const triggerRefresh = useCallback(async (resources?: ResourceKey[]) => {
    try {
      const newVersions = await fetchVersions();
      globalVersions = newVersions;
      versionListeners.forEach((listener) => listener());
    } catch (error) {
      console.error("Failed to trigger refresh:", error);
    }
  }, []);

  return { triggerRefresh };
}
