import type { Metadata } from "next";
import MainContent from "@/components/MainContent";

export const metadata: Metadata = {
  title: "PT. ALLTECHS SOLUSINDO - Solusi Telekomunikasi & Sistem Keamanan Terintegrasi",
  description:
    "PT. ALLTECHS SOLUSINDO menyediakan solusi sistem telekomunikasi bisnis (PABX Panasonic, Yeastar, Dinstar), Nurse Call Commax, CCTV, dan Fire Alarm terintegrasi sejak 2004.",
  keywords: [
    "PT ALLTECHS SOLUSINDO",
    "alltechs solusindo",
    "pabx panasonic",
    "pabx yeastar",
    "pabx dinstar",
    "nurse call commax",
    "sistem fire alarm gedung",
    "cctv jakarta",
    "telekomunikasi bisnis",
    "ip-pbx distributor indonesia",
  ],
  alternates: {
    canonical: "https://alltechs.co.id",
  },
  openGraph: {
    title: "PT. ALLTECHS SOLUSINDO - Solusi Telekomunikasi & Sistem Keamanan Terintegrasi",
    description:
      "Mitra terpercaya untuk pengadaan, instalasi, dan perawatan sistem PABX, CCTV, Nurse Call, dan Fire Alarm untuk gedung perkantoran, hotel, dan rumah sakit.",
    url: "https://alltechs.co.id",
    siteName: "AllTechs",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PT. ALLTECHS SOLUSINDO - Partner Telekomunikasi & Keamanan Gedung",
    description:
      "Solusi PABX Panasonic & Yeastar, Nurse Call, Fire Alarm, dan CCTV terpercaya di Indonesia.",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

async function getJumbotrons() {
  const baseUrl = process.env.NEXT_API_URL || "https://cms.alltechs.co.id/api/";
  const cleanBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  const url = `${cleanBase}v1/jumbotrons?per_page=all`;
  const apiKey = process.env.NEXT_API_KEY || "";

  try {
    const res = await fetch(url, {
      headers: {
        "X-Api-Key": apiKey,
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json();
    return json.data?.data || [];
  } catch (error) {
    console.error("Failed to fetch jumbotrons from CMS:", error);
    return [];
  }
}

export default async function Home() {
  const jumbotrons = await getJumbotrons();
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "PT. ALLTECHS SOLUSINDO",
    "image": "https://alltechs.co.id/logo-alltechs.png",
    "url": "https://alltechs.co.id",
    "telephone": "+62215558989",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Ruko 87, Jl. H. Samali No.87, RT.19/RW.1, Pejaten Bar., Ps. Minggu",
      "addressLocality": "Jakarta Selatan",
      "addressRegion": "DKI Jakarta",
      "postalCode": "12510",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -6.2748,
      "longitude": 106.8378
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "opens": "08:00",
      "closes": "17:00"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MainContent jumbotrons={jumbotrons} />
    </>
  );
}
