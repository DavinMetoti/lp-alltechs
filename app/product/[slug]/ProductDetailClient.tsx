"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MessageCircle, Shield, Tag, ChevronRight, Check } from "lucide-react";
import { fetchProductDetailResult, type ProductItem } from "@/lib/api";

interface ProductDetailClientProps {
  initialProduct: ProductItem | null;
  slug: string;
  ssrFailed?: boolean;
}

export default function ProductDetailClient({
  initialProduct,
  slug,
  ssrFailed = false,
}: ProductDetailClientProps) {
  const shouldFetchClient = !initialProduct && ssrFailed;
  const [product, setProduct] = useState<ProductItem | null>(initialProduct);
  const [isLoading, setIsLoading] = useState<boolean>(shouldFetchClient);

  useEffect(() => {
    if (!shouldFetchClient) return;
    let cancelled = false;

    fetchProductDetailResult(slug)
      .then((res) => {
        if (!cancelled && res.data) {
          setProduct(res.data);
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [slug, shouldFetchClient]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 pt-36 pb-20 px-4 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-zinc-500 font-semibold text-sm">Memuat detail produk...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-zinc-50 pt-36 pb-20 px-4 text-center space-y-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900">Produk Tidak Ditemukan</h1>
        <p className="text-zinc-500 text-sm max-w-md mx-auto">
          Maaf, produk yang Anda cari tidak tersedia atau telah dipindahkan.
        </p>
        <Link
          href="/product"
          className="inline-flex items-center gap-2 rounded-full bg-orange-600 hover:bg-orange-500 px-6 py-3 text-xs font-bold text-white transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Katalog Produk
        </Link>
      </div>
    );
  }

  const brandName = typeof product.brand === "object" ? product.brand.name : product.brand || "Other";
  const categoryName =
    typeof product.category === "object"
      ? product.category.name
      : product.category ||
        (typeof product.brand === "object" &&
        product.brand.category &&
        typeof product.brand.category === "object"
          ? product.brand.category.name
          : undefined) ||
        "Product";
  const imageUrl = product.image_url;

  const waText = `Halo PT. ALLTECHS SOLUSINDO, saya tertarik dengan produk *${product.title}* (${brandName}). Mohon info penawaran harga terbaik dan spesifikasinya. Terima kasih.`;

  return (
    <div className="min-h-screen bg-zinc-50 pt-24 pb-20">
      {/* Header / Banner */}
      <section className="relative bg-zinc-950 text-white py-14 lg:py-16 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/product"
            className="inline-flex items-center gap-2 text-xs font-bold text-orange-400 hover:text-orange-300 mb-6 transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Katalog
          </Link>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight uppercase">
            {product.title}
          </h1>

          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 mt-6 text-xs sm:text-sm text-zinc-400 font-medium">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-700" />
            <Link href="/product" className="hover:text-white transition-colors uppercase">Product</Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-700" />
            <span className="text-orange-500 font-bold uppercase">{brandName}</span>
          </nav>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-10 px-4 sm:px-6 lg:px-8 bg-zinc-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Product Image */}
            <div className="lg:col-span-5 bg-white border border-zinc-200/60 rounded-2xl p-6 shadow-xs flex items-center justify-center relative aspect-square">
              {imageUrl ? (
                <div className="relative w-full h-full">
                  <Image
                    src={imageUrl}
                    alt={`Instalasi & Pengadaan ${product.title} ${brandName} - PT. ALLTECHS SOLUSINDO`}
                    fill
                    unoptimized
                    className="object-contain p-2 transition-transform duration-500 hover:scale-102"
                    priority
                  />
                </div>
              ) : (
                <div className="text-zinc-400 font-medium text-xs">No Image Available</div>
              )}
            </div>

            {/* Right: Product Details */}
            <div className="lg:col-span-7 bg-white border border-zinc-200/60 rounded-2xl p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-[10px] font-semibold uppercase">
                  <Tag className="w-3 h-3" /> {categoryName}
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-zinc-100 border border-zinc-200 text-zinc-700 text-[10px] font-semibold uppercase">
                  <Shield className="w-3 h-3 text-orange-600" /> {brandName}
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-zinc-900 uppercase border-b border-zinc-100 pb-3 leading-tight">
                Detail Spesifikasi & Deskripsi
              </h2>

              {/* Excerpt */}
              {product.excerpt && (
                <p className="text-zinc-700 font-medium text-xs sm:text-sm leading-relaxed bg-orange-500/5 border-l-4 border-orange-600 py-3 px-4 rounded-r-lg">
                  {product.excerpt}
                </p>
              )}

              {/* Long Content / Description */}
              <div className="prose prose-zinc max-w-none text-zinc-600 text-xs sm:text-sm leading-relaxed pt-1">
                {product.content ? (
                  <div dangerouslySetInnerHTML={{ __html: product.content }} />
                ) : (
                  <p>
                    Spesifikasi teknis lengkap untuk produk {product.title} dapat Anda tanyakan secara langsung kepada tim teknis kami.
                  </p>
                )}
              </div>

              {/* Small Badges / Value Props */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-zinc-100">
                <div className="flex items-center gap-2 text-2xs sm:text-xs font-medium text-zinc-600">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Garansi Resmi Pabrik</span>
                </div>
                <div className="flex items-center gap-2 text-2xs sm:text-xs font-medium text-zinc-600">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Teknisi Berpengalaman & Bersertifikat</span>
                </div>
                <div className="flex items-center gap-2 text-2xs sm:text-xs font-medium text-zinc-600">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Dukungan Teknis Purna Jual</span>
                </div>
                <div className="flex items-center gap-2 text-2xs sm:text-xs font-medium text-zinc-600">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  <span>Instalasi Rapi & Berstandar</span>
                </div>
              </div>

              {/* Call To Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <a
                  href={`https://wa.me/628121900888?text=${encodeURIComponent(waText)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-orange-600 hover:bg-orange-500 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-orange-600/10 hover:shadow-lg transition-all"
                >
                  <MessageCircle className="w-4 h-4 fill-white" /> TANYA HARGA & PENAWARAN (WA)
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
