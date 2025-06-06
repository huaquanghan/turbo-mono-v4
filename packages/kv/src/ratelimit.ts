import "server-only"

import { Ratelimit } from "@upstash/ratelimit"
import { client } from "."

export const config = {
  limit: 10,
  window: "10s",
} as const

export const ratelimit = new Ratelimit({
  limiter: Ratelimit.fixedWindow(config.limit, config.window),
  redis: client,
})
