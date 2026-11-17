export interface ArticleItem {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  image?: string;
  image_url?: string;
  category?: string;
  author?: string;
  published_at?: string;
  created_at: string;
  updated_at?: string;
}

export interface CategoryItem {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  image_url?: string;
}

export interface ProductBrandCategory {
  id?: number;
  name?: string;
  slug?: string;
}

export interface ProductBrand {
  id: number;
  name: string;
  category?: ProductBrandCategory | string;
}

export interface ProductItem {
  id: number;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  image?: string;
  image_url?: string;
  category?: string | { id: number; name: string; slug?: string };
  brand?: string | ProductBrand;
  wa_text?: string;
  created_at?: string;
  updated_at?: string;
}

export interface JumbotronApiItem {
  id: number | string;
  welcome_text?: string;
  heading: string;
  sub_heading?: string;
  image?: string;
  image_url?: string;
  position?: string;
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number | null;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number | null;
  total: number;
}

export interface DetailFetchResult<T> {
  data: T | null;
  notFound: boolean;
  failed: boolean;
}

export const CMS_ORIGIN = "https://cms.alltechs.co.id";
export const DEFAULT_CMS_API_URL = `${CMS_ORIGIN}/api/`;
export const DEFAULT_CMS_API_KEY = "at_key_80ca892ab367ba187ba39d85647c0f70a67bd169b13be651";

const SERVER_FETCH_TIMEOUT_MS = 4000;
const CLIENT_FETCH_TIMEOUT_MS = 12000;
const SERVER_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

const CATEGORY_SLUG_ALIASES: Record<string, string> = {
  pabx: "pbx",
  "fire-alarm-system": "fire-alarm",
};

export function normalizeCategorySlug(slug?: string): string | undefined {
  if (!slug) return undefined;
  const trimmed = slug.trim().toLowerCase();
  if (!trimmed) return undefined;
  return CATEGORY_SLUG_ALIASES[trimmed] || trimmed;
}

export function normalizeCmsImageUrl(imageUrl?: string, image?: string): string | undefined {
  if (imageUrl) return imageUrl;
  if (!image) return undefined;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  return `${CMS_ORIGIN}/${image.replace(/^\//, "")}`;
}

export function getCmsApiConfig(): { cleanBase: string; apiKey: string } {
  const isServer = typeof window === "undefined";
  const rawBase = isServer
    ? process.env.NEXT_API_URL || process.env.NEXT_PUBLIC_API_URL || DEFAULT_CMS_API_URL
    : process.env.NEXT_PUBLIC_API_URL || DEFAULT_CMS_API_URL;
  const apiKey = isServer
    ? process.env.NEXT_API_KEY || process.env.NEXT_PUBLIC_API_KEY || DEFAULT_CMS_API_KEY
    : process.env.NEXT_PUBLIC_API_KEY || DEFAULT_CMS_API_KEY;

  const cleanBase = rawBase.endsWith("/") ? rawBase : `${rawBase}/`;
  return { cleanBase, apiKey };
}

type CmsFetchOptions = RequestInit & {
  timeoutMs?: number;
  next?: { revalidate?: number | false; tags?: string[] };
};

export async function cmsFetch(endpoint: string, options: CmsFetchOptions = {}): Promise<Response> {
  const { cleanBase, apiKey } = getCmsApiConfig();
  const isServer = typeof window === "undefined";
  const { timeoutMs = isServer ? SERVER_FETCH_TIMEOUT_MS : CLIENT_FETCH_TIMEOUT_MS, headers, ...rest } = options;

  const mergedHeaders: Record<string, string> = {
    "X-Api-Key": apiKey,
    Accept: "application/json",
    ...(isServer ? { "User-Agent": SERVER_USER_AGENT } : {}),
  };

  if (headers) {
    const extra = new Headers(headers);
    extra.forEach((value, key) => {
      mergedHeaders[key] = value;
    });
  }

  return fetch(`${cleanBase}${endpoint.replace(/^\//, "")}`, {
    ...rest,
    headers: mergedHeaders,
    signal: rest.signal || AbortSignal.timeout(timeoutMs),
  });
}

function normalizeArticleItem(item: ArticleItem): ArticleItem {
  return {
    ...item,
    image_url: normalizeCmsImageUrl(item.image_url, item.image),
  };
}

function normalizeProductItem(item: ProductItem): ProductItem {
  return {
    ...item,
    image_url: normalizeCmsImageUrl(item.image_url, item.image),
  };
}

export function extractCategoryNameFromProduct(item?: ProductItem): string {
  if (!item) return "";
  if (item.brand && typeof item.brand === "object" && item.brand.category) {
    const catObj = item.brand.category;
    if (typeof catObj === "object" && catObj.name) return catObj.name;
    if (typeof catObj === "string") return catObj;
  }
  if (item.category) {
    if (typeof item.category === "object" && item.category.name) return item.category.name;
    if (typeof item.category === "string") return item.category;
  }
  return "";
}

export async function fetchProductsCatalog(
  rawCategoryParam?: string,
  limit = 500,
  options: CmsFetchOptions = {}
): Promise<{ products: ProductItem[]; categoryName: string; failed: boolean }> {
  const normalizedCategory = normalizeCategorySlug(rawCategoryParam);
  const endpoint = normalizedCategory
    ? `v1/products?category=${encodeURIComponent(normalizedCategory)}&per_page=${limit}`
    : `v1/products?per_page=${limit}`;

  try {
    const res = await cmsFetch(endpoint, options);
    if (!res.ok) {
      console.error("Failed to fetch products catalog:", res.status, res.statusText);
      return { products: [], categoryName: "", failed: true };
    }

    const json = await res.json();
    const rawList = json?.data?.data || json?.data || [];
    const products: ProductItem[] = Array.isArray(rawList)
      ? rawList.map((item: ProductItem) => normalizeProductItem(item))
      : [];

    let categoryName = "";
    if (normalizedCategory) {
      if (products.length > 0) {
        categoryName = extractCategoryNameFromProduct(products[0]);
      } else {
        try {
          const catRes = await cmsFetch(`v1/categories/${encodeURIComponent(normalizedCategory)}`, {
            ...options,
            timeoutMs: 3000,
          });
          if (catRes.ok) {
            const catJson = await catRes.json();
            if (catJson?.data?.name) {
              categoryName = catJson.data.name;
            }
          }
        } catch {
          // Ignore secondary category name lookup error
        }
      }
    }

    return { products, categoryName, failed: false };
  } catch (error) {
    console.error("Error fetching products catalog:", error);
    return { products: [], categoryName: "", failed: true };
  }
}

export async function fetchArticlesList(
  limit = 100,
  options: CmsFetchOptions = {}
): Promise<{ items: ArticleItem[]; failed: boolean }> {
  try {
    const res = await cmsFetch(`v1/articles?per_page=${limit}`, options);
    if (!res.ok) {
      console.error("Failed to fetch articles list:", res.status, res.statusText);
      return { items: [], failed: true };
    }
    const json = await res.json();
    const rawList = json?.data?.data || json?.data || [];
    const items = Array.isArray(rawList)
      ? rawList.map((item: ArticleItem) => normalizeArticleItem(item))
      : [];
    return { items, failed: false };
  } catch (error) {
    console.error("Error fetching articles list:", error);
    return { items: [], failed: true };
  }
}

export async function fetchNewsList(
  limit = 100,
  options: CmsFetchOptions = {}
): Promise<{ items: ArticleItem[]; failed: boolean }> {
  try {
    const res = await cmsFetch(`v1/news?per_page=${limit}`, options);
    if (!res.ok) {
      console.error("Failed to fetch news list:", res.status, res.statusText);
      return { items: [], failed: true };
    }
    const json = await res.json();
    const rawList = json?.data?.data || json?.data || [];
    const items = Array.isArray(rawList)
      ? rawList.map((item: ArticleItem) => normalizeArticleItem(item))
      : [];
    return { items, failed: false };
  } catch (error) {
    console.error("Error fetching news list:", error);
    return { items: [], failed: true };
  }
}

export async function fetchPromosList(
  limit = 100,
  options: CmsFetchOptions = {}
): Promise<{ items: ArticleItem[]; failed: boolean }> {
  try {
    const res = await cmsFetch(`v1/promos?per_page=${limit}`, options);
    if (!res.ok) {
      console.error("Failed to fetch promos list:", res.status, res.statusText);
      return { items: [], failed: true };
    }
    const json = await res.json();
    const rawList = json?.data?.data || json?.data || [];
    const items = Array.isArray(rawList)
      ? rawList.map((item: ArticleItem) => normalizeArticleItem(item))
      : [];
    return { items, failed: false };
  } catch (error) {
    console.error("Error fetching promos list:", error);
    return { items: [], failed: true };
  }
}

export async function fetchJumbotronsList(
  options: CmsFetchOptions = {}
): Promise<{ items: JumbotronApiItem[]; failed: boolean }> {
  try {
    const res = await cmsFetch("v1/jumbotrons?per_page=all", options);
    if (!res.ok) {
      return { items: [], failed: true };
    }
    const json = await res.json();
    const rawList = json?.data?.data || json?.data || [];
    const items: JumbotronApiItem[] = Array.isArray(rawList)
      ? rawList.map((item: JumbotronApiItem) => ({
          ...item,
          image_url: normalizeCmsImageUrl(item.image_url, item.image),
        }))
      : [];
    return { items, failed: false };
  } catch (error) {
    console.error("Failed to fetch jumbotrons from CMS:", error);
    return { items: [], failed: true };
  }
}

export async function fetchArticles(page = 1, search = ""): Promise<PaginatedResponse<ArticleItem> | null> {
  const queryParams = new URLSearchParams({
    page: page.toString(),
    per_page: "6",
  });
  if (search) queryParams.append("search", search);

  try {
    const res = await cmsFetch(`v1/articles?${queryParams.toString()}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error("Failed to fetch articles:", res.status, res.statusText);
      return null;
    }

    const json = await res.json();
    return json.data || null;
  } catch (error) {
    console.error("Error fetching articles:", error);
    return null;
  }
}

export async function fetchArticleDetailResult(
  slugOrId: string,
  options: CmsFetchOptions = {}
): Promise<DetailFetchResult<ArticleItem>> {
  try {
    const res = await cmsFetch(`v1/articles/${encodeURIComponent(slugOrId)}`, options);
    if (res.status === 404) {
      return { data: null, notFound: true, failed: false };
    }
    if (!res.ok) {
      console.error("Failed to fetch article detail:", res.status, res.statusText);
      return { data: null, notFound: false, failed: true };
    }
    const json = await res.json();
    const item: ArticleItem | null = json?.data ? normalizeArticleItem(json.data) : null;
    return { data: item, notFound: !item, failed: false };
  } catch (error) {
    console.error("Error fetching article detail:", error);
    return { data: null, notFound: false, failed: true };
  }
}

export async function fetchArticleBySlug(slugOrId: string): Promise<ArticleItem | null> {
  const result = await fetchArticleDetailResult(slugOrId, { next: { revalidate: 3600 } });
  return result.data;
}

export async function fetchNews(page = 1, limit = 12): Promise<PaginatedResponse<ArticleItem> | null> {
  try {
    const res = await cmsFetch(`v1/news?page=${page}&per_page=${limit}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error("Failed to fetch news:", res.status, res.statusText);
      return null;
    }

    const json = await res.json();
    return json.data || null;
  } catch (error) {
    console.error("Error fetching news:", error);
    return null;
  }
}

export async function fetchNewsDetailResult(
  slugOrId: string,
  options: CmsFetchOptions = {}
): Promise<DetailFetchResult<ArticleItem>> {
  try {
    const res = await cmsFetch(`v1/news/${encodeURIComponent(slugOrId)}`, options);
    if (res.status === 404) {
      return { data: null, notFound: true, failed: false };
    }
    if (!res.ok) {
      console.error("Failed to fetch news detail:", res.status, res.statusText);
      return { data: null, notFound: false, failed: true };
    }
    const json = await res.json();
    const item: ArticleItem | null = json?.data ? normalizeArticleItem(json.data) : null;
    return { data: item, notFound: !item, failed: false };
  } catch (error) {
    console.error("Error fetching news detail:", error);
    return { data: null, notFound: false, failed: true };
  }
}

export async function fetchNewsBySlug(slugOrId: string): Promise<ArticleItem | null> {
  const result = await fetchNewsDetailResult(slugOrId, { next: { revalidate: 3600 } });
  return result.data;
}

export async function fetchPromos(page = 1, limit = 12): Promise<PaginatedResponse<ArticleItem> | null> {
  try {
    const res = await cmsFetch(`v1/promos?page=${page}&per_page=${limit}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error("Failed to fetch promos:", res.status, res.statusText);
      return null;
    }

    const json = await res.json();
    return json.data || null;
  } catch (error) {
    console.error("Error fetching promos:", error);
    return null;
  }
}

export async function fetchPromoDetailResult(
  slugOrId: string,
  options: CmsFetchOptions = {}
): Promise<DetailFetchResult<ArticleItem>> {
  try {
    const res = await cmsFetch(`v1/promos/${encodeURIComponent(slugOrId)}`, options);
    if (res.status === 404) {
      return { data: null, notFound: true, failed: false };
    }
    if (!res.ok) {
      console.error("Failed to fetch promo detail:", res.status, res.statusText);
      return { data: null, notFound: false, failed: true };
    }
    const json = await res.json();
    const item: ArticleItem | null = json?.data ? normalizeArticleItem(json.data) : null;
    return { data: item, notFound: !item, failed: false };
  } catch (error) {
    console.error("Error fetching promo detail:", error);
    return { data: null, notFound: false, failed: true };
  }
}

export async function fetchPromoBySlug(slugOrId: string): Promise<ArticleItem | null> {
  const result = await fetchPromoDetailResult(slugOrId, { next: { revalidate: 3600 } });
  return result.data;
}

export async function fetchProductDetailResult(
  slugOrId: string,
  options: CmsFetchOptions = {}
): Promise<DetailFetchResult<ProductItem>> {
  try {
    const res = await cmsFetch(`v1/products/${encodeURIComponent(slugOrId)}`, options);
    if (res.status === 404) {
      return { data: null, notFound: true, failed: false };
    }
    if (!res.ok) {
      console.error("Failed to fetch product detail:", res.status, res.statusText);
      return { data: null, notFound: false, failed: true };
    }
    const json = await res.json();
    const item: ProductItem | null = json?.data ? normalizeProductItem(json.data) : null;
    return { data: item, notFound: !item, failed: false };
  } catch (error) {
    console.error("Error fetching product detail:", error);
    return { data: null, notFound: false, failed: true };
  }
}

export async function fetchProductBySlug(slugOrId: string): Promise<ProductItem | null> {
  const result = await fetchProductDetailResult(slugOrId, { next: { revalidate: 3600 } });
  return result.data;
}

export async function fetchAllProductsLimit(limit = 500): Promise<ProductItem[]> {
  const { products } = await fetchProductsCatalog(undefined, limit, {
    next: { revalidate: 3600 },
  });
  return products;
}
