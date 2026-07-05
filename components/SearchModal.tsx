"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, FileText, ShoppingBag, Newspaper, Tag, MessageCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface SearchResult {
  type: "product" | "article" | "news" | "promo";
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  image_url?: string;
  category?: string;
  category_slug?: string;
  brand?: string;
  promoprice?: string;
  product_slug?: string;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Debounced search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const delayDebounceFn = setTimeout(async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://cms.alltechs.co.id/api/";
        const cleanBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
        const apiKey = process.env.NEXT_PUBLIC_API_KEY || "at_key_80ca892ab367ba187ba39d85647c0f70a67bd169b13be651";

        const res = await fetch(`${cleanBase}v1/search?query=${encodeURIComponent(query)}`, {
          headers: {
            "X-Api-Key": apiKey,
            Accept: "application/json",
          },
        });

        if (res.ok) {
          const json = await res.json();
          setResults(json.data || []);
          setSelectedIndex(0);
        } else {
          console.error("Search failed:", res.status);
        }
      } catch (error) {
        console.error("Error searching:", error);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length > 0 ? (prev + 1) % results.length : 0));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (results.length > 0 ? (prev - 1 + results.length) % results.length : 0));
      } else if (e.key === "Enter") {
        if (results.length > 0 && results[selectedIndex]) {
          e.preventDefault();
          const target = results[selectedIndex];
          if (target.type === "product") {
            const url = target.category_slug ? `/product?category=${target.category_slug}` : "/product";
            window.location.href = url;
          } else if (target.type === "article") {
            window.location.href = `/artikel/${target.slug}`;
          } else if (target.type === "news") {
            window.location.href = `/news/${target.slug}`;
          } else if (target.type === "promo") {
            window.location.href = `/promo/${target.slug}`;
          }
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  const getIcon = (type: string) => {
    switch (type) {
      case "product":
        return <ShoppingBag className="w-4 h-4 text-emerald-500" />;
      case "article":
        return <FileText className="w-4 h-4 text-blue-500" />;
      case "news":
        return <Newspaper className="w-4 h-4 text-amber-500" />;
      case "promo":
        return <Tag className="w-4 h-4 text-rose-500" />;
      default:
        return <Search className="w-4 h-4 text-zinc-400" />;
    }
  };

  const getHref = (item: SearchResult) => {
    switch (item.type) {
      case "product":
        return item.category_slug ? `/product?category=${item.category_slug}` : "/product";
      case "article":
        return `/artikel/${item.slug}`;
      case "news":
        return `/news/${item.slug}`;
      case "promo":
        return `/promo/${item.slug}`;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-start justify-center pt-[10vh] px-4">
          {/* Backdrop Blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-zinc-950/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-zinc-200/60 bg-white/95 shadow-2xl backdrop-blur-xl flex flex-col max-h-[75vh]"
          >
            {/* Header / Input Area */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-zinc-100">
              <Search className="w-5 h-5 text-zinc-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Mau cari apa? Tanya saya..."
                className="flex-1 bg-transparent text-zinc-800 placeholder-zinc-400 font-medium text-base border-none focus:outline-hidden focus:ring-0 w-full"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="p-1 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <div className="text-[10px] font-bold text-zinc-400 border border-zinc-200 rounded px-1.5 py-0.5 select-none shrink-0">
                ESC
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-3 space-y-1">
              {isLoading && (
                <div className="space-y-2.5 p-1">
                  <div className="px-2 py-1 flex items-center justify-between text-[11px] font-medium text-zinc-400 uppercase tracking-wider animate-pulse">
                    <div className="h-3 w-28 bg-zinc-150 rounded-md" style={{ backgroundColor: "#e4e4e7" }} />
                    <div className="h-3 w-40 bg-zinc-150 rounded-md" style={{ backgroundColor: "#e4e4e7" }} />
                  </div>
                  {[1, 2, 3].map((n) => (
                    <div
                      key={n}
                      className="flex items-center justify-between p-3 rounded-2xl border border-zinc-100 bg-zinc-50/40 animate-pulse"
                    >
                      <div className="flex-1 flex gap-4 min-w-0">
                        <div className="w-12 h-12 rounded-xl bg-zinc-200 shrink-0" />
                        <div className="flex-1 space-y-2 py-1">
                          <div className="flex gap-2">
                            <div className="h-4 w-12 bg-zinc-200 rounded-md" />
                            <div className="h-4 w-16 bg-zinc-200 rounded-md" />
                          </div>
                          <div className="h-4 w-2/3 bg-zinc-200 rounded-md" />
                          <div className="h-3 w-5/6 bg-zinc-200 rounded-md" />
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-zinc-200 shrink-0 ml-3" />
                    </div>
                  ))}
                </div>
              )}

              {!isLoading && query && results.length === 0 && (
                <div className="text-center py-16 space-y-2">
                  <p className="text-sm font-semibold text-zinc-500">Tidak ada hasil ditemukan untuk &ldquo;{query}&rdquo;</p>
                  <p className="text-xs text-zinc-400">Coba kata kunci lain seperti &ldquo;Panasonic&rdquo; atau &ldquo;Bosch&rdquo;</p>
                </div>
              )}

              {!isLoading && !query && (
                <div className="p-4 space-y-4">
                  <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Pencarian Populer</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Panasonic", "CCTV", "Nurse Call", "Promo", "Telecommunication"].map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-4 py-2 text-xs font-bold text-zinc-600 hover:text-orange-600 bg-zinc-50 hover:bg-orange-50/50 rounded-xl border border-zinc-200/60 hover:border-orange-200 transition-all cursor-pointer"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {!isLoading && results.length > 0 && (
                <div className="space-y-1.5">
                  <div className="px-2 py-1 flex items-center justify-between text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                    <span>Hasil Pencarian ({results.length})</span>
                    <span>Gunakan ↑ ↓ & Enter untuk navigasi</span>
                  </div>

                  {results.map((item, index) => {
                    const isSelected = index === selectedIndex;
                    const href = getHref(item);

                    return (
                      <div
                        key={`${item.type}-${item.id}-${index}`}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`group relative flex items-center justify-between p-3 rounded-2xl transition-all border ${
                          isSelected
                            ? "bg-zinc-50 border-orange-200 shadow-xs"
                            : "bg-transparent border-transparent hover:bg-zinc-50/50"
                        }`}
                      >
                        <Link href={href || "#"} onClick={onClose} className="flex-1 flex gap-4 min-w-0">
                          {/* Image or Icon Container */}
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 overflow-hidden border ${
                            isSelected ? "border-orange-100 bg-white" : "border-zinc-100 bg-zinc-50"
                          }`}>
                            {item.image_url ? (
                              <Image
                                src={item.image_url}
                                alt={item.title}
                                width={48}
                                height={48}
                                className="object-contain p-1 w-full h-full"
                                unoptimized
                              />
                            ) : (
                              getIcon(item.type)
                            )}
                          </div>

                          {/* Info block */}
                          <div className="flex-1 min-w-0 text-left">
                            <div className="flex items-center gap-2">
                              <span className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider rounded-md px-1.5 py-0.5 shrink-0 ${
                                item.type === "product"
                                  ? "bg-emerald-50 text-emerald-700"
                                  : item.type === "article"
                                  ? "bg-blue-50 text-blue-700"
                                  : item.type === "news"
                                  ? "bg-amber-50 text-amber-700"
                                  : "bg-rose-50 text-rose-700"
                              }`}>
                                {item.type}
                              </span>
                              {item.brand && (
                                <span className="text-[10px] font-bold text-zinc-400 uppercase truncate">
                                  {item.brand}
                                </span>
                              )}
                              {item.category && (
                                <span className="text-[10px] font-semibold text-zinc-400 truncate">
                                  • {item.category}
                                </span>
                              )}
                            </div>
                            <h4 className={`text-sm font-extrabold uppercase mt-1 truncate transition-colors ${
                              isSelected ? "text-orange-600" : "text-zinc-800"
                            }`}>
                              {item.title}
                            </h4>
                            {item.excerpt && (
                              <p className="text-xs text-zinc-400 mt-0.5 line-clamp-1">
                                {item.excerpt}
                              </p>
                            )}
                          </div>
                        </Link>

                        {/* Actions block on the right */}
                        <div className="flex items-center gap-2 pl-3">
                          {item.type === "product" ? (
                            <a
                              href={`https://wa.me/628121900888?text=${encodeURIComponent(
                                `Halo, saya tertarik dengan produk ${item.title}. Mohon info harga dan spesifikasinya.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-xs transition-colors shrink-0"
                              title="Tanya di WhatsApp"
                            >
                              <MessageCircle className="w-4 h-4 fill-white" />
                            </a>
                          ) : (
                            <Link
                              href={href || "#"}
                              onClick={onClose}
                              className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all shrink-0 ${
                                isSelected
                                  ? "bg-orange-600 text-white border-orange-600"
                                  : "bg-white text-zinc-400 border-zinc-200 group-hover:text-zinc-600"
                              }`}
                            >
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="bg-zinc-50 px-5 py-3 border-t border-zinc-100 flex items-center justify-between text-[11px] font-medium text-zinc-400 select-none">
              <span>PT. ALLTECHS SOLUSINDO</span>
              <div className="flex items-center gap-1">
                <span>Tekan</span>
                <kbd className="bg-white border border-zinc-200 rounded px-1 text-[9px] font-sans shadow-2xs">ESC</kbd>
                <span>untuk keluar</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
