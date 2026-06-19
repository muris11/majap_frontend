"use client";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { api } from "@/lib/api";
import { Faq } from "@/types";
import { ChevronDown, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Reveal } from "@/components/ui/motion-wrapper";

export default function FaqPage() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [openId, setOpenId] = useState<number | null>(null);

  useEffect(() => {
    api.getFaqs()
      .then(setFaqs)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return faqs;
    const q = search.toLowerCase();
    return faqs.filter(
      (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
    );
  }, [faqs, search]);

  return (
    <>
      <Section className="bg-gray-50 !pt-36 md:!pt-48">
        <Container>
          <SectionHeading
            as="h1"
            tag="FAQ"
            title="Pertanyaan Umum"
            description="Temukan jawaban atas pertanyaan yang sering diajukan tentang keluarga besar MAJAP Polindra."
            center
          />

          <Reveal><div className="max-w-2xl mx-auto">
            <div className="relative mb-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Cari pertanyaan..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
              />
            </div>

            {loading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-14 bg-white rounded-xl animate-pulse" />
                ))}
              </div>
            ) : filtered.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-gray-500">Tidak ditemukan.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filtered.map((faq) => {
                  const isOpen = openId === faq.id;
                  return (
                    <div key={faq.id} className="bg-white rounded-xl border border-gray-100 shadow-sm">
                      <button
                        onClick={() => setOpenId(isOpen ? null : faq.id)}
                        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                      >
                        <span className="font-semibold text-gray-900 text-sm leading-relaxed pr-4">
                          {faq.question}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`shrink-0 text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      <div
                        className={`overflow-hidden transition-all duration-200 ease-in-out ${
                          isOpen ? "max-h-96" : "max-h-0"
                        }`}
                      >
                        <div
                          className="px-5 pb-5 text-gray-500 text-sm leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: faq.answer }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div></Reveal>
        </Container>
      </Section>
    </>
  );
}
