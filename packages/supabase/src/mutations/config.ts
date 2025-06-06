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
