"use client";

import { Container } from "@/components/ui/container";
import { FadeIn, FadeInStagger, ScaleIn } from "@/components/ui/motion-wrapper";
import { Section } from "@/components/ui/section";
import { TimelineEvent } from "@/types";
import { Calendar } from "lucide-react";

interface TimelineSectionProps { 
  events: TimelineEvent[];
}

export function TimelineSection({ events }: TimelineSectionProps) {
  if (!events || events.length === 0) return null;

  return (
    <Section className="bg-gray-50 relative overflow-hidden">
      <Container>
         <FadeIn className="text-center mb-16 space-y-4">
          <h2 className="flex items-center justify-center gap-2 text-primary text-sm font-bold tracking-widest uppercase">
            <span className="w-8 h-[2px] bg-primary"></span>
            Timeline Kegiatan
            <span className="w-8 h-[2px] bg-primary"></span>
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Jejak Langkah Per Angkatan
          </h3>
         </FadeIn>

        <div className="relative max-w-5xl mx-auto px-4">
          {/* Vertical Line */}
          <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 h-full w-[2px] bg-gray-200" style={{ backgroundImage: 'linear-gradient(to bottom, #0f4c45 50%, transparent 50%)', backgroundSize: '1px 20px', opacity: 0.3 }} />

           <FadeInStagger className="space-y-12">
            {events.map((event, index) => (
               <FadeInStagger.Item
                key={event.id}
                className={`relative flex flex-col md:flex-row gap-8 items-start md:items-center ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className="flex-1 w-full md:w-1/2 pl-16 md:pl-0">
                  <div className={`group bg-white p-6 md:p-8 rounded-2xl border border-gray-100 hover:border-primary/20 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden ${
                    index % 2 === 0 ? "md:mr-12 md:text-left" : "md:ml-12 md:text-left"
                  }`}>
                    <div className="absolute top-0 left-0 w-1 h-full bg-primary/0 group-hover:bg-primary/100 transition-all duration-300"></div>
                    
                    <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/5 text-primary text-sm font-bold tracking-wide border border-primary/10">
                            <Calendar className="w-3.5 h-3.5" />
                            {event.year}
                        </span>
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">{event.title}</h4>
                    <p className="text-gray-600 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Dot */}
                <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 md:translate-x-[-50%] z-10 flex items-center justify-center w-4 h-4 md:w-6 md:h-6 rounded-full bg-white border-4 border-primary shadow-lg shadow-primary/20">
                  <div className="absolute w-full h-full rounded-full bg-primary/20 animate-ping opacity-20"></div>
                </div>

                {/* Empty Space for alternate side */}
                <div className="flex-1 w-full md:w-1/2 hidden md:block" />
               </FadeInStagger.Item>
            ))}
           </FadeInStagger>
        </div>
      </Container>
    </Section>
  );
}
