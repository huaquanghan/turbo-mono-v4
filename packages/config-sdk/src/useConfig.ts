import { useEffect, useState } from 'react';
import { createClient } from '@rp/supabase/client';

const STORAGE_KEY = 'app_config_cache';
const TTL = 5 * 60 * 1000; // 5 minutes

async function fetchConfig() {
  const supabase = createClient();
  const { data } = await supabase
    .from('app_config')
    .select('key,value,updated_at')
    .eq('environment', process.env.NODE_ENV);

  const obj: Record<string, any> = {};
  for (const row of data ?? []) {
    obj[row.key] = row.value;
  }
  const cache = { value: obj, ts: Date.now() };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cache));
  } catch {}
  return obj;
}

function readCache() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { value: Record<string, any>; ts: number };
    if (parsed.ts + TTL > Date.now()) {
      return parsed.value;
    }
  } catch {}
  return null;
}

export function useConfig() {
  const [config, setConfig] = useState<Record<string, any>>(() => readCache() || {});

  useEffect(() => {
    if (!readCache()) {
      fetchConfig().then(setConfig);
    }
    const supabase = createClient();
    const channel = supabase
      .channel('public:app_config')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'app_config' },
        () => {
          fetchConfig().then(setConfig);
        },
      );
    channel.subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, []);

  return config;
}
