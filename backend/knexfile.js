require("dotenv").config();

const {
  DATABASE_HOST = "127.0.0.1",
  DATABASE_PORT = 5432,
  DATABASE_NAME = "blog",
  DATABASE_USER = "bloguser",
  DATABASE_PASSWORD = "blogpass",
} = process.env;

/** @type {import('knex').Knex.Config} */
module.exports = {
  client: "pg",
  connection: {
    host: DATABASE_HOST,
    port: Number(DATABASE_PORT),
    database: DATABASE_NAME,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: "./migrations",
  },
  seeds: {
    directory: "./seeds",
  },
  pool: { min: 2, max: 10 },
};
