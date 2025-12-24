import { AboutPreview } from "@/components/home/about-preview";
import { ActivitiesPreview } from "@/components/home/activities-preview";
import { ContactCTA } from "@/components/home/contact-cta";
import { GalleryPreview } from "@/components/home/gallery-preview";
import { HeroSection } from "@/components/home/hero-section";
import { TimelineSection } from "@/components/home/timeline-section";
import { API_BASE_URL } from "@/lib/api";
import { HeroSlide, Setting, TimelineEvent } from "@/types";

async function getData(): Promise<{
  stats: Setting | null;
  timeline: TimelineEvent[];
  heroSlides: HeroSlide[];
  aboutImage: string | null;
}> {
  try {
    const [settingsRes, timelineRes, heroSlidesRes] = await Promise.all([
      fetch(`${API_BASE_URL}/settings`, { cache: 'no-store' }),
      fetch(`${API_BASE_URL}/timeline`, { cache: 'no-store' }),
      fetch(`${API_BASE_URL}/hero-slides`, { cache: 'no-store' }),
    ]);

    const [settingsRaw, timelineRaw, heroSlidesRaw] = await Promise.all([
      settingsRes.json(),
      timelineRes.json(),
      heroSlidesRes.json(),
    ]);

    // Handle wrapped response format: { result: { success, data } }
    const settings = settingsRaw.result || settingsRaw;
    const timeline = timelineRaw.result || timelineRaw;
    const heroSlides = heroSlidesRaw.result || heroSlidesRaw;

    return {
      stats: settings.success ? settings.data : null,
      timeline: timeline.success ? timeline.data : [],
      heroSlides: heroSlides.success ? heroSlides.data : [],
      aboutImage: settings.success ? settings.data?.about_image || null : null,
    };
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return {
      stats: null,
      timeline: [],
      heroSlides: [],
      aboutImage: null,
    };
  }
}

export default async function Home() {
  const { stats, timeline, heroSlides, aboutImage } = await getData();

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection slides={heroSlides} />
      <AboutPreview stats={stats ?? undefined} aboutImage={aboutImage} />
      <TimelineSection events={timeline} />
      <ActivitiesPreview />
      <GalleryPreview />
      <ContactCTA />
    </div>
  );
}
