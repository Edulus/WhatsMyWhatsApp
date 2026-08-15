import { getDb } from "./connection";
import { sql } from "drizzle-orm";

// Idempotent bootstrap: creates tables if they do not exist yet.
// Runs once at server start; safe to fail (queries will surface real errors).
export async function ensureSchema() {
  try {
    await getDb().execute(sql`
      CREATE TABLE IF NOT EXISTS entries (
        id bigint unsigned NOT NULL AUTO_INCREMENT,
        phrase varchar(190) NOT NULL,
        word1 varchar(60) NOT NULL,
        word2 varchar(60) NOT NULL,
        word3 varchar(60) NOT NULL,
        displayName varchar(100),
        whatsappNumber varchar(20) NOT NULL,
        createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY entries_phrase_unique (phrase)
      )
    `);
    console.log("Database schema ready");
  } catch (err) {
    console.warn("ensureSchema: could not reach database yet:", err);
  }
}
