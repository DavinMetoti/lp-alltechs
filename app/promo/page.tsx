import React from "react";
import type { Metadata } from "next";
import PromoClient from "./PromoClient";
import { fetchPromosList } from "@/lib/api";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Promo & Penawaran Eksklusif Paket PABX | PT. ALLTECHS SOLUSINDO",
  description:
    "Dapatkan penawaran harga spesial, diskon paket instalasi PABX, CCTV, Nurse Call Commax, dan sistem alarm kebakaran resmi dari PT. ALLTECHS SOLUSINDO.",
  alternates: {
    canonical: "https://alltechs.co.id/promo",
  },
};

export default async function PromoPage() {
  const { items: promos, failed } = await fetchPromosList(100, { cache: "no-store" });

  return <PromoClient initialPromos={promos} ssrFailed={failed} />;
}
