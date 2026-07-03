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
}

export interface CategoryItem {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  image_url?: string;
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

export async function fetchArticles(page = 1, search = ""): Promise<PaginatedResponse<ArticleItem> | null> {
  const baseUrl = process.env.NEXT_API_URL || "https://cms.alltechs.co.id/api/";
  const cleanBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  const queryParams = new URLSearchParams({
    page: page.toString(),
    per_page: "6",
  });
  if (search) queryParams.append("search", search);

  const url = `${cleanBase}v1/articles?${queryParams.toString()}`;
  const apiKey = process.env.NEXT_API_KEY || "";

  try {
    const res = await fetch(url, {
      headers: {
        "X-Api-Key": apiKey,
        Accept: "application/json",
      },
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

export async function fetchArticleBySlug(slugOrId: string): Promise<ArticleItem | null> {
  const baseUrl = process.env.NEXT_API_URL || "https://cms.alltechs.co.id/api/";
  const cleanBase = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  const url = `${cleanBase}v1/articles/${slugOrId}`;
  const apiKey = process.env.NEXT_API_KEY || "";

  try {
    const res = await fetch(url, {
      headers: {
        "X-Api-Key": apiKey,
        Accept: "application/json",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error("Failed to fetch article detail:", res.status, res.statusText);
      return null;
    }

    const json = await res.json();
    return json.data || null;
  } catch (error) {
    console.error("Error fetching article detail:", error);
    return null;
  }
}
