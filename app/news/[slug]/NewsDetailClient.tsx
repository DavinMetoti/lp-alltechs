"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { fetchNewsDetailResult, type ArticleItem } from "@/lib/api";
import { DUMMY_NEWS } from "../NewsClient";

interface NewsDetailClientProps {
  initialNews: ArticleItem | null;
  slug: string;
  ssrFailed?: boolean;
}

export default function NewsDetailClient({
  initialNews,
  slug,
  ssrFailed = false,
}: NewsDetailClientProps) {
  const shouldFetchClient = !initialNews && ssrFailed;
  const [news, setNews] = useState<ArticleItem | null>(initialNews);
  const [isLoading, setIsLoading] = useState<boolean>(shouldFetchClient);

  useEffect(() => {
    if (!shouldFetchClient) return;
    let cancelled = false;

    fetchNewsDetailResult(slug)
      .then((res) => {
        if (cancelled) return;
        if (res.data) {
          setNews(res.data);
        } else {
          const fallback = DUMMY_NEWS.find(
            (item) => item.slug === slug || String(item.id) === slug
          );
          if (fallback) setNews(fallback);
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
        <p className="text-zinc-500 font-semibold text-sm">Memuat berita...</p>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-white pt-36 pb-20 px-4 text-center space-y-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900">Berita Tidak Ditemukan</h1>
        <p className="text-zinc-500 text-sm max-w-md mx-auto">
          Maaf, berita yang Anda cari tidak tersedia atau telah dipindahkan.
        </p>
        <Link
          href="/news"
          className="inline-flex items-center gap-2 rounded-full bg-orange-600 hover:bg-orange-500 px-6 py-3 text-xs font-bold text-white transition-all"
        >
          <ArrowLeft className="w-4 h-4" /> Kembali ke News
        </Link>
      </div>
    );
  }

  const imageUrl = news.image_url;

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* Header */}
      <section className="relative bg-zinc-950 text-white py-16 lg:py-20 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-xs font-bold text-orange-400 hover:text-orange-300 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke News
          </Link>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {news.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 mt-6 text-xs font-semibold text-zinc-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-orange-500" />
              {new Date(news.created_at).toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-orange-500" />
              {news.author || "Tim Alltechs"}
            </span>
          </div>
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
                  alt={`${news.title} - Berita & Solusi PT. ALLTECHS SOLUSINDO`}
                  fill
                  unoptimized
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div className="prose prose-zinc max-w-none text-zinc-700 leading-relaxed text-base sm:text-lg">
              {news.content ? (
                <div dangerouslySetInnerHTML={{ __html: news.content }} />
              ) : (
                <p>{news.excerpt}</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
