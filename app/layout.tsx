import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ScrollToTop } from "@/components/layout/scroll-to-top";
import { cn } from "@/lib/utils";
import { SITE, jsonLdOrganization, jsonLdWebsite } from "@/lib/seo";
import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fontSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const siteUrl = SITE.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: `%s | MAJAP - POLINDRA`,
    default: `MAJAP - POLINDRA`,
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
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MAJAP",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f4c45",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={cn(fontSans.variable, "font-sans min-h-screen flex flex-col antialiased")}>
        <script
          type="application/ld+json"
          id="jsonld-organization"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization()) }}
        />
        <script
          type="application/ld+json"
          id="jsonld-website"
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
