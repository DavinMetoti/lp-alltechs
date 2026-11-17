import React, { Suspense, cache } from "react";
import type { Metadata } from "next";
import ProductClient from "./ProductClient";
import { fetchProductsCatalog, normalizeCategorySlug } from "@/lib/api";

export const dynamic = "force-dynamic";

const getProductsData = cache(async (categoryParam?: string) => {
  return fetchProductsCatalog(categoryParam, 500, { cache: "no-store" });
});

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const resolvedSearchParams = await searchParams;
  const rawCategory = resolvedSearchParams?.category;
  const normalizedCategory = normalizeCategorySlug(rawCategory);

  let title = "Katalog Produk PABX, Nurse Call, CCTV & Fire Alarm | PT. ALLTECHS SOLUSINDO";
  let description =
    "Temukan katalog lengkap produk telekomunikasi bisnis dan sistem keamanan dari PT. ALLTECHS SOLUSINDO. Distributor resmi PABX Panasonic, Yeastar, Dinstar, Nurse Call Commax, CCTV, & Fire Alarm.";
  let canonicalUrl = "https://alltechs.co.id/product";

  if (normalizedCategory) {
    const { categoryName } = await getProductsData(normalizedCategory);
    const label = categoryName || normalizedCategory.replace(/-/g, " ").toUpperCase();

    if (label.toLowerCase().includes("pabx") || label.toLowerCase().includes("pbx")) {
      title = "Distributor Resmi PABX Panasonic, Yeastar & Dinstar | PT. ALLTECHS SOLUSINDO";
      description =
        "Mencari sistem PABX Panasonic, Yeastar, atau Dinstar terbaik? PT. ALLTECHS SOLUSINDO melayani pengadaan, instalasi, dan perawatan PABX resmi di Indonesia.";
    } else if (label.toLowerCase().includes("nurse")) {
      title = "Distributor Nurse Call Commax & Aiphone Resmi | PT. ALLTECHS SOLUSINDO";
      description =
        "Solusi sistem Nurse Call Commax dan Aiphone berstandar akreditasi rumah sakit dan klinik. Hubungi kami untuk instalasi Nurse Call resmi.";
    } else {
      title = `Jual & Jasa Instalasi ${label} Resmi | PT. ALLTECHS SOLUSINDO`;
      description = `Dapatkan penawaran harga terbaik dan spesifikasi untuk produk ${label} resmi dari PT. ALLTECHS SOLUSINDO.`;
    }
    canonicalUrl = `https://alltechs.co.id/product?category=${encodeURIComponent(normalizedCategory)}`;
  }

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
  };
}

export default async function ProductPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const rawCategory = resolvedSearchParams?.category;
  const normalizedCategory = normalizeCategorySlug(rawCategory);
  const { products, categoryName, failed } = await getProductsData(normalizedCategory);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-50 pt-32 text-center">
          <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      }
    >
      <ProductClient
        key={normalizedCategory || "all"}
        products={products}
        categoryParam={normalizedCategory}
        categoryName={categoryName}
        ssrFailed={failed}
      />
    </Suspense>
  );
}
