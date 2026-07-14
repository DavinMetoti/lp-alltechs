import React from "react";
import type { Metadata } from "next";
import OwnerClient from "./OwnerClient";

export const metadata: Metadata = {
  title: "Profil Direktur Hartono | PT. ALLTECHS SOLUSINDO",
  description:
    "Profil Hartono sebagai Direktur Utama PT. ALLTECHS SOLUSINDO. Pelajari visi, misi, dan komitmen profesional dalam memberikan layanan telekomunikasi terbaik bagi bisnis Anda.",
  keywords: [
    "distributor nursecall aiphone",
    "agen pabx dinstar",
    "dealer pbx dinstar",
    "jasa instalasi nursecall commax",
    "profil direktur alltechs",
    "hartono alltechs",
    "owner alltechs solusindo",
    "PT ALLTECHS SOLUSINDO"
  ],
  alternates: {
    canonical: "https://alltechs.co.id/owner",
  },
};

export default function OwnerPage() {
  return <OwnerClient />;
}
