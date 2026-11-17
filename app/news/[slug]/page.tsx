import React, { cache } from "react";
import { notFound } from "next/navigation";
import { fetchNewsDetailResult } from "@/lib/api";
import { DUMMY_NEWS } from "../NewsClient";
import NewsDetailClient from "./NewsDetailClient";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const getNewsDetail = cache(async (slug: string) => {
  const res = await fetchNewsDetailResult(slug, { cache: "no-store" });
  if (res.notFound) {
    const dummy = DUMMY_NEWS.find(
      (item) => item.slug === slug || String(item.id) === slug
    );
    if (dummy) {
      return { data: dummy, notFound: false, failed: false };
    }
  }
  return res;
});

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: news } = await getNewsDetail(slug);

  if (!news) {
    const fallbackTitle = slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      title: `${fallbackTitle} | PT. ALLTECHS SOLUSINDO`,
      description: `Dapatkan update berita terbaru mengenai ${fallbackTitle} dari PT. ALLTECHS SOLUSINDO.`,
    };
  }

  let desc = news.excerpt || "";
  if (!desc && news.content) {
    desc = news.content.replace(/<[^>]*>/g, "").substring(0, 160).trim();
  }
  if (!desc) {
    desc = `${news.title} - Dapatkan update berita terbaru seputar telekomunikasi dari PT. ALLTECHS SOLUSINDO.`;
  }

  const ogImage = news.image_url || "https://alltechs.co.id/logo-alltechs.png";

  return {
    title: `${news.title} | PT. ALLTECHS SOLUSINDO`,
    description: desc,
    openGraph: {
      title: news.title,
      description: desc,
      url: `https://alltechs.co.id/news/${news.slug || news.id}`,
      type: "article",
      images: [
        {
          url: ogImage,
          alt: news.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: news.title,
      description: desc,
      images: [ogImage],
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const { data: news, notFound: isNotFound, failed } = await getNewsDetail(slug);

  if (isNotFound) {
    notFound();
  }

  const newsJsonLd = news
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: news.title,
        description: news.excerpt || news.title,
        image: [news.image_url || "https://alltechs.co.id/logo-alltechs.png"],
        datePublished: news.published_at || news.created_at,
        dateModified: news.updated_at || news.published_at || news.created_at,
        author: {
          "@type": "Person",
          name: news.author || "Tim PT. ALLTECHS SOLUSINDO",
        },
        publisher: {
          "@type": "Organization",
          name: "PT. ALLTECHS SOLUSINDO",
          logo: {
            "@type": "ImageObject",
            url: "https://alltechs.co.id/logo-alltechs.png",
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://alltechs.co.id/news/${news.slug || news.id}`,
        },
      }
    : null;

  return (
    <>
      {newsJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(newsJsonLd) }}
        />
      )}
      <NewsDetailClient
        key={slug}
        initialNews={news}
        slug={slug}
        ssrFailed={failed}
      />
    </>
  );
}
