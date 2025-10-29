export interface Article {
  id: number;
  title: string;
  content: string;
  created_at: string;
}

export interface Comment {
  id: number;
  article_id: number;
  author_name: string;
  content: string;
  created_at: string;
}
