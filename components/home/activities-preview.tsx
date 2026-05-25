"use client";

import { ExpandCards } from "@/components/ui/expand-cards";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { getImageUrl } from "@/lib/utils";
import { Activity } from "@/types";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ActivitiesPreviewProps {
  initialData: Activity[];
}

export function ActivitiesPreview({ initialData }: ActivitiesPreviewProps) {
  const router = useRouter();
  const activities = initialData;

  const items = activities.map((a) => ({
    image: getImageUrl(a.cover_image) || "",
    title: a.title,
    subtitle: `${a.event_date_formatted} · ${a.batch.name}`,
    href: `/kegiatan/${a.slug}`,
  }));

  return (
    <Section className="bg-white">
      <Container>
        <SectionHeading
          tag="Kegiatan"
          title="Agenda & Aktivitas"
          description="Rangkaian kegiatan yang telah dilaksanakan oleh keluarga besar MAJAP Polindra."
          center
        />

        {items.length > 0 ? (
          <ExpandCards
            items={items}
            onCardClick={(index) => {
              const item = items[index];
              if (item?.href) router.push(item.href);
            }}
          />
        ) : (
          <div className="text-center py-10 text-gray-400 text-sm">
            Belum ada kegiatan.
          </div>
        )}

        <div className="text-center mt-10">
          <Button variant="outline" size="default" className="rounded-lg border-gray-200 hover:border-primary hover:text-primary group" asChild>
            <Link href="/kegiatan">
              Lihat Semua Kegiatan <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
