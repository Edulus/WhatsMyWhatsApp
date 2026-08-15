import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createRouter, publicQuery } from "./middleware";
import {
  createEntry,
  findEntryByPhrase,
  normalizeWord,
  toPhrase,
} from "./queries/entries";

const wordSchema = z
  .string()
  .trim()
  .min(2, "Each word needs at least 2 characters")
  .max(30, "Each word must be 30 characters or fewer")
  .regex(
    /^[a-zA-Z][a-zA-Z'’-]*[a-zA-Z]$/,
    "Words may only contain letters, hyphens and apostrophes",
  );

const threeWordsSchema = z.tuple([wordSchema, wordSchema, wordSchema]);

function splitPhrase(input: string): [string, string, string] {
  const parts = input.trim().split(/\s+/);
  if (parts.length !== 3) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Please enter exactly 3 words",
    });
  }
  return parts as [string, string, string];
}

export const wordsRouter = createRouter({
  register: publicQuery
    .input(
      z.object({
        displayName: z.string().trim().max(100).optional(),
        whatsappNumber: z
          .string()
          .transform((v) => v.replace(/[^\d]/g, ""))
          .pipe(
            z
              .string()
              .min(7, "Number looks too short — include your country code")
              .max(15, "Number looks too long"),
          ),
        words: threeWordsSchema,
      }),
    )
    .mutation(async ({ input }) => {
      const words = input.words.map(normalizeWord) as [
        string,
        string,
        string,
      ];
      if (new Set(words).size !== 3) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Your 3 words must all be different",
        });
      }
      const phrase = toPhrase(words);
      const existing = await findEntryByPhrase(phrase);
      if (existing) {
        throw new TRPCError({
          code: "CONFLICT",
          message:
            "Sorry — those 3 words are already taken. Try a different combination!",
        });
      }
      const entry = await createEntry({
        phrase,
        word1: words[0],
        word2: words[1],
        word3: words[2],
        displayName: input.displayName || undefined,
        whatsappNumber: input.whatsappNumber,
      });
      return entry!;
    }),

  lookup: publicQuery
    .input(z.object({ phrase: z.string().min(1) }))
    .query(async ({ input }) => {
      const words = splitPhrase(input.phrase);
      const entry = await findEntryByPhrase(toPhrase(words));
      if (!entry) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message:
            "No WhatsApp contact found for those 3 words. Double-check the spelling!",
        });
      }
      return entry;
    }),
});
