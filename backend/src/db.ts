import knex, { Knex } from "knex";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config: Record<string, unknown> = require("../knexfile");

const db: Knex = knex(config as Knex.Config);

export default db;
