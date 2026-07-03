"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, Award, ChevronRight, X, Sparkles, UserCheck } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

/* ── Data ── */
const OWNER = {
  name: "Hartono",
  position: "Direktur",
  phone: "08121900888",
  email: "info@alltechs.co.id",
  address: "Jl. H. Samali No. 87 Kel. Pejaten Barat, Kec. Pasar Minggu, Jakarta Selatan.",
  photo: "/migrated-media/2eb3dcd2dc7ca3e2.jpg",
  quote:
    "Didalam melaksanakan tugas – tugas yang diberikan oleh klien, PT. ALLTECH SOLUSINDO telah berpegang teguh pada komitmen untuk memberikan yang terbaik bagi kepercayaan yang telah diterima. Hal ini didasari oleh pertimbangan bahwa PT. ALLTECH SOLUSINDO ingin lebih dapat menempatkan diri sebagai partner dari sekedar penerima dan pelaksana kerja.",
  facebook: "https://www.facebook.com",
  instagram: "https://www.instagram.com",
};

const CERTIFICATES = [
  { title: "NEC Authorized Dealer Certificate", src: "/migrated-media/cert_1.png" },
  { title: "Ericsson-LG Product Training Certificate", src: "/migrated-media/cert_2.png" },
  { title: "Alcatel-Lucent Certified Field Expert", src: "/migrated-media/cert_3.png" },
  { title: "NEC Appointed Managed Partnership", src: "/migrated-media/cert_4.png" },
];

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export default function OwnerPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-white pt-24">
      {/* ── 1. Modern Glassmorphism Hero Header ── */}
      <section className="relative bg-zinc-950 text-white py-20 lg:py-28 overflow-hidden">
        {/* Animated ambient background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-red-600/15 rounded-full blur-[100px] pointer-events-none" />

        {/* Dynamic mesh grid backdrop */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Sparkles className="w-3.5 h-3.5" /> Leadership & Management
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white"
          >
            Owner Profile
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
            <span className="text-orange-500 font-bold">Owner</span>
          </motion.nav>
        </div>
      </section>

      {/* ── 2. Quote Statement Card ── */}
      <section className="py-16 sm:py-20 px-4 bg-zinc-50/60">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-3xl shadow-xl shadow-zinc-200/50 border border-zinc-100 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
              {/* Quote details */}
              <div className="md:col-span-8 p-8 sm:p-10 lg:p-12 flex flex-col justify-center relative">
                <span className="text-6xl sm:text-7xl font-serif text-orange-500/20 leading-none absolute top-6 left-6 select-none pointer-events-none">
                  &ldquo;
                </span>
                <div className="relative z-10 space-y-4">
                  <p className="text-zinc-700 italic text-base sm:text-lg leading-relaxed font-medium">
                    {OWNER.quote}
                  </p>
                  <div className="pt-2 flex items-center gap-3">
                    <div className="w-8 h-0.5 bg-orange-600 rounded-full" />
                    <p className="text-sm font-bold text-zinc-950">
                      {OWNER.name} <span className="text-zinc-400 font-normal">| {OWNER.position}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Photo */}
              <div className="md:col-span-4 relative min-h-[280px] md:min-h-full bg-zinc-100">
                <Image
                  src={OWNER.photo}
                  alt={`${OWNER.name} - Direktur PT. ALLTECH SOLUSINDO`}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 3. Contact Info & Social Media ── */}
      <section className="py-16 sm:py-20 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
            {/* Column 1: Profile identity */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-wider">
                <UserCheck className="w-3.5 h-3.5" /> Contact Info
              </div>
              <h2 className="text-3xl font-extrabold text-zinc-950 tracking-tight">
                {OWNER.name}
              </h2>
              <p className="text-zinc-500 text-sm leading-relaxed">
                Hubungi kami secara langsung untuk berdiskusi mengenai kebutuhan integrasi perangkat telekomunikasi Anda.
              </p>
              <div className="w-12 h-1 bg-orange-600 rounded-full my-4" />
              <div className="flex items-center gap-3 bg-zinc-50 p-3.5 rounded-2xl border border-zinc-100">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-3xs text-zinc-400 font-bold uppercase tracking-wider">Jabatan</p>
                  <p className="text-sm font-extrabold text-zinc-950">{OWNER.position}</p>
                </div>
              </div>
            </motion.div>

            {/* Column 2: Contact Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6"
            >
              <div className="flex items-start gap-4 group">
                <div className="w-11 h-11 rounded-2xl bg-orange-50 group-hover:bg-orange-600 text-orange-600 group-hover:text-white flex items-center justify-center shrink-0 transition-all duration-300 shadow-xs">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-0.5">Telepon</p>
                  <a href={`tel:${OWNER.phone}`} className="text-base font-bold text-zinc-950 hover:text-orange-600 transition-colors">
                    {OWNER.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-11 h-11 rounded-2xl bg-orange-50 group-hover:bg-orange-600 text-orange-600 group-hover:text-white flex items-center justify-center shrink-0 transition-all duration-300 shadow-xs">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-0.5">Email</p>
                  <a href={`mailto:${OWNER.email}`} className="text-base font-bold text-zinc-950 hover:text-orange-600 transition-colors break-all">
                    {OWNER.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-11 h-11 rounded-2xl bg-orange-50 group-hover:bg-orange-600 text-orange-600 group-hover:text-white flex items-center justify-center shrink-0 transition-all duration-300 shadow-xs">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-0.5">Alamat Kantor</p>
                  <p className="text-sm font-medium text-zinc-800 leading-snug">{OWNER.address}</p>
                </div>
              </div>
            </motion.div>

            {/* Column 3: Social Links */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <p className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-2">
                Social Media
              </p>
              <div className="space-y-3">
                <a
                  href={OWNER.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-2xl border border-zinc-100 hover:border-blue-200 bg-white hover:bg-blue-50/50 transition-all duration-300 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <FacebookIcon />
                  </div>
                  <span className="text-sm font-bold text-zinc-800 group-hover:text-blue-600 transition-colors">Facebook Profile</span>
                </a>

                <a
                  href={OWNER.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-2xl border border-zinc-100 hover:border-pink-200 bg-white hover:bg-pink-50/50 transition-all duration-300 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <InstagramIcon />
                  </div>
                  <span className="text-sm font-bold text-zinc-800 group-hover:text-pink-600 transition-colors">Instagram Profile</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 4. Certificates Section ── */}
      <section className="py-16 sm:py-20 px-4 bg-zinc-50 border-t border-zinc-100">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 items-start">
            {/* Header label */}
            <div className="lg:w-64 shrink-0 space-y-3">
              <div className="w-10 h-1 bg-orange-600 rounded-full" />
              <h2 className="text-3xl font-extrabold text-zinc-950 uppercase tracking-tight">
                Certificates
              </h2>
              <p className="text-sm text-zinc-500 leading-relaxed">
                Sertifikasi resmi dan Lisensi Kemitraan Pabrikan yang dimiliki oleh Hartono sebagai Direktur PT. ALLTECH SOLUSINDO.
              </p>
            </div>

            {/* Certificate grid */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
              {CERTIFICATES.map((cert, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  onClick={() => setSelectedImage(cert.src)}
                  className="group bg-white rounded-2xl border border-zinc-200/60 p-3 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all duration-300 cursor-pointer"
                >
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-zinc-100">
                    <Image
                      src={cert.src}
                      alt={cert.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <span className="text-white text-xs font-semibold flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-orange-400" /> Click to enlarge
                      </span>
                    </div>
                  </div>
                  <p className="mt-3 px-1 text-xs font-bold text-zinc-800 group-hover:text-orange-600 transition-colors line-clamp-1">
                    {cert.title}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Lightbox Modal ── */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/80 backdrop-blur-md p-4 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl max-h-[85vh] w-full aspect-[4/3] bg-zinc-900 rounded-3xl p-2 shadow-2xl overflow-hidden cursor-default border border-zinc-800"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-zinc-800/80 text-white hover:bg-orange-600 flex items-center justify-center transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="relative w-full h-full rounded-2xl overflow-hidden">
                <Image
                  src={selectedImage}
                  alt="Enlarged certificate"
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
