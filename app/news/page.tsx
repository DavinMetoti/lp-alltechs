import React from "react";
import type { Metadata } from "next";
import NewsClient, { DUMMY_NEWS } from "./NewsClient";
import { fetchNewsList } from "@/lib/api";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Pusat Informasi & Berita Telekomunikasi | PT. ALLTECHS SOLUSINDO",
  description:
    "Ikuti berita terbaru seputar perkembangan teknologi telekomunikasi bisnis, PABX Panasonic & Yeastar, Nurse Call System, Fire Alarm, regulasi gedung, dan pembaruan resmi PT. ALLTECHS SOLUSINDO.",
  alternates: {
    canonical: "https://alltechs.co.id/news",
  },
};

export default async function NewsPage() {
  const { items, failed } = await fetchNewsList(100, { cache: "no-store" });
  const initialNews = !failed && items.length === 0 ? DUMMY_NEWS : items;

  return <NewsClient initialNews={initialNews} ssrFailed={failed} />;
}
