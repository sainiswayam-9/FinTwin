import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { config } from "../conf/index.js";

const pool = new Pool({
    connectionString: config.dbUrl,
});

const db = drizzle({ client: pool });

export * from "./schema.js";
export { db };