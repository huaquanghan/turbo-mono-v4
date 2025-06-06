import type { Client } from './types';
import { createOrm } from './utils/orm';

export interface AppConfigRow {
  key: string;
  value: any;
  updated_at: string;
  environment: string;
}

export function createAppConfigModel(supabase: Client) {
  const orm = createOrm<AppConfigRow>(supabase, 'app_config');
  return {
    ...orm,
    listByEnv(env: string) {
      return (supabase as any)
        .from('app_config')
        .select('key,value,updated_at')
        .eq('environment', env)
        .throwOnError();
    },
    upsertConfig(data: Partial<AppConfigRow>) {
      return (supabase as any)
        .from('app_config')
        .upsert(data, { onConflict: 'key' })
        .single()
        .throwOnError();
    },
  };
}
