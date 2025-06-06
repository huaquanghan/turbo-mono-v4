import 'server-only';
import { createClient } from '@rp/supabase/server';

interface ConfigCacheEntry {
  value: Record<string, any>;
  expires: number;
}

const cache = new Map<string, ConfigCacheEntry>();
const TTL = 5 * 60 * 1000; // 5 minutes

async function fetchConfig(env: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from('app_config')
    .select('key,value')
    .eq('environment', env);

  const obj: Record<string, any> = {};
  for (const row of data ?? []) {
    obj[row.key] = row.value;
  }
  cache.set(env, { value: obj, expires: Date.now() + TTL });
  return obj;
}

export async function getConfig(env = process.env.NODE_ENV ?? 'development') {
  const cached = cache.get(env);
  if (cached && cached.expires > Date.now()) {
    return cached.value;
  }
  return fetchConfig(env);
}
