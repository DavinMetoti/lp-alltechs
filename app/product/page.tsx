import React, { Suspense } from "react";
import type { Metadata } from "next";
import ProductClient, { ProductItem } from "./ProductClient";

export const metadata: Metadata = {
  title: "Katalog Produk & Solusi Digital - AllTechs",
  description:
    "Jelajahi produk teknologi komunikasi, PABX Panasonic, Nurse Call Commax, CCTV, Fire Alarm System, dan sistem keamanan berkualitas tinggi dari AllTechs.",
};

async function getProductsData(categoryParam?: string) {
  const baseUrl = process.env.NEXT_API_URL || "https://cms.alltechs.co.id/api/";
  const cleanBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  const apiKey = process.env.NEXT_API_KEY || "at_key_80ca892ab367ba187ba39d85647c0f70a67bd169b13be651";
  const endpoint = categoryParam
    ? `${cleanBase}v1/products?category=${encodeURIComponent(categoryParam)}&per_page=100`
    : `${cleanBase}v1/products?per_page=100`;

  let products: ProductItem[] = [];
  let categoryName = "";

  try {
    const res = await fetch(endpoint, {
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
        products = list.map((item: ProductItem) => ({
          ...item,
          image_url:
            item.image_url ||
            (item.image ? `https://cms.alltechs.co.id/${item.image.replace(/^\//, "")}` : undefined),
        }));

        if (products.length > 0 && categoryParam) {
          const firstItem = products[0];
          if (firstItem.brand && typeof firstItem.brand === "object" && firstItem.brand.category) {
            const catObj = firstItem.brand.category;
            if (typeof catObj === "object" && catObj.name) {
              categoryName = catObj.name;
            } else if (typeof catObj === "string") {
              categoryName = catObj;
            }
          } else if (firstItem.category) {
            if (typeof firstItem.category === "object" && firstItem.category.name) {
              categoryName = firstItem.category.name;
            } else if (typeof firstItem.category === "string") {
              categoryName = firstItem.category;
            }
          }
        } else if (categoryParam) {
          const catRes = await fetch(`${cleanBase}v1/categories/${encodeURIComponent(categoryParam)}`, {
            headers: { "X-Api-Key": apiKey, Accept: "application/json" },
            next: { revalidate: 3600 },
          });
          if (catRes.ok) {
            const catJson = await catRes.json();
            if (catJson.data?.name) {
              categoryName = catJson.data.name;
            }
          }
        }
      }
    }
  } catch (err) {
    console.error("Failed to fetch products on Server", err);
  }

  return { products, categoryName };
}

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ProductPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const categoryParam = resolvedSearchParams?.category;
  const { products, categoryName } = await getProductsData(categoryParam);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-50 pt-32 text-center">
          <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      }
    >
      <ProductClient
        products={products}
        categoryParam={categoryParam}
        categoryName={categoryName}
      />
    </Suspense>
  );
}
