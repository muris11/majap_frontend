"use client";

import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SlideIn } from "@/components/ui/motion-wrapper";
import { Input } from "@/components/ui/input";
import { Section } from "@/components/ui/section";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/lib/api";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useEffect, useState } from "react";

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
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageHeader 
        title="Hubungi Kami" 
        description="Punya pertanyaan atau ingin berkolaborasi? Jangan ragu untuk menghubungi kami."
      />

      <Section className="bg-gray-50">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 md:gap-20">
            {/* Contact Info */}
            <SlideIn direction="left" className="space-y-10">
              <div className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">Informasi Kontak</h3>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                  Silakan hubungi kami melalui salah satu saluran berikut atau kunjungi sekretariat kami.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="bg-primary/10 p-4 rounded-xl text-primary transition-all duration-200 group-hover:bg-primary/20">
                  <MapPin size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Alamat</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                    Jl. Raya Lohbener Lama No.08, Lohbener,<br />
                    Indramayu, Jawa Barat 45252
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="bg-primary/10 p-4 rounded-xl text-primary transition-all duration-200 group-hover:bg-primary/20">
                  <Phone size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Telepon</h4>
                    <p className="text-gray-600 text-sm">+62 812-3456-7890</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="bg-primary/10 p-4 rounded-xl text-primary transition-all duration-200 group-hover:bg-primary/20">
                  <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Email</h4>
                    <p className="text-gray-600 text-sm">majapolindra@gmail.com</p>
                  </div>
                </div>
              </div>
              
              {/* Map Embed */}
              <div className="h-80 md:h-96 bg-gray-100 rounded-2xl overflow-hidden relative shadow-md">
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
                    {/* Label overlay */}
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-md">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <p className="text-xs font-semibold text-gray-900">HomeStay MAJAP</p>
                      </div>
                      <p className="text-[10px] text-gray-500 ml-3">Lohbener, Indramayu</p>
                    </div>
              </div>
            </SlideIn>

            {/* Contact Form */}
            <SlideIn direction="right" className="lg:col-span-2" delay={0.2}>
              <Card className="border-none shadow-xl bg-white rounded-3xl overflow-hidden">
                <CardContent className="p-8 md:p-12">
                  <h3 className="text-2xl md:text-3xl font-bold mb-8 tracking-tight text-gray-900">Kirim Pesan</h3>
                  
                  {success && (
                    <div className="bg-green-50 text-green-700 p-5 rounded-xl mb-8 border border-green-200">
                      Pesan Anda telah berhasil dikirim! Kami akan segera menghubungi Anda.
                    </div>
                  )}

                  {error && (
                    <div className="bg-red-50 text-red-700 p-5 rounded-xl mb-8 border border-red-200">
                      {error}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <label htmlFor="name" className="text-sm font-semibold text-gray-900">Nama Lengkap</label>
                        <Input 
                          id="name" 
                          name="name" 
                          placeholder="Nama Anda" 
                          required 
                          value={formData.name}
                          onChange={handleChange}
                          className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                        />
                      </div>
                      <div className="space-y-3">
                        <label htmlFor="email" className="text-sm font-semibold text-gray-900">Email</label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          placeholder="email@contoh.com" 
                          required 
                          value={formData.email}
                          onChange={handleChange}
                          className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <label htmlFor="subject" className="text-sm font-semibold text-gray-900">Subjek</label>
                      <Input 
                        id="subject" 
                        name="subject" 
                        placeholder="Judul pesan" 
                        required 
                        value={formData.subject}
                        onChange={handleChange}
                        className="h-12 rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                      />
                    </div>

                    <div className="space-y-3">
                      <label htmlFor="message" className="text-sm font-semibold text-gray-900">Pesan</label>
                      <Textarea 
                        id="message" 
                        name="message" 
                        placeholder="Tulis pesan Anda di sini..." 
                        rows={6} 
                        required 
                        value={formData.message}
                        onChange={handleChange}
                        className="resize-y rounded-xl bg-gray-50 border-gray-200 focus:bg-white transition-colors p-4"
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full md:w-auto h-12 px-8 rounded-full text-base font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30" disabled={loading}>
                      {loading ? "Mengirim..." : (
                        <>
                          Kirim Pesan <Send size={16} className="ml-2" />
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </SlideIn>
          </div>
        </Container>
      </Section>
    </>
  );
}
