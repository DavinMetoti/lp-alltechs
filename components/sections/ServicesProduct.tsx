"use client";

import React, { useEffect } from "react";
import { BarChart2, Bell, PieChart, Layers, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

/* ── Typewriter hook (single dispatch per tick via useReducer) ── */
const TYPED_WORDS = ["Layanan Produk", "Solusi IT & Keamanan", "Telekomunikasi Bisnis"];
const TYPE_SPEED = 70;
const DELETE_SPEED = 40;
const PAUSE_MS = 1800;

type TWState = { display: string; wordIdx: number; typing: boolean; pausing: boolean };
type TWAction = "TICK";

function twReducer(words: string[]) {
  return (state: TWState, _: TWAction): TWState => {
    const current = words[state.wordIdx];
    if (state.pausing) return { ...state, pausing: false, typing: false };
    if (state.typing) {
      if (state.display.length < current.length)
        return { ...state, display: current.slice(0, state.display.length + 1) };
      return { ...state, pausing: true }; // finished typing → pause
    } else {
      if (state.display.length > 0)
        return { ...state, display: state.display.slice(0, -1) };
      return { display: "", wordIdx: (state.wordIdx + 1) % words.length, typing: true, pausing: false };
    }
  };
}

function useTypewriter(words: string[]) {
  const [state, dispatch] = React.useReducer(twReducer(words), {
    display: "",
    wordIdx: 0,
    typing: true,
    pausing: false,
  });

  useEffect(() => {
    const delay = state.pausing ? PAUSE_MS : state.typing ? TYPE_SPEED : DELETE_SPEED;
    const t = setTimeout(() => dispatch("TICK"), delay);
    return () => clearTimeout(t);
  }, [state]);

  return state.display;
}


/* ── Card data ── */
interface ServiceCard {
  icon: React.ElementType;
  title: string;
  items: string[];
  link: string;
}

const serviceCards: ServiceCard[] = [
  {
    icon: BarChart2,
    title: "PABX Panasonic",
    items: [
      "PABX Panasonic KX-NS300",
      "PABX Panasonic KX-TDA100",
      "PABX Panasonic KX-TDA600",
      "PABX Panasonic KX-TDE200",
      "PABX Panasonic KX-TDE600",
      "PABX Panasonic KX-TES824",
    ],
    link: "/product?category=pbx",
  },
  {
    icon: Bell,
    title: "Nurse Call Commax",
    items: [
      "CL-302i NURSE CALL COMMAX",
      "Corridor Lamp Nurse Call Commax CL-302",
      "Emergency Bathroom Pullcord Nurse Call Commax ES-410",
      "Nurse Call Commax JNS 36",
    ],
    link: "/product?category=nurse-call",
  },
  {
    icon: PieChart,
    title: "PABX LG Ericsson",
    items: [
      "EMG100 - Dual Max",
      "EMG100–KSUS.PAC DPT",
      "LG ERICSSON ARIA SOHO",
      "LG ERICSSON IPECS LIK",
      "LG ERICSSON IPECS MG",
    ],
    link: "/product?category=pbx",
  },
  {
    icon: Layers,
    title: "Nurse Call Aiphone",
    items: [
      "Aiphone nurse call swit compatible",
      "Bathroom Pull Cord NIR-/Hw",
      "Ceiling Microphone Nurse Call Aiphone NI-SB",
      "Corridor Light Nurse Call Aiphone With Reset Button NIR...",
    ],
    link: "/product?category=nurse-call",
  },
];

/* ── Card Component ── */
function FlipCard({ card, index }: { card: ServiceCard; index: number }) {
  const Icon = card.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative h-[380px] rounded-2xl border border-zinc-100 bg-white hover:bg-orange-600 p-7 flex flex-col shadow-sm hover:shadow-xl hover:shadow-orange-600/10 transition-all duration-300 ease-out overflow-hidden"
    >
      {/* Top Header: Icon + visual play badge on hover */}
      <div className="flex items-center justify-between mb-5 shrink-0">
        <div className="w-12 h-12 rounded-xl bg-orange-50 group-hover:bg-white/20 flex items-center justify-center text-orange-600 group-hover:text-white transition-colors duration-300">
          <Icon className="w-6 h-6" />
        </div>
        <div className="w-8 h-8 rounded-full border-2 border-white/40 opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="white" className="w-3 h-3 ml-0.5">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Card Title */}
      <h3 className="text-sm font-bold text-zinc-950 group-hover:text-white uppercase tracking-wide mb-3 transition-colors duration-300">
        {card.title}
      </h3>

      {/* Product Items List */}
      <ul className="space-y-1 flex-1 overflow-hidden">
        {card.items.map((item, i) => (
          <li key={i} className="text-xs text-zinc-500 group-hover:text-white/90 leading-snug transition-colors duration-300">
            {item}
          </li>
        ))}
      </ul>

      {/* Footer Link */}
      <div className="mt-4 pt-4 border-t border-zinc-100 group-hover:border-white/20 transition-colors duration-300">
        <Link
          href={card.link}
          className="inline-flex items-center gap-1 text-xs font-bold text-zinc-700 group-hover:text-white transition-colors"
        >
          Lihat Detail <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </motion.div>
  );
}

/* ── Main Section ── */
export default function ServicesProduct() {
  const typedText = useTypewriter(TYPED_WORDS);

  return (
    <section id="services-product" className="py-24 bg-zinc-50 relative overflow-hidden">
      {/* Subtle dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,0,0,0.04)_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── Header row ── */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-600 text-xs font-bold tracking-widest uppercase mb-4">
              Layanan Terbaik Kami
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 leading-tight">
              Menyediakan Solusi Komunikasi & Keamanan Terbaik
            </h2>

            {/* Typewriter line */}
            <div className="flex items-center gap-0 mt-1 h-10">
              <span className="text-3xl sm:text-4xl font-extrabold text-zinc-400 leading-tight">
                {typedText}
              </span>
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-0.5 h-8 bg-orange-600 ml-1 rounded-full"
              />
            </div>
          </div>

          {/* CTA button */}
          <Link
            href="/product"
            className="shrink-0 inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-500 text-white text-sm font-bold px-7 py-3.5 rounded-full shadow-md hover:shadow-orange-200 transition-all duration-300"
          >
            Semua Produk <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* ── Cards grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {serviceCards.map((card, i) => (
            <FlipCard key={i} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
