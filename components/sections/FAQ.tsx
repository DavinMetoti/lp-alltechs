"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, PhoneCall, HeartPulse, Flame, ShieldCheck } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  icon: React.ElementType;
}

const faqData: FAQItem[] = [
  {
    icon: PhoneCall,
    question: "Apa itu sistem PABX dan apa kelebihan PABX Panasonic & Yeastar untuk komunikasi bisnis?",
    answer: "Sistem PABX (Private Automatic Branch Exchange) adalah jaringan telepon internal yang digunakan di dalam gedung perkantoran atau bisnis untuk menghubungkan saluran telepon luar dengan ekstensi internal tanpa biaya tambahan. PT. ALLTECHS SOLUSINDO menyediakan dua solusi utama: PABX Panasonic (sistem analog/hybrid tradisional yang sangat stabil dan handal) serta PABX Yeastar dan Dinstar (sistem IP-PBX modern berbasis cloud/VoIP yang mendukung video call, fleksibilitas kerja jarak jauh, dan integrasi dengan perangkat IT modern). Penggunaan PABX secara signifikan mengurangi biaya operasional komunikasi telepon dan mempermudah manajemen panggilan bisnis Anda.",
  },
  {
    icon: HeartPulse,
    question: "Bagaimana memilih sistem Nurse Call terbaik (Commax vs Aiphone) untuk rumah sakit atau klinik?",
    answer: "Memilih sistem Nurse Call harus disesuaikan dengan kebutuhan fasilitas kesehatan Anda. Nurse Call Commax terkenal dengan kehandalan sistem kabel analog/hybrid konvensional (seperti seri JNS-36 atau CL-302i) yang mudah dioperasikan, memiliki daya tahan tinggi, serta biaya perawatan ekonomis. Sementara itu, Nurse Call Aiphone menawarkan sistem komunikasi audio-visual berkualitas premium, sistem IP Nurse Call yang canggih dengan integrasi software monitoring rumah sakit, serta fitur tombol darurat toilet pasien (Bathroom Pull Cord) dan lampu koridor (Corridor Light) yang sangat responsif. PT. ALLTECHS SOLUSINDO siap membantu merancang dan melakukan instalasi sistem Nurse Call terbaik sesuai regulasi akreditasi rumah sakit.",
  },
  {
    icon: Flame,
    question: "Mengapa instalasi sistem Fire Alarm Gedung secara profesional sangat krusial?",
    answer: "Instalasi sistem fire alarm gedung adalah garda terdepan dalam melindungi aset berharga dan keselamatan nyawa di dalam gedung perkantoran, hotel, pusat perbelanjaan, maupun industri. Sistem proteksi kebakaran yang dipasang secara profesional menggunakan detektor asap (smoke detector), detektor panas (heat detector), tombol manual emergency (manual call point), serta panel kontrol fire alarm (MCFA) terintegrasi akan memberikan peringatan dini secara cepat saat mendeteksi adanya indikasi kebakaran. Hal ini memungkinkan evakuasi berjalan lebih cepat dan meminimalisir risiko kerusakan fatal akibat kebakaran.",
  },
  {
    icon: ShieldCheck,
    question: "Apakah PT. ALLTECHS SOLUSINDO melayani jasa instalasi CCTV & Akses Kontrol di Jakarta?",
    answer: "Ya, kami melayani jasa instalasi CCTV Jakarta dan kota-kota lain di Indonesia secara menyeluruh, mulai dari survei lokasi, perencanaan titik kamera, penarikan kabel, hingga konfigurasi perekaman 24 jam. Kami menyediakan IP Camera resolusi tinggi dari merk terkemuka seperti Hikvision, Dahua, Uniview, dan Bosch untuk keamanan perimeter gedung Anda. Selain CCTV, PT. ALLTECHS SOLUSINDO juga menyediakan sistem Akses Kontrol pintu (access control door) dan pembatas area yang terintegrasi kartu RFID, fingerprint, maupun pengenalan wajah (face recognition) demi membatasi akses ilegal dan meningkatkan privasi operasional perusahaan Anda.",
  },
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Structured Data (FAQPage Schema Markup)
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };

  return (
    <section id="faq" className="py-24 bg-white relative overflow-hidden">
      {/* FAQPage JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-zinc-400/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-xs font-bold tracking-widest uppercase">
            FAQ & Informasi Solusi
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 leading-tight">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-zinc-500 text-sm leading-relaxed">
            Dapatkan informasi lengkap seputar solusi telekomunikasi bisnis, sistem PABX, Nurse Call rumah sakit, Fire Alarm gedung, dan integrasi CCTV untuk mendukung keamanan dan produktivitas Anda.
          </p>
          <div className="w-12 h-1 bg-orange-600 mx-auto rounded-full mt-2" />
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqData.map((item, idx) => {
            const ItemIcon = item.icon;
            const isOpen = activeIndex === idx;

            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-300 bg-white ${
                  isOpen
                    ? "border-orange-500 shadow-md shadow-orange-500/5"
                    : "border-zinc-200/80 hover:border-zinc-300 hover:shadow-xs"
                }`}
              >
                {/* Header/Trigger */}
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full text-left px-5 py-5 sm:px-7 sm:py-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4">
                    {/* Icon wrapper */}
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
                        isOpen ? "bg-orange-600 text-white" : "bg-orange-50 text-orange-600"
                      }`}
                    >
                      <ItemIcon className="w-5 h-5" />
                    </div>
                    <span className="text-sm sm:text-base font-extrabold text-zinc-900 leading-snug">
                      {item.question}
                    </span>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-colors ${
                      isOpen ? "border-orange-500 text-orange-600" : "border-zinc-200 text-zinc-400"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                {/* Answer Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-6 pt-1 sm:px-7 sm:pb-7 text-xs sm:text-sm text-zinc-600 leading-relaxed border-t border-zinc-100/80 ml-0 sm:ml-14">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
