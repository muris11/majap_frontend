import { 
  Activity, 
  Album, 
  ApiResponse, 
  Batch, 
  DidYouKnowFact, 
  HeroSlide,
  OrganizationMember, 
  PaginatedResponse,
  Setting, 
  TimelineEvent 
} from "@/types";
import { cache } from "react";

const EXTERNAL_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";

// Use proxy for client-side requests to avoid CORS issues
const isServer = typeof window === "undefined";
export const API_BASE_URL = isServer ? EXTERNAL_API_URL : "/api/proxy";

interface PaginatedApiResponse<T> extends ApiResponse<T[]> {
  meta?: PaginatedResponse<T>['meta'];
}

interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
}

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        ...options?.headers,
      },
    });

    if (!res.ok) {
      // Try to get error message from response
      const errorData: ApiError = await res.json().catch(() => ({
        message: `HTTP ${res.status}: ${res.statusText}`,
      }));
      
      throw new Error(errorData.message || `API Error: ${res.status}`);
    }

    const rawJson = await res.json();
    // Handle wrapped response format: { result: { success, data } }
    const json: ApiResponse<T> = rawJson.result || rawJson;
    
    if (!json.success) {
      throw new Error(json.message || 'API request failed');
    }
    
    return json.data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error or server is unreachable');
  }
}

async function fetchPaginatedApi<T>(endpoint: string, options?: RequestInit): Promise<PaginatedResponse<T>> {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        ...options?.headers,
      },
    });

    if (!res.ok) {
      const errorData: ApiError = await res.json().catch(() => ({
        message: `HTTP ${res.status}: ${res.statusText}`,
      }));
      
      throw new Error(errorData.message || `API Error: ${res.status}`);
    }

    const rawJson = await res.json();
    // Handle wrapped response format: { result: { success, data, meta } }
    const json: PaginatedApiResponse<T> = rawJson.result || rawJson;
    
    if (!json.success) {
      throw new Error(json.message || 'API request failed');
    }
    
    return {
      data: json.data,
      meta: json.meta || { current_page: 1, last_page: 1, per_page: 12, total: json.data.length },
    };
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error or server is unreachable');
  }
}

export const api = {
  getSettings: () => fetchApi<Setting>("/settings"),
  getHeroSlides: () => fetchApi<HeroSlide[]>("/hero-slides"),
  getDidYouKnowFacts: () => fetchApi<DidYouKnowFact[]>("/did-you-know"),
  getTimeline: () => fetchApi<TimelineEvent[]>("/timeline"),
  getBatches: () => fetchApi<Batch[]>("/batches"),
  getOrganization: (batchId?: number) => 
    fetchApi<OrganizationMember[]>(`/organization${batchId ? `?batch_id=${batchId}` : ""}`),
  
  getActivities: (params?: { batch_id?: number; featured?: boolean; limit?: number; page?: number; per_page?: number; search?: string }) => {
    const query = new URLSearchParams();
    if (params?.batch_id) query.append("batch_id", params.batch_id.toString());
    if (params?.featured) query.append("featured", "1");
    if (params?.limit) query.append("limit", params.limit.toString());
    if (params?.page) query.append("page", params.page.toString());
    if (params?.per_page) query.append("per_page", params.per_page.toString());
    if (params?.search) query.append("search", params.search);
    
    if (params?.limit) {
      return fetchApi<Activity[]>(`/activities?${query.toString()}`);
    }
    return fetchPaginatedApi<Activity>(`/activities?${query.toString()}`);
  },

  getActivitiesSimple: (params?: { batch_id?: number; featured?: boolean; limit?: number }) => {
    const query = new URLSearchParams();
    if (params?.batch_id) query.append("batch_id", params.batch_id.toString());
    if (params?.featured) query.append("featured", "1");
    if (params?.limit) query.append("limit", params.limit.toString());
    return fetchApi<Activity[]>(`/activities?${query.toString()}`);
  },
  
  getActivity: (slug: string) => fetchApi<Activity>(`/activities/${slug}`),
  getActivityRelated: (slug: string) => fetchApi<Activity[]>(`/activities/${slug}/related`),
  
  getAlbums: (params?: { batch_id?: number; page?: number; per_page?: number; search?: string }) => {
    const query = new URLSearchParams();
    if (params?.batch_id) query.append("batch_id", params.batch_id.toString());
    if (params?.page) query.append("page", params.page.toString());
    if (params?.per_page) query.append("per_page", params.per_page.toString());
    if (params?.search) query.append("search", params.search);
    return fetchPaginatedApi<Album>(`/albums?${query.toString()}`);
  },
  
  getAlbum: (slug: string) => fetchApi<Album>(`/albums/${slug}`),
  getAlbumOther: (slug: string) => fetchApi<Album[]>(`/albums/${slug}/others`),
  
  submitContact: async (data: { name: string; email: string; subject: string; message: string }) => {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(data),
    });
    
    if (!res.ok) {
      const errorData: ApiError = await res.json().catch(() => ({
        message: `HTTP ${res.status}: ${res.statusText}`,
      }));
      throw new Error(errorData.message || 'Failed to send message');
    }
    
    return res.json();
  },
};

// Preload functions for Server Components (with React cache for deduplication)
export const preloadSettings = cache(async () => {
  return fetchApiServer<Setting>("/settings");
});

export const preloadHeroSlides = cache(async () => {
  return fetchApiServer<HeroSlide[]>("/hero-slides");
});

export const preloadTimeline = cache(async () => {
  return fetchApiServer<TimelineEvent[]>("/timeline");
});

export const preloadBatches = cache(async () => {
  return fetchApiServer<Batch[]>("/batches");
});

export const preloadActivities = cache(async (params?: { 
  batch_id?: number; 
  page?: number; 
  per_page?: number; 
  search?: string;
  featured?: boolean;
  limit?: number;
}) => {
  const query = new URLSearchParams();
  if (params?.batch_id) query.append("batch_id", params.batch_id.toString());
  if (params?.featured) query.append("featured", "1");
  if (params?.limit) query.append("limit", params.limit.toString());
  if (params?.page) query.append("page", params.page.toString());
  if (params?.per_page) query.append("per_page", params.per_page.toString());
  if (params?.search) query.append("search", params.search);
  
  if (params?.limit) {
    return fetchApiServer<Activity[]>(`/activities?${query.toString()}`);
  }
  return fetchPaginatedApiServer<Activity>(`/activities?${query.toString()}`);
});

export const preloadActivity = cache(async (slug: string) => {
  return fetchApiServer<Activity>(`/activities/${slug}`);
});

export const preloadActivityRelated = cache(async (slug: string) => {
  return fetchApiServer<Activity[]>(`/activities/${slug}/related`);
});

export const preloadAlbums = cache(async (params?: { 
  batch_id?: number; 
  page?: number; 
  per_page?: number; 
  search?: string 
}) => {
  const query = new URLSearchParams();
  if (params?.batch_id) query.append("batch_id", params.batch_id.toString());
  if (params?.page) query.append("page", params.page.toString());
  if (params?.per_page) query.append("per_page", params.per_page.toString());
  if (params?.search) query.append("search", params.search);
  return fetchPaginatedApiServer<Album>(`/albums?${query.toString()}`);
});

export const preloadAlbum = cache(async (slug: string) => {
  return fetchApiServer<Album>(`/albums/${slug}`);
});

export const preloadAlbumOthers = cache(async (slug: string) => {
  return fetchApiServer<Album[]>(`/albums/${slug}/others`);
});

export const preloadOrganization = cache(async (batchId?: number) => {
  return fetchApiServer<OrganizationMember[]>(
    `/organization${batchId ? `?batch_id=${batchId}` : ""}`
  );
});

// Server-side fetch functions (no-store for fresh data)
async function fetchApiServer<T>(endpoint: string): Promise<T | null> {
  try {
    const res = await fetch(`${EXTERNAL_API_URL}${endpoint}`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });

    if (!res.ok) {
      console.error(`API Error: ${res.status} for ${endpoint}`);
      return null;
    }

    const rawJson = await res.json();
    const json: ApiResponse<T> = rawJson.result || rawJson;
    
    if (!json.success) {
      console.error(`API failed: ${json.message} for ${endpoint}`);
      return null;
    }
    
    return json.data;
  } catch (error) {
    console.error(`Fetch error for ${endpoint}:`, error);
    return null;
  }
}

async function fetchPaginatedApiServer<T>(endpoint: string): Promise<PaginatedResponse<T> | null> {
  try {
    const res = await fetch(`${EXTERNAL_API_URL}${endpoint}`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    });

    if (!res.ok) {
      console.error(`API Error: ${res.status} for ${endpoint}`);
      return null;
    }

    const rawJson = await res.json();
    const json = rawJson.result || rawJson;
    
    if (!json.success) {
      console.error(`API failed: ${json.message} for ${endpoint}`);
      return null;
    }
    
    return {
      data: json.data,
      meta: json.meta || { current_page: 1, last_page: 1, per_page: 12, total: json.data.length },
    };
  } catch (error) {
    console.error(`Fetch error for ${endpoint}:`, error);
    return null;
  }
}
