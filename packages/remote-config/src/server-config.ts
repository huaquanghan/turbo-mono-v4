import 'server-only';
import { createClient } from '@rp/supabase/server';

interface ConfigCacheEntry {
  value: Record<string, any>;
  expires: number;
}

const cache = new Map<string, ConfigCacheEntry>();
const TTL = 5 * 60 * 1000; // 5 minutes

async function fetchConfig(env: string, appId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from('app_config')
    .select('key,value')
    .eq('environment', env)
    .eq('app_id', appId);

  const obj: Record<string, any> = {};
  for (const row of data ?? []) {
    obj[row.key] = row.value;
  }
  cache.set(`${env}:${appId}`, { value: obj, expires: Date.now() + TTL });
  return obj;
}

export async function getConfig(
  appId: string,
  env = process.env.NODE_ENV ?? 'development',
) {
  const key = `${env}:${appId}`;
  const cached = cache.get(key);
  if (cached && cached.expires > Date.now()) {
    return cached.value;
  }
  return fetchConfig(env, appId);
}
