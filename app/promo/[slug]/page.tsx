import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft, Flame, Phone } from "lucide-react";
import { fetchPromoBySlug } from "@/lib/api";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const promo = await fetchPromoBySlug(slug);

  if (!promo) {
    return {
      title: "Promo Tidak Ditemukan | PT. ALLTECHS SOLUSINDO",
      description: "Promo yang Anda cari tidak dapat ditemukan.",
    };
  }

  // Fallback description from excerpt or content
  let desc = promo.excerpt || "";
  if (!desc && promo.content) {
    desc = promo.content.replace(/<[^>]*>/g, "").substring(0, 160).trim();
  }
  if (!desc) {
    desc = `${promo.title} - Dapatkan paket penawaran harga promo khusus dari PT. ALLTECHS SOLUSINDO.`;
  }

  // Fallback keywords
  const titleKeywords = promo.title.toLowerCase().split(/\s+/).filter(w => w.length > 3);
  const baseKeywords = [
    "distributor nursecall aiphone",
    "agen pabx dinstar",
    "dealer pbx dinstar",
    "jasa instalasi nursecall commax",
    "PT ALLTECHS SOLUSINDO",
    "alltechs solusindo"
  ];
  const itemKeywords = promo.category ? [promo.category] : [];
  const mergedKeywords = Array.from(new Set([...itemKeywords, ...titleKeywords, ...baseKeywords]));

  const ogImage = promo.image_url || (promo.image ? `https://cms.alltechs.co.id/${promo.image.replace(/^\//, "")}` : "https://alltechs.co.id/logo-alltechs.png");

  return {
    title: `${promo.title} | PT. ALLTECHS SOLUSINDO`,
    description: desc,
    keywords: mergedKeywords,
    openGraph: {
      title: promo.title,
      description: desc,
      url: `https://alltechs.co.id/promo/${promo.slug || promo.id}`,
      type: "article",
      images: [
        {
          url: ogImage,
          alt: promo.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: promo.title,
      description: desc,
      images: [ogImage],
    },
  };
}

export default async function PromoDetailPage({ params }: Props) {
  const { slug } = await params;
  const promo = await fetchPromoBySlug(slug);

  if (!promo) {
    notFound();
  }

  const imageUrl = promo.image_url || (promo.image ? `https://cms.alltechs.co.id/${promo.image.replace(/^\//, "")}` : undefined);

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Header */}
      <section className="relative bg-zinc-950 text-white py-16 lg:py-20 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <Link
            href="/promo"
            className="inline-flex items-center gap-2 text-xs font-bold text-orange-400 hover:text-orange-300 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Promo
          </Link>
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-red-600 text-white text-3xs font-extrabold uppercase px-3 py-1 rounded-full shadow-md inline-flex items-center gap-1">
              <Flame className="w-3 h-3 fill-white" /> SPECIAL PROMO
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {promo.title}
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-10">
            {imageUrl && (
              <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-lg bg-zinc-950">
                <Image
                  src={imageUrl}
                  alt={promo.title}
                  fill
                  unoptimized
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div className="prose prose-zinc max-w-none text-zinc-700 leading-relaxed text-base sm:text-lg">
              {promo.content ? (
                <div dangerouslySetInnerHTML={{ __html: promo.content }} />
              ) : (
                <p>{promo.excerpt}</p>
              )}
            </div>

            {/* Claim Box */}
            <div className="bg-zinc-900 text-white rounded-3xl p-8 text-center space-y-4 shadow-xl border border-zinc-800">
              <h3 className="text-xl font-extrabold">Tertarik dengan Promo Ini?</h3>
              <p className="text-xs text-zinc-400 max-w-md mx-auto">
                Segera hubungi tim sales kami sebelum kuota penawaran habis.
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-full shadow-lg shadow-red-600/30 hover:from-red-500 hover:to-orange-500 transition-all transform hover:-translate-y-0.5"
                >
                  <Phone className="w-4 h-4" /> Klaim Promo via WhatsApp/Telepon
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
