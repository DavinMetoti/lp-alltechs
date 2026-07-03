"use client";

import React from "react";
import {
  Globe,
  Smartphone,
  Cloud,
  Cpu,
  Shield,
  Palette,
  ArrowRight,
} from "lucide-react";
import { motion } from "motion/react";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Pengembangan website custom yang cepat, aman, responsif, dan SEO-friendly. Mulai dari landing page, corporate website, hingga platform e-commerce kompleks.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Smartphone,
    title: "Mobile App Engineering",
    description:
      "Pembuatan aplikasi mobile native (iOS & Android) maupun cross-platform (Flutter & React Native) dengan desain antarmuka modern dan performa tinggi.",
    color: "from-purple-500 to-indigo-500",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description:
      "Migrasi cloud, manajemen server, dan setup otomatisasi CI/CD pipelines pada platform AWS, GCP, maupun Azure untuk memastikan sistem yang scalable.",
    color: "from-indigo-500 to-pink-500",
  },
  {
    icon: Cpu,
    title: "AI & ML Integration",
    description:
      "Mengintegrasikan kecerdasan buatan (AI) dan machine learning seperti Chatbot pintar, automasi data, hingga analisis prediktif ke dalam ekosistem bisnis Anda.",
    color: "from-pink-500 to-rose-500",
  },
  {
    icon: Shield,
    title: "Cyber Security",
    description:
      "Audit keamanan sistem, penetration testing, serta implementasi standar keamanan data tingkat tinggi untuk meminimalkan risiko kerentanan digital.",
    color: "from-rose-500 to-amber-500",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Riset pengguna, pembuatan wireframe, prototyping, dan desain visual antarmuka premium untuk menghadirkan pengalaman pengguna yang luar biasa.",
    color: "from-amber-500 to-emerald-500",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Services() {
  return (
    <section
      id="layanan"
      className="pt-32 pb-24 bg-white relative overflow-hidden transition-colors duration-300"
    >
      {/* Decorative background gradients */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-18">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950 dark:text-white">
            Layanan Unggulan Kami
          </h2>
          <div className="w-16 h-1 bg-linear-to-r from-orange-500 to-amber-500 mx-auto mt-4 rounded-full" />
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Kami menghadirkan solusi teknologi digital terintegrasi kelas dunia untuk membantu bisnis Anda bersaing dan memimpin pasar.
          </p>
        </div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={cardVariants}
                className="group relative rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 bg-white dark:bg-zinc-950 p-8 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between hover:-translate-y-1"
              >
                <div>
                  {/* Glowing hover border background effect */}
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-orange-500/10 to-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-900 flex items-center justify-center text-zinc-800 dark:text-zinc-200 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden">
                    {/* Tiny gradient overlay on hover */}
                    <div className={`absolute inset-0 bg-linear-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                    <IconComponent className="w-6 h-6 relative z-10" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white mt-6 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mt-3">
                    {service.description}
                  </p>
                </div>

                {/* Learn More link */}
                <div className="mt-8 pt-4 border-t border-zinc-100 dark:border-zinc-900/50 flex items-center gap-1.5 text-sm font-semibold text-zinc-900 hover:text-orange-600 dark:text-zinc-300 dark:hover:text-orange-400 cursor-pointer">
                  <span>Pelajari Selengkapnya</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
