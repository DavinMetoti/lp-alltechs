"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Flame, Tag, ArrowRight, Shield, Clock, Gift, Phone } from "lucide-react";
import { motion } from "motion/react";
import { ArticleItem } from "@/lib/api";

export default function PromoPage() {
  const [promos, setPromos] = useState<ArticleItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Semua");

  useEffect(() => {
    async function loadPromos() {
      setLoading(true);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://cms.alltechs.co.id/api/";
        const cleanBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
        const apiKey = process.env.NEXT_PUBLIC_API_KEY || "at_key_80ca892ab367ba187ba39d85647c0f70a67bd169b13be651";
        const res = await fetch(`${cleanBase}v1/promos?per_page=12`, {
          headers: {
            "X-Api-Key": apiKey,
            Accept: "application/json",
          },
        });
        if (res.ok) {
          const json = await res.json();
          const list = json.data?.data || json.data || [];
          if (Array.isArray(list)) {
            const formatted = list.map((item: ArticleItem) => ({
              ...item,
              image_url: item.image_url || (item.image ? `https://cms.alltechs.co.id/${item.image.replace(/^\//, "")}` : undefined),
            }));
            setPromos(formatted);
          }
        }
      } catch (err) {
        console.error("Failed to fetch promos from API", err);
      } finally {
        setLoading(false);
      }
    }
    loadPromos();
  }, []);

  const categories = ["Semua", ...Array.from(new Set(promos.map((p) => p.category).filter((c): c is string => Boolean(c))))];

  const filteredPromos = activeCategory === "Semua"
    ? promos
    : promos.filter((p) => p.category && p.category.toLowerCase() === activeCategory.toLowerCase());

  const featured = filteredPromos[0];
  const restPromos = filteredPromos.slice(1);

  return (
    <div className="min-h-screen bg-zinc-50 pt-24">
      {/* ── 1. Header Hero Special Promo ── */}
      <section className="relative bg-zinc-950 text-white pt-20 pb-16 overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-red-600/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-600 to-red-600 text-white text-xs font-bold uppercase tracking-widest mb-6 shadow-lg shadow-orange-600/20"
              >
                <Flame className="w-3.5 h-3.5 fill-white" /> Penawaran Terbatas
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white"
              >
                Special <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-orange-400">Promo</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-4 max-w-xl text-xs sm:text-sm text-zinc-400 leading-relaxed"
              >
                Penawaran eksklusif paket telekomunikasi, instalasi gratis, dan layanan premium dengan harga spesial. Jangan lewatkan kesempatan ini!
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
              <span className="text-orange-500 font-bold">Promo</span>
            </motion.nav>
          </div>

          {/* Stats Strip */}
          <div className="mt-10 grid grid-cols-3 gap-px bg-zinc-800/80 rounded-2xl overflow-hidden border border-zinc-800">
            <div className="bg-zinc-900/80 p-4 sm:p-6 text-center">
              <Gift className="w-5 h-5 text-orange-500 mx-auto mb-1" />
              <p className="text-xl sm:text-2xl font-black text-white">{promos.length}</p>
              <p className="text-3xs font-bold uppercase tracking-wider text-zinc-400">Promo Aktif</p>
            </div>
            <div className="bg-zinc-900/80 p-4 sm:p-6 text-center">
              <Clock className="w-5 h-5 text-red-500 mx-auto mb-1" />
              <p className="text-xl sm:text-2xl font-black text-white">Terbatas</p>
              <p className="text-3xs font-bold uppercase tracking-wider text-zinc-400">Kuota Terbatas</p>
            </div>
            <div className="bg-zinc-900/80 p-4 sm:p-6 text-center">
              <Shield className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
              <p className="text-xl sm:text-2xl font-black text-white">Garansi</p>
              <p className="text-3xs font-bold uppercase tracking-wider text-zinc-400">Resmi Pabrikan</p>
            </div>
          </div>

          {/* Category Filter Pills */}
          {categories.length > 1 && (
            <div className="mt-8 flex flex-wrap gap-2 pt-6 border-t border-zinc-800/80">
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
          )}
        </div>
      </section>

      {/* ── 2. Promo Grid & Features ── */}
      <section className="py-16 px-4 bg-zinc-50">
        <div className="max-w-7xl mx-auto space-y-12">
          {loading ? (
            <div className="space-y-8 animate-pulse">
              <div className="w-full h-96 bg-zinc-200 rounded-3xl" />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="h-64 bg-zinc-200 rounded-2xl" />
                <div className="h-64 bg-zinc-200 rounded-2xl" />
                <div className="h-64 bg-zinc-200 rounded-2xl" />
              </div>
            </div>
          ) : filteredPromos.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-zinc-200/60 p-8">
              <p className="text-zinc-500 font-semibold text-base">Belum ada promo yang tersedia saat ini.</p>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Featured Promo Hero */}
              {featured && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="text-xs font-extrabold uppercase tracking-widest text-orange-600 mb-4 flex items-center gap-2">
                    <span className="w-5 h-0.5 bg-orange-600 rounded-full" /> Promo Unggulan
                  </p>
                  <div className="relative overflow-hidden rounded-3xl bg-zinc-950 text-white shadow-2xl border border-zinc-800">
                    <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-transparent z-10" />
                    <Image
                      src={featured.image_url || "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80"}
                      alt={featured.title}
                      fill
                      unoptimized
                      className="object-cover opacity-30"
                      priority
                    />

                    <div className="relative z-20 p-8 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      <div className="lg:col-span-8 space-y-4">
                        <div className="flex items-center gap-2">
                          <span className="bg-red-600 text-white text-3xs font-extrabold uppercase px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                            <Flame className="w-3 h-3 fill-white" /> HOT OFFER
                          </span>
                          {featured.category && (
                            <span className="bg-zinc-800 text-zinc-300 border border-zinc-700 text-3xs font-bold uppercase px-3 py-1 rounded-full">
                              {featured.category}
                            </span>
                          )}
                        </div>

                        <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                          {featured.title}
                        </h2>

                        {featured.excerpt && (
                          <p className="text-zinc-300 text-xs sm:text-base leading-relaxed line-clamp-3 max-w-2xl">
                            {featured.excerpt}
                          </p>
                        )}

                        <div className="pt-4 flex flex-wrap gap-4">
                          <Link
                            href={`/promo/${featured.slug || featured.id}`}
                            className="inline-flex items-center gap-2 bg-white text-zinc-950 font-bold text-xs sm:text-sm px-6 py-3 rounded-full hover:bg-zinc-100 transition-colors"
                          >
                            Baca Detail Promo
                          </Link>
                          <Link
                            href="#kontak"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold text-xs sm:text-sm px-8 py-3 rounded-full shadow-lg shadow-red-600/30 hover:from-red-500 hover:to-orange-500 transition-all transform hover:-translate-y-0.5"
                          >
                            Klaim Promo Sekarang <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Other Promos Grid */}
              {restPromos.length > 0 && (
                <div className="space-y-6">
                  <p className="text-xs font-extrabold uppercase tracking-widest text-zinc-950 flex items-center gap-2">
                    <span className="w-5 h-0.5 bg-zinc-950 rounded-full" /> Penawaran Lainnya
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {restPromos.map((item, idx) => (
                      <motion.div
                        key={item.id || idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="bg-white rounded-3xl border border-zinc-200/70 overflow-hidden shadow-xs hover:shadow-xl hover:border-orange-200 transition-all duration-300 flex flex-col group"
                      >
                        <div className="relative aspect-[16/10] bg-zinc-100 overflow-hidden">
                          <Image
                            src={item.image_url || "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80"}
                            alt={item.title}
                            fill
                            unoptimized
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {item.category && (
                            <span className="absolute top-4 left-4 bg-orange-600 text-white text-3xs font-bold uppercase px-3 py-1 rounded-full shadow-md">
                              {item.category}
                            </span>
                          )}
                        </div>

                        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                          <div className="space-y-3">
                            <h3 className="text-lg font-extrabold text-zinc-950 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
                              <Link href={`/promo/${item.slug || item.id}`}>
                                {item.title}
                              </Link>
                            </h3>

                            {item.excerpt && (
                              <p className="text-zinc-500 text-xs leading-relaxed line-clamp-3">
                                {item.excerpt}
                              </p>
                            )}
                          </div>

                          <div className="pt-4 border-t border-zinc-100 flex items-center justify-between gap-2">
                            <Link
                              href={`/promo/${item.slug || item.id}`}
                              className="flex-1 text-center py-2.5 rounded-xl border border-zinc-300 text-zinc-800 text-xs font-bold hover:bg-zinc-50 transition-colors"
                            >
                              Detail
                            </Link>
                            <Link
                              href="#kontak"
                              className="flex-1 text-center py-2.5 rounded-xl bg-orange-600 text-white text-xs font-bold hover:bg-orange-500 transition-colors"
                            >
                              Klaim
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Bottom CTA Banner */}
          <div className="relative bg-zinc-950 text-white rounded-3xl p-8 sm:p-12 text-center overflow-hidden border border-zinc-800">
            <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <p className="text-xs font-bold uppercase tracking-widest text-orange-500">Tidak menemukan paket yang cocok?</p>
              <h3 className="text-2xl sm:text-4xl font-extrabold">Konsultasikan Kebutuhan Anda</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Tim ahli kami siap merancang solusi telekomunikasi yang tepat sesuai skala dan anggaran bisnis Anda.
              </p>
              <div className="pt-4">
                <Link
                  href="#kontak"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold text-xs sm:text-sm px-8 py-3.5 rounded-full shadow-lg shadow-red-600/30 hover:from-red-500 hover:to-orange-500 transition-all transform hover:-translate-y-0.5"
                >
                  <Phone className="w-4 h-4" /> Hubungi Kami Sekarang
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
