import React from "react";
import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Galeri Foto Dokumentasi & Kegiatan Lapangan | PT. ALLTECHS SOLUSINDO",
  description:
    "Lihat galeri foto dokumentasi instalasi perangkat telekomunikasi, pengerjaan proyek di lapangan, dan aktivitas tim teknisi profesional PT. ALLTECHS SOLUSINDO.",
  keywords: [
    "distributor nursecall aiphone",
    "agen pabx dinstar",
    "dealer pbx dinstar",
    "jasa instalasi nursecall commax",
    "galeri foto alltechs solusindo",
    "dokumentasi proyek alltechs",
    "teknisi lapangan alltechs",
    "PT ALLTECHS SOLUSINDO"
  ],
  alternates: {
    canonical: "https://alltechs.co.id/gallery",
  },
};

export default function GalleryPage() {
  return <GalleryClient />;
}
