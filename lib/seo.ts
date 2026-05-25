export const SITE = {
  name: "Mahasiswa Jabodetabek Polindra",
  shortName: "MAJAP",
  domain: "majap.web.id",
  url: "https://majap.web.id",
  title: "Mahasiswa Jabodetabek Polindra",
  tagline: "Portal Resmi Mahasiswa Jabodetabek Politeknik Negeri Indramayu",
  description:
    "Portal resmi Mahasiswa Jabodetabek Politeknik Negeri Indramayu — organisasi mahasiswa Polindra yang berdomisili di wilayah Jabodetabek. Informasi kegiatan, galeri, dan layanan organisasi.",
  ogImage: "/logo.png",
  email: "majapolindra@gmail.com",
  instagram: "@majap_polindra",
  keywords: [
    "Mahasiswa Jabodetabek Polindra",
    "Mahasiswa Jabodetabek",
    "Politeknik Negeri Indramayu",
    "Polindra",
    "MAJAP",
    "Organisasi Mahasiswa",
    "Indramayu",
    "Jabodetabek",
    "Politeknik",
    "Mahasiswa Indramayu",
  ],
};

export type SiteConfig = typeof SITE;

export function jsonLdOrganization() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    alternateName: SITE.shortName,
    url: SITE.url,
    logo: `${SITE.url}${SITE.ogImage}`,
    email: SITE.email,
    description: SITE.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. Raya Lohbener Lama No.08, Lohbener",
      addressLocality: "Indramayu",
      addressRegion: "Jawa Barat",
      postalCode: "45252",
      addressCountry: "ID",
    },
  };
}

export function jsonLdWebsite() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    alternateName: SITE.shortName,
    url: SITE.url,
    description: SITE.description,
    inLanguage: "id-ID",
  };
}

export function jsonLdBreadcrumb(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
