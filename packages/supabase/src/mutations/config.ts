import type { Client, UpsertConfigInput } from '../types'
import { createAppConfigModel } from '../app-config'

export function upsertConfig(supabase: Client, data: UpsertConfigInput) {
  return createAppConfigModel(supabase).upsertConfig({
    appId: data.appId,
    key: data.key,
    value: data.value,
    type: data.type,
    environment: data.environment,
  });
}

export function deleteConfig(supabase: Client, appId: string, key: string) {
  return supabase
    .from('app_config')
    .delete()
    .eq('app_id', appId)
    .eq('key', key)
    .throwOnError();
}
