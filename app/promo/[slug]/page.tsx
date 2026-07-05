"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronRight, Calendar, User, ArrowLeft, Flame, Phone } from "lucide-react";
import { motion } from "motion/react";
import { ArticleItem } from "@/lib/api";

export default function PromoDetailPage() {
  const params = useParams();
  const slugOrId = params?.slug as string;
  const [promo, setPromo] = useState<ArticleItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDetail() {
      if (!slugOrId) return;
      setLoading(true);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://cms.alltechs.co.id/api/";
        const cleanBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
        const apiKey = process.env.NEXT_PUBLIC_API_KEY || "at_key_80ca892ab367ba187ba39d85647c0f70a67bd169b13be651";
        const res = await fetch(`${cleanBase}v1/promos/${slugOrId}`, {
          headers: {
            "X-Api-Key": apiKey,
            Accept: "application/json",
          },
        });
        if (res.ok) {
          const json = await res.json();
          const item = json.data;
          if (item) {
            item.image_url = item.image_url || (item.image ? `https://cms.alltechs.co.id/${item.image.replace(/^\//, "")}` : undefined);
          }
          setPromo(item || null);
        }
      } catch (err) {
        console.error("Failed to load promo detail", err);
      } finally {
        setLoading(false);
      }
    }
    loadDetail();
  }, [slugOrId]);

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
            {promo?.title || "Detail Promo"}
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          {loading ? (
            <div className="space-y-6 animate-pulse">
              <div className="w-full h-80 bg-zinc-100 rounded-3xl" />
              <div className="h-6 bg-zinc-100 rounded-lg w-3/4" />
              <div className="h-4 bg-zinc-100 rounded-lg w-full" />
            </div>
          ) : !promo ? (
            <div className="text-center py-20 space-y-4">
              <p className="text-zinc-500 font-medium text-lg">Promo tidak ditemukan.</p>
              <Link href="/promo" className="inline-block bg-orange-600 text-white px-6 py-2.5 rounded-full text-xs font-bold">
                Lihat Semua Promo
              </Link>
            </div>
          ) : (
            <div className="space-y-10">
              {promo.image_url && (
                <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-lg bg-zinc-950">
                  <Image
                    src={promo.image_url}
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
          )}
        </div>
      </section>
    </div>
  );
}
