import { Container } from "@/components/ui/container";
import { Instagram, Mail, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 pt-16 md:pt-20 pb-8 md:pb-10">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-12 md:mb-16">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="MAJAP Logo"
                width={48}
                height={48}
                className="w-12 h-12"
              />
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight text-gray-900">Mahasiswa Jabodetabek</span>
                <span className="text-xs font-medium text-gray-600">Politeknik Negeri Indramayu</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Wadah aspirasi dan kreasi mahasiswa Jabodetabek di Politeknik Negeri Indramayu. Kagak Ngaruh Tapi Berpengaruh.
            </p>
            <div className="flex gap-4">
              <Link href="https://www.instagram.com/majap_polindra/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors duration-200" aria-label="Instagram">
                <Instagram size={20} />
              </Link>
              <Link href="mailto:majapolindra@gmail.com" className="text-gray-600 hover:text-primary transition-colors duration-200" aria-label="Email">
                <Mail size={20} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-5">Tautan Cepat</h3>
            <ul className="space-y-3.5 text-sm">
              <li><Link href="/" className="text-gray-600 hover:text-primary transition-colors duration-200 inline-block">Beranda</Link></li>
              <li><Link href="/tentang" className="text-gray-600 hover:text-primary transition-colors duration-200 inline-block">Tentang Kami</Link></li>
              <li><Link href="/kegiatan" className="text-gray-600 hover:text-primary transition-colors duration-200 inline-block">Kegiatan</Link></li>
              <li><Link href="/galeri" className="text-gray-600 hover:text-primary transition-colors duration-200 inline-block">Galeri Foto</Link></li>
              <li><Link href="/kontak" className="text-gray-600 hover:text-primary transition-colors duration-200 inline-block">Hubungi Kami</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-5">Kontak</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span className="text-gray-600">Jl. Raya Lohbener Lama No.08, Lohbener, Indramayu, Jawa Barat 45252</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <a href="mailto:majapolindra@gmail.com" className="text-gray-600 hover:text-primary transition-colors">majapolindra@gmail.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Instagram size={18} className="text-primary shrink-0" />
                <a href="https://www.instagram.com/majap_polindra/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary transition-colors">@majap_polindra</a>
              </li>
            </ul>
          </div>

          {/* Newsletter (Optional) */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 mb-5">Buletin</h3>
            <p className="text-sm text-gray-600 mb-5 leading-relaxed">Dapatkan informasi terbaru tentang kegiatan kami.</p>
            <form className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email Anda" 
                className="bg-white border-2 border-gray-200 rounded-lg px-4 py-2.5 text-sm w-full focus-ring transition-all text-gray-900 placeholder:text-gray-400"
              />
              <button 
                type="submit"
                className="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-all duration-200 shadow-sm shrink-0"
              >
                Kirim
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600">
          <p className="text-sm">&copy; {new Date().getFullYear()} MAJAP Polindra. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <Link href="/privacy-policy" className="hover:text-primary transition-colors duration-200">Kebijakan Privasi</Link>
            <Link href="/terms-of-service" className="hover:text-primary transition-colors duration-200">Syarat & Ketentuan</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
