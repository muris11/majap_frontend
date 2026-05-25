"use client";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Textarea } from "@/components/ui/textarea";
import { Reveal } from "@/components/ui/motion-wrapper";
import { api } from "@/lib/api";
import { Lightbulb, Send } from "lucide-react";
import { useState } from "react";

export default function SaranPage() {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await api.submitSuggestion({
        content,
        category: category || undefined,
      });
      setSuccess(true);
      setContent("");
      setCategory("");
    } catch {
      setError("Terjadi kesalahan saat mengirim saran. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Saran & Masukan"
        description="Kami sangat menghargai masukan dari Anda. Silakan sampaikan saran, kritik, atau ide untuk kemajuan MAJAP."
      />

      <Section className="bg-gray-50">
        <Container>
          <Reveal><div className="max-w-2xl mx-auto">
            <Card className="border shadow-sm bg-white rounded-2xl overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-primary/10 p-3 rounded-xl text-primary">
                    <Lightbulb size={24} />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Kirim Saran</h2>
                    <p className="text-sm text-gray-500">Saran Anda akan dibaca secara anonim</p>
                  </div>
                </div>

                <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 mb-8 text-sm text-gray-600">
                  <strong className="text-primary">Anonim & Aman:</strong> Saran yang Anda kirim tidak menyertakan data pribadi Anda.
                  Kami hanya akan membaca isi sarannya saja.
                </div>

                {success && (
                  <div className="bg-green-50 text-green-700 p-5 rounded-xl mb-8 border border-green-200">
                    Saran Anda telah terkirim! Terima kasih atas masukannya.
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 text-red-700 p-5 rounded-xl mb-8 border border-red-200">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-3">
                    <label htmlFor="category" className="text-sm font-semibold text-gray-900">
                      Kategori <span className="text-gray-400 font-normal">(opsional)</span>
                    </label>
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full h-12 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white transition-colors px-4 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    >
                      <option value="">Pilih kategori...</option>
                      <option value="organisasi">Organisasi</option>
                      <option value="kegiatan">Kegiatan</option>
                      <option value="website">Website</option>
                      <option value="lainnya">Lainnya</option>
                    </select>
                  </div>

                  <div className="space-y-3">
                    <label htmlFor="content" className="text-sm font-semibold text-gray-900">
                      Isi Saran <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      id="content"
                      placeholder="Tulis saran, kritik, atau ide Anda di sini..."
                      rows={8}
                      required
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="resize-y rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-colors p-4"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full md:w-auto h-12 px-8 rounded-xl text-base font-bold bg-primary text-white hover:bg-primary-dark"
                    disabled={loading}
                  >
                    {loading ? "Mengirim..." : (
                      <>
                        Kirim Saran <Send size={16} className="ml-2" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div></Reveal>
        </Container>
      </Section>
    </>
  );
}
