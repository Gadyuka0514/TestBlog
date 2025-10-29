import { apiPost } from "../../shared/api/client";

export interface CommentDto {
  id: number;
  article_id: number;
  author_name: string;
  content: string;
  created_at: string;
}

export const createComment = (
  articleId: string | number,
  payload: { author_name: string; content: string }
) =>
  apiPost<{ data: CommentDto }>(
    `/articles/${articleId}/comments`,
    payload
  ).then((r) => r.data);
