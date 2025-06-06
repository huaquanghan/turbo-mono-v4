import type { Client } from '../types';
import { createAppConfigModel } from '../app-config';

export function upsertConfig(
  supabase: Client,
  data: { key: string; value: any; environment: string },
) {
  return createAppConfigModel(supabase).upsertConfig(data);
}
