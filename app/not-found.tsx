import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col min-h-[70vh] bg-white text-zinc-950 relative overflow-hidden">
      {/* CSS for Infinite Marquee */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-custom {
          display: inline-block;
          animation: marquee 20s linear infinite;
        }
      `}} />

      {/* White Font, Orange Background Running Text (Marquee) */}
      <div className="w-full bg-orange-600 text-white py-3 overflow-hidden whitespace-nowrap select-none font-black uppercase tracking-widest text-xs sm:text-sm border-b border-orange-700/30 flex shrink-0">
        <div className="animate-marquee-custom whitespace-nowrap pr-4">
          {"NOT FOUND • ".repeat(20)}
        </div>
        <div className="animate-marquee-custom whitespace-nowrap pr-4">
          {"NOT FOUND • ".repeat(20)}
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-4 relative">
        {/* Decorative gradients */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 left-1/3 w-60 h-60 bg-red-500/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative z-10 text-center max-w-md mx-auto space-y-6">
          {/* Subtle indicator */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            Halaman Tidak Ditemukan
          </div>

          {/* Minimalist 404 text with gradient */}
          <h1 className="text-8xl sm:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-zinc-850 to-zinc-500 leading-none select-none py-1">
            404
          </h1>

          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 tracking-tight">
              Oops! Halaman Tidak Ada
            </h2>
            <p className="text-sm text-zinc-500 leading-relaxed max-w-sm mx-auto">
              Maaf, halaman yang Anda cari tidak dapat ditemukan atau telah dipindahkan ke alamat lain.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-lg shadow-orange-600/10 hover:from-orange-500 hover:to-red-500 transition-all transform hover:-translate-y-0.5"
            >
              <Home className="w-4 h-4" />
              Kembali ke Beranda
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
