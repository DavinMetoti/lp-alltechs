"use client";

import React from "react";
import { Star, Quote } from "lucide-react";
import { motion } from "motion/react";

const testimonials = [
  {
    quote:
      "AllTechs berhasil merombak total website e-commerce kami menjadi headless commerce. Kecepatan loading meningkat 3x lipat, yang langsung berdampak pada kenaikan tingkat konversi penjualan hingga 40%. Luar biasa!",
    name: "Hendra Wijaya",
    role: "CEO & Founder, Retailindo Global",
    avatarColor: "from-blue-500 to-indigo-500",
    initials: "HW",
  },
  {
    quote:
      "Kerjasama kami dengan AllTechs dalam pengembangan aplikasi telehealth sangat memuaskan. Tim engineer mereka memiliki pemahaman teknis yang mendalam dan komunikasi yang transparan menggunakan Agile. Aplikasi dirilis tepat waktu.",
    name: "Amanda Lestari",
    role: "CTO, SehatKeluarga",
    avatarColor: "from-purple-500 to-pink-500",
    initials: "AL",
  },
  {
    quote:
      "Sistem smart analytics yang dibuat AllTechs membantu kami menghemat biaya operasional pergudangan hingga 25% dengan prediksi stok barang yang akurat. Keputusan bisnis kami sekarang didukung oleh data real-time.",
    name: "Budi Pratama",
    role: "VP of Operations, LogistikCepat",
    avatarColor: "from-amber-500 to-orange-500",
    initials: "BP",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Testimonials() {
  return (
    <section
      id="testimoni"
      className="py-24 bg-white dark:bg-zinc-950 relative overflow-hidden transition-colors duration-300"
    >
      {/* Background decorations */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-orange-500/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-18">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Apa Kata Klien Kami
          </h2>
          <div className="w-16 h-1 bg-linear-to-r from-orange-500 to-amber-500 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Dengarkan langsung dari para pemimpin bisnis yang telah bertransformasi digital bersama kami.
          </p>
        </div>

        {/* Testimonials Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={cardVariants}
              className="p-8 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/30 dark:bg-zinc-900/10 flex flex-col justify-between relative"
            >
              {/* Quote icon overlay */}
              <Quote className="w-12 h-12 text-orange-500/10 dark:text-orange-500/5 absolute top-6 right-6 pointer-events-none" />

              <div>
                {/* Stars */}
                <div className="flex space-x-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4.5 h-4.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-zinc-200/50 dark:border-zinc-800/50">
                {/* Avatar Badge */}
                <div className={`w-12 h-12 rounded-full bg-linear-to-br ${t.avatarColor} text-white flex items-center justify-center font-bold text-sm tracking-wide shadow-sm shrink-0`}>
                  {t.initials}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-zinc-950 dark:text-white">
                    {t.name}
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    {t.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
