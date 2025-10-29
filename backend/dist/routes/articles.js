"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = __importDefault(require("../db"));
const router = (0, express_1.Router)();
// GET /api/articles - list articles
router.get("/", async (_req, res) => {
    try {
        const articles = await (0, db_1.default)("articles")
            .select("id", "title", "content", "created_at")
            .orderBy("created_at", "desc");
        res.json({ data: articles });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch articles" });
    }
});
// GET /api/articles/:id - single article with comments
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const article = await (0, db_1.default)("articles")
            .select("id", "title", "content", "created_at")
            .where({ id: Number(id) })
            .first();
        if (!article)
            return res.status(404).json({ error: "Article not found" });
        const comments = await (0, db_1.default)("comments")
            .select("id", "author_name", "content", "created_at")
            .where({ article_id: Number(id) })
            .orderBy("created_at", "asc");
        res.json({ data: { ...article, comments } });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch article" });
    }
});
// POST /api/articles - create article
router.post("/", async (req, res) => {
    const { title, content } = req.body || {};
    if (!title || !content) {
        return res.status(400).json({ error: "Title and content are required" });
    }
    try {
        const [inserted] = await (0, db_1.default)("articles")
            .insert({ title, content })
            .returning(["id", "title", "content", "created_at"]);
        res.status(201).json({ data: inserted });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to create article" });
    }
});
// POST /api/articles/:id/comments - add comment
router.post("/:id/comments", async (req, res) => {
    const { id } = req.params;
    const { author_name, content } = req.body || {};
    if (!author_name || !content) {
        return res
            .status(400)
            .json({ error: "author_name and content are required" });
    }
    try {
        const exists = await (0, db_1.default)("articles")
            .where({ id: Number(id) })
            .first();
        if (!exists)
            return res.status(404).json({ error: "Article not found" });
        const [inserted] = await (0, db_1.default)("comments")
            .insert({ article_id: Number(id), author_name, content })
            .returning(["id", "article_id", "author_name", "content", "created_at"]);
        res.status(201).json({ data: inserted });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to add comment" });
    }
});
exports.default = router;
