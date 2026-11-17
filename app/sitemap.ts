import { MetadataRoute } from "next";
import {
  fetchArticlesList,
  fetchNewsList,
  fetchPromosList,
  fetchProductsCatalog,
} from "@/lib/api";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://alltechs.co.id";

  const routes = [
    "",
    "/artikel",
    "/news",
    "/promo",
    "/contact",
    "/gallery",
    "/our-clients",
    "/owner",
    "/product",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const dynamicRoutes: MetadataRoute.Sitemap = [];

  try {
    const [articlesRes, newsRes, promosRes, productsRes] = await Promise.allSettled([
      fetchArticlesList(100, { next: { revalidate: 3600 } }),
      fetchNewsList(100, { next: { revalidate: 3600 } }),
      fetchPromosList(100, { next: { revalidate: 3600 } }),
      fetchProductsCatalog(undefined, 500, { next: { revalidate: 3600 } }),
    ]);

    if (articlesRes.status === "fulfilled") {
      articlesRes.value.items.forEach((item) => {
        if (item.slug) {
          dynamicRoutes.push({
            url: `${baseUrl}/artikel/${item.slug}`,
            lastModified: new Date(item.updated_at || item.created_at || new Date()),
            changeFrequency: "monthly",
            priority: 0.6,
          });
        }
      });
    }

    if (newsRes.status === "fulfilled") {
      newsRes.value.items.forEach((item) => {
        if (item.slug) {
          dynamicRoutes.push({
            url: `${baseUrl}/news/${item.slug}`,
            lastModified: new Date(item.updated_at || item.created_at || new Date()),
            changeFrequency: "monthly",
            priority: 0.6,
          });
        }
      });
    }

    if (promosRes.status === "fulfilled") {
      promosRes.value.items.forEach((item) => {
        if (item.slug) {
          dynamicRoutes.push({
            url: `${baseUrl}/promo/${item.slug}`,
            lastModified: new Date(item.updated_at || item.created_at || new Date()),
            changeFrequency: "monthly",
            priority: 0.6,
          });
        }
      });
    }

    if (productsRes.status === "fulfilled") {
      productsRes.value.products.forEach((item) => {
        if (item.slug) {
          dynamicRoutes.push({
            url: `${baseUrl}/product/${item.slug}`,
            lastModified: new Date(item.updated_at || item.created_at || new Date()),
            changeFrequency: "weekly",
            priority: 0.7,
          });
        }
      });
    }
  } catch (error) {
    console.error("Error generating dynamic sitemap routes:", error);
  }

  return [...routes, ...dynamicRoutes];
}
