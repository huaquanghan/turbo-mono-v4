import type { Client } from '../types';
import { createAppConfigModel } from '../app-config';

export function listConfig(supabase: Client, env: string, appId: string) {
  return createAppConfigModel(supabase).listByEnv(env, appId);
}
