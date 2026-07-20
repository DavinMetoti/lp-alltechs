import React from "react";
import Hero, { JumbotronItem } from "@/components/sections/Hero";
import CompanyOverview from "@/components/sections/CompanyOverview";
import ServicesProduct from "@/components/sections/ServicesProduct";
import BestProducts from "@/components/sections/BestProducts";
import FAQ from "@/components/sections/FAQ";

export default function MainContent({ jumbotrons = [] }: { jumbotrons?: JumbotronItem[] }) {
  return (
    <main className="flex-1">
      <Hero jumbotrons={jumbotrons} />
      <CompanyOverview />
      <ServicesProduct />
      <BestProducts />
      <FAQ />
    </main>
  );
}
