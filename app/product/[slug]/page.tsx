import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle, Shield, Tag, ChevronRight, Check } from "lucide-react";
import { fetchProductBySlug } from "@/lib/api";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) {
    return {
      title: "Produk Tidak Ditemukan | PT. ALLTECHS SOLUSINDO",
      description: "Produk yang Anda cari tidak dapat ditemukan.",
    };
  }

  // Fallback description from excerpt or content
  let desc = product.excerpt || "";
  if (!desc && product.content) {
    desc = product.content.replace(/<[^>]*>/g, "").substring(0, 160).trim();
  }
  if (!desc) {
    desc = `${product.title} - Dapatkan solusi pengadaan, instalasi, dan perawatan terbaik dari PT. ALLTECHS SOLUSINDO.`;
  }

  // Fallback keywords using target terms
  const brandName = typeof product.brand === "object" ? product.brand.name : product.brand || "";
  const categoryName = typeof product.category === "object" ? product.category.name : product.category || "";

  const baseKeywords = [
    product.title.toLowerCase(),
    brandName ? `${brandName.toLowerCase()} indonesia` : "",
    categoryName ? `distributor ${categoryName.toLowerCase()}` : "",
    "PT ALLTECHS SOLUSINDO",
    "alltechs solusindo"
  ].filter(Boolean);

  const ogImage = product.image_url || "https://alltechs.co.id/logo-alltechs.png";

  return {
    title: `${product.title} - Distributor Resmi Indonesia | PT. ALLTECHS SOLUSINDO`,
    description: desc,
    keywords: baseKeywords,
    openGraph: {
      title: product.title,
      description: desc,
      url: `https://alltechs.co.id/product/${product.slug || product.id}`,
      type: "website",
      images: [
        {
          url: ogImage,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: desc,
      images: [ogImage],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const brandName = typeof product.brand === "object" ? product.brand.name : product.brand || "Other";
  const categoryName = typeof product.category === "object" ? product.category.name : product.category || "Product";
  const imageUrl = product.image_url;

  // WA text template for client engagement
  const waText = `Halo PT. ALLTECHS SOLUSINDO, saya tertarik dengan produk *${product.title}* (${brandName}). Mohon info penawaran harga terbaik dan spesifikasinya. Terima kasih.`;

  // Product Structured Data for Google (Rich Snippet)
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "image": imageUrl || "https://alltechs.co.id/logo-alltechs.png",
    "description": product.excerpt || product.title,
    "brand": {
      "@type": "Brand",
      "name": brandName
    },
    "offers": {
      "@type": "Offer",
      "url": `https://alltechs.co.id/product/${product.slug}`,
      "priceCurrency": "IDR",
      "availability": "https://schema.org/InStock",
      "price": "0",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "price": "0",
        "priceCurrency": "IDR",
        "valueAddedTaxIncluded": "true"
      }
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 pt-24 pb-20">
      {/* JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

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
                  <p>Spesifikasi teknis lengkap untuk produk {product.title} dapat Anda tanyakan secara langsung kepada tim teknis kami.</p>
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
