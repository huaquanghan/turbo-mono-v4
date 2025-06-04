import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const shared = {
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
};

const client = {
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
};

const server = {
  DATABASE_URL: z.string().url().optional(),
};

export const env = createEnv({
  shared,
  client,
  server,
  experimental__runtimeEnv: {
    NODE_ENV: process.env["NODE_ENV"],
    NEXT_PUBLIC_APP_URL: process.env["NEXT_PUBLIC_APP_URL"],
  },
  skipValidation:
    !!process.env["CI"] || process.env["npm_lifecycle_event"] === "lint",
});

