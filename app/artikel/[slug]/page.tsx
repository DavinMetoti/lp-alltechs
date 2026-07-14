import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { fetchArticleBySlug } from "@/lib/api";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    return {
      title: "Artikel Tidak Ditemukan | PT. ALLTECHS SOLUSINDO",
      description: "Artikel yang Anda cari tidak dapat ditemukan.",
    };
  }

  // Fallback description from excerpt or content
  let desc = article.excerpt || "";
  if (!desc && article.content) {
    desc = article.content.replace(/<[^>]*>/g, "").substring(0, 160).trim();
  }
  if (!desc) {
    desc = `${article.title} - Dapatkan solusi instalasi & pengadaan terpercaya dari PT. ALLTECHS SOLUSINDO.`;
  }

  // Fallback keywords using target local terms
  const titleKeywords = article.title.toLowerCase().split(/\s+/).filter(w => w.length > 3);
  const baseKeywords = [
    "distributor nursecall aiphone",
    "agen pabx dinstar",
    "dealer pbx dinstar",
    "jasa instalasi nursecall commax",
    "PT ALLTECHS SOLUSINDO",
    "alltechs solusindo"
  ];
  const itemKeywords = article.category ? [article.category] : [];
  const mergedKeywords = Array.from(new Set([...itemKeywords, ...titleKeywords, ...baseKeywords]));

  const ogImage = article.image_url || (article.image ? `https://cms.alltechs.co.id/${article.image.replace(/^\//, "")}` : "https://alltechs.co.id/logo-alltechs.png");

  return {
    title: `${article.title} | PT. ALLTECHS SOLUSINDO`,
    description: desc,
    keywords: mergedKeywords,
    openGraph: {
      title: article.title,
      description: desc,
      url: `https://alltechs.co.id/artikel/${article.slug || article.id}`,
      type: "article",
      images: [
        {
          url: ogImage,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: desc,
      images: [ogImage],
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const imageUrl = article.image_url || (article.image ? `https://cms.alltechs.co.id/${article.image.replace(/^\//, "")}` : undefined);

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
            {article.title}
          </h1>
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
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-10">
            {imageUrl && (
              <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-lg bg-zinc-100">
                <Image
                  src={imageUrl}
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
        </div>
      </section>
    </div>
  );
}
