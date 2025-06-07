import { createBrowserClient, createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import type { Database } from './types'
import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config'

export const createClient = () =>
  createBrowserClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY)

export const createServer = (ctx?: { cookies?: ReturnType<typeof cookies> }) => {
  const cookieStore = ctx?.cookies ?? cookies();
  return createServerClient<Database>(
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          for (const { name, value, options } of cookiesToSet) {
            cookieStore.set(name, value, options);
          }
        },
      },
    },
  );
};
