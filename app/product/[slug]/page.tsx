import React, { cache } from "react";
import { notFound } from "next/navigation";
import { fetchProductDetailResult } from "@/lib/api";
import ProductDetailClient from "./ProductDetailClient";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const getProduct = cache((slug: string) =>
  fetchProductDetailResult(slug, { cache: "no-store" })
);

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: product } = await getProduct(slug);

  if (!product) {
    const fallbackTitle = slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      title: `${fallbackTitle} | PT. ALLTECHS SOLUSINDO`,
      description: `Dapatkan informasi spesifikasi dan penawaran harga terbaik untuk ${fallbackTitle} dari PT. ALLTECHS SOLUSINDO.`,
    };
  }

  let desc = product.excerpt || "";
  if (!desc && product.content) {
    desc = product.content.replace(/<[^>]*>/g, "").substring(0, 160).trim();
  }
  if (!desc) {
    desc = `${product.title} - Dapatkan solusi pengadaan, instalasi, dan perawatan terbaik dari PT. ALLTECHS SOLUSINDO.`;
  }

  const ogImage = product.image_url || "https://alltechs.co.id/logo-alltechs.png";

  return {
    title: `${product.title} - Distributor Resmi Indonesia | PT. ALLTECHS SOLUSINDO`,
    description: desc,
    openGraph: {
      title: product.title,
      description: desc,
      url: `https://alltechs.co.id/product/${product.slug || product.id}`,
      type: "website",
      images: [
        {
          url: ogImage,
          alt: product.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: desc,
      images: [ogImage],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const { data: product, notFound: isNotFound, failed } = await getProduct(slug);

  if (isNotFound) {
    notFound();
  }

  const brandName =
    product && typeof product.brand === "object"
      ? product.brand.name
      : product?.brand || "Other";

  const productJsonLd = product
    ? {
        "@context": "https://schema.org",
        "@type": "Product",
        name: product.title,
        image: product.image_url || "https://alltechs.co.id/logo-alltechs.png",
        description: product.excerpt || product.title,
        brand: {
          "@type": "Brand",
          name: brandName,
        },
        offers: {
          "@type": "Offer",
          url: `https://alltechs.co.id/product/${product.slug}`,
          priceCurrency: "IDR",
          availability: "https://schema.org/InStock",
          price: "0",
          priceSpecification: {
            "@type": "PriceSpecification",
            price: "0",
            priceCurrency: "IDR",
            valueAddedTaxIncluded: "true",
          },
        },
      }
    : null;

  return (
    <>
      {productJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
        />
      )}
      <ProductDetailClient
        key={slug}
        initialProduct={product}
        slug={slug}
        ssrFailed={failed}
      />
    </>
  );
}
