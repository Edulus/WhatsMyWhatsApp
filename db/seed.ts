import { getDb } from "../api/queries/connection";
import { entries } from "./schema";

async function seed() {
  const db = getDb();
  console.log("Seeding database...");

  await db
    .insert(entries)
    .values({
      phrase: "bbc world service",
      word1: "bbc",
      word2: "world",
      word3: "service",
      displayName: "BBC World Service (demo)",
      whatsappNumber: "441234567890",
    })
    .onDuplicateKeyUpdate({ set: { displayName: "BBC World Service (demo)" } });

  console.log("Done.");
  process.exit(0); // close MySQL connection pool
}

seed();
