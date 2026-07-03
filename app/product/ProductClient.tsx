"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, MessageCircle } from "lucide-react";
import { motion } from "motion/react";

export interface ProductItem {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  image?: string;
  image_url?: string;
  category?: string | { id: number; name: string };
  brand?: string | { id: number; name: string; category?: any };
  wa_text?: string;
}

const KNOWN_BRANDS = [
  { name: "Panasonic", keywords: ["PANASONIC", "Panasonic", "CV-CFN203L", "CJ-HDR416", "C-Series"] },
  { name: "Bosch", keywords: ["BOSCH", "D296", "FAA-420", "FCP", "FMC-120", "FNM-320", "FNS-320", "FPA-1200", "FPC-500", "BLUELINE", "RADION", "APC-AMC", "API-AMC", "APS-PSU", "AMC2", "LTC"] },
  { name: "Albox", keywords: ["ALBOX"] },
  { name: "Aiphone", keywords: ["AIPHONE", "NIR-7Hw", "NI-SB", "NIR-42", "NI-SOFT", "NEM-40C", "NEM-20A", "IS-PU-UL", "NIR-2", "NIR-1"] },
  { name: "Avtech", keywords: ["AVTECH"] },
  { name: "Infinity", keywords: ["INFINITY"] },
  { name: "Uniview (UNV)", keywords: ["UNV", "Uniview"] },
  { name: "Horing Lih", keywords: ["HORING", "HORING LIH", "AH-9717", "AH-0822", "QA-12", "AH-9719", "AHS-871", "AH-01313"] },
  { name: "Nohmi", keywords: ["NOHMI", "FLPJ001", "FAPN202", "FDK246N"] },
  { name: "Alcatel-Lucent", keywords: ["ALCATEL", "ALCATEL-LUCENT"] },
  { name: "LG Ericsson", keywords: ["LG ERICSSON", "LG-ERICSSON", "LG", "ERICSSON", "IPE-CS", "iPECS", "LDP", "EMG100"] },
  { name: "Commax", keywords: ["COMMAX", "CL-302i", "DISPLAY PERAWAT K-366", "LAMPU KORIDOR K3L LIGHT", "PUSH BUTTON BED PASIEN K-W2-H", "PUSH BUTTON TOILET K-W1-P", "SIGNAL REPEATER K"] },
  { name: "Hikvision", keywords: ["HIKVISION"] },
  { name: "Yeastar", keywords: ["YEASTAR"] },
  { name: "Dinstar", keywords: ["DINSTAR"] },
];

const getBrandFromProduct = (product: ProductItem) => {
  if (product.brand) {
    if (typeof product.brand === "object" && product.brand.name) {
      return product.brand.name.trim();
    }
    if (typeof product.brand === "string" && product.brand.trim()) {
      return product.brand.trim();
    }
  }
  const title = product.title || "";
  const titleUpper = title.toUpperCase();
  for (const brand of KNOWN_BRANDS) {
    if (brand.keywords.some((kw) => titleUpper.includes(kw.toUpperCase()))) {
      return brand.name;
    }
  }
  return "Other";
};

interface ProductClientProps {
  products: ProductItem[];
  categoryParam?: string;
  categoryName?: string;
}

export default function ProductClient({
  products,
  categoryParam,
  categoryName,
}: ProductClientProps) {
  const [selectedBrand, setSelectedBrand] = useState("All");

  useEffect(() => {
    setSelectedBrand("All");
  }, [categoryParam]);

  // Group products returned directly by backend API by brand
  const groupedProducts = products.reduce((acc: Record<string, ProductItem[]>, product) => {
    const brandStr = getBrandFromProduct(product);
    if (!acc[brandStr]) acc[brandStr] = [];
    acc[brandStr].push(product);
    return acc;
  }, {});

  const brandKeys = Object.keys(groupedProducts).sort((a, b) => {
    if (a === "Other") return 1;
    if (b === "Other") return -1;
    return a.localeCompare(b);
  });

  const displayedBrandKeys = brandKeys.filter(
    (brandKey) => selectedBrand === "All" || selectedBrand === brandKey
  );

  return (
    <div className="min-h-screen bg-zinc-50 pt-24">
      {/* ── Hero Banner ── */}
      <section className="relative bg-zinc-950 text-white pt-20 pb-16 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white uppercase"
          >
            {categoryName || (categoryParam ? categoryParam.replace(/-/g, " ") : "Katalog Produk & Solusi")}
          </motion.h1>

          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex items-center justify-center gap-2 text-xs sm:text-sm text-zinc-400 font-medium"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-orange-500 font-bold uppercase">Product</span>
            {categoryParam && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
                <span className="text-zinc-300 capitalize">{categoryName || categoryParam.replace(/-/g, " ")}</span>
              </>
            )}
          </motion.nav>
        </div>
      </section>

      {/* ── Product Section grouped by Brand ── */}
      <section className="py-16 px-4 bg-zinc-50">
        <div className="max-w-7xl mx-auto space-y-16">
          {products.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-zinc-200/60 p-8 space-y-3">
              <p className="text-zinc-500 font-semibold text-base">Belum ada produk yang tersedia di kategori ini.</p>
            </div>
          ) : (
            <>
              {/* Brand Filter Pills */}
              {brandKeys.length > 1 && (
                <div className="text-center space-y-4 pb-8 border-b border-zinc-200/80">
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <button
                      onClick={() => setSelectedBrand("All")}
                      className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                        selectedBrand === "All"
                          ? "bg-orange-600 text-white shadow-md shadow-orange-600/20 scale-105"
                          : "bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200"
                      }`}
                    >
                      Semua Merk
                    </button>
                    {brandKeys.map((bKey) => (
                      <button
                        key={bKey}
                        onClick={() => setSelectedBrand(bKey)}
                        className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                          selectedBrand === bKey
                            ? "bg-orange-600 text-white shadow-md shadow-orange-600/20 scale-105"
                            : "bg-white text-zinc-600 hover:bg-zinc-100 border border-zinc-200"
                        }`}
                      >
                        {bKey === "Other" ? "Lainnya" : bKey}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Displayed Products by Brand */}
              <div className="space-y-16">
                {displayedBrandKeys.map((bKey) => {
                  const brandProducts = groupedProducts[bKey];
                  return (
                    <div key={bKey} className="space-y-8">
                      <div className="text-center max-w-2xl mx-auto space-y-2">
                        <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-zinc-950 tracking-wide">
                          {bKey === "Other" ? "Produk Penunjang Lainnya" : `Produk ${bKey}`}
                        </h2>
                        <div className="w-12 h-1 bg-orange-600 mx-auto rounded-full" />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {brandProducts.map((product, idx) => (
                          <motion.div
                            key={product.id || idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.05 }}
                            className="group flex flex-col justify-between overflow-hidden rounded-2xl bg-white shadow-xs hover:shadow-xl transition-all duration-300 border border-zinc-200/80 hover:border-orange-300 hover:-translate-y-1"
                          >
                            <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-50 p-4 flex items-center justify-center">
                              {product.image_url ? (
                                <Image
                                  src={product.image_url}
                                  alt={product.title}
                                  fill
                                  unoptimized
                                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center text-zinc-400 text-xs font-semibold">
                                  No Image Available
                                </div>
                              )}
                            </div>

                            <div className="p-6 flex-1 flex flex-col justify-between text-center space-y-4">
                              <h3 className="text-sm sm:text-base font-extrabold uppercase text-zinc-900 group-hover:text-orange-600 transition-colors leading-snug">
                                {product.title}
                              </h3>

                              <div className="pt-4">
                                <a
                                  href={`https://wa.me/628121900888?text=${encodeURIComponent(
                                    product.wa_text || `Halo, saya tertarik dengan produk ${product.title}. Mohon info harga dan spesifikasinya.`
                                  )}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-orange-600/20 hover:bg-orange-500 transition-all w-full"
                                >
                                  <MessageCircle className="w-4 h-4 fill-white" /> CHAT ON WA
                                </a>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
