"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import { motion } from "motion/react";

const TEXT = "LET'S GET IN TOUCH";

export default function Footer() {
  const [waveKey, setWaveKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWaveKey((prev) => prev + 1);
    }, 3500); // Repeat smooth wave trigger every 3.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-[#0b1120] text-white relative overflow-hidden font-sans">
      {/* Top Banner "LET'S GET IN TOUCH" with Ultra-Smooth Motion Wave */}
      <div className="relative border-b border-zinc-800/80 pt-16 pb-12 overflow-hidden">
        {/* Background Network Pattern overlay placeholder */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.05)_0,transparent_70%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 select-none">
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-wider uppercase inline-flex flex-wrap justify-center">
            {TEXT.split("").map((char, index) => {
              if (char === " ") {
                return <span key={index} className="w-4 sm:w-8" />;
              }

              return (
                <motion.span
                  key={`${index}-${waveKey}`}
                  initial={{ y: 0, scale: 1 }}
                  animate={{
                    y: [0, -28, 4, 0],
                    scale: [1, 1.14, 0.98, 1],
                  }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.05,
                    ease: [0.34, 1.56, 0.64, 1], // Smooth spring physics curve for organic liquid wave
                  }}
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-red-500 to-orange-600"
                >
                  {char}
                </motion.span>
              );
            })}
          </h2>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Left Column: Ready To Start */}
          <div className="md:col-span-4 space-y-6">
            <Link href="/" className="flex items-center gap-3 inline-block group">
              <Image
                src="/logo-alltechs.png"
                alt="Logo PT. ALLTECHS SOLUSINDO - Partner Telekomunikasi & Keamanan Gedung"
                width={48}
                height={48}
                className="object-contain"
              />
              <div className="flex flex-col text-left">
                <span className="text-xl font-black leading-none tracking-tight text-white font-sans">
                  PT. ALLTECHS
                </span>
                <span className="text-xl font-black leading-none tracking-tight text-orange-500 font-sans mt-0.5">
                  SOLUSINDO
                </span>
              </div>
            </Link>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-white pt-2">
              Ready To Start <span className="font-extrabold">Work With Us?</span>
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              We work with a passion of taking challenges and creating new ones in telecommunication sector.
            </p>

            {/* Phone contact */}
            <div className="flex items-center gap-3 pt-2">
              <div className="w-10 h-10 rounded-full border border-orange-500/40 flex items-center justify-center text-orange-500 shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold text-white tracking-wide">
                +62 812 1900 888
              </span>
            </div>

            {/* Get a Quote button */}
            <div className="pt-2">
              <Link
                href="#kontak"
                className="inline-block bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white text-xs font-bold py-3.5 px-8 rounded-full shadow-lg shadow-red-600/20 transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Get a Quote
              </Link>
            </div>
          </div>

          {/* Center Column: Quick Links */}
          <div className="md:col-span-4 space-y-5">
            <h4 className="text-sm font-bold tracking-wider text-white uppercase relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-6 after:h-0.5 after:bg-orange-500">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 pt-3">
              {[
                { name: "About Us", href: "#company-overview" },
                { name: "Product", href: "#best-products" },
                { name: "Owner", href: "#" },
                { name: "Promo", href: "#" },
                { name: "Gallery", href: "#" },
                { name: "Our Client", href: "#" },
                { name: "Contact", href: "#kontak" },
                { name: "Blog", href: "#" },
              ].map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="flex items-center text-xs text-zinc-400 hover:text-orange-500 transition-colors group"
                >
                  <span className="text-orange-500 font-bold mr-1.5 transition-transform group-hover:translate-x-0.5">
                    &raquo;
                  </span>
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: Search */}
          <div className="md:col-span-4 space-y-5">
            <h4 className="text-sm font-bold tracking-wider text-white uppercase relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-6 after:h-0.5 after:bg-orange-500">
              Search
            </h4>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 pt-3">
              <input
                type="text"
                placeholder="Search ..."
                className="bg-white text-zinc-800 text-xs px-4 py-3 rounded-md focus:outline-none w-full shadow-inner placeholder:text-zinc-400 font-medium"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white text-xs font-bold px-6 py-3 rounded-full shadow-md transition-all shrink-0 cursor-pointer"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="border-t border-zinc-900 bg-[#070b14] py-6 text-center text-xs text-zinc-500">
        <p>Copyright &copy; {new Date().getFullYear()} PT. ALLTECHS SOLUSINDO</p>
      </div>
    </footer>
  );
}
