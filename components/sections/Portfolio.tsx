"use client";

import React, { useState } from "react";
import { ExternalLink, Globe, Smartphone, Cloud } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const categories = [
  { id: "all", label: "Semua" },
  { id: "web", label: "Web Dev" },
  { id: "mobile", label: "Mobile App" },
  { id: "cloud-ai", label: "AI & Cloud" },
];

const projects = [
  {
    title: "E-Commerce Enterprise",
    category: "web",
    tag: "Next.js / Shopify",
    description: "Membangun platform e-commerce dengan headless architecture untuk penjualan retail global.",
    color: "from-blue-600/20 to-cyan-500/20 text-blue-600 dark:text-blue-400",
    visual: (
      <div className="absolute inset-0 bg-linear-to-br from-blue-900 to-indigo-950 flex flex-col justify-end p-6">
        <div className="flex justify-between items-center mb-3">
          <div className="h-6 bg-white/20 rounded-md w-1/3" />
          <Globe className="w-5 h-5 text-blue-400" />
        </div>
        <div className="space-y-2">
          <div className="h-2 bg-white/10 rounded-sm w-3/4" />
          <div className="h-2 bg-white/10 rounded-sm w-1/2" />
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <div className="h-8 bg-white/5 rounded-xs" />
          <div className="h-8 bg-white/5 rounded-xs" />
          <div className="h-8 bg-white/5 rounded-xs" />
        </div>
      </div>
    ),
  },
  {
    title: "Telehealth Mobile App",
    category: "mobile",
    tag: "React Native / Node.js",
    description: "Aplikasi konsultasi medis online secara real-time lengkap dengan integrasi resep elektronik.",
    color: "from-emerald-600/20 to-teal-500/20 text-emerald-600 dark:text-emerald-400",
    visual: (
      <div className="absolute inset-0 bg-linear-to-br from-teal-900 to-emerald-950 flex items-center justify-center p-6">
        {/* Mock phone view */}
        <div className="w-32 h-full bg-zinc-950 rounded-t-xl border-x-2 border-t-2 border-white/20 p-2 flex flex-col gap-2">
          <div className="h-2 bg-white/20 rounded-xs w-1/2 mx-auto" />
          <div className="h-10 bg-white/10 rounded-lg flex items-center justify-between px-2">
            <div className="w-4 h-4 rounded-full bg-emerald-500" />
            <div className="w-10 h-2 bg-white/20 rounded-xs" />
          </div>
          <div className="h-12 bg-white/5 rounded-lg" />
          <div className="h-10 bg-white/5 rounded-lg" />
        </div>
        <Smartphone className="w-6 h-6 text-emerald-400 absolute bottom-4 right-4" />
      </div>
    ),
  },
  {
    title: "Smart Analytics Engine",
    category: "cloud-ai",
    tag: "Python / AWS / ML",
    description: "Sistem analitik prediktif berbasis machine learning untuk memproyeksikan inventaris ritel.",
    color: "from-purple-600/20 to-pink-500/20 text-purple-600 dark:text-purple-400",
    visual: (
      <div className="absolute inset-0 bg-linear-to-br from-purple-900 to-pink-950 flex flex-col justify-between p-6">
        <div className="flex justify-between">
          <Cloud className="w-6 h-6 text-pink-400" />
          <div className="px-2 py-1 rounded-sm bg-white/10 text-3xs text-purple-200">AI Active</div>
        </div>
        <div className="h-24 flex items-end gap-1.5 w-full">
          {[20, 45, 60, 35, 70, 85, 50, 95, 110].map((h, idx) => (
            <div
              key={idx}
              className="bg-pink-500/50 rounded-t-xs flex-1"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "SaaS HR Management",
    category: "web",
    tag: "Next.js / PostgreSQL",
    description: "Platform SaaS HR multi-tenant untuk absensi online, payroll, dan klaim reimbursement.",
    color: "from-indigo-600/20 to-blue-500/20 text-indigo-600 dark:text-indigo-400",
    visual: (
      <div className="absolute inset-0 bg-linear-to-br from-indigo-900 to-blue-950 flex flex-col justify-between p-6">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-white/30" />
          <div className="w-3 h-3 rounded-full bg-white/30" />
        </div>
        <div className="space-y-3">
          <div className="h-10 bg-white/10 rounded-lg flex items-center px-3 gap-3">
            <div className="w-6 h-6 rounded-full bg-indigo-500" />
            <div className="h-3 bg-white/20 rounded-xs w-1/2" />
          </div>
          <div className="h-8 bg-white/5 rounded-lg" />
        </div>
      </div>
    ),
  },
  {
    title: "Logistics Tracker App",
    category: "mobile",
    tag: "Flutter / Firebase",
    description: "Aplikasi kurir logistik dengan live GPS tracking dan digital signature proof-of-delivery.",
    color: "from-amber-600/20 to-orange-500/20 text-amber-600 dark:text-amber-400",
    visual: (
      <div className="absolute inset-0 bg-linear-to-br from-amber-900 to-orange-950 flex items-center justify-center p-6">
        {/* Mock Map grid */}
        <div className="w-full h-full border border-white/10 rounded-lg relative overflow-hidden bg-zinc-950/20">
          <div className="absolute w-[150%] h-[1px] bg-white/10 rotate-12 top-10 -left-6" />
          <div className="absolute w-[150%] h-[1px] bg-white/10 -rotate-45 top-20 -left-6" />
          <div className="absolute w-[1px] h-[150%] bg-white/10 top-0 left-16" />
          <div className="absolute w-[1px] h-[150%] bg-white/10 top-0 left-36" />
          <div className="w-4 h-4 rounded-full bg-amber-500 animate-ping absolute top-12 left-14" />
          <div className="w-4 h-4 rounded-full bg-amber-500 absolute top-12 left-14 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-white" />
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Kubernetes Cloud Migration",
    category: "cloud-ai",
    tag: "AWS / Terraform / K8s",
    description: "Migrasi infrastruktur monolitik ke microservices berbasis EKS dengan auto-scaling optimal.",
    color: "from-rose-600/20 to-red-500/20 text-rose-600 dark:text-rose-400",
    visual: (
      <div className="absolute inset-0 bg-linear-to-br from-rose-900 to-red-950 flex items-center justify-center p-6 gap-3">
        <div className="grid grid-cols-3 gap-3 w-full">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="aspect-square bg-white/10 border border-white/20 rounded-md flex items-center justify-center">
              <div className="w-3 h-3 rounded-full bg-rose-400 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredProjects = projects.filter(
    (project) => activeTab === "all" || project.category === activeTab
  );

  return (
    <section
      id="portofolio"
      className="py-24 bg-zinc-50 dark:bg-zinc-900/40 relative overflow-hidden transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Portofolio Terbaru
          </h2>
          <div className="w-16 h-1 bg-linear-to-r from-indigo-500 to-purple-500 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Karya digital inovatif yang kami bangun bersama klien-klien kami untuk memberikan dampak nyata.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-colors focus:outline-none cursor-pointer ${
                activeTab === tab.id
                  ? "text-white"
                  : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              }`}
            >
              {activeTab === tab.id && (
                <motion.span
                  layoutId="activeTabGlow"
                  className="absolute inset-0 bg-orange-600 dark:bg-orange-500 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={project.title}
                className="group rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-950 shadow-xs hover:shadow-lg overflow-hidden flex flex-col h-[400px]"
              >
                {/* Visual Area */}
                <div className="h-48 relative bg-zinc-100 dark:bg-zinc-900 overflow-hidden border-b border-zinc-200/50 dark:border-zinc-800/50">
                  {project.visual}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white text-zinc-950 flex items-center justify-center scale-90 group-hover:scale-100 transition-transform duration-300">
                      <ExternalLink className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Text Area */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-100 dark:bg-zinc-900 text-orange-600 dark:text-orange-400">
                      {project.tag}
                    </span>
                    <h3 className="text-lg font-bold text-zinc-950 dark:text-white tracking-tight group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                  
                  {/* Mock button */}
                  <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-zinc-900 dark:text-zinc-300 group-hover:text-orange-600 dark:group-hover:text-orange-400 cursor-pointer">
                    <span>Lihat Studi Kasus</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
