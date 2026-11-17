import React, { cache } from "react";
import { notFound } from "next/navigation";
import { fetchPromoDetailResult } from "@/lib/api";
import PromoDetailClient from "./PromoDetailClient";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const getPromo = cache((slug: string) =>
  fetchPromoDetailResult(slug, { cache: "no-store" })
);

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: promo } = await getPromo(slug);

  if (!promo) {
    const fallbackTitle = slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      title: `${fallbackTitle} | PT. ALLTECHS SOLUSINDO`,
      description: `Dapatkan paket penawaran promo spesial ${fallbackTitle} dari PT. ALLTECHS SOLUSINDO.`,
    };
  }

  let desc = promo.excerpt || "";
  if (!desc && promo.content) {
    desc = promo.content.replace(/<[^>]*>/g, "").substring(0, 160).trim();
  }
  if (!desc) {
    desc = `${promo.title} - Dapatkan paket penawaran harga promo khusus dari PT. ALLTECHS SOLUSINDO.`;
  }

  const ogImage = promo.image_url || "https://alltechs.co.id/logo-alltechs.png";

  return {
    title: `${promo.title} | PT. ALLTECHS SOLUSINDO`,
    description: desc,
    openGraph: {
      title: promo.title,
      description: desc,
      url: `https://alltechs.co.id/promo/${promo.slug || promo.id}`,
      type: "article",
      images: [
        {
          url: ogImage,
          alt: promo.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: promo.title,
      description: desc,
      images: [ogImage],
    },
  };
}

export default async function PromoDetailPage({ params }: Props) {
  const { slug } = await params;
  const { data: promo, notFound: isNotFound, failed } = await getPromo(slug);

  if (isNotFound) {
    notFound();
  }

  return (
    <PromoDetailClient
      key={slug}
      initialPromo={promo}
      slug={slug}
      ssrFailed={failed}
    />
  );
}
