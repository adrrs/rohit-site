import { getStore } from "@netlify/blobs";
import type { Context } from "@netlify/edge-functions";

// AI-training scrapers and aggressive SEO crawlers.
// Search engines (Googlebot, Bingbot, DuckDuckBot) and social-share
// preview bots (Twitterbot, Slackbot, ...) are intentionally left out.
const BLOCKED_USER_AGENTS = [
  "gptbot",
  "chatgpt-user",
  "ccbot",
  "claudebot",
  "anthropic-ai",
  "bytespider",
  "petalbot",
  "google-extended",
  "diffbot",
  "cohere-ai",
  "omgili",
  "timpibot",
  "youbot",
  "semrushbot",
  "ahrefsbot",
  "mj12bot",
  "dataforseobot",
  "dotbot",
];

const RATE_LIMIT = 60; // requests
const RATE_WINDOW_MS = 60_000; // per minute

export default async (request: Request, context: Context) => {
  const userAgent = request.headers.get("user-agent")?.toLowerCase() ?? "";

  if (BLOCKED_USER_AGENTS.some((bot) => userAgent.includes(bot))) {
    return new Response("Forbidden", { status: 403 });
  }

  const ip = context.ip;
  const store = getStore("rate-limit");
  const key = `ip:${ip}`;
  const now = Date.now();

  const record = (await store.get(key, { type: "json" })) as
    | { count: number; windowStart: number }
    | null;

  if (!record || now - record.windowStart > RATE_WINDOW_MS) {
    await store.setJSON(key, { count: 1, windowStart: now });
  } else if (record.count >= RATE_LIMIT) {
    return new Response("Too Many Requests", {
      status: 429,
      headers: { "retry-after": "60" },
    });
  } else {
    await store.setJSON(key, {
      count: record.count + 1,
      windowStart: record.windowStart,
    });
  }

  return context.next();
};

export const config = { path: "/*", excludedPath: "/rss.xml" };
