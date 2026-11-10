import { defineConfig } from "drizzle-kit";

// Config for the drizzle-kit CLI (`npx drizzle-kit studio`, `npx drizzle-kit
// push`, etc.) -- not imported by the app itself, only used when you run
// one of those commands locally. Needs DATABASE_URL in your environment
// (your .env.local already has it once you've done the Neon setup step).
export default defineConfig({
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
