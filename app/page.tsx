import { AboutPreview } from "@/components/home/about-preview";
import { ActivitiesPreview } from "@/components/home/activities-preview";
import { CtaWithGallery } from "@/components/home/cta-with-gallery";
import { GalleryPreview } from "@/components/home/gallery-preview";
import { HeroSection } from "@/components/home/hero-section";
import { TimelineSection } from "@/components/home/timeline-section";
import { Reveal } from "@/components/ui/motion-wrapper";
import { API_BASE_URL } from "@/lib/api";
import { getImageUrl } from "@/lib/utils";
import { Activity, Album, HeroSlide, Setting, TimelineEvent } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Beranda",
  description:
    "Portal resmi Mahasiswa Jabodetabek Polindra — organisasi mahasiswa Politeknik Negeri Indramayu. Informasi kegiatan, galeri, dan layanan organisasi terkini.",
  openGraph: {
    title: "Mahasiswa Jabodetabek Polindra — Beranda",
    description:
      "Portal resmi Mahasiswa Jabodetabek Polindra. Informasi kegiatan, galeri, dan layanan organisasi terkini.",
  },
};

async function getData(): Promise<{
  stats: Setting | null;
  timeline: TimelineEvent[];
  heroSlides: HeroSlide[];
  aboutImage: string | null;
  activities: Activity[];
  albums: Album[];
}> {
  async function safeFetchJson(url: string, opts: RequestInit = {}) {
    try {
      const res = await fetch(url, { ...opts });
      if (!res.ok) return null;
      const data = await res.json();
      return data;
    } catch (e) {
      console.error(`Failed to fetch ${url}:`, e);
      return null;
    }
  }

  const [settingsRaw, timelineRaw, heroSlidesRaw, activitiesRaw, albumsRaw] = await Promise.all([
    safeFetchJson(`${API_BASE_URL}/settings`, { next: { revalidate: 60 } }),
    safeFetchJson(`${API_BASE_URL}/timeline`, { next: { revalidate: 60 } }),
    safeFetchJson(`${API_BASE_URL}/hero-slides`, { cache: "no-store" }),
    safeFetchJson(`${API_BASE_URL}/activities?limit=4`, { next: { revalidate: 60 } }),
    safeFetchJson(`${API_BASE_URL}/albums?per_page=4`, { next: { revalidate: 60 } }),
  ]);

  const settings = settingsRaw?.result || settingsRaw || {};
  const timeline = timelineRaw?.result || timelineRaw || {};
  const heroSlides = heroSlidesRaw?.result || heroSlidesRaw || {};
  const activities = activitiesRaw?.result || activitiesRaw || {};
  const albums = albumsRaw?.result || albumsRaw || {};

  const activityItems = activities.success && Array.isArray(activities.data) ? activities.data : [];
  const albumItems = albums.success && Array.isArray(albums.data) ? albums.data : [];
  const fallbackAboutImage = getImageUrl(activityItems[0]?.cover_image || albumItems[0]?.cover_image) || null;

  return {
    stats: settings.success ? settings.data : null,
    timeline: timeline.success ? timeline.data : [],
    heroSlides: heroSlides.success ? heroSlides.data : [],
    aboutImage: settings.success ? settings.data?.about_image || settings.data?.about_page_image || fallbackAboutImage : fallbackAboutImage,
    activities: activityItems,
    albums: albumItems.slice(0, 4),
  };
}

export default async function Home() {
  const { stats, timeline, heroSlides, aboutImage, activities, albums } = await getData();

  return (
    <div className="flex flex-col overflow-x-hidden">
      <HeroSection slides={heroSlides} />
      <Reveal><AboutPreview stats={stats ?? undefined} aboutImage={aboutImage} /></Reveal>
      <Reveal><TimelineSection events={timeline} /></Reveal>
      <Reveal><ActivitiesPreview initialData={activities} /></Reveal>
      <Reveal><GalleryPreview initialData={albums} /></Reveal>
      <Reveal><CtaWithGallery images={[...activities, ...albums].map((a) => getImageUrl(a.cover_image)).filter(Boolean) as string[]} /></Reveal>
    </div>
  );
}
