import { Pool } from "pg";

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "finguard",
  password: "dharun@2005",
  port: 5432,
});