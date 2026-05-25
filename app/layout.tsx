import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { cn } from "@/lib/utils";
import { SITE, jsonLdOrganization, jsonLdWebsite } from "@/lib/seo";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fontSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  weight: ["400", "700"],
});

const siteUrl = SITE.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: `%s | Mahasiswa Jabodetabek Polindra`,
    default: `Mahasiswa Jabodetabek Polindra`,
  },
  description: SITE.description,
  keywords: SITE.keywords,
  authors: { name: SITE.name },
  creator: SITE.name,
  publisher: SITE.name,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    url: siteUrl,
    images: [{ url: `${siteUrl}/logo.png`, width: 512, height: 512, alt: SITE.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: [`${siteUrl}/logo.png`],
  },
  icons: {
    icon: "/favicon.png",
    apple: "/logo.png",
  },
  alternates: {
    canonical: siteUrl,
  },
  verification: {
    google: "wY_r_F7c9sxpMTuOnk0MLxNR6--qy0b_sWr6lknB0xI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <body className={cn(fontSans.variable, "font-sans min-h-screen flex flex-col antialiased")}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebsite()) }}
        />
         <ScrollToTop />
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
      </body>
    </html>
  );
}
