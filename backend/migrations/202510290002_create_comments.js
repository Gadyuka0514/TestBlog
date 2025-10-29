/** @param {import('knex').Knex} knex */
exports.up = async function (knex) {
  await knex.schema.createTable("comments", (table) => {
    table.increments("id").primary();
    table
      .integer("article_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("articles")
      .onDelete("CASCADE");
    table.string("author_name").notNullable();
    table.text("content").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/** @param {import('knex').Knex} knex */
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("comments");
};
