import type { Client } from '../types';
import { createAppConfigModel, type ConfigValue } from '../app-config';

export function upsertConfig(
  supabase: Client,
  data: {
    appId: string;
    key: string;
    value: ConfigValue;
    environment: string;
  },
) {
  return createAppConfigModel(supabase).upsertConfig({
    appId: data.appId,
    key: data.key,
    value: data.value,
    environment: data.environment,
  });
}

export function deleteConfig(supabase: Client, appId: string, key: string) {
  return (supabase as any)
    .from('app_config')
    .delete()
    .eq('app_id', appId)
    .eq('key', key)
    .throwOnError();
}
