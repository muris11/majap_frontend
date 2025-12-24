import { DidYouKnowSection } from "@/components/about/did-you-know-section";
import { OrgTreeSection } from "@/components/about/org-tree-section";
import { PageHeader } from "@/components/layout/page-header";
import { Container } from "@/components/ui/container";
import { FadeIn, SlideIn } from "@/components/ui/motion-wrapper";
import { Section } from "@/components/ui/section";
import { API_BASE_URL } from "@/lib/api";
import { DidYouKnowFact, OrganizationMember, Setting } from "@/types";
import { Users } from "lucide-react";
import Image from "next/image";

async function getOrganization(): Promise<OrganizationMember[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/organization`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const rawJson = await res.json();
    const json = rawJson.result || rawJson;
    return json.success ? json.data : [];
  } catch (error) {
    console.error("Failed to fetch organization:", error);
    return [];
  }
}

async function getSettings(): Promise<Setting | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/settings`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const rawJson = await res.json();
    const json = rawJson.result || rawJson;
    return json.success ? json.data : null;
  } catch (error) {
    console.error("Failed to fetch settings:", error);
    return null;
  }
}

async function getDidYouKnowFacts(): Promise<DidYouKnowFact[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/did-you-know`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    const rawJson = await res.json();
    const json = rawJson.result || rawJson;
    return json.success ? json.data : [];
  } catch (error) {
    console.error("Failed to fetch did you know facts:", error);
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

  return (
    <>
      <PageHeader
        title="Tentang Kami"
        description="Mengenal lebih dekat MAJAP Polindra, visi misi, dan struktur organisasi."
      />

      <Section className="bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center mb-20 md:mb-28">
            <SlideIn direction="left" className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-primary text-xs md:text-sm font-semibold tracking-widest uppercase">
                  Visi & Misi
                </h2>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight leading-tight">
                  Mewujudkan Mahasiswa yang Berkualitas
                </h3>
              </div>
              <div className="space-y-8 text-gray-600 leading-relaxed">
                <div>
                  <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-3">
                    Visi
                  </h4>
                  <p className="text-base md:text-lg">
                    Terciptanya tali persaudaraan sesama Mahasiswa JABODETABEK POLINDRA yang
                    berintegritas, berkualitas, dan berdedikasi tinggi bagi nusa dan bangsa.
                  </p>
                </div>
                <div>
                  <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-4">
                    Misi
                  </h4>
                  <ul className="list-disc pl-6 space-y-3 text-base md:text-lg">
                    <li>
                      Meningkatkan kebersamaan dan kekeluargaan antara sesama Mahasiswa
                      JABODETABEK POLINDRA.
                    </li>
                    <li>
                      Mengembangkan potensi kreatif dan inovatif keilmuan anggota dan masyarakat
                      daerah.
                    </li>
                    <li>
                      Berperan aktif dalam lingkungan masyarakat dengan mewujudkan nilai-nilai agama dan
                      sosial.
                    </li>
                  </ul>
                </div>
              </div>
            </SlideIn>
            <SlideIn direction="right" className="relative">
              {aboutPageImage ? (
                <div className="rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 relative z-10 shadow-sm max-w-[550px] mx-auto">
                  <Image
                    src={aboutPageImage}
                    alt="MAJAP Polindra"
                    width={550}
                    height={550}
                    className="w-full h-auto object-contain"
                  />
                </div>
              ) : (
                <div className="aspect-video rounded-2xl overflow-hidden bg-gray-100 border border-gray-200 relative z-10 shadow-sm">
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10">
                    <div className="text-center space-y-4 p-8">
                      <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="w-10 h-10 text-primary" />
                      </div>
                      <p className="text-gray-500 font-medium text-lg">
                        MAJAP Polindra
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </SlideIn>
          </div>
        </Container>
      </Section>

      <DidYouKnowSection facts={didYouKnowFacts} />

      <Section className="bg-white">
        <Container>
          <FadeIn className="text-center mb-16 space-y-4">
            <h2 className="text-primary text-xs md:text-sm font-semibold tracking-widest uppercase">
              Struktur Organisasi
            </h2>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
              Pengurus Periode Ini
            </h3>
          </FadeIn>
          <OrgTreeSection members={members} />
        </Container>
      </Section>
    </>
  );
}
