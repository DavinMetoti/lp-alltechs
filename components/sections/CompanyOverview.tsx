"use client";

import React from "react";
import Image from "next/image";
import { Trophy, Settings2, BarChart2 } from "lucide-react";
import { motion } from "motion/react";



const stats = [
  { icon: Trophy, value: "150+", label: "Produk Terbaik" },
  { icon: Settings2, value: "98k", label: "Klien Puas" },
];

const barHeights = [40, 60, 50, 80, 70];

export default function CompanyOverview() {
  return (
    <section
      id="company-overview"
      className="pt-50 pb-24 bg-white relative overflow-hidden"
    >
      {/* Subtle dot grid background */}
      <div className="absolute inset-0 bg-white pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT: Banner image + floating cards ── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Main banner */}
            <div className="relative rounded-3xl overflow-hidden">
              <Image
                src="/assets/images/Banner-Allt02.png"
                alt="PT. ALLTECHS SOLUSINDO - Supplier PABX Panasonic, CCTV & Nurse Call Commax Resmi"
                width={580}
                height={480}
                className="w-full h-auto object-cover"
                priority
              />
            </div>

            {/* Floating stat card — bottom left */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 min-w-[160px] border border-zinc-100"
            >
              <p className="text-2xl font-extrabold text-zinc-950">98%</p>
              <p className="text-xs text-zinc-500 font-medium mt-0.5">Target Bisnis</p>
              {/* Mini bar chart */}
              <div className="mt-3 flex items-end gap-1 h-10">
                {barHeights.map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-sm bg-orange-500"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-1">
                {["Jan", "Feb", "Mar", "Apr", "May"].map((m) => (
                  <span key={m} className="text-[9px] text-zinc-400">{m}</span>
                ))}
              </div>
            </motion.div>

            {/* Floating orange chat bubble icon — top right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-orange-600 flex items-center justify-center shadow-lg text-white"
            >
              <BarChart2 className="w-5 h-5" />
            </motion.div>
          </motion.div>

          {/* ── RIGHT: Text content ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-xs font-bold tracking-widest uppercase">
              Profil Perusahaan
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 leading-tight tracking-tight">
              PT. Alltech Solusindo
            </h2>

            {/* Description */}
            <p className="text-zinc-600 leading-relaxed text-sm sm:text-base">
              PT. Alltech Solusindo sudah menangani lebih dari ratusan customer sejak tahun 2004.{" "}
              <strong className="text-zinc-800">PT. ALLTECH SOLUSINDO</strong> merupakan Dealer atau Agen Resmi dari
              sejumlah Distributor PABX ternama seperti,{" "}
              <span className="text-orange-600 font-semibold">Panasonic, NEC, LG Ericsson, Alcatel Lucent</span>{" "}
              yang memiliki jenis usaha dalam bidang{" "}
              <span className="text-orange-600 font-semibold">
                construction, telecommunication, Agen PABX Murah
              </span>{" "}
              dan supplier. Pemilihan jenis usaha tersebut merupakan keinginan para pendiri untuk membangun
              sebuah usaha dengan lebih mengingat keempat profesi tersebut pada dasarnya akan saling menguatkan
              posisi perusahaan. Kepercayaan yang diberikan oleh berbagai klien kami dengan berbagai jenis
              pekerjaan tersebut telah dijawab dengan baik oleh PT. ALLTECH SOLUSINDO yang dalam melaksanakan
              tugasnya menggunakan tenaga professional dan sangat berpengalaman di bidangnya.
            </p>

            {/* Divider */}
            <div className="w-14 h-1 bg-orange-600 rounded-full" />

            {/* Stats */}
            <div className="flex items-center gap-10 pt-2">
              {stats.map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-12 h-12 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-2xl font-extrabold text-zinc-950 leading-none">{s.value}</p>
                      <p className="text-xs text-zinc-500 font-medium mt-1">{s.label}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
