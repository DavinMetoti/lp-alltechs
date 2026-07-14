"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Radio, User, ArrowRight, Mail, Tag } from "lucide-react";
import { motion } from "motion/react";
import { ArticleItem } from "@/lib/api";

const CATEGORY_COLORS: Record<string, string> = {
  Industri: "bg-blue-100 text-blue-700 border-blue-200",
  Perusahaan: "bg-purple-100 text-purple-700 border-purple-200",
  Regulasi: "bg-orange-100 text-orange-700 border-orange-200",
  Event: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Kesehatan: "bg-rose-100 text-rose-700 border-rose-200",
  Teknologi: "bg-cyan-100 text-cyan-700 border-cyan-200",
};

export default function NewsClient({ initialNews }: { initialNews: ArticleItem[] }) {
  const [activeCategory, setActiveCategory] = useState("Semua");

  const categories = ["Semua", ...Array.from(new Set(initialNews.map((n) => n.category).filter((c): c is string => Boolean(c))))];

  const filteredNews = activeCategory === "Semua"
    ? initialNews
    : initialNews.filter((n) => n.category && n.category.toLowerCase() === activeCategory.toLowerCase());

  const featured = filteredNews[0];
  const restNews = filteredNews.slice(1);

  return (
    <div className="min-h-screen bg-zinc-50 pt-24">
      {/* ── 1. Header Hero Live News ── */}
      <section className="relative bg-zinc-950 text-white pt-20 pb-16 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-orange-600/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold uppercase tracking-widest mb-6"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                </span>
                <Radio className="w-3.5 h-3.5" /> Live News Update
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white"
              >
                News & Updates
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-4 max-w-xl text-xs sm:text-sm text-zinc-400 leading-relaxed"
              >
                Berita terkini seputar industri telekomunikasi, regulasi, teknologi terbaru, dan informasi resmi dari PT. ALLTECHS SOLUSINDO.
              </motion.p>
            </div>

            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400 font-medium shrink-0"
            >
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
              <span className="text-zinc-300">Blog</span>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
              <span className="text-orange-500 font-bold">News</span>
            </motion.nav>
          </div>

          {/* Category Filter Pills */}
          <div className="mt-10 flex flex-wrap gap-2 pt-6 border-t border-zinc-800/80">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-orange-600 text-white shadow-md shadow-orange-600/20"
                    : "bg-zinc-900/80 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Main News Layout & Sidebar ── */}
      <section className="py-16 px-4 bg-zinc-50">
        <div className="max-w-7xl mx-auto">
          {filteredNews.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-zinc-500 font-medium text-base">Belum ada berita yang tersedia untuk kategori ini.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Left Main Stream */}
              <div className="lg:col-span-8 space-y-10">
                {/* Featured News Hero Card */}
                {featured && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    <p className="text-xs font-extrabold uppercase tracking-widest text-orange-600 mb-4 flex items-center gap-2">
                      <span className="w-5 h-0.5 bg-orange-600 rounded-full" /> Berita Utama
                    </p>
                    <Link
                      href={`/news/${featured.slug || featured.id}`}
                      className="group relative flex flex-col lg:flex-row bg-zinc-900 rounded-3xl overflow-hidden shadow-xl border border-zinc-800 hover:border-orange-500/40 transition-all duration-500"
                    >
                      <div className="relative h-64 lg:h-auto lg:w-3/5 shrink-0 overflow-hidden bg-zinc-950">
                        <Image
                          src={featured.image_url || "/migrated-media/1e655ac3e24853dd.jpg"}
                          alt={featured.title}
                          fill
                          unoptimized
                          className="object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                          priority
                        />
                        <div className="absolute top-4 left-4 bg-red-600 text-white text-3xs font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" /> Breaking
                        </div>
                      </div>

                      <div className="p-6 sm:p-8 lg:p-10 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 text-3xs font-semibold text-zinc-400">
                            {featured.category && (
                              <span className={`px-2.5 py-0.5 rounded-full text-3xs font-bold border ${CATEGORY_COLORS[featured.category] || "bg-zinc-800 text-zinc-300 border-zinc-700"}`}>
                                {featured.category}
                              </span>
                            )}
                            <span>{new Date(featured.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</span>
                          </div>

                          <h2 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-orange-400 transition-colors leading-snug">
                            {featured.title}
                          </h2>

                          {featured.excerpt && (
                            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
                              {featured.excerpt}
                            </p>
                          )}
                        </div>

                        <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-bold text-white">
                          <span className="text-zinc-400 text-3xs flex items-center gap-1">
                            <User className="w-3.5 h-3.5 text-orange-500" /> {featured.author || "Alltechs"}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-orange-400 group-hover:translate-x-1 transition-transform">
                            Baca Selengkapnya <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )}

                {/* News List */}
                {restNews.length > 0 && (
                  <div className="space-y-6 pt-4">
                    <p className="text-xs font-extrabold uppercase tracking-widest text-zinc-950 flex items-center gap-2">
                      <span className="w-5 h-0.5 bg-zinc-950 rounded-full" /> Berita Terbaru
                    </p>

                    <div className="space-y-4">
                      {restNews.map((item, idx) => (
                        <motion.div
                          key={item.id || idx}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.4, delay: idx * 0.08 }}
                        >
                          <Link
                            href={`/news/${item.slug || item.id}`}
                            className="group flex flex-col sm:flex-row gap-5 p-4 sm:p-5 rounded-2xl bg-white border border-zinc-200/70 shadow-xs hover:shadow-lg hover:border-orange-200 transition-all duration-300"
                          >
                            <div className="relative h-48 sm:h-36 sm:w-52 shrink-0 rounded-xl overflow-hidden bg-zinc-100">
                              <Image
                                src={item.image_url || "/migrated-media/9891d90ea5dd660c.jpg"}
                                alt={item.title}
                                fill
                                unoptimized
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            </div>

                            <div className="flex-1 flex flex-col justify-between space-y-2">
                              <div className="space-y-2">
                                <div className="flex items-center gap-3 text-3xs font-semibold text-zinc-400">
                                  {item.category && (
                                    <span className={`px-2.5 py-0.5 rounded-full text-3xs font-bold border ${CATEGORY_COLORS[item.category] || "bg-zinc-100 text-zinc-600 border-zinc-200"}`}>
                                      {item.category}
                                    </span>
                                  )}
                                  <span>{new Date(item.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</span>
                                </div>

                                <h3 className="text-base font-extrabold text-zinc-950 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
                                  {item.title}
                                </h3>

                                {item.excerpt && (
                                  <p className="text-zinc-500 text-xs line-clamp-2 leading-relaxed">
                                    {item.excerpt}
                                  </p>
                                )}
                              </div>

                              <div className="pt-3 border-t border-zinc-100 flex items-center justify-between text-3xs font-bold text-zinc-400">
                                <span>{item.author || "Tim Alltechs"}</span>
                                <span className="text-orange-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                                  Baca <ArrowRight className="w-3 h-3" />
                                </span>
                              </div>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Right Sidebar */}
              <aside className="lg:col-span-4 space-y-8">
                {/* Newsletter Box */}
                <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
                  <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-white/10 blur-xl" />
                  <div className="relative z-10 space-y-3">
                    <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white">
                      <Mail className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-extrabold">Stay Updated</h3>
                    <p className="text-xs text-white/80 leading-relaxed">
                      Dapatkan berita terkini dan pembaruan industri langsung ke kontak Anda.
                    </p>
                    <Link
                      href="/contact"
                      className="inline-block w-full text-center bg-white text-orange-600 font-extrabold text-xs py-3 rounded-xl shadow-md hover:bg-orange-50 transition-colors pt-3"
                    >
                      Hubungi Kami
                    </Link>
                  </div>
                </div>

                {/* Popular Topics */}
                <div className="bg-white rounded-3xl border border-zinc-200/70 p-6 shadow-xs space-y-4">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-zinc-950 flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-orange-600" /> Topik Populer
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.filter((c) => c !== "Semua").map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-3 py-1.5 rounded-full text-3xs font-bold border transition-all cursor-pointer ${CATEGORY_COLORS[cat] || "bg-zinc-50 text-zinc-600 border-zinc-200"}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
