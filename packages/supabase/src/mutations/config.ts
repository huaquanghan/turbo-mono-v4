import type { Client } from '../types';
import { createAppConfigModel, type AppConfigKey } from '../app-config';

export function upsertConfig(
  supabase: Client,
  data: { appId: string; key: AppConfigKey; value: any; environment: string },
) {
  return createAppConfigModel(supabase).upsertConfig({
    app_id: data.appId,
    key: data.key,
    value: data.value,
    environment: data.environment,
  });
}
