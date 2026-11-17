import React, { cache } from "react";
import { notFound } from "next/navigation";
import { fetchArticleDetailResult } from "@/lib/api";
import ArticleDetailClient from "./ArticleDetailClient";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

const getArticle = cache((slug: string) =>
  fetchArticleDetailResult(slug, { cache: "no-store" })
);

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data: article } = await getArticle(slug);

  if (!article) {
    const fallbackTitle = slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      title: `${fallbackTitle} | PT. ALLTECHS SOLUSINDO`,
      description: `Baca artikel selengkapnya mengenai ${fallbackTitle} dari PT. ALLTECHS SOLUSINDO.`,
    };
  }

  let desc = article.excerpt || "";
  if (!desc && article.content) {
    desc = article.content.replace(/<[^>]*>/g, "").substring(0, 160).trim();
  }
  if (!desc) {
    desc = `${article.title} - Dapatkan solusi instalasi & pengadaan terpercaya dari PT. ALLTECHS SOLUSINDO.`;
  }

  const ogImage = article.image_url || "https://alltechs.co.id/logo-alltechs.png";

  return {
    title: `${article.title} | PT. ALLTECHS SOLUSINDO`,
    description: desc,
    openGraph: {
      title: article.title,
      description: desc,
      url: `https://alltechs.co.id/artikel/${article.slug || article.id}`,
      type: "article",
      images: [
        {
          url: ogImage,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: desc,
      images: [ogImage],
    },
  };
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params;
  const { data: article, notFound: isNotFound, failed } = await getArticle(slug);

  if (isNotFound) {
    notFound();
  }

  const articleJsonLd = article
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: article.title,
        description: article.excerpt || article.title,
        image: [article.image_url || "https://alltechs.co.id/logo-alltechs.png"],
        datePublished: article.published_at || article.created_at,
        dateModified: article.updated_at || article.published_at || article.created_at,
        author: {
          "@type": "Person",
          name: article.author || "Admin PT. ALLTECHS SOLUSINDO",
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
          "@id": `https://alltechs.co.id/artikel/${article.slug || article.id}`,
        },
      }
    : null;

  return (
    <>
      {articleJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
      )}
      <ArticleDetailClient
        key={slug}
        initialArticle={article}
        slug={slug}
        ssrFailed={failed}
      />
    </>
  );
}
