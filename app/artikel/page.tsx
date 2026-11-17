import React from "react";
import type { Metadata } from "next";
import ArticlesClient from "./ArticlesClient";
import { fetchArticlesList } from "@/lib/api";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Artikel & Panduan Sistem Komunikasi Gedung | PT. ALLTECHS SOLUSINDO",
  description:
    "Kumpulan panduan teknis, tips, dan artikel industri tentang PABX Panasonic, Yeastar, Dinstar, Nurse Call Commax, CCTV, dan Fire Alarm dari PT. ALLTECHS SOLUSINDO.",
  alternates: {
    canonical: "https://alltechs.co.id/artikel",
  },
};

export default async function ArticlesPage() {
  const { items: articles, failed } = await fetchArticlesList(100, { cache: "no-store" });

  return <ArticlesClient initialArticles={articles} ssrFailed={failed} />;
}
