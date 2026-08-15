import { getDb } from "./connection";
import { entries } from "@db/schema";
import { eq } from "drizzle-orm";

export function normalizeWord(word: string): string {
  return word.trim().toLowerCase();
}

export function toPhrase(words: [string, string, string]): string {
  return words.map(normalizeWord).join(" ");
}

export async function findEntryByPhrase(phrase: string) {
  return getDb().query.entries.findFirst({
    where: eq(entries.phrase, phrase),
  });
}

export async function createEntry(data: {
  phrase: string;
  word1: string;
  word2: string;
  word3: string;
  displayName?: string;
  whatsappNumber: string;
}) {
  await getDb().insert(entries).values(data);
  return findEntryByPhrase(data.phrase);
}
