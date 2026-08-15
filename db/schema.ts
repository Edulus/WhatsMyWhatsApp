import {
  mysqlTable,
  serial,
  varchar,
  timestamp,
} from "drizzle-orm/mysql-core";

export const entries = mysqlTable("entries", {
  id: serial("id").primaryKey(),
  // lowercase, space-joined: "bbc world service" — unique lookup key
  phrase: varchar("phrase", { length: 190 }).notNull().unique(),
  word1: varchar("word1", { length: 60 }).notNull(),
  word2: varchar("word2", { length: 60 }).notNull(),
  word3: varchar("word3", { length: 60 }).notNull(),
  displayName: varchar("displayName", { length: 100 }),
  whatsappNumber: varchar("whatsappNumber", { length: 20 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Entry = typeof entries.$inferSelect;
export type InsertEntry = typeof entries.$inferInsert;
