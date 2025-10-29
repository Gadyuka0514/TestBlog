import React from "react";
import { useParams } from "react-router-dom";
import {
  fetchArticle,
  ArticleWithCommentsDto,
} from "../../entities/article/api";
import { createComment } from "../../entities/comment/api";

function useAsyncFactory<T>(
  factory: () => Promise<T>,
  deps: React.DependencyList = []
) {
  const [state, setState] = React.useState<{
    loading: boolean;
    data: T | null;
    error: unknown;
  }>({ loading: true, data: null, error: null });
  const run = React.useCallback(() => {
    setState({ loading: true, data: null, error: null });
    factory().then(
      (data) => setState({ loading: false, data, error: null }),
      (error) => setState({ loading: false, data: null, error })
    );
  }, deps);
  React.useEffect(() => {
    run();
  }, [run]);
  return { ...state, reload: run };
}

export const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const {
    loading,
    data: article,
    error,
    reload,
  } = useAsyncFactory<ArticleWithCommentsDto>(
    () => fetchArticle(id as string),
    [id]
  );

  const [authorName, setAuthorName] = React.useState("");
  const [content, setContent] = React.useState("");
  const [sending, setSending] = React.useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!authorName || !content) return;
    setSending(true);
    try {
      await createComment(id as string, { author_name: authorName, content });
      setAuthorName("");
      setContent("");
      reload();
    } catch (e) {
      // noop
    } finally {
      setSending(false);
    }
  }

  return (
    <div>
      {loading && <div className="card">Загрузка...</div>}
      {!!error && <div className="card">Ошибка загрузки</div>}
      {!!article && (
        <>
          <article className="card">
            <h2>{article.title}</h2>
            <div className="muted">
              {new Date(article.created_at).toLocaleString()}
            </div>
            <p>{article.content}</p>
          </article>

          <section className="card">
            <h3>Комментарии</h3>
            {(!article.comments || article.comments.length === 0) && (
              <div className="muted">Пока нет комментариев</div>
            )}
            {article.comments &&
              article.comments.map((c) => (
                <div key={c.id} className="card" style={{ margin: "10px 0" }}>
                  <strong>{c.author_name}</strong>
                  <div className="muted">
                    {new Date(c.created_at).toLocaleString()}
                  </div>
                  <div>{c.content}</div>
                </div>
              ))}
          </section>

          <section className="card">
            <h3>Добавить комментарий</h3>
            <form onSubmit={submit}>
              <div className="row">
                <label>Имя</label>
                <input
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="Ваше имя"
                />
              </div>
              <div className="row">
                <label>Комментарий</label>
                <textarea
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Текст комментария"
                />
              </div>
              <button disabled={sending}>
                {sending ? "Отправка…" : "Отправить"}
              </button>
            </form>
          </section>
        </>
      )}
    </div>
  );
};
