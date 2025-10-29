import { apiGet, apiPost } from "../../shared/api/client";

export interface ArticleDto {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

export interface ArticleWithCommentsDto extends ArticleDto {
  comments: Array<{
    id: number;
    author_name: string;
    content: string;
    created_at: string;
  }>;
}

export const fetchArticles = () =>
  apiGet<{ data: ArticleDto[] }>("/articles").then((r) => r.data);
export const fetchArticle = (id: string | number) =>
  apiGet<{ data: ArticleWithCommentsDto }>(`/articles/${id}`).then(
    (r) => r.data
  );
export const createArticle = (payload: { title: string; content: string }) =>
  apiPost<{ data: ArticleDto }>("/articles", payload).then((r) => r.data);
