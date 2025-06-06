import { useEffect, useState } from 'react';
import { createClient } from '@rp/supabase/client';

const STORAGE_KEY = 'app_config_cache';
const TTL = 5 * 60 * 1000; // 5 minutes

async function fetchConfig(appId: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from('app_config')
    .select('key,value,updated_at')
    .eq('environment', process.env.NODE_ENV)
    .eq('app_id', appId);

  const obj: Record<string, any> = {};
  for (const row of data ?? []) {
    obj[row.key] = row.value;
  }
  const cache = { value: obj, ts: Date.now() };
  try {
    localStorage.setItem(`${STORAGE_KEY}_${appId}`, JSON.stringify(cache));
  } catch {}
  return obj;
}

function readCache(appId: string) {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY}_${appId}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { value: Record<string, any>; ts: number };
    if (parsed.ts + TTL > Date.now()) {
      return parsed.value;
    }
  } catch {}
  return null;
}

export function useConfig(appId: string) {
  const [config, setConfig] = useState<Record<string, any>>(() => readCache(appId) || {});

  useEffect(() => {
    if (!readCache(appId)) {
      fetchConfig(appId).then(setConfig);
    }
    const supabase = createClient();
    const channel = supabase
      .channel('public:app_config')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'app_config',
          filter: `app_id=eq.${appId}`,
        },
        () => {
          fetchConfig(appId).then(setConfig);
        },
      );
    channel.subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, [appId]);

  return config;
}
