"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Image as ImageIcon, ZoomIn, X, ChevronLeft, Sparkles, User, Activity } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

/* ── Gallery Data ── */
const OWNER_PHOTOS = [
  { src: "/migrated-media/2eb3dcd2dc7ca3e2.jpg", alt: "Hartono — Direktur PT. ALLTECHS SOLUSINDO" },
  { src: "/migrated-media/d63055b9a906746b.webp", alt: "Hartono - Kunjungan Kerja 1" },
  { src: "/migrated-media/12c076c8c1defe91.webp", alt: "Hartono - Kunjungan Kerja 2" },
  { src: "/migrated-media/d3b03957e5750564.webp", alt: "Hartono - Kunjungan Kerja 3" },
  { src: "/migrated-media/630cbf6413125a4a.webp", alt: "Hartono - Kunjungan Kerja 4" },
  { src: "/migrated-media/a5bae30ecb4f679c.webp", alt: "Hartono - Kunjungan Kerja 5" },
];

const ACTIVITY_PHOTOS = [
  { src: "/migrated-media/dd3b00d7dab45489.webp", alt: "Kegiatan Karyawan & Tim 1" },
  { src: "/migrated-media/3587feaf2262ba93.webp", alt: "Kegiatan Karyawan & Tim 2" },
  { src: "/migrated-media/7b43b3b578fdca0f.webp", alt: "Kegiatan Karyawan & Tim 3" },
  { src: "/migrated-media/2489549bc2a25d32.webp", alt: "Kegiatan Karyawan & Tim 4" },
  { src: "/migrated-media/b470a163e1d7e5ac.webp", alt: "Kegiatan Karyawan & Tim 5" },
  { src: "/migrated-media/a993524293c0d226.webp", alt: "Kegiatan Karyawan & Tim 6" },
  { src: "/migrated-media/923b4fa74124db91.webp", alt: "Teknisi Lapangan 1" },
  { src: "/migrated-media/3ef0fceaadf13875.webp", alt: "Teknisi Lapangan 2" },
  { src: "/migrated-media/4e48fd294e2c9722.webp", alt: "Teknisi Lapangan 3" },
  { src: "/migrated-media/626b6ad60c11b9ab.webp", alt: "Teknisi Lapangan 4" },
  { src: "/migrated-media/104fb753aab35262.webp", alt: "Teknisi Lapangan 5" },
  { src: "/migrated-media/9cda315557120980.webp", alt: "Teknisi Lapangan 6" },
  { src: "/migrated-media/e8e77d5634822e54.webp", alt: "Teknisi Lapangan 7" },
  { src: "/migrated-media/fc8c9094d9a7c510.webp", alt: "Teknisi Lapangan 8" },
  { src: "/migrated-media/1a26ede66626616b.webp", alt: "Teknisi Lapangan 9" },
  { src: "/migrated-media/2d17ef166695e53e.webp", alt: "Dokumentasi Instalasi 1" },
  { src: "/migrated-media/4a225af5547c70b7.webp", alt: "Dokumentasi Instalasi 2" },
  { src: "/migrated-media/206ef835ff2ef137.webp", alt: "Dokumentasi Instalasi 3" },
  { src: "/migrated-media/2aa7308760221313.webp", alt: "Dokumentasi Instalasi 4" },
  { src: "/migrated-media/fdf3a5d17ea9479c.webp", alt: "Dokumentasi Instalasi 5" },
  { src: "/migrated-media/94afba1773b2f491.webp", alt: "Dokumentasi Instalasi 6" },
  { src: "/migrated-media/7a90c787fd991101.webp", alt: "Foto Kegiatan Perusahaan" },
  { src: "/migrated-media/26855f6d171d7090.webp", alt: "Foto Kunjungan Kerja Eropa" },
  { src: "/migrated-media/92b8a99f194c5b61.webp", alt: "Dokumentasi Tim PABX 1" },
  { src: "/migrated-media/427aa7e44fe374e1.webp", alt: "Dokumentasi Tim PABX 2" },
  { src: "/migrated-media/6f65e49466dafe5a.webp", alt: "Dokumentasi Proyek 2019" },
  { src: "/migrated-media/9cc1502c3385cae5.webp", alt: "Dokumentasi Proyek 2019 B" },
  { src: "/migrated-media/52a6a9b44a682074.webp", alt: "Dokumentasi Proyek 2019 C" },
  { src: "/migrated-media/ef24308afb0be0cd.webp", alt: "Dokumentasi Proyek 2019 D" },
  { src: "/migrated-media/7ce6d862c35cafc4.webp", alt: "Dokumentasi Proyek 2019 E" },
  { src: "/migrated-media/bbd7cf580f120c8c.webp", alt: "Dokumentasi Proyek 2019 F" },
  { src: "/migrated-media/d0cd3c54c3ebe332.webp", alt: "Dokumentasi Proyek 2019 G" },
  { src: "/migrated-media/3790aa5969b8747f.webp", alt: "Dokumentasi Proyek 2019 H" },
  { src: "/migrated-media/06b623bcdb39e737.webp", alt: "Dokumentasi Proyek 2019 I" },
  { src: "/migrated-media/f926c5cde85126cc.webp", alt: "Dokumentasi Proyek 2019 J" },
  { src: "/migrated-media/65180c2ce0d62242.webp", alt: "Dokumentasi Proyek 2019 K" },
  { src: "/migrated-media/10f4f55de8cba36a.webp", alt: "Dokumentasi Proyek 2019 L" },
  { src: "/migrated-media/2344b64527e5ef73.webp", alt: "Dokumentasi Proyek 2019 M" },
  { src: "/migrated-media/ac42a9f7145c08dd.webp", alt: "Dokumentasi Proyek 2019 N" },
  { src: "/migrated-media/7c92cab44731b22c.webp", alt: "Dokumentasi Proyek 2019 O" },
  { src: "/migrated-media/2329bf399108bca8.webp", alt: "Dokumentasi Proyek 2019 P" },
  { src: "/migrated-media/e352ec51bec34203.webp", alt: "Dokumentasi Proyek 2020 A" },
  { src: "/migrated-media/520a4f33591ffe89.webp", alt: "Dokumentasi Proyek 2020 B" },
  { src: "/migrated-media/cbb19adef5e16477.webp", alt: "Dokumentasi Proyek 2020 C" },
  { src: "/migrated-media/a4e74e00b5386e43.webp", alt: "Dokumentasi Proyek 2020 D" },
  { src: "/migrated-media/0cf3b3b9e551b3c8.webp", alt: "Dokumentasi Proyek 2020 E" },
  { src: "/migrated-media/f5ffc706f08be4aa.webp", alt: "Dokumentasi Lapangan" },
  { src: "/migrated-media/4a8157a0c1d05479.webp", alt: "Dokumentasi Perangkat" },
];

export default function GalleryClient() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const allImages = [...OWNER_PHOTOS, ...ACTIVITY_PHOTOS];

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevImage = useCallback(() => setLightboxIndex((i) => (i === null || i <= 0 ? allImages.length - 1 : i - 1)), [allImages.length]);
  const nextImage = useCallback(() => setLightboxIndex((i) => (i === null || i >= allImages.length - 1 ? 0 : i + 1)), [allImages.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, closeLightbox, prevImage, nextImage]);

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
            <ImageIcon className="w-3.5 h-3.5" /> Documentation & Activities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white"
          >
            Photo Gallery
          </motion.h1>

          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 flex items-center justify-center gap-2 text-xs sm:text-sm text-zinc-400 font-medium"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-zinc-300">About Us</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <span className="text-orange-500 font-bold">Gallery</span>
          </motion.nav>
        </div>
      </section>

      {/* ── 2. Gallery Sections ── */}
      <section className="py-16 sm:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Section 1: Owner Photos */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-950 uppercase tracking-tight">
                  Owner Photo Gallery
                </h2>
                <p className="text-xs text-zinc-500 font-medium">Dokumentasi Direktur & Direksi PT. ALLTECHS SOLUSINDO</p>
              </div>
              <div className="h-px bg-zinc-200 flex-1 ml-4 hidden sm:block" />
              <span className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">{OWNER_PHOTOS.length} Foto</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {OWNER_PHOTOS.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  onClick={() => setLightboxIndex(i)}
                  className="group relative aspect-square rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200/60 shadow-xs cursor-pointer"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-zinc-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-9 h-9 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-md">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Section 2: Activities & Field Photos */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-950 uppercase tracking-tight">
                  Karyawan & Kegiatan Photo Gallery
                </h2>
                <p className="text-xs text-zinc-500 font-medium">Dokumentasi Pekerjaan Lapangan, Tim Teknisi, & Karyawan</p>
              </div>
              <div className="h-px bg-zinc-200 flex-1 ml-4 hidden sm:block" />
              <span className="text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">{ACTIVITY_PHOTOS.length} Foto</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {ACTIVITY_PHOTOS.map((img, i) => {
                const globalIndex = OWNER_PHOTOS.length + i;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: (i % 12) * 0.05 }}
                    onClick={() => setLightboxIndex(globalIndex)}
                    className="group relative aspect-square rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200/60 shadow-xs cursor-pointer"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    />
                    <div className="absolute inset-0 bg-zinc-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-9 h-9 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-md">
                        <ZoomIn className="w-4 h-4" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ── 3. Lightbox Modal ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/90 backdrop-blur-md p-4 cursor-zoom-out select-none"
            onClick={closeLightbox}
          >
            {/* Counter */}
            <div className="absolute top-6 left-6 z-50 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-white">
              {lightboxIndex + 1} / {allImages.length}
            </div>

            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-orange-600 text-white flex items-center justify-center transition-colors"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-orange-600 text-white flex items-center justify-center transition-colors"
              aria-label="Sebelumnya"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-orange-600 text-white flex items-center justify-center transition-colors"
              aria-label="Berikutnya"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Image display */}
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl max-h-[80vh] w-full aspect-[4/3] flex flex-col items-center justify-center cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src={allImages[lightboxIndex].src}
                  alt={allImages[lightboxIndex].alt}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              {allImages[lightboxIndex].alt && (
                <p className="mt-4 text-xs sm:text-sm font-semibold text-zinc-300 text-center bg-black/40 px-4 py-1.5 rounded-full backdrop-blur-sm">
                  {allImages[lightboxIndex].alt}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
