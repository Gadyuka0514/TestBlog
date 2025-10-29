import React from "react";
import { useNavigate } from "react-router-dom";
import { createArticle } from "../../entities/article/api";

export const NewArticlePage: React.FC = () => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const navigate = useNavigate();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !content) return;
    setSending(true);
    try {
      const created = await createArticle({ title, content });
      navigate(`/articles/${created.id}`);
    } catch (e) {
      // noop
    } finally {
      setSending(false);
    }
  }

  return (
    <div>
      <h2>Новая статья</h2>
      <form onSubmit={submit} className="card">
        <div className="row">
          <label>Заголовок</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Заголовок статьи"
          />
        </div>
        <div className="row">
          <label>Содержимое</label>
          <textarea
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Текст статьи"
          />
        </div>
        <button disabled={sending}>
          {sending ? "Сохранение…" : "Опубликовать"}
        </button>
      </form>
    </div>
  );
};
