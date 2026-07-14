import React from "react";
import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Hubungi Kami - Konsultasi PABX & Security System | PT. ALLTECHS SOLUSINDO",
  description:
    "Hubungi tim teknisi PT. ALLTECHS SOLUSINDO untuk konsultasi gratis, pemesanan, instalasi, dan perbaikan sistem PABX, CCTV, Nurse Call, dan Fire Alarm.",
  keywords: [
    "distributor nursecall aiphone",
    "agen pabx dinstar",
    "dealer pbx dinstar",
    "jasa instalasi nursecall commax",
    "kontak alltechs solusindo",
    "alamat alltechs solusindo",
    "nomor telepon alltechs solusindo",
    "PT ALLTECHS SOLUSINDO"
  ],
  alternates: {
    canonical: "https://alltechs.co.id/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
