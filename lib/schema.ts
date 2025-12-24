import { EnumSchema, FormSchema, NavigationSchema, TableSchema } from "@/types/schema";
import { API_BASE_URL } from "./api";

interface SchemaApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

async function fetchSchema<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    next: { revalidate: 300 }, // Cache for 5 minutes
  });

  if (!res.ok) {
    throw new Error(`Schema fetch failed: ${res.status}`);
  }

  const rawJson = await res.json();
  const json: SchemaApiResponse<T> = rawJson.result || rawJson;

  if (!json.success) {
    throw new Error(json.message || 'Schema fetch failed');
  }

  return json.data;
}

export const schemaApi = {
  getFormSchema: (name: string) => 
    fetchSchema<FormSchema>(`/schema/forms/${name}`),
  
  getTableSchema: (name: string) => 
    fetchSchema<TableSchema>(`/schema/tables/${name}`),
  
  getEnumSchema: (name: string) => 
    fetchSchema<EnumSchema>(`/schema/enums/${name}`),
  
  getNavigation: () => 
    fetchSchema<NavigationSchema>(`/schema/navigation`),
};

// Cache for client-side schema fetching
const schemaCache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export async function getCachedSchema<T>(
  key: string, 
  fetcher: () => Promise<T>
): Promise<T> {
  const cached = schemaCache.get(key);
  const now = Date.now();

  if (cached && now - cached.timestamp < CACHE_TTL) {
    return cached.data as T;
  }

  const data = await fetcher();
  schemaCache.set(key, { data, timestamp: now });
  return data;
}

export function invalidateSchemaCache(key?: string) {
  if (key) {
    schemaCache.delete(key);
  } else {
    schemaCache.clear();
  }
}
