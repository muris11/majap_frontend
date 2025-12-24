export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface HeroSlide {
  id: number;
  image: string;
}

export interface DidYouKnowFact {
  id: number;
  title: string;
  image: string;
}

export interface Setting {
  [key: string]: string | number | boolean | null;
}

export interface TimelineEvent {
  id: number;
  year: number | string;
  title: string;
  description: string;
  icon?: string;
  order: number;
}

export interface Batch {
  id: number;
  name: string;
  year: number;
  is_active: boolean;
}

export interface OrganizationMember {
  id: number;
  position: string;
  photo: string | null;
  description: string | null;
  level: number;
  order: number;
}

export interface Activity {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  content?: string;
  cover_image: string | null;
  event_date: string;
  event_date_formatted: string;
  location: string;
  is_featured: boolean;
  batch: {
    id: number;
    name: string;
    year: number;
  };
}

export interface Album {
  id: number;
  title: string;
  slug: string;
  description: string | null;
  cover_image: string | null;
  photos_count: number;
  batch: {
    id: number;
    name: string;
    year: number;
  };
  activity: {
    id: number;
    title: string;
    slug: string;
  } | null;
  photos?: Photo[];
}

export interface Photo {
  id: number;
  image_path: string;
  caption: string | null;
}

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  token_type: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export * from './schema';
