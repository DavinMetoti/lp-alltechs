"use client";

import React, { useState, useEffect } from "react";
import { BarChart2, Bell, PieChart, Layers, ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

/* ── Typewriter hook (single dispatch per tick via useReducer) ── */
const TYPED_WORDS = ["Services Product", "IT Solutions", "Telecommunications"];
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
    link: "/product?category=pabx",
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
    link: "/product?category=pabx",
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

/* ── Flip Card ── */
function FlipCard({ card, index }: { card: ServiceCard; index: number }) {
  const Icon = card.icon;
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-[380px]"
      style={{ perspective: "1000px" }}
      onHoverStart={() => setFlipped(true)}
      onHoverEnd={() => setFlipped(false)}
    >
      {/* Inner rotating wrapper */}
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 rounded-2xl border border-zinc-100 bg-white p-7 flex flex-col shadow-sm"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 mb-5 shrink-0">
            <Icon className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-zinc-950 uppercase tracking-wide mb-3">
            {card.title}
          </h3>
          <ul className="space-y-1 flex-1 overflow-hidden">
            {card.items.map((item, i) => (
              <li key={i} className="text-xs text-zinc-500 leading-snug">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-zinc-100">
            <Link
              href={card.link}
              className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-700 hover:text-orange-600 transition-colors"
            >
              See Details <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 rounded-2xl bg-orange-600 p-7 flex flex-col shadow-xl"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {/* Play icon top-right */}
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0">
              <Icon className="w-6 h-6" />
            </div>
            <div className="w-8 h-8 rounded-full border-2 border-white/40 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="white" className="w-3 h-3 ml-0.5">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-3">
            {card.title}
          </h3>
          <ul className="space-y-1.5 flex-1 overflow-hidden">
            {card.items.map((item, i) => (
              <li key={i} className="text-xs text-white/85 leading-snug">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-4 border-t border-white/20">
            <Link
              href={card.link}
              className="inline-flex items-center gap-1 text-xs font-bold text-white hover:text-white/70 transition-colors"
            >
              See Details <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </motion.div>
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
              What We Do For You
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 leading-tight">
              We can inspire and Offer Different
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
            See All Product <ArrowRight className="w-4 h-4" />
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
