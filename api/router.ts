import { createRouter, publicQuery } from "./middleware";
import { wordsRouter } from "./words-router";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  words: wordsRouter,
});

export type AppRouter = typeof appRouter;
