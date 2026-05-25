import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Timeline } from "@/components/ui/modern-timeline";
import { TimelineEvent } from "@/types";

interface TimelineSectionProps {
  events: TimelineEvent[];
}

export function TimelineSection({ events }: TimelineSectionProps) {
  if (!events || events.length === 0) return null;

  const sorted = [...events].sort((a, b) => a.order - b.order);

  const items = sorted.map((event) => ({
    title: event.title,
    description: event.description,
    date: String(event.year),
  }));

  return (
    <Section className="bg-gray-50">
      <Container>
        <SectionHeading
          tag="Perjalanan"
          title="Jejak Langkah"
          description="Perjalanan MAJAP dari masa ke masa"
          center
        />

        <div className="max-w-4xl mx-auto mt-4">
          <Timeline items={items} />
        </div>
      </Container>
    </Section>
  );
}
