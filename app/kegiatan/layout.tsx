import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kegiatan",
  description:
    "Jelajahi berbagai kegiatan, agenda, dan program kerja Mahasiswa Jabodetabek Polindra.",
  openGraph: {
    title: "Kegiatan — Mahasiswa Jabodetabek Polindra",
    description:
      "Jelajahi berbagai kegiatan, agenda, dan program kerja Mahasiswa Jabodetabek Polindra.",
  },
};

export default function KegiatanLayout({ children }: { children: React.ReactNode }) {
  return children;
}
