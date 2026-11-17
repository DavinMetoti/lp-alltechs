"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Flame, Phone } from "lucide-react";
import { fetchPromoDetailResult, type ArticleItem } from "@/lib/api";

interface PromoDetailClientProps {
  initialPromo: ArticleItem | null;
  slug: string;
  ssrFailed?: boolean;
}

export default function PromoDetailClient({
  initialPromo,
  slug,
  ssrFailed = false,
}: PromoDetailClientProps) {
  const shouldFetchClient = !initialPromo && ssrFailed;
  const [promo, setPromo] = useState<ArticleItem | null>(initialPromo);
  const [isLoading, setIsLoading] = useState<boolean>(shouldFetchClient);

  useEffect(() => {
    if (!shouldFetchClient) return;
    let cancelled = false;

    fetchPromoDetailResult(slug)
      .then((res) => {
        if (!cancelled && res.data) {
          setPromo(res.data);
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
      <div className="min-h-screen bg-white pt-36 pb-20 px-4 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-zinc-500 font-semibold text-sm">Memuat detail promo...</p>
      </div>
    );
  }

  if (!promo) {
    return (
      <div className="min-h-screen bg-white pt-36 pb-20 px-4 text-center space-y-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900">Promo Tidak Ditemukan</h1>
        <p className="text-zinc-500 text-sm max-w-md mx-auto">
          Maaf, penawaran promo yang Anda cari tidak tersedia atau telah berakhir.
        </p>
        <Link
          href="/promo"
          className="inline-flex items-center gap-2 rounded-full bg-orange-600 hover:bg-orange-500 px-6 py-3 text-xs font-bold text-white transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke Promo
        </Link>
      </div>
    );
  }

  const imageUrl = promo.image_url;

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
                  alt={`Promo ${promo.title} - PT. ALLTECHS SOLUSINDO`}
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
