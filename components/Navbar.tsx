"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, MapPin, Mail, ChevronDown, Search, Phone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { CategoryItem } from "@/lib/api";
import SearchModal from "./SearchModal";

const navLinks = [
  { name: "Home", href: "/", hasDropdown: false },
  { name: "About Us", href: "#tentang", hasDropdown: true },
  { name: "Product", href: "#layanan", hasDropdown: true },
  { name: "Blog", href: "#", hasDropdown: true },
  { name: "Contact", href: "/contact", hasDropdown: false },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
  const [activeLink, setActiveLink] = useState("Home");
  const [scrolled, setScrolled] = useState(false);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    async function loadCategories() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://cms.alltechs.co.id/api/";
        const cleanBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
        const apiKey = process.env.NEXT_PUBLIC_API_KEY || "at_key_80ca892ab367ba187ba39d85647c0f70a67bd169b13be651";
        const res = await fetch(`${cleanBase}v1/categories`, {
          headers: {
            "X-Api-Key": apiKey,
            Accept: "application/json",
          },
        });
        if (res.ok) {
          const json = await res.json();
          const list = json.data?.data || json.data || [];
          if (Array.isArray(list)) {
            setCategories(list);
          }
        }
      } catch (err) {
        console.error("Failed to load categories", err);
      }
    }
    loadCategories();
  }, []);

  useEffect(() => {
    if (pathname === "/owner" || pathname === "/our-clients" || pathname === "/gallery") {
      setActiveLink("About Us");
    } else if (pathname.startsWith("/product")) {
      setActiveLink("Product");
    } else if (pathname.startsWith("/artikel") || pathname.startsWith("/news") || pathname.startsWith("/promo")) {
      setActiveLink("Blog");
    } else if (pathname === "/contact") {
      setActiveLink("Contact");
    } else if (pathname === "/") {
      setActiveLink("Home");
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    setIsOpen(false);
    setActiveLink(link.name);

    if (link.href === "/") {
      if (window.location.pathname === "/") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    if (link.href.startsWith("#") && link.href !== "#") {
      e.preventDefault();
      const element = document.querySelector(link.href);
      if (element) {
        const offset = 120; // height of double-row navbar
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 shadow-xs">
      {/* 1. TOP BAR (Dark background - hides on scroll) */}
      <div
        className={cn(
          "bg-zinc-950 text-zinc-300 px-4 sm:px-6 lg:px-8 text-xs transition-all duration-300 ease-in-out origin-top",
          scrolled
            ? "max-h-0 py-0 opacity-0 overflow-hidden border-b-0 pointer-events-none"
            : "max-h-12 py-2.5 opacity-100 border-b border-zinc-900"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Address (Left) */}
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-orange-600 fill-orange-600/10 shrink-0" />
            <span>Jl. H. Samali No. 87 Pejaten Barat</span>
          </div>

          {/* Email (Right) */}
          <a href="mailto:info@alltechs.co.id" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Mail className="w-3.5 h-3.5 text-orange-600 fill-orange-600/10 shrink-0" />
            <span>info@alltechs.co.id</span>
          </a>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION BAR (White background) */}
      <div
        className={cn(
          "bg-white transition-all duration-300 px-4 sm:px-6 lg:px-8",
          scrolled ? "py-3 shadow-md" : "py-5"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo - PT. ALLTECHS SOLUSINDO */}
          <Link href="/" className="flex items-center gap-3 focus:outline-hidden group" aria-label="PT. Alltechs Solusindo Home">
            <Image
              src="/logo-alltechs.png"
              alt="Logo PT. Alltechs Solusindo"
              width={42}
              height={42}
              className="object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col text-left">
              <span className="text-lg sm:text-xl font-black leading-none tracking-tight text-zinc-950 font-sans">
                PT. ALLTECHS
              </span>
              <span className="text-lg sm:text-xl font-black leading-none tracking-tight text-zinc-950 font-sans mt-0.5">
                SOLUSINDO
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 h-full">
            {navLinks.map((link) => {
              const isActive = activeLink === link.name;
              return (
                <div key={link.name} className="relative group py-2">
                  <Link
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link)}
                    className={cn(
                      "flex items-center gap-1 text-sm font-bold tracking-wide transition-colors uppercase focus:outline-hidden cursor-pointer",
                      isActive
                        ? "text-orange-600"
                        : "text-zinc-800 hover:text-orange-600"
                    )}
                  >
                    {link.name}
                    {link.hasDropdown && (
                      <ChevronDown className="w-4 h-4 text-zinc-400 group-hover:text-orange-600 transition-colors" />
                    )}
                  </Link>

                  {/* Red/Orange Solid Bar Underline for Active Menu */}
                  {isActive && (
                    <motion.div
                      layoutId="navUnderline"
                      className="absolute bottom-[-10px] left-0 right-0 h-0.5 bg-orange-600"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}

                  {/* Dropdown Menu */}
                  {link.hasDropdown && (
                    <div className="absolute top-full left-0 pt-2 w-48 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200">
                      <div className="rounded-xl bg-white border border-zinc-100 p-2 shadow-lg">
                        {link.name === "About Us" ? (
                          <>
                            <Link href="/owner" className="block px-4 py-2 text-xs font-semibold rounded-lg hover:bg-zinc-50 hover:text-orange-600 text-zinc-700">
                              Owner
                            </Link>
                            <Link href="/our-clients" className="block px-4 py-2 text-xs font-semibold rounded-lg hover:bg-zinc-50 hover:text-orange-600 text-zinc-700">
                              Our Client
                            </Link>
                            <Link href="/gallery" className="block px-4 py-2 text-xs font-semibold rounded-lg hover:bg-zinc-50 hover:text-orange-600 text-zinc-700">
                              Gallery
                            </Link>
                          </>
                        ) : link.name === "Blog" ? (
                          <>
                            <Link href="/artikel" className="block px-4 py-2 text-xs font-semibold rounded-lg hover:bg-zinc-50 hover:text-orange-600 text-zinc-700">
                              Artikel
                            </Link>
                            <Link href="/news" className="block px-4 py-2 text-xs font-semibold rounded-lg hover:bg-zinc-50 hover:text-orange-600 text-zinc-700">
                              News
                            </Link>
                            <Link href="/promo" className="block px-4 py-2 text-xs font-semibold rounded-lg hover:bg-zinc-50 hover:text-orange-600 text-zinc-700">
                              Promo
                            </Link>
                          </>
                        ) : (
                          <>
                            {categories.length > 0 ? (
                              categories.map((cat) => {
                                const slug = cat.slug || cat.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
                                return (
                                  <Link
                                    key={cat.id || slug}
                                    href={`/product?category=${slug}`}
                                    className="block px-4 py-2 text-xs font-semibold rounded-lg hover:bg-zinc-50 hover:text-orange-600 text-zinc-700 truncate"
                                  >
                                    {cat.name}
                                  </Link>
                                );
                              })
                            ) : (
                              <>
                                <Link href="#layanan" className="block px-4 py-2 text-xs font-semibold rounded-lg hover:bg-zinc-50 hover:text-orange-600 text-zinc-700">
                                  Telecommunication Systems
                                </Link>
                                <Link href="#layanan" className="block px-4 py-2 text-xs font-semibold rounded-lg hover:bg-zinc-50 hover:text-orange-600 text-zinc-700">
                                  CCTV & Security Solutions
                                </Link>
                                <Link href="#layanan" className="block px-4 py-2 text-xs font-semibold rounded-lg hover:bg-zinc-50 hover:text-orange-600 text-zinc-700">
                                  Nurse Call Systems
                                </Link>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Section: Search + Call Anytime */}
          <div className="hidden sm:flex items-center gap-5">
            {/* Search Icon circular button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-700 hover:text-orange-600 hover:border-orange-600/30 transition-all focus:outline-hidden cursor-pointer"
              aria-label="Search site"
            >
              <Search className="w-4.5 h-4.5" />
            </button>

            {/* Vertical Separator */}
            <div className="h-8 w-px bg-zinc-200" />

            {/* Call Anytime Details */}
            <div className="flex items-center gap-3">
              {/* Circular phone button */}
              <a
                href="tel:+628121900888"
                className="w-11 h-11 rounded-full bg-orange-600 hover:bg-orange-500 text-white flex items-center justify-center shadow-md shadow-orange-600/10 transition-colors focus:outline-hidden"
                aria-label="Telepon kami"
              >
                <Phone className="w-4.5 h-4.5 fill-white" />
              </a>
              {/* Call text info */}
              <div className="flex flex-col text-left">
                <span className="text-3xs text-zinc-500 font-bold uppercase tracking-wider leading-none">
                  Call Anytime
                </span>
                <a
                  href="tel:+628121900888"
                  className="text-sm font-black text-zinc-950 hover:text-orange-600 transition-colors leading-normal"
                >
                  +62 812-1900-888
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Hamburguer Toggle */}
          <div className="lg:hidden flex items-center gap-4">
            {/* Search icon on mobile too */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center text-zinc-700 hover:text-orange-600 hover:border-orange-600/30 transition-all focus:outline-hidden"
              aria-label="Search site"
            >
              <Search className="w-4.5 h-4.5" />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-center p-2 rounded-lg text-zinc-800 hover:text-orange-600 focus:outline-hidden cursor-pointer"
              aria-expanded={isOpen}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden border-b border-zinc-200 bg-white overflow-hidden shadow-lg"
          >
            <div className="px-4 pt-2 pb-6 space-y-1 max-h-[80vh] overflow-y-auto">
              {navLinks.map((link) => {
                const isSubOpen = openMobileSubmenu === link.name;
                return (
                  <div key={link.name} className="border-b border-zinc-100 last:border-b-0">
                    {link.hasDropdown ? (
                      <div>
                        <button
                          onClick={() => setOpenMobileSubmenu(isSubOpen ? null : link.name)}
                          className={cn(
                            "flex items-center justify-between w-full px-3 py-3 rounded-xl text-base font-bold transition-all uppercase text-left",
                            activeLink === link.name
                              ? "text-orange-600 bg-orange-500/5"
                              : "text-zinc-800 hover:text-orange-600 hover:bg-zinc-50"
                          )}
                        >
                          <span>{link.name}</span>
                          <ChevronDown
                            className={cn(
                              "w-5 h-5 text-zinc-400 transition-transform duration-200",
                              isSubOpen && "rotate-180 text-orange-600"
                            )}
                          />
                        </button>

                        <AnimatePresence>
                          {isSubOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pl-4 pr-2 pb-2 space-y-1 overflow-hidden"
                            >
                              {link.name === "About Us" && (
                                <>
                                  <Link href="/owner" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-xs font-semibold rounded-lg text-zinc-700 hover:bg-zinc-50 hover:text-orange-600">
                                    Owner
                                  </Link>
                                  <Link href="/our-clients" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-xs font-semibold rounded-lg text-zinc-700 hover:bg-zinc-50 hover:text-orange-600">
                                    Our Client
                                  </Link>
                                  <Link href="/gallery" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-xs font-semibold rounded-lg text-zinc-700 hover:bg-zinc-50 hover:text-orange-600">
                                    Gallery
                                  </Link>
                                </>
                              )}
                              {link.name === "Blog" && (
                                <>
                                  <Link href="/artikel" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-xs font-semibold rounded-lg text-zinc-700 hover:bg-zinc-50 hover:text-orange-600">
                                    Artikel
                                  </Link>
                                  <Link href="/news" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-xs font-semibold rounded-lg text-zinc-700 hover:bg-zinc-50 hover:text-orange-600">
                                    News
                                  </Link>
                                  <Link href="/promo" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-xs font-semibold rounded-lg text-zinc-700 hover:bg-zinc-50 hover:text-orange-600">
                                    Promo
                                  </Link>
                                </>
                              )}
                              {link.name === "Product" && (
                                <>
                                  {categories.length > 0 ? (
                                    categories.map((cat) => {
                                      const slug = cat.slug || cat.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
                                      return (
                                        <Link
                                          key={cat.id || slug}
                                          href={`/product?category=${slug}`}
                                          onClick={() => setIsOpen(false)}
                                          className="block px-3 py-2 text-xs font-semibold rounded-lg text-zinc-700 hover:bg-zinc-50 hover:text-orange-600 truncate"
                                        >
                                          {cat.name}
                                        </Link>
                                      );
                                    })
                                  ) : (
                                    <Link href="/product" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-xs font-semibold rounded-lg text-zinc-700 hover:bg-zinc-50 hover:text-orange-600">
                                      Semua Produk
                                    </Link>
                                  )}
                                </>
                              )}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={(e) => handleScrollTo(e, link)}
                        className={cn(
                          "block px-3 py-3 rounded-xl text-base font-bold transition-all uppercase",
                          activeLink === link.name
                            ? "text-orange-600 bg-orange-500/5"
                            : "text-zinc-800 hover:text-orange-600 hover:bg-zinc-50"
                        )}
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                );
              })}

              <div className="pt-4 border-t border-zinc-100 flex flex-col gap-4 px-3">
                <a href="tel:+628121900888" className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-orange-600 text-white flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 fill-white" />
                  </div>
                  <div>
                    <div className="text-3xs text-zinc-500 font-bold uppercase tracking-wider">Call Anytime</div>
                    <div className="text-sm font-black text-zinc-950">+62 812-1900-888</div>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}
