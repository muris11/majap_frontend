"use client";

import { Container } from "@/components/ui/container";
import { Instagram, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/proxy/v1/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("Berhasil berlangganan!");
        setEmail("");
      } else {
        setMessage("Email sudah terdaftar.");
      }
    } catch {
      setMessage("Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <footer className="bg-white border-t border-gray-200 pt-12 pb-8">
      <div className="px-4 md:px-6 lg:px-8 max-w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="MAJAP Logo"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <div className="flex flex-col">
                <span className="font-bold text-sm leading-tight text-gray-900">Mahasiswa Jabodetabek</span>
                <span className="text-[10px] font-medium text-gray-600">Politeknik Negeri Indramayu</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              Wadah aspirasi dan kreasi mahasiswa Jabodetabek di Politeknik Negeri Indramayu. Kagak Ngaruh Tapi Berpengaruh.
            </p>
            <div className="flex gap-3">
              <Link href="https://www.instagram.com/majap_polindra/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors duration-200" aria-label="Instagram">
                <Instagram size={18} />
              </Link>
              <Link href="mailto:majapolindra@gmail.com" className="text-gray-500 hover:text-primary transition-colors duration-200" aria-label="Email">
                <Mail size={18} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-4">Tautan Cepat</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/" className="text-gray-500 hover:text-primary transition-colors duration-200">Beranda</Link></li>
              <li><Link href="/tentang" className="text-gray-500 hover:text-primary transition-colors duration-200">Tentang Kami</Link></li>
              <li><Link href="/kegiatan" className="text-gray-500 hover:text-primary transition-colors duration-200">Kegiatan</Link></li>
              <li><Link href="/galeri" className="text-gray-500 hover:text-primary transition-colors duration-200">Galeri Foto</Link></li>
              <li><Link href="/faq" className="text-gray-500 hover:text-primary transition-colors duration-200">FAQ</Link></li>
              <li><Link href="/saran" className="text-gray-500 hover:text-primary transition-colors duration-200">Saran & Masukan</Link></li>
              <li><Link href="/kontak" className="text-gray-500 hover:text-primary transition-colors duration-200">Hubungi Kami</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-4">Kontak</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-primary shrink-0 mt-0.5" />
                <span className="text-gray-500">Jl. Raya Lohbener Lama No.08, Lohbener, Indramayu, Jawa Barat 45252</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-primary shrink-0" />
                <a href="mailto:majapolindra@gmail.com" className="text-gray-500 hover:text-primary transition-colors">majapolindra@gmail.com</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Instagram size={16} className="text-primary shrink-0" />
                <a href="https://www.instagram.com/majap_polindra/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">@majap_polindra</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900 mb-4">Buletin</h4>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">Dapatkan informasi terbaru tentang kegiatan kami.</p>
            {message && (
              <p className={`text-xs mb-3 ${message === "Berhasil berlangganan!" ? "text-green-600" : "text-red-500"}`}>
                {message}
              </p>
            )}
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email Anda" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white border-2 border-gray-200 rounded-lg px-3.5 py-2 text-sm w-full focus-ring transition-all text-gray-900 placeholder:text-gray-400"
              />
              <button 
                type="submit"
                disabled={loading}
                className="bg-primary text-white px-4 py-2 rounded-lg text-xs font-semibold hover:bg-primary-dark transition-all duration-200 shadow-sm shrink-0 disabled:opacity-50"
              >
                {loading ? "..." : "Kirim"}
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center gap-3 text-gray-500">
          <p className="text-xs">&copy; {new Date().getFullYear()} MAJAP Polindra. All rights reserved.</p>
          <div className="flex gap-5 text-xs">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors duration-200">Kebijakan Privasi</Link>
            <Link href="/terms-of-service" className="hover:text-primary transition-colors duration-200">Syarat & Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
