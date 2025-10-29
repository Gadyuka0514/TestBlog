/** @param {import('knex').Knex} knex */
exports.seed = async function (knex) {
  await knex("comments").del();
  await knex("articles").del();

  const articles = [
    {
      title: "Добро пожаловать в блог",
      content:
        "Это простой блог на Node.js и React. Здесь вы можете публиковать статьи и оставлять комментарии.",
    },
    {
      title: "Вторая запись",
      content:
        "Пост с небольшим содержанием, чтобы проверить список статей и пагинацию в будущем.",
    },
    {
      title: "Проект с Docker",
      content:
        "Мы завернём всё приложение в Docker и будем использовать Nginx для статики и проксирования.",
    },
    {
      title: "PostgreSQL + Knex",
      content:
        "Для миграций и сидов используем Knex. База данных — PostgreSQL.",
    },
  ];

  const inserted = await knex("articles").insert(articles).returning(["id"]);

  // Optional: add a couple of comments to the first article
  if (inserted && inserted[0]) {
    const articleId = inserted[0].id || inserted[0];
    await knex("comments").insert([
      {
        article_id: articleId,
        author_name: "Admin",
        content: "Первый комментарий!",
      },
      {
        article_id: articleId,
        author_name: "Гость",
        content: "Отличный пост, спасибо!",
      },
    ]);
  }
};
