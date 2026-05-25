import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Hubungi Mahasiswa Jabodetabek Polindra melalui alamat, telepon, email, atau formulir kontak. Kami siap mendengar saran dan pertanyaan Anda.",
  openGraph: {
    title: "Kontak — Mahasiswa Jabodetabek Polindra",
    description:
      "Hubungi Mahasiswa Jabodetabek Polindra. Alamat, telepon, email, dan formulir kontak resmi.",
  },
};

export default function KontakLayout({ children }: { children: React.ReactNode }) {
  return children;
}
