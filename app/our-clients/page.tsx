import React from "react";
import type { Metadata } from "next";
import OurClientsClient from "./OurClientsClient";

export const metadata: Metadata = {
  title: "Klien & Rekanan Portofolio Proyek | PT. ALLTECHS SOLUSINDO",
  description:
    "Daftar klien dan portofolio proyek sistem PABX, CCTV, Nurse Call, dan Fire Alarm terpercaya dari berbagai sektor: Rumah Sakit, Hotel, Perkantoran, Pemerintah, Pendidikan, dan Retail.",
  keywords: [
    "distributor nursecall aiphone",
    "agen pabx dinstar",
    "dealer pbx dinstar",
    "jasa instalasi nursecall commax",
    "klien alltechs solusindo",
    "portofolio proyek alltechs",
    "rumah sakit hermina commax",
    "PT ALLTECHS SOLUSINDO"
  ],
  alternates: {
    canonical: "https://alltechs.co.id/our-clients",
  },
};

export default function OurClientsPage() {
  return <OurClientsClient />;
}
