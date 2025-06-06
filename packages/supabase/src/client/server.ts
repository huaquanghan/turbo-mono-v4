import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "../types";

const IGNORE_WARNINGS = [
  "Using the user object as returned from supabase.auth.getSession()",
];

function filteredLog(level: "warn" | "log", ...args: any[]) {
  const match = args.find((arg) =>
    typeof arg === "string"
      ? IGNORE_WARNINGS.find((warning) => arg.includes(warning))
      : false,
  );
  if (!match) {
    console[level](...args);
  }
}

// Example usage:
// filteredLog("warn", "This is a warning message");
// filteredLog("log", "This is a log message");

type CreateClientOptions = {
  admin?: boolean;
  schema?: "public" | "storage";
};

export async function createClient(options?: CreateClientOptions) {
  const { admin = false, ...rest } = options ?? {};
  const cookieStore = await cookies();

  const key = admin
    ? process.env.SUPABASE_SERVICE_KEY!
    : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const auth = admin
    ? {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false,
      }
    : {};

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    key,
    {
      ...rest,
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            for (const { name, value, options } of cookiesToSet) {
              cookieStore.set(name, value, options);
            }
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
      auth,
    },
  );
}
