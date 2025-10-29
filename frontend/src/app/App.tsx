import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { ArticlesPage } from "../pages/articles/ArticlesPage";
import { ArticlePage } from "../pages/article/ArticlePage";
import { NewArticlePage } from "../pages/new-article/NewArticlePage";

export const App: React.FC = () => {
  return (
    <div className="container">
      <header className="header">
        <h1>
          <Link to="/">Простой блог</Link>
        </h1>
        <nav>
          <Link to="/">Статьи</Link>
          <Link to="/new">Новая статья</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<ArticlesPage />} />
          <Route path="/articles/:id" element={<ArticlePage />} />
          <Route path="/new" element={<NewArticlePage />} />
        </Routes>
      </main>
    </div>
  );
};
