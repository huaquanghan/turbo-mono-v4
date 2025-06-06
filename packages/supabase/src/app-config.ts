import type { Client } from './types';
import { createOrm } from './utils/orm';

export type AppConfigKey = 'welcome_message' | 'feature_enabled';

export interface AppConfigRow {
  app_id: string;
  key: AppConfigKey;
  value: any;
  updated_at: string;
  environment: string;
}

export function createAppConfigModel(supabase: Client) {
  const orm = createOrm<AppConfigRow>(supabase, 'app_config');
  return {
    ...orm,
    listByEnv(env: string, appId: string) {
      return (supabase as any)
        .from('app_config')
        .select('key,value,updated_at')
        .eq('environment', env)
        .eq('app_id', appId)
        .throwOnError();
    },
    upsertConfig(data: Partial<AppConfigRow>) {
      return (supabase as any)
        .from('app_config')
        .upsert(data, { onConflict: 'app_id,key' })
        .single()
        .throwOnError();
    },
  };
}
