import type { Metadata } from "next";
import { DidYouKnowSection } from "@/components/about/did-you-know-section";
import { OrgTreeSection } from "@/components/about/org-tree-section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/motion-wrapper";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { API_BASE_URL } from "@/lib/api";
import { DidYouKnowFact, OrganizationMember, Setting } from "@/types";
import { Users, Send } from "lucide-react";
import { ImageWithSkeleton } from "@/components/ui/image-with-skeleton";
import { getImageUrl } from "@/lib/utils";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tentang Kami",
  description:
    "Visi, misi, dan struktur organisasi Mahasiswa Jabodetabek Polindra. Mengenal lebih dekat keluarga besar Mahasiswa Jabodetabek Politeknik Negeri Indramayu.",
  openGraph: {
    title: "Tentang Kami — Mahasiswa Jabodetabek Polindra",
    description:
      "Visi, misi, dan struktur organisasi Mahasiswa Jabodetabek Polindra.",
  },
};

async function getOrganization(): Promise<OrganizationMember[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/organization`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const rawJson = await res.json();
    const json = rawJson.result || rawJson;
    return json.success ? json.data : [];
  } catch {
    return [];
  }
}

async function getSettings(): Promise<Setting | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/settings`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const rawJson = await res.json();
    const json = rawJson.result || rawJson;
    return json.success ? json.data : null;
  } catch {
    return null;
  }
}

async function getDidYouKnowFacts(): Promise<DidYouKnowFact[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/did-you-know`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const rawJson = await res.json();
    const json = rawJson.result || rawJson;
    return json.success ? json.data : [];
  } catch {
    return [];
  }
}

export default async function AboutPage() {
  const [members, settings, didYouKnowFacts] = await Promise.all([
    getOrganization(),
    getSettings(),
    getDidYouKnowFacts(),
  ]);

  const aboutPageImage = (settings as Record<string, unknown>)?.about_page_image as string | null;
  const activeMembersCount = (settings as Record<string, unknown>)?.active_members || "110+";

  return (
    <>
      {/* CSS font family override to Poppins as requested in prompt */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        
        /* Apply Poppins only to about page segments for brand alignment */
        .poppins-font-wrapper * {
          font-family: 'Poppins', sans-serif !important;
        }
      `}} />

      <div className="poppins-font-wrapper">
        {/* Visi Misi Section (demo.tsx redesign) */}
        <Section className="bg-white !pt-40 md:!pt-52">
          <Container>
            <Reveal>
              <div className="space-y-12">
                {/* Centered Heading with dash lines */}
                <SectionHeading
                  tag="Visi & Misi"
                  title="Mewujudkan Mahasiswa yang Berkualitas"
                  center
                />

                <section className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 max-w-6xl mx-auto">
                  {/* Left image block */}
                  <div className="relative shadow-xl shadow-primary/10 rounded-2xl overflow-hidden shrink-0 w-full max-w-[360px]">
                    {aboutPageImage ? (
                      <img 
                        className="w-full aspect-square object-cover rounded-2xl"
                        src={aboutPageImage}
                        alt="Visi & Misi MAJAP" 
                      />
                    ) : (
                      <div className="aspect-square w-full rounded-2xl bg-gray-100 flex items-center justify-center">
                        <Users className="w-16 h-16 text-primary/40" />
                      </div>
                    )}
                  </div>

                  {/* Right content block styled exactly like demo.tsx but themed with MAJAP brand */}
                  <div className="text-sm text-gray-600 max-w-xl w-full">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-base font-bold text-gray-900 mb-2">Visi Kami</h3>
                        <p className="leading-relaxed text-gray-600">
                          Terciptanya tali persaudaraan sesama Mahasiswa JABODETABEK POLINDRA yang
                          berintegritas, berkualitas, dan berdedikasi tinggi bagi nusa dan bangsa.
                        </p>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-gray-900 mb-2">Misi Kami</h3>
                        <ul className="list-disc pl-5 space-y-2 text-gray-600">
                          <li>Meningkatkan kebersamaan dan kekeluargaan antara sesama Mahasiswa JABODETABEK POLINDRA.</li>
                          <li>Mengembangkan potensi kreatif dan inovatif keilmuan anggota dan masyarakat daerah.</li>
                          <li>Berperan aktif dalam lingkungan masyarakat dengan mewujudkan nilai-nilai agama dan sosial.</li>
                        </ul>
                      </div>
                    </div>

                    <button className="flex items-center gap-2 mt-8 hover:-translate-y-0.5 transition bg-gradient-to-r from-primary to-primary-light py-3 px-8 rounded-full text-white font-bold shadow-md shadow-primary/10">
                      <Link href="/kegiatan" className="flex items-center gap-2">
                        <span>Lihat Kegiatan</span>
                        <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M12.53 6.53a.75.75 0 0 0 0-1.06L7.757.697a.75.75 0 1 0-1.06 1.06L10.939 6l-4.242 4.243a.75.75 0 0 0 1.06 1.06zM0 6v.75h12v-1.5H0z"
                            fill="#fff" />
                        </svg>
                      </Link>
                    </button>
                  </div>
                </section>
              </div>
            </Reveal>
          </Container>
        </Section>

        <Reveal><DidYouKnowSection facts={didYouKnowFacts} /></Reveal>

        {/* Struktur Organisasi Section (Pengurus Periode Ini) */}
        <Reveal>
          <Section className="bg-white py-16 md:py-20">
            <Container>
              <SectionHeading
                tag="Struktur Organisasi"
                title="Pengurus Periode Ini"
                center
              />
              <OrgTreeSection members={members} />
            </Container>
          </Section>
        </Reveal>
      </div>
    </>
  );
}
