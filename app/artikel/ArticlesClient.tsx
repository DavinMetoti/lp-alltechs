"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, FileText, Calendar, Search, ArrowRight, User } from "lucide-react";
import { motion } from "motion/react";
import { ArticleItem } from "@/lib/api";

export default function ArticlesClient({ initialArticles }: { initialArticles: ArticleItem[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  const dynamicCategories = Array.from(
    new Set(initialArticles.map((a) => a.category).filter((c): c is string => Boolean(c)))
  );
  const categories = ["Semua", ...dynamicCategories];

  const filteredArticles = initialArticles.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.excerpt && item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory =
      activeCategory === "Semua" || (item.category && item.category.toLowerCase() === activeCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* ── 1. Header Hero ── */}
      <section className="relative bg-zinc-950 text-white py-20 lg:py-28 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-red-600/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <FileText className="w-3.5 h-3.5" /> Insight & Knowledge Base
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white"
          >
            Artikel & Berita
          </motion.h1>

          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 flex items-center justify-center gap-2 text-xs sm:text-sm text-zinc-400 font-medium"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-zinc-300">Blog</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-orange-500 font-bold">Artikel</span>
          </motion.nav>
        </div>
      </section>

      {/* ── 2. Filter & Search Bar ── */}
      <section className="py-10 px-4 bg-zinc-50 border-b border-zinc-200/60">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${activeCategory === cat
                  ? "bg-orange-600 text-white shadow-md shadow-orange-600/20"
                  : "bg-white text-zinc-600 border border-zinc-200 hover:border-orange-500 hover:text-orange-600"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari artikel..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-zinc-200 rounded-full pl-11 pr-4 py-2.5 text-xs font-semibold text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            />
          </div>
        </div>
      </section>

      {/* ── 3. Articles Grid ── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-zinc-500 font-medium text-base">Tidak ada artikel yang ditemukan.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article, index) => (
                <motion.article
                  key={article.id || index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-3xl border border-zinc-200/70 overflow-hidden shadow-xs hover:shadow-xl hover:border-orange-200 transition-all duration-300 flex flex-col group"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-[16/10] bg-zinc-100 overflow-hidden">
                    <Image
                      src={article.image_url || "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80"}
                      alt={article.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {article.category && (
                      <span className="absolute top-4 left-4 bg-orange-600 text-white text-3xs font-bold uppercase px-3 py-1 rounded-full shadow-md">
                        {article.category}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 text-3xs font-semibold text-zinc-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-orange-500" />
                          {new Date(article.created_at).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3.5 h-3.5 text-orange-500" />
                          {article.author || "Admin"}
                        </span>
                      </div>

                      <h3 className="text-lg font-extrabold text-zinc-950 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
                        <Link href={`/artikel/${article.slug || article.id}`}>
                          {article.title}
                        </Link>
                      </h3>

                      {article.excerpt && (
                        <p className="text-zinc-500 text-xs leading-relaxed line-clamp-3">
                          {article.excerpt}
                        </p>
                      )}
                    </div>

                    <div className="pt-4 border-t border-zinc-100">
                      <Link
                        href={`/artikel/${article.slug || article.id}`}
                        className="inline-flex items-center gap-2 text-xs font-bold text-orange-600 hover:text-orange-700 transition-colors group/link"
                      >
                        Baca Selengkapnya
                        <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
