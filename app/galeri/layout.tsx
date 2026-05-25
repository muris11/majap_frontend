import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Galeri",
  description:
    "Koleksi momen berharga dan dokumentasi kegiatan Mahasiswa Jabodetabek Polindra dalam foto.",
  openGraph: {
    title: "Galeri — Mahasiswa Jabodetabek Polindra",
    description:
      "Koleksi momen berharga dan dokumentasi kegiatan Mahasiswa Jabodetabek Polindra.",
  },
};

export default function GaleriLayout({ children }: { children: React.ReactNode }) {
  return children;
}
