"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, FileText, Calendar, Search, ArrowRight, User, Tag } from "lucide-react";
import { motion } from "motion/react";
import { ArticleItem, PaginatedResponse } from "@/lib/api";

const MOCK_ARTICLES: ArticleItem[] = [
  {
    id: 1,
    title: "Panduan Lengkap Memilih Sistem PABX Untuk Efisiensi Komunikasi Kantor",
    slug: "panduan-lengkap-memilih-sistem-pabx",
    excerpt: "Sistem PABX merupakan tulang punggung komunikasi internal dan eksternal perusahaan. Ketahui cara memilih PABX Panasonic, NEC, dan LG Ericsson terbaik.",
    content: "Konten artikel tentang PABX...",
    image_url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
    category: "Telecommunication",
    author: "Tim Alltechs",
    created_at: "2026-06-20T10:00:00Z",
  },
  {
    id: 2,
    title: "Integrasi IP Nurse Call System Terbaru Pada Rumah Sakit Modern",
    slug: "integrasi-ip-nurse-call-system-terbaru",
    excerpt: "Meningkatkan kecepatan respon tenaga medis kepada pasien dengan teknologi Nurse Call Commax dan Aiphone berbasis IP.",
    content: "Konten artikel tentang Nurse Call...",
    image_url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    category: "Healthcare Tech",
    author: "Tim Alltechs",
    created_at: "2026-06-18T14:30:00Z",
  },
  {
    id: 3,
    title: "Pentingnya Proteksi Fire Alarm System Dan Intrusion Alarm Di Gedung Komersial",
    slug: "pentingnya-proteksi-fire-alarm-system",
    excerpt: "Langkah-langkah pencegahan bahaya kebakaran dan pembobolan keamanan gedung dengan sistem proteksi pintar terintegrasi.",
    content: "Konten artikel tentang Fire Alarm...",
    image_url: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80",
    category: "Security & Safety",
    author: "Tim Alltechs",
    created_at: "2026-06-15T09:15:00Z",
  },
];

export default function ArticlesPage() {
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("Semua");

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://cms.alltechs.co.id/api/";
        const cleanBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
        const apiKey = process.env.NEXT_PUBLIC_API_KEY || "at_key_80ca892ab367ba187ba39d85647c0f70a67bd169b13be651";
        const res = await fetch(`${cleanBase}v1/articles?per_page=12`, {
          headers: {
            "X-Api-Key": apiKey,
            Accept: "application/json",
          },
        });
        if (res.ok) {
          const json = await res.json();
          const list = json.data?.data || json.data || [];
          if (Array.isArray(list) && list.length > 0) {
            const formatted = list.map((item: ArticleItem) => {
              const imgUrl = item.image_url || (item.image ? `https://cms.alltechs.co.id/${item.image}` : undefined);
              console.log(imgUrl)
              return { ...item, image_url: imgUrl };
            });
            setArticles(formatted);
          } else {
            setArticles(MOCK_ARTICLES);
          }
        } else {
          setArticles(MOCK_ARTICLES);
        }
      } catch {
        setArticles(MOCK_ARTICLES);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const dynamicCategories = Array.from(
    new Set(articles.map((a) => a.category).filter((c): c is string => Boolean(c)))
  );
  const categories = ["Semua", ...dynamicCategories];

  const filteredArticles = articles.filter((item) => {
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
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-zinc-100 rounded-3xl h-96 animate-pulse" />
              ))}
            </div>
          ) : filteredArticles.length === 0 ? (
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
