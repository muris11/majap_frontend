import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Pertanyaan yang sering diajukan tentang Mahasiswa Jabodetabek Polindra. Temukan jawaban cepat seputar organisasi, kegiatan, dan layanan.",
  openGraph: {
    title: "FAQ — Mahasiswa Jabodetabek Polindra",
    description:
      "Pertanyaan yang sering diajukan tentang Mahasiswa Jabodetabek Polindra.",
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
