"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Users, Building2, ShieldCheck, Search, Sparkles, Award } from "lucide-react";
import { motion } from "motion/react";

const CLIENT_GROUPS = [
  {
    category: "Rumah Sakit & Klinik",
    icon: Building2,
    clients: [
      "RS. Medistra", "RS. Pertamina Jaya", "RS. Pusat Pertamina", "RS. Bersalin Hermina Jatinegara",
      "RS. Bersalin Hermina Bekasi", "RS. Bersalin Hermina Depok", "RS. Bersalin Hermina Daan Mogot",
      "RS. Bersalin Hermina Ciputat", "RS. Bersalin Hermina Bogor", "RS. Bersalin Hermina Mekarsari",
      "RS. Bersalin Hermina Sukabumi", "RS. Bersalin Hermina Pasteur", "RS. Bersalin Hermina Pandanaran",
      "RS. Bersalin Hermina Galaxy", "RS. Bersalin Hermina Tangerang", "RS. Bersalin Hermina Yogyakarta",
      "RS. Bersalin Hermina Semarang", "RS. Bersalin Hermina Surabaya", "RS. Bersalin Hermina Makassar",
      "RS. Budi Kemuliaan", "RS. Ibu dan Anak Puri Bunda", "RS. Harapan Bunda", "RS. Pondok Indah",
      "RS. Graha Medika", "RS. Mitra Keluarga", "RS. Islam Jakarta Pusat", "RS. Islam Jakarta Timur",
      "RS. Islam Jakarta Cempaka Putih", "RS. Mintohardjo", "RS. Fatmawati", "RS. Haji Jakarta",
      "RS. PMI Bogor", "RS. Bina Husada Cibinong", "RS. Tumbuh Kembang", "RS. Harum",
      "RS. Islam Sukapura", "RS. Pelni Petamburan", "RS. Santo Borromeus", "Klinik Utama Wijaya Kusuma",
      "Klinik Mutiara", "Klinik Rawa Lumbu",
    ],
  },
  {
    category: "Hotel & Hospitality",
    icon: Sparkles,
    clients: [
      "Hotel Millenium Jakarta", "Hotel Gran Melia Jakarta", "Hotel Shangri-La Jakarta",
      "Hotel Aryaduta Jakarta", "Hotel Mulia Senayan", "Hotel Sari Pacific Jakarta",
      "Hotel Peninsula Jakarta", "Hotel Nikko Jakarta", "Hotel Santika Jakarta",
      "Hotel Santika Premiere Slipi", "Hotel Santika Premiere Hayam Wuruk", "Hotel Santika Bogor",
      "Hotel Santika Bandung", "Hotel Santika Surabaya", "Hotel Santika Bali",
      "Hotel Ciputra Jakarta", "Hotel Sahid Jaya Solo", "Hotel Sahid Surabaya",
      "Hotel Ibis Tamarin", "Hotel Ibis Slipi", "Hotel Ibis Cawang", "Hotel Ibis Styles",
      "Hotel Novotel Bogor", "Hotel Novotel Mangga Dua", "Hotel Novotel Bandung",
      "Hotel Formule 1", "Hotel Golden Boutique", "Mercure Jakarta Batavia", "Hotel Mega Anggrek",
    ],
  },
  {
    category: "Perkantoran & Gedung",
    icon: Building2,
    clients: [
      "Gedung BRI II", "Gedung Wisma Kodel", "Gedung Plaza Indonesia", "Gedung Wisma Pondok Indah I",
      "Gedung Wisma Pondok Indah II", "Gedung Wisma GKBI", "Gedung Wisma Hayam Wuruk",
      "Gedung Wisma Metropolitan I", "Gedung Wisma Metropolitan II", "Gedung Bursa Efek Indonesia",
      "Gedung Bank Indonesia", "Gedung DPR/MPR", "Gedung Bappenas", "Kantor Pusat BNI",
      "Kantor Pusat Bank Mandiri", "Kantor Pusat BCA", "Kantor Pusat BTN", "Kantor Pusat Pertamina",
      "PT. Asuransi Jasa Indonesia", "PT. Telekomunikasi Indonesia", "PT. PLN (Persero)",
      "PT. Angkasa Pura I", "PT. Angkasa Pura II", "PT. Kereta Api Indonesia", "PT. Jasa Marga",
      "PT. Kimia Farma", "PT. Indosat Ooredoo", "PT. XL Axiata", "PT. Coca-Cola Indonesia",
      "PT. Unilever Indonesia", "PT. Astra International", "PT. Toyota Astra Motor",
    ],
  },
  {
    category: "Institusi Pendidikan",
    icon: Award,
    clients: [
      "Universitas Indonesia", "Universitas Trisakti", "Universitas Tarumanegara",
      "Universitas Bina Nusantara", "Universitas Atma Jaya", "Universitas Mercu Buana",
      "STIE Perbanas", "STMIK Gunadarma", "Sekolah Al-Azhar Jakarta", "Sekolah Citra Kasih",
      "SMA Labschool Jakarta", "SMK Negeri 1 Jakarta", "Pesantren Darunnajah",
    ],
  },
  {
    category: "Instansi Pemerintah",
    icon: ShieldCheck,
    clients: [
      "Kementerian Keuangan RI", "Kementerian Kesehatan RI", "Kementerian Pendidikan RI",
      "Kementerian BUMN", "Kementerian Pertahanan RI", "Sekretariat Negara",
      "Badan Pemeriksa Keuangan (BPK)", "Komisi Pemberantasan Korupsi (KPK)", "Badan Intelijen Negara (BIN)",
      "Mabes TNI AD", "Mabes TNI AL", "Mabes TNI AU", "Mabes Polri", "Polda Metro Jaya",
      "Pemerintah Provinsi DKI Jakarta", "Pemerintah Kota Bekasi", "Pemerintah Kota Depok",
      "Badan Pengawas Obat dan Makanan (BPOM)", "Lembaga Penerbangan dan Antariksa (LAPAN)",
      "Badan Tenaga Nuklir Nasional (BATAN)",
    ],
  },
  {
    category: "Pusat Perbelanjaan & Retail",
    icon: Sparkles,
    clients: [
      "Plaza Senayan", "Senayan City", "Grand Indonesia", "Pacific Place", "Plaza Indonesia",
      "Pondok Indah Mall 1", "Pondok Indah Mall 2", "Mall Taman Anggrek", "Mall Ambassador",
      "Mal Artha Gading", "Mal Kelapa Gading I", "Mal Kelapa Gading II", "Mal Kelapa Gading III",
      "Lippo Mall Kemang", "Lotte Shopping Avenue", "Blok M Plaza", "Pasar Festival Kemayoran",
      "Mangga Dua Square",
    ],
  },
  {
    category: "Industri & Manufaktur",
    icon: Building2,
    clients: [
      "PT. Krakatau Steel", "PT. Pupuk Kujang", "PT. Pupuk Iskandar Muda", "PT. Indofood Sukses Makmur",
      "PT. Mayora Indah", "PT. Garudafood", "PT. Sampoerna", "PT. Gudang Garam", "PT. Djarum",
      "PT. BAT Indonesia", "PT. Chandra Asri Petrochemical", "PT. Holcim Indonesia",
      "PT. Semen Gresik", "PT. Semen Padang", "PT. Semen Tonasa",
    ],
  },
];

export default function OurClientsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const totalClients = CLIENT_GROUPS.reduce((sum, g) => sum + g.clients.length, 0);

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
            <Users className="w-3.5 h-3.5" /> Trusted Portfolio & Network
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white"
          >
            Our Clients
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
            <span className="text-orange-500 font-bold">Our Clients</span>
          </motion.nav>
        </div>
      </section>

      {/* ── 2. Summary & Stats Section ── */}
      <section className="py-16 px-4 bg-zinc-50/60 border-b border-zinc-100">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block rounded-full bg-orange-50 px-4 py-1 text-xs font-bold uppercase tracking-widest text-orange-600 border border-orange-200/50"
          >
            Portfolio Excellence
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-950 tracking-tight"
          >
            Dipercaya Lebih dari <span className="text-orange-600">{totalClients}+ Klien</span> Rekanan
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-zinc-600 text-sm sm:text-base leading-relaxed"
          >
            Kepercayaan yang diberikan oleh berbagai klien kami dengan berbagai jenis pekerjaan tersebut telah dijawab dengan baik oleh PT. ALLTECH SOLUSINDO yang dalam melaksanakan tugasnya menggunakan tenaga professional dan sangat berpengalaman di bidangnya. Kesemuanya telah diselesaikan dengan tuntas, seksama dan kesungguhan hati.
          </motion.p>

          {/* Key Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6"
          >
            {[
              { value: "20+", label: "Tahun Pengalaman" },
              { value: "500+", label: "Proyek Selesai" },
              { value: `${totalClients}+`, label: "Total Klien Resmi" },
              { value: "7", label: "Sektor Industri" },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-zinc-200/60 shadow-xs">
                <p className="text-2xl sm:text-3xl font-extrabold text-orange-600">{stat.value}</p>
                <p className="text-3xs sm:text-2xs font-bold uppercase tracking-wider text-zinc-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 3. Interactive Search & Client Directory ── */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Realtime Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama rumah sakit, hotel, gedung, atau instansi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-11 pr-4 py-3 text-sm font-medium text-zinc-950 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all"
            />
          </div>

          {/* Client List Groups */}
          <div className="space-y-10">
            {CLIENT_GROUPS.map((group, gIdx) => {
              const filteredClients = group.clients.filter((c) =>
                c.toLowerCase().includes(searchTerm.toLowerCase())
              );

              if (searchTerm && filteredClients.length === 0) return null;

              const IconComponent = group.icon;

              return (
                <motion.div
                  key={gIdx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: gIdx * 0.08 }}
                  className="bg-white rounded-3xl border border-zinc-200/70 shadow-sm overflow-hidden"
                >
                  {/* Group Header */}
                  <div className="flex items-center justify-between px-6 py-4.5 bg-zinc-50/80 border-b border-zinc-100">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-orange-600 text-white flex items-center justify-center font-bold shadow-xs shrink-0">
                        <IconComponent className="w-4.5 h-4.5" />
                      </div>
                      <h3 className="text-base sm:text-lg font-extrabold text-zinc-950 tracking-tight">
                        {group.category}
                      </h3>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-orange-100/70 text-orange-700 text-2xs font-bold">
                      {filteredClients.length} Klien
                    </span>
                  </div>

                  {/* Client Items Grid */}
                  <div className="p-6">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-6">
                      {filteredClients.map((client, cIdx) => (
                        <li key={cIdx} className="flex items-center gap-2.5 group">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-600 shrink-0 group-hover:scale-150 transition-transform" />
                          <span className="text-sm font-semibold text-zinc-700 group-hover:text-orange-600 transition-colors">
                            {client}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
