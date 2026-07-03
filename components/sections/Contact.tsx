"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg("Nama, Email, dan Pesan wajib diisi.");
      setStatus("error");
      return;
    }
    
    setStatus("submitting");
    setErrorMsg("");

    // Mock API Submit
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <section
      id="kontak"
      className="py-24 bg-zinc-50 dark:bg-zinc-900/40 relative overflow-hidden transition-colors duration-300"
    >
      <div className="absolute top-[10%] right-[10%] w-96 h-96 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-18">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Hubungi Kami
          </h2>
          <div className="w-16 h-1 bg-linear-to-r from-orange-500 to-amber-500 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Diskusikan kebutuhan teknologi Anda dan mulailah akselerasi transformasi bisnis Anda hari ini.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-12 items-stretch">
          {/* Left Column: Contact info & Map mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-between space-y-8"
          >
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-zinc-950 dark:text-white">
                Informasi Kontak
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Ada pertanyaan atau butuh konsultasi terpandu? Hubungi kami langsung via email, telepon, atau kunjungi kantor kami. Tim representatif kami akan menghubungi Anda kembali dalam 24 jam.
              </p>
              
              <div className="space-y-4 pt-2">
                {[
                  {
                    icon: Mail,
                    title: "Kirim Email",
                    value: "hello@alltechs.id",
                    href: "mailto:hello@alltechs.id",
                  },
                  {
                    icon: Phone,
                    title: "Hubungi Telepon",
                    value: "+62 (21) 555-8989",
                    href: "tel:+62215558989",
                  },
                  {
                    icon: MapPin,
                    title: "Alamat Kantor",
                    value: "Jl. Tech Avenue No. 88, Kebayoran Baru, Jakarta Selatan",
                    href: "https://maps.google.com",
                  },
                ].map((item, idx) => {
                  const ItemIcon = item.icon;
                  return (
                    <a
                      key={idx}
                      href={item.href}
                      target={item.icon === MapPin ? "_blank" : undefined}
                      rel={item.icon === MapPin ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-4 p-4 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-950 hover:border-orange-500/20 hover:shadow-xs transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-lg bg-orange-50 dark:bg-orange-950/50 flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0">
                        <ItemIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400 font-semibold">{item.title}</div>
                        <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100 mt-0.5">{item.value}</div>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Mock Maps */}
            <div className="h-44 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100 dark:bg-zinc-900 overflow-hidden relative shadow-inner shrink-0 hidden sm:block">
              {/* Maps aesthetic background grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-40" />
              <div className="absolute w-[2px] h-full bg-zinc-300 dark:bg-zinc-700 left-1/3" />
              <div className="absolute w-full h-[2px] bg-zinc-300 dark:bg-zinc-700 top-1/2" />
              <div className="absolute w-[2px] h-full bg-zinc-300 dark:bg-zinc-700 left-2/3" />
              
              {/* Map pin */}
              <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                <MapPin className="w-8 h-8 text-rose-500 fill-rose-500/20 drop-shadow-md animate-bounce" />
                <div className="w-3 h-1 bg-black/20 dark:bg-white/20 rounded-full blur-[1px] mt-0.5" />
              </div>

              <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xs px-2.5 py-1 rounded text-3xs font-semibold border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white">
                Kebayoran Baru, Jakarta
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-950 p-8 shadow-xs h-full flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="text-center py-10 space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-xs">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-950 dark:text-white">Pesan Terkirim!</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
                      Terima kasih telah menghubungi kami. Representative kami akan meninjau pesan Anda dan segera menghubungi Anda kembali.
                    </p>
                    <div className="pt-4">
                      <Button
                        onClick={() => setStatus("idle")}
                        className="rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:opacity-90 cursor-pointer"
                      >
                        Kirim Pesan Lain
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-5"
                  >
                    <h3 className="text-lg font-bold text-zinc-950 dark:text-white mb-2">
                      Kirim Pesan Langsung
                    </h3>

                    {status === "error" && (
                      <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs font-semibold">
                        <AlertCircle className="w-4.5 h-4.5 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label htmlFor="name" className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                          Nama Lengkap <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500 dark:text-white"
                          placeholder="Nama Anda"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label htmlFor="email" className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                          Email Perusahaan <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500 dark:text-white"
                          placeholder="email@perusahaan.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="subject" className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                        Subjek Proyek
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500 dark:text-white"
                        placeholder="Contoh: Pembuatan Landing Page / Migrasi Cloud"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label htmlFor="message" className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                        Detail Kebutuhan / Pesan <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-zinc-200 bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 text-sm focus:outline-hidden focus:ring-2 focus:ring-orange-500 dark:text-white resize-none"
                        placeholder="Ceritakan tentang proyek Anda, target rilis, atau tantangan bisnis yang dihadapi..."
                      />
                    </div>

                    <div className="pt-2">
                      <Button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full bg-orange-600 text-white hover:bg-orange-500 dark:bg-orange-600 dark:hover:bg-orange-500 rounded-xl h-12 text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-orange-600/10"
                      >
                        {status === "submitting" ? (
                          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        ) : (
                          <>
                            Kirim Pesan
                            <Send className="w-4.5 h-4.5" />
                          </>
                        )}
                      </Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
