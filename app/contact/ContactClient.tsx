"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Phone, Mail, MapPin, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Input, Textarea } from "@/components/ui/input";

const SITE = {
  phone: "(021) 2933 9289 / 0812 8888 7779",
  email: "info@alltechs.co.id",
  addressFull: "Ruko 87, Jl. H. Samali No.87, RT.19/RW.1, Pejaten Bar., Ps. Minggu, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12510",
};

export default function ContactClient() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const formData = new FormData(e.currentTarget);
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("success");
      } else {
        setErrorMsg(data.message || "Gagal mengirim pesan. Silakan coba lagi.");
        setStatus("error");
      }
    } catch (err) {
      console.error("Contact form submission error:", err);
      setErrorMsg("Terjadi kesalahan koneksi. Silakan coba lagi.");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 pt-24">
      {/* ── Modern Hero Section ── */}
      <section className="relative bg-orange-600 pt-28 pb-20 px-4 overflow-hidden text-white">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none w-1/2 h-full">
          <svg width="100%" height="100%" viewBox="0 0 400 400" fill="none" preserveAspectRatio="none">
            <path d="M0 400L400 0H0V400Z" fill="white" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-4">
          <p className="text-orange-100 text-xs font-extrabold uppercase tracking-widest">
            Get In Touch
          </p>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            Hubungi Kami
          </h1>
          <p className="text-orange-100/90 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Punya pertanyaan seputar produk, instalasi, atau butuh konsultasi sistem telekomunikasi? Tim ahli kami siap membantu Anda.
          </p>
        </div>
      </section>

      {/* ── Main Contact Section (50/50 Split) ── */}
      <section className="flex flex-col lg:flex-row w-full min-h-[650px]">
        {/* Left Side: Dark Info Panel (50%) */}
        <div className="w-full lg:w-1/2 bg-zinc-950 text-white flex justify-center lg:justify-end p-8 sm:p-12 lg:py-24 lg:pr-16 xl:pr-24">
          <div className="max-w-lg w-full space-y-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                Informasi Kontak
              </h2>
              <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                Jangan ragu untuk menghubungi kami melalui telepon, email, atau datang langsung ke kantor operasional kami.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="space-y-1 pt-1">
                  <p className="text-3xs uppercase font-extrabold tracking-wider text-zinc-500">Nomor Telepon</p>
                  <p className="text-base sm:text-lg font-bold text-zinc-100">{SITE.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                  <Mail className="w-6 h-6" />
                </div>
                <div className="space-y-1 pt-1">
                  <p className="text-3xs uppercase font-extrabold tracking-wider text-zinc-500">Email Utama</p>
                  <p className="text-base sm:text-lg font-bold text-zinc-100 break-all">{SITE.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-5 group">
                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="space-y-1 pt-1">
                  <p className="text-3xs uppercase font-extrabold tracking-wider text-zinc-500">Alamat Kantor</p>
                  <p className="text-sm sm:text-base font-medium text-zinc-300 leading-relaxed">{SITE.addressFull}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form Panel (50%) */}
        <div className="w-full lg:w-1/2 bg-white flex justify-center lg:justify-start p-8 sm:p-12 lg:py-24 lg:pl-16 xl:pl-24">
          <div className="max-w-lg w-full space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight mb-2">
                Kirim Pesan
              </h2>
              <p className="text-zinc-500 text-sm">
                Isi formulir di bawah ini dan tim teknis kami akan segera menghubungi Anda kembali.
              </p>
            </div>

            {status === "success" ? (
              <div className="text-center py-10 space-y-4 border border-emerald-100 bg-emerald-500/5 rounded-2xl p-6">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-zinc-950">Pesan Terkirim!</h3>
                <p className="text-sm text-zinc-600 max-w-sm mx-auto leading-relaxed">
                  Terima kasih telah menghubungi kami. Representative kami akan meninjau pesan Anda dan segera menghubungi Anda kembali.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setStatus("idle")}
                    className="inline-flex items-center justify-center bg-zinc-950 hover:bg-zinc-800 text-white font-bold text-sm py-3 px-6 rounded-xl transition-all cursor-pointer"
                  >
                    Kirim Pesan Lain
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {status === "error" && (
                  <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-semibold">
                    <AlertCircle className="w-4.5 h-4.5 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-3xs font-extrabold text-zinc-500 uppercase tracking-wider">
                      Nama Lengkap
                    </label>
                    <Input id="name" name="name" type="text" placeholder="Contoh: Budi Santoso" required />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-3xs font-extrabold text-zinc-500 uppercase tracking-wider">
                      Alamat Email
                    </label>
                    <Input id="email" name="email" type="email" placeholder="budi@perusahaan.com" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="block text-3xs font-extrabold text-zinc-500 uppercase tracking-wider">
                    Nomor WhatsApp / HP
                  </label>
                  <Input id="phone" name="phone" type="tel" placeholder="081234567890" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="block text-3xs font-extrabold text-zinc-500 uppercase tracking-wider">
                    Pesan Anda
                  </label>
                  <Textarea id="message" name="message" rows={4} placeholder="Jelaskan kebutuhan atau pertanyaan Anda..." required />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full inline-flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm py-3.5 px-8 rounded-xl shadow-lg shadow-orange-600/20 transition-all duration-200 cursor-pointer transform active:scale-[0.99] disabled:opacity-50"
                >
                  {status === "submitting" ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Kirim Pesan Sekarang
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── Office Location Section ── */}
      <section className="flex flex-col lg:flex-row w-full bg-white border-t border-zinc-200/60">
        <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end p-8 sm:p-12 lg:py-24 lg:pr-16 xl:pr-24 bg-white">
          <div className="max-w-lg w-full space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-orange-500/10 text-orange-600 flex items-center justify-center">
              <MapPin className="w-7 h-7" />
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-950 leading-tight tracking-tight">
              Lokasi Kantor Utama
            </h2>
            <p className="text-zinc-500 text-base sm:text-lg leading-relaxed">
              {SITE.addressFull}
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 h-[400px] lg:h-auto relative bg-zinc-100">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
            alt="Office Location"
            fill
            unoptimized
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </section>
    </div>
  );
}
