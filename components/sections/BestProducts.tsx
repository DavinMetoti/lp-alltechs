"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  PhoneCall,
  Bell,
  Camera,
  Flame,
  Phone,
  Lock,
  ShoppingCart,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const categories = [
  { icon: PhoneCall, label: "PABX", href: "/product?category=pabx" },
  { icon: Bell, label: "NURSE CALL", href: "/product?category=nurse-call" },
  { icon: Camera, label: "CCTV", href: "/product?category=cctv" },
  { icon: Flame, label: "FIRE ALARM SYSTEM", href: "/product?category=fire-alarm-system" },
  { icon: Phone, label: "TELEPHONE SYSTEM", href: "/product?category=telephone-system" },
  { icon: Lock, label: "ACCESS CONTROL", href: "/product?category=access-control" },
];

export default function BestProducts() {
  const sectionRef = useRef<HTMLElement>(null);

  /* ── Parallax: background moves slower than scroll ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section
      ref={sectionRef}
      id="best-products"
      className="relative overflow-hidden min-h-[520px] flex items-center"
    >
      {/* ── Parallax background ── */}
      <motion.div
        style={{
          y: bgY,
          backgroundImage: "url(/assets/images/1e655ac3e24853dd.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-[-20%_0] z-0"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-zinc-950/75 z-10" />

      {/* ── Content ── */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — heading + description + CTA */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              We&apos;ll Ensure You Always Get the{" "}
              <span className="text-orange-500">Best Products.</span>
            </h2>

            <p className="text-zinc-300 text-sm leading-relaxed max-w-md">
              Kepercayaan yang diberikan oleh berbagai klien kami dengan berbagai jenis pekerjaan
              tersebut telah dijawab dengan baik oleh PT. ALLTECH SOLUSINDO yang dalam
              melaksanakan tugasnya menggunakan tenaga professional dan sangat berpengalaman di
              bidangnya. Dari catatan-catatan berbagai pekerjaan yang telah dilaksanakan, telah
              dapat disimpulkan, kepercayaan apapun yang diberikan oleh klien baik skala kecil
              maupun besar, kesemuanya telah diselesaikan dengan tuntas, seksama dan dengan
              kesungguhan hati.
            </p>

            <Link
              href="/product"
              className="inline-flex items-center gap-3 mt-2"
            >
              <span className="w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center text-white shrink-0 shadow-lg">
                <ShoppingCart className="w-5 h-5" />
              </span>
              <span className="text-white font-bold text-sm tracking-wide hover:text-orange-400 transition-colors">
                All Product
              </span>
            </Link>
          </motion.div>

          {/* RIGHT — 2×3 category cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="grid grid-cols-2 gap-3"
          >
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={i}
                  href={cat.href}
                  className="flex items-center justify-between gap-3 bg-white/5 border border-white/10 backdrop-blur-sm rounded-lg px-4 py-3.5 cursor-pointer group transition-colors duration-200 hover:bg-orange-600/20"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/10 group-hover:bg-orange-600 flex items-center justify-center text-white transition-colors duration-200 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-white text-xs font-bold tracking-wide uppercase">
                      {cat.label}
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-orange-400 transition-colors shrink-0" />
                </Link>
              );
            })}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
