import React from "react";
import type { Metadata } from "next";
import NewsClient from "./NewsClient";
import { ArticleItem } from "@/lib/api";

const DUMMY_NEWS: ArticleItem[] = [
  {
    id: 101,
    title: "Tren Telekomunikasi Bisnis 2026: Unified Communication Jadi Standar Baru",
    slug: "tren-telekomunikasi-2026",
    excerpt: "Tahun 2026 menjadi titik balik industri telekomunikasi bisnis di Indonesia. Unified Communication (UC) dan integrasi cloud semakin diadopsi oleh perusahaan skala menengah.",
    content: "<p>Industri telekomunikasi bisnis Indonesia sedang mengalami transformasi yang signifikan...</p>",
    image_url: "/migrated-media/1e655ac3e24853dd.jpg",
    category: "Industri",
    author: "PT. ALLTECHS SOLUSINDO",
    created_at: "2026-02-18T10:00:00Z",
  },
  {
    id: 102,
    title: "PT. ALLTECHS SOLUSINDO Raih Sertifikasi Resmi NEC Authorized Dealer 2026",
    slug: "alltechs-raih-sertifikasi-nec-2026",
    excerpt: "Kami dengan bangga mengumumkan bahwa PT. ALLTECHS SOLUSINDO telah berhasil memperbarui sertifikasi sebagai NEC Authorized Dealer untuk tahun 2026.",
    content: "<p>PT. ALLTECHS SOLUSINDO terus meningkatkan kualitas layanan...</p>",
    image_url: "/migrated-media/f3e22efd0b5ca786.jpg",
    category: "Perusahaan",
    author: "Tim Alltechs",
    created_at: "2026-02-10T10:00:00Z",
  },
  {
    id: 103,
    title: "Pemerintah Perketat Regulasi Sistem Fire Alarm di Gedung Publik",
    slug: "regulasi-fire-alarm-2026",
    excerpt: "Kementerian PUPR menerbitkan aturan baru yang mewajibkan gedung publik berkapasitas di atas 500 orang untuk memiliki sistem fire alarm terintegrasi dengan standar NFPA.",
    content: "<p>Regulasi baru dari Kementerian PUPR ini merupakan respons atas beberapa insiden...</p>",
    image_url: "/migrated-media/4c0a71981f9c8ff0.png",
    category: "Regulasi",
    author: "Kementerian PUPR",
    created_at: "2026-01-28T10:00:00Z",
  },
  {
    id: 104,
    title: "ALLTECHS Berpartisipasi dalam Pameran Telekomunikasi Jakarta Expo 2026",
    slug: "pameran-telekomunikasi-jakarta-2026",
    excerpt: "Kami hadir di Jakarta Convention Center, Hall B, Stand 24B. Kunjungi booth kami dan dapatkan demo langsung sistem PABX, CCTV, dan Nurse Call terbaru.",
    content: "<p>Jakarta Telekomunikasi Expo 2026 menjadi ajang bagi PT. ALLTECHS SOLUSINDO...</p>",
    image_url: "/migrated-media/9891d90ea5dd660c.jpg",
    category: "Event",
    author: "Tim Marketing",
    created_at: "2026-01-15T10:00:00Z",
  },
];

export const metadata: Metadata = {
  title: "Pusat Informasi & Berita Telekomunikasi | PT. ALLTECHS SOLUSINDO",
  description:
    "Ikuti berita terbaru seputar perkembangan teknologi telekomunikasi bisnis, PABX Panasonic & Yeastar, Nurse Call System, Fire Alarm, regulasi gedung, dan pembaruan resmi PT. ALLTECHS SOLUSINDO.",
  keywords: [
    "distributor nursecall aiphone",
    "agen pabx dinstar",
    "dealer pbx dinstar",
    "jasa instalasi nursecall commax",
    "berita telekomunikasi",
    "regulasi fire alarm gedung",
    "PT ALLTECHS SOLUSINDO",
    "alltechs solusindo"
  ],
  alternates: {
    canonical: "https://alltechs.co.id/news",
  },
};

async function getNews(): Promise<ArticleItem[]> {
  const baseUrl = process.env.NEXT_API_URL || "https://cms.alltechs.co.id/api/";
  const cleanBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  const apiKey = process.env.NEXT_API_KEY || "at_key_80ca892ab367ba187ba39d85647c0f70a67bd169b13be651";

  try {
    const res = await fetch(`${cleanBase}v1/news?per_page=100`, {
      headers: {
        "X-Api-Key": apiKey,
        Accept: "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const json = await res.json();
      const list = json.data?.data || json.data || [];
      if (Array.isArray(list) && list.length > 0) {
        return list.map((item: ArticleItem) => {
          const imgUrl = item.image_url || (item.image ? `https://cms.alltechs.co.id/${item.image.replace(/^\//, "")}` : undefined);
          return { ...item, image_url: imgUrl };
        });
      }
    }
  } catch (err) {
    console.error("Failed to load news on Server:", err);
  }
  return DUMMY_NEWS;
}

export default async function NewsPage() {
  const news = await getNews();

  return <NewsClient initialNews={news} />;
}
