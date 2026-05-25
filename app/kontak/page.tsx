"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/ui/motion-wrapper";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!success) return;
    const timer = setTimeout(() => setSuccess(false), 5000);
    return () => clearTimeout(timer);
  }, [success]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      await api.submitContact(formData);
      setSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setError("Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Section className="bg-gray-50 !pt-40 md:!pt-52 pb-16 md:pb-24">
        <Container className="!px-4 md:!px-6 lg:!px-8">
          <Reveal>
            <div className="space-y-12">
              {/* Centered Heading with dash lines */}
              <SectionHeading
                tag="Hubungi Kami"
                title="Mari Berkolaborasi"
                description="Punya pertanyaan, saran, atau ingin berkolaborasi dengan kami? Jangan ragu untuk menghubungi kami."
                center
              />

               <div className="mx-auto flex max-w-screen-xl flex-col justify-between gap-12 lg:flex-row lg:gap-20 items-start">
                 
                  {/* Left Column: Info */}
                  <div className="flex w-full flex-col justify-between gap-10 lg:max-w-md">
                    <div className="w-full space-y-8">
                    <div className="flex items-start gap-5 group">
                      <div className="bg-primary/10 p-4 rounded-xl text-primary transition-all duration-200 group-hover:bg-primary/20 shrink-0">
                        <MapPin size={24} />
                      </div>
                      <div className="pt-0.5">
                        <h4 className="text-base md:text-lg font-bold text-gray-900 mb-1.5">Alamat Sekretariat</h4>
                        <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                          Jl. Raya Lohbener Lama No.08, Lohbener,<br />
                          Indramayu, Jawa Barat 45252
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-5 group">
                      <div className="bg-primary/10 p-4 rounded-xl text-primary transition-all duration-200 group-hover:bg-primary/20 shrink-0">
                        <Phone size={24} />
                      </div>
                      <div className="pt-0.5">
                        <h4 className="text-base md:text-lg font-bold text-gray-900 mb-1.5">Telepon</h4>
                        <p className="text-gray-600 text-sm md:text-base">+62 812-3456-7890</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-5 group">
                      <div className="bg-primary/10 p-4 rounded-xl text-primary transition-all duration-200 group-hover:bg-primary/20 shrink-0">
                        <Mail size={24} />
                      </div>
                      <div className="pt-0.5">
                        <h4 className="text-base md:text-lg font-bold text-gray-900 mb-1.5">Email Resmi</h4>
                        <p className="text-gray-600 text-sm md:text-base">majapolindra@gmail.com</p>
                      </div>
                    </div>
                  </div>
                </div>

              {/* Right Column: Form Box (21st.dev Contact-2 style) */}
              <div className="w-full lg:max-w-xl mx-auto">
                <Card className="border border-gray-200 shadow-sm bg-white rounded-2xl overflow-hidden w-full">
                  <CardContent className="p-8 md:p-10 space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900">Kirim Pesan</h3>
                      <p className="text-xs text-gray-500">Isi formulir di bawah ini untuk mengirimkan pesan langsung kepada kami.</p>
                    </div>

                    {success && (
                      <div className="bg-green-50 text-green-700 p-4 rounded-xl border border-green-200 text-sm">
                        Pesan Anda telah berhasil dikirim! Kami akan segera menghubungi Anda.
                      </div>
                    )}

                    {error && (
                      <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200 text-sm">
                        {error}
                      </div>
                    )}

                     <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-xs font-semibold text-gray-700 block">Nama Lengkap</label>
                          <Input 
                            id="name" 
                            name="name" 
                            placeholder="Nama Anda" 
                            required 
                            value={formData.name}
                            onChange={handleChange}
                            className="h-11 rounded-xl bg-gray-50 border-gray-200 focus:bg-white text-sm focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all duration-200"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-xs font-semibold text-gray-700 block">Email</label>
                          <Input 
                            id="email" 
                            name="email" 
                            type="email" 
                            placeholder="email@contoh.com" 
                            required 
                            value={formData.email}
                            onChange={handleChange}
                            className="h-11 rounded-xl bg-gray-50 border-gray-200 focus:bg-white text-sm focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all duration-200"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="subject" className="text-xs font-semibold text-gray-700 block">Subjek</label>
                        <Input 
                          id="subject" 
                          name="subject" 
                          placeholder="Judul pesan" 
                          required 
                          value={formData.subject}
                          onChange={handleChange}
                          className="h-11 rounded-xl bg-gray-50 border-gray-200 focus:bg-white text-sm focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all duration-200"
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="text-xs font-semibold text-gray-700 block">Pesan</label>
                        <Textarea 
                          id="message" 
                          name="message" 
                          placeholder="Tulis pesan Anda di sini..." 
                          rows={5} 
                          required 
                          value={formData.message}
                          onChange={handleChange}
                          className="resize-y rounded-xl bg-gray-50 border-gray-200 focus:bg-white text-sm p-4 focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all duration-200"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full h-11 px-6 rounded-xl text-sm font-bold bg-primary text-white hover:bg-primary-dark shadow-sm shadow-primary/10 transition-all duration-200"
                        disabled={loading}
                      >
                        {loading ? "Mengirim..." : (
                          <div className="flex items-center justify-center gap-2">
                            Kirim Pesan <Send size={14} />
                          </div>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

            </div>

              {/* Map Section - Full width at bottom */}
              <div className="w-full">
                <div className="h-[400px] md:h-[500px] w-full bg-gray-100 rounded-2xl overflow-hidden relative border border-gray-200 shadow-sm">
                  <iframe 
                    src="https://maps.google.com/maps?q=-6.396750680723186,108.2839505113135&z=17&output=embed"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  />
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md border border-gray-100">
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <p className="text-[10px] font-bold text-gray-900">HomeStay MAJAP</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
