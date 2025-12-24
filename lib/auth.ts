 import { ApiResponse, AuthResponse, LoginCredentials, RegisterCredentials, User } from "@/types";
 
 const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api/v1";
 
 const TOKEN_KEY = "auth_token";
 
 export function getToken(): string | null {
   if (typeof window === "undefined") return null;
   return localStorage.getItem(TOKEN_KEY);
 }
 
 export function setToken(token: string): void {
   localStorage.setItem(TOKEN_KEY, token);
 }
 
 export function removeToken(): void {
   localStorage.removeItem(TOKEN_KEY);
 }
 
 async function authFetch<T>(
   endpoint: string,
   options?: RequestInit
 ): Promise<ApiResponse<T>> {
   const token = getToken();
   
   const res = await fetch(`${API_BASE_URL}${endpoint}`, {
     ...options,
     headers: {
       "Content-Type": "application/json",
       "Accept": "application/json",
       ...(token && { Authorization: `Bearer ${token}` }),
       ...options?.headers,
     },
   });
 
   const json = await res.json();
 
   if (!res.ok) {
     throw new Error(json.message || `API Error: ${res.status}`);
   }
 
   return json;
 }
 
 export const authApi = {
   register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
     const response = await authFetch<AuthResponse>("/auth/register", {
       method: "POST",
       body: JSON.stringify(credentials),
     });
     if (response.data.token) {
       setToken(response.data.token);
     }
     return response.data;
   },
 
   login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
     const response = await authFetch<AuthResponse>("/auth/login", {
       method: "POST",
       body: JSON.stringify(credentials),
     });
     if (response.data.token) {
       setToken(response.data.token);
     }
     return response.data;
   },
 
   logout: async (): Promise<void> => {
     try {
       await authFetch("/auth/logout", { method: "POST" });
     } finally {
       removeToken();
     }
   },
 
   getUser: async (): Promise<User> => {
     const response = await authFetch<User>("/auth/user");
     return response.data;
   },
 
   isAuthenticated: (): boolean => {
     return !!getToken();
   },
 };
