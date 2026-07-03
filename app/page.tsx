import type { Metadata } from "next";
import MainContent from "@/components/MainContent";

export const metadata: Metadata = {
  title: "AllTechs - Software House & Solusi Teknologi Digital Terintegrasi",
  description:
    "AllTechs adalah mitra akselerasi digital terpercaya Anda. Kami menyediakan jasa pembuatan website custom, aplikasi mobile (iOS & Android), infrastruktur cloud & DevOps, integrasi kecerdasan buatan (AI), serta audit keamanan siber untuk UMKM hingga Enterprise.",
  keywords: [
    "software house jakarta",
    "jasa pembuatan website",
    "jasa pembuatan aplikasi mobile",
    "cloud migration devops",
    "integrasi kecerdasan buatan AI",
    "AllTechs indonesia",
    "solusi teknologi digital",
    "pembuatan sistem custom",
    "jasa cybersecurity audit",
  ],
  alternates: {
    canonical: "https://alltechs.id",
  },
  openGraph: {
    title: "AllTechs - Software House & Solusi Teknologi Digital Terintegrasi",
    description:
      "AllTechs membantu bisnis Anda bertransformasi dan memimpin pasar melalui produk digital andal, aman, dan berkinerja tinggi. Konsultasikan kebutuhan teknologi Anda secara gratis.",
    url: "https://alltechs.id",
    siteName: "AllTechs",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AllTechs - Partner Teknologi Digital Terbaik",
    description:
      "Pembuatan website, aplikasi mobile native/cross-platform, arsitektur cloud, dan teknologi AI untuk bisnis modern.",
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
  return <MainContent jumbotrons={jumbotrons} />;
}
