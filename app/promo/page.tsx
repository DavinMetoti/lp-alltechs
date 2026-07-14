import React from "react";
import type { Metadata } from "next";
import PromoClient from "./PromoClient";
import { ArticleItem } from "@/lib/api";

export const metadata: Metadata = {
  title: "Promo & Penawaran Eksklusif Paket PABX | PT. ALLTECHS SOLUSINDO",
  description:
    "Dapatkan penawaran harga spesial, diskon paket instalasi PABX, CCTV, Nurse Call Commax, dan sistem alarm kebakaran resmi dari PT. ALLTECHS SOLUSINDO.",
  keywords: [
    "distributor nursecall aiphone",
    "agen pabx dinstar",
    "dealer pbx dinstar",
    "jasa instalasi nursecall commax",
    "promo pasang pabx",
    "diskon CCTV",
    "paket Nurse Call",
    "PT ALLTECHS SOLUSINDO",
    "alltechs solusindo"
  ],
  alternates: {
    canonical: "https://alltechs.co.id/promo",
  },
};

async function getPromos(): Promise<ArticleItem[]> {
  const baseUrl = process.env.NEXT_API_URL || "https://cms.alltechs.co.id/api/";
  const cleanBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  const apiKey = process.env.NEXT_API_KEY || "at_key_80ca892ab367ba187ba39d85647c0f70a67bd169b13be651";

  try {
    const res = await fetch(`${cleanBase}v1/promos?per_page=100`, {
      headers: {
        "X-Api-Key": apiKey,
        Accept: "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const json = await res.json();
      const list = json.data?.data || json.data || [];
      if (Array.isArray(list)) {
        return list.map((item: ArticleItem) => {
          const imgUrl = item.image_url || (item.image ? `https://cms.alltechs.co.id/${item.image.replace(/^\//, "")}` : undefined);
          return { ...item, image_url: imgUrl };
        });
      }
    }
  } catch (err) {
    console.error("Failed to load promos on Server:", err);
  }
  return [];
}

export default async function PromoPage() {
  const promos = await getPromos();

  return <PromoClient initialPromos={promos} />;
}
