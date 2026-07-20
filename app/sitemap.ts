import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://alltechs.co.id";

  // Static routes
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

  const dynamicRoutes: Array<{
    url: string;
    lastModified: Date;
    changeFrequency: "weekly" | "monthly" | "yearly" | "always" | "hourly" | "daily" | "never" | undefined;
    priority: number;
  }> = [];

  try {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "https://cms.alltechs.co.id/api/";
    const cleanBase = apiBase.endsWith("/") ? apiBase : `${apiBase}/`;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY || "at_key_80ca892ab367ba187ba39d85647c0f70a67bd169b13be651";

    const [articlesRes, newsRes, promosRes, productsRes] = await Promise.all([
      fetch(`${cleanBase}v1/articles?per_page=100`, { headers: { "X-Api-Key": apiKey } }).then((r) => (r.ok ? r.json() : null)),
      fetch(`${cleanBase}v1/news?per_page=100`, { headers: { "X-Api-Key": apiKey } }).then((r) => (r.ok ? r.json() : null)),
      fetch(`${cleanBase}v1/promos?per_page=100`, { headers: { "X-Api-Key": apiKey } }).then((r) => (r.ok ? r.json() : null)),
      fetch(`${cleanBase}v1/products?per_page=500`, { headers: { "X-Api-Key": apiKey } }).then((r) => (r.ok ? r.json() : null)),
    ]);

    const articles = articlesRes?.data?.data || articlesRes?.data || [];
    const news = newsRes?.data?.data || newsRes?.data || [];
    const promos = promosRes?.data?.data || promosRes?.data || [];
    const products = productsRes?.data?.data || productsRes?.data || [];

    if (Array.isArray(articles)) {
      articles.forEach((item: any) => {
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

    if (Array.isArray(news)) {
      news.forEach((item: any) => {
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

    if (Array.isArray(promos)) {
      promos.forEach((item: any) => {
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

    if (Array.isArray(products)) {
      products.forEach((item: any) => {
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
