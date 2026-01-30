import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Database connection
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.warn("DATABASE_URL not set, using in-memory fallback");
}

// Create postgres client
const client = postgres(connectionString || "postgres://user:password@localhost/portfolio");

// Create drizzle instance
export const db = drizzle(client, { schema });

export default db;
