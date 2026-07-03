"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ChevronRight, Calendar, User, ArrowLeft, Share2, FileText } from "lucide-react";
import { motion } from "motion/react";
import { ArticleItem } from "@/lib/api";

export default function ArticleDetailPage() {
  const params = useParams();
  const slugOrId = params?.slug as string;
  const [article, setArticle] = useState<ArticleItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDetail() {
      if (!slugOrId) return;
      setLoading(true);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://cms.alltechs.co.id/api/";
        const cleanBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
        const apiKey = process.env.NEXT_PUBLIC_API_KEY || "at_key_80ca892ab367ba187ba39d85647c0f70a67bd169b13be651";
        const res = await fetch(`${cleanBase}v1/articles/${slugOrId}`, {
          headers: {
            "X-Api-Key": apiKey,
            Accept: "application/json",
          },
        });
        if (res.ok) {
          const json = await res.json();
          const item = json.data;
          if (item) {
            item.image_url = item.image_url || (item.image ? `https://cms.alltechs.co.id/${item.image}` : undefined);
          }
          setArticle(item || null);
        }
      } catch (err) {
        console.error("Failed to load article detail", err);
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
            href="/artikel"
            className="inline-flex items-center gap-2 text-xs font-bold text-orange-400 hover:text-orange-300 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Artikel
          </Link>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {article?.title || "Detail Artikel"}
          </h1>
          {article && (
            <div className="flex flex-wrap items-center gap-6 mt-6 text-xs font-semibold text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-orange-500" />
                {new Date(article.created_at).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-orange-500" />
                {article.author || "Admin Alltechs"}
              </span>
            </div>
          )}
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
          ) : !article ? (
            <div className="text-center py-20 space-y-4">
              <p className="text-zinc-500 font-medium text-lg">Artikel tidak ditemukan.</p>
              <Link href="/artikel" className="inline-block bg-orange-600 text-white px-6 py-2.5 rounded-full text-xs font-bold">
                Lihat Semua Artikel
              </Link>
            </div>
          ) : (
            <div className="space-y-10">
              {article.image_url && (
                <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-lg bg-zinc-100">
                  <Image
                    src={article.image_url || (article.image ? `https://cms.alltechs.co.id/${article.image.replace(/^\//, "")}` : "")}
                    alt={article.title}
                    fill
                    unoptimized
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              <div className="prose prose-zinc max-w-none text-zinc-700 leading-relaxed text-base sm:text-lg">
                {article.content ? (
                  <div dangerouslySetInnerHTML={{ __html: article.content }} />
                ) : (
                  <p>{article.excerpt}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
