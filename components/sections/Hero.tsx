"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Phone, Activity, Cpu, Shield, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";

// Forward-declare type so defaultSlides can reference it before export
interface JumbotronItemBase {
  id: number | string;
  welcome_text?: string;
  heading: string;
  sub_heading?: string;
  image_url?: string;
  position?: string;
}

const defaultSlides: JumbotronItemBase[] = [
  {
    id: 1,
    welcome_text: "Distributor Resmi Terpercaya",
    heading: "Solusi Telekomunikasi Bisnis & Sistem PABX Terlengkap",
    sub_heading: "Penyedia PABX Panasonic | PABX Yeastar | PABX NEC | PABX Alcatel Lucent | PABX Dinstar terpercaya untuk komunikasi bisnis Anda.",
    image_url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1600&q=80",
    position: "Left",
  },
  {
    id: 2,
    welcome_text: "Mitra Teknologi Medis & Komunikasi",
    heading: "Sistem Nurse Call Rumah Sakit & Klinik Modern",
    sub_heading: "Pengadaan dan instalasi Nurse Call Commax | Nurse Call Aiphone | IP Nurse Call | Emergency Toilet System berkualitas tinggi.",
    image_url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1600&q=80",
    position: "Left",
  },
  {
    id: 3,
    welcome_text: "Proteksi & Sistem Keamanan Gedung",
    heading: "Instalasi Fire Alarm & Integrasi CCTV Terpercaya",
    sub_heading: "Proteksi maksimal dengan Fire Alarm System | Intrusion System | Akses Kontrol | CCTV Integration 24/7.",
    image_url: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1600&q=80",
    position: "Left",
  }
];

const quickCards = [
  {
    title: "Telekomunikasi",
    description: "Sistem PABX | Nurse Call System | Fire Alarm System | Intrusion System.",
    icon: Phone,
  },
  {
    title: "Mekanikal",
    description: "Pengadaan & Instalasi: AC Split | VRV | Chiller | Clean Room.",
    icon: Cpu,
  },
  {
    title: "Elektrikal",
    description: "Pengadaan & Instalasi: Lampu | Panel Listrik | Akses Kontrol | Nurse Call.",
    icon: Activity,
  },
  {
    title: "Layanan IT",
    description: "Pengadaan & Instalasi: Access Point | Perangkat Keras | Fiber Optic | NAS QNAP.",
    icon: Shield,
  },
];

export interface JumbotronItem {
  id: number | string;
  welcome_text?: string;
  heading: string;
  sub_heading?: string;
  image_url?: string;
  position?: string;
}

export default function Hero({ jumbotrons = [] }: { jumbotrons?: JumbotronItem[] }) {
  const slides = jumbotrons.length > 0 ? jumbotrons : defaultSlides;
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide, isHovered]);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Helper to style the "solutions" word nicely with the circle dot icon
  const formatHeading = (text: string) => {
    const regex = /(solutions)/i;
    if (regex.test(text)) {
      const parts = text.split(regex);
      return parts.map((part, i) => {
        if (part.toLowerCase() === "solutions") {
          return (
            <span key={i} className="inline-flex items-center">
              S
              <span className="inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full bg-orange-600 border-2 border-white mx-0.5 relative text-white shrink-0 shadow-sm align-middle select-none">
                <span className="w-2 h-2 rounded-full bg-white absolute" />
              </span>
              lutions
            </span>
          );
        }
        return part;
      });
    }
    return text;
  };

  // Map API position field to Tailwind alignment classes
  const getPositionClasses = (position?: string) => {
    switch (position?.toLowerCase()) {
      case "right":
        return {
          container: "text-right items-end",
          flex: "justify-end",
          max: "ml-auto",
        };
      case "center":
        return {
          container: "text-center items-center",
          flex: "justify-center",
          max: "mx-auto",
        };
      case "left":
      default:
        return {
          container: "text-left items-start",
          flex: "justify-start",
          max: "",
        };
    }
  };

  const currentData = slides[currentSlide] || slides[0];
  const posClasses = getPositionClasses(currentData.position);

  return (
    // Outer wrapper — NOT overflow-hidden so cards can overlap below
    <div className="relative">
      {/* ── Hero Slider ── */}
      <section
        className="relative min-h-[75vh] sm:min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center transition-colors duration-300 overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Image Slider */}
        <div className="absolute inset-0 z-0 bg-zinc-950">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${currentData.image_url || "/fallback-hero-bg.jpg"})`,
              }}
            />
          </AnimatePresence>

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/65 z-10" />
        </div>

        {/* Slide Content Container — pt-24 accounts for fixed navbar height on mobile */}
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 w-full pt-28 pb-24 sm:pt-28 sm:pb-32 lg:pt-36 lg:pb-48 flex flex-col ${posClasses.container}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className={`space-y-4 sm:space-y-6 max-w-5xl ${posClasses.max}`}
            >
              {/* Welcome Text Pill Badge */}
              {currentData.welcome_text && (
                <div className="inline-block bg-zinc-900/80 border border-zinc-700/50 text-white text-xs font-semibold py-1.5 px-3.5 rounded-sm uppercase tracking-wider shadow-sm select-none">
                  {currentData.welcome_text}
                </div>
              )}

              {/* Heading */}
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.15]">
                {formatHeading(currentData.heading)}
              </h1>

              {/* Sub-heading */}
              {currentData.sub_heading && (
                <p className={`text-xs sm:text-sm md:text-base lg:text-lg text-zinc-300 leading-relaxed max-w-4xl pt-1 sm:pt-2 font-medium ${posClasses.max}`}>
                  {currentData.sub_heading}
                </p>
              )}

              {/* CTA Button */}
              <div className={`pt-4 sm:pt-6 flex ${posClasses.flex}`}>
                <a href="#kontak" onClick={(e) => handleScrollTo(e, "#kontak")}>
                  <Button className="bg-orange-600 hover:bg-orange-500 text-white rounded-sm py-4 sm:py-6 px-6 sm:px-10 text-sm sm:text-base font-bold uppercase tracking-wider shadow-md hover:shadow-lg hover:shadow-orange-600/10 cursor-pointer transition-all flex items-center gap-2 group">
                    Hubungi Kami
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1.5 transition-transform" />
                  </Button>
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-black/30 hover:bg-orange-600 text-white flex items-center justify-center hover:border-orange-600 transition-all focus:outline-hidden cursor-pointer"
          aria-label="Slide sebelumnya"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-12 sm:h-12 rounded-full border border-white/20 bg-black/30 hover:bg-orange-600 text-white flex items-center justify-center hover:border-orange-600 transition-all focus:outline-hidden cursor-pointer"
          aria-label="Slide berikutnya"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* Slide Indicator Dots */}
        <div className="absolute bottom-20 sm:bottom-28 lg:bottom-36 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all focus:outline-hidden cursor-pointer ${
                currentSlide === idx
                  ? "bg-orange-600 w-8"
                  : "bg-white/40 hover:bg-white/70 w-2.5"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ── Quick Cards — rendered OUTSIDE the overflow-hidden section ── */}
      <div className="relative z-30 px-2 sm:px-4 -mt-12 sm:-mt-16 lg:-mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 shadow-2xl rounded-xl overflow-hidden bg-white border border-zinc-100">
          {quickCards.map((card, i) => {
            const CardIcon = card.icon;
            return (
              <motion.div
                key={i}
                onClick={(e) => handleScrollTo(e, "#layanan")}
                initial={false}
                whileHover="hovered"
                animate="rest"
                variants={{
                  rest: { backgroundColor: "#ffffff" },
                  hovered: { backgroundColor: "#ea580c" },
                }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="relative p-4 sm:p-6 cursor-pointer border-r border-b lg:border-b-0 border-zinc-100 even:last:border-r-0 lg:last:border-r-0 overflow-hidden group"
              >
                {/* Number indicator */}
                <motion.span
                  variants={{
                    rest: { color: "#a1a1aa" },
                    hovered: { color: "rgba(255,255,255,0.5)" },
                  }}
                  className="absolute top-3 right-3 sm:top-5 sm:right-5 text-xs font-semibold tabular-nums"
                >
                  / {i + 1}
                </motion.span>

                {/* Icon */}
                <motion.div
                  variants={{
                    rest: { color: "#ea580c" },
                    hovered: { color: "#ffffff" },
                  }}
                  className="mb-3 sm:mb-6 lg:mb-8 mt-2 sm:mt-0"
                >
                  <CardIcon className="w-7 h-7 sm:w-8 sm:h-8 lg:w-9 lg:h-9 stroke-[1.5]" />
                </motion.div>

                {/* Title */}
                <motion.h4
                  variants={{
                    rest: { color: "#09090b" },
                    hovered: { color: "#ffffff" },
                  }}
                  className="text-xs sm:text-sm lg:text-base font-bold mb-1.5 sm:mb-3 leading-tight"
                >
                  {card.title}
                </motion.h4>

                {/* Description */}
                <motion.p
                  variants={{
                    rest: { color: "#71717a" },
                    hovered: { color: "rgba(255,255,255,0.85)" },
                  }}
                  className="text-[10px] sm:text-xs leading-relaxed"
                >
                  {card.description}
                </motion.p>

                {/* Arrow button — slides up on hover */}
                <motion.div
                  variants={{
                    rest: { opacity: 0, y: 16 },
                    hovered: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="mt-4 sm:mt-6 w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-white/60 flex items-center justify-center text-white"
                >
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 -rotate-45" />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
