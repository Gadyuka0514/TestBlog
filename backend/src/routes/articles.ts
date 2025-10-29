import { Router, Request, Response } from "express";
import db from "../db";
import { Article, Comment } from "../types";

const router = Router();

// GET /api/articles - list articles
router.get("/", async (_req: Request, res: Response) => {
  try {
    const articles: Article[] = await db<Article>("articles")
      .select("id", "title", "content", "created_at")
      .orderBy("created_at", "desc");
    res.json({ data: articles });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch articles" });
  }
});

// GET /api/articles/:id - single article with comments
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const article = await db<Article>("articles")
      .select("id", "title", "content", "created_at")
      .where({ id: Number(id) })
      .first();
    if (!article) return res.status(404).json({ error: "Article not found" });

    const comments: Omit<Comment, "article_id">[] = await db<Comment>(
      "comments"
    )
      .select("id", "author_name", "content", "created_at")
      .where({ article_id: Number(id) })
      .orderBy("created_at", "asc");

    res.json({ data: { ...article, comments } });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch article" });
  }
});

// POST /api/articles - create article
router.post("/", async (req: Request, res: Response) => {
  const { title, content } = req.body || {};
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }
  try {
    const [inserted] = await db<Article>("articles")
      .insert({ title, content })
      .returning(["id", "title", "content", "created_at"]);
    res.status(201).json({ data: inserted });
  } catch (err) {
    res.status(500).json({ error: "Failed to create article" });
  }
});

// POST /api/articles/:id/comments - add comment
router.post("/:id/comments", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { author_name, content } = req.body || {};
  if (!author_name || !content) {
    return res
      .status(400)
      .json({ error: "author_name and content are required" });
  }
  try {
    const exists = await db<Article>("articles")
      .where({ id: Number(id) })
      .first();
    if (!exists) return res.status(404).json({ error: "Article not found" });

    const [inserted] = await db<Comment>("comments")
      .insert({ article_id: Number(id), author_name, content })
      .returning(["id", "article_id", "author_name", "content", "created_at"]);
    res.status(201).json({ data: inserted });
  } catch (err) {
    res.status(500).json({ error: "Failed to add comment" });
  }
});

export default router;
