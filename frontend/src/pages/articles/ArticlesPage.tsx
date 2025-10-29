import React from "react";
import { Link } from "react-router-dom";
import { fetchArticles, ArticleDto } from "../../entities/article/api";

function useAsync<T>(fn: () => Promise<T>, deps: React.DependencyList = []) {
  const [state, setState] = React.useState<{
    loading: boolean;
    data: T | null;
    error: unknown;
  }>({ loading: true, data: null, error: null });
  React.useEffect(() => {
    let mounted = true;
    setState({ loading: true, data: null, error: null });
    fn().then(
      (data) => mounted && setState({ loading: false, data, error: null }),
      (error) => mounted && setState({ loading: false, data: null, error })
    );
    return () => {
      mounted = false;
    };
  }, deps);
  return state;
}

export const ArticlesPage: React.FC = () => {
  const { loading, data, error } = useAsync<ArticleDto[]>(fetchArticles, []);
  return (
    <div>
      <h2>Список статей</h2>
      {loading && <div className="card">Загрузка...</div>}
      {error && <div className="card">Ошибка загрузки</div>}
      {data &&
        data.map((a) => (
          <article className="card" key={a.id}>
            <h3>
              <Link to={`/articles/${a.id}`}>{a.title}</Link>
            </h3>
            <div className="muted">
              {new Date(a.created_at).toLocaleString()}
            </div>
            <p>
              {a.content.length > 160
                ? a.content.slice(0, 160) + "…"
                : a.content}
            </p>
            <Link to={`/articles/${a.id}`}>Читать далее →</Link>
          </article>
        ))}
    </div>
  );
};
