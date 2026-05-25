import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Saran & Masukan",
  description:
    "Sampaikan saran, kritik, atau ide untuk kemajuan Mahasiswa Jabodetabek Polindra secara anonim.",
  openGraph: {
    title: "Saran & Masukan — Mahasiswa Jabodetabek Polindra",
    description:
      "Sampaikan saran, kritik, atau ide untuk kemajuan Mahasiswa Jabodetabek Polindra.",
  },
};

export default function SaranLayout({ children }: { children: React.ReactNode }) {
  return children;
}
