import type { Client } from './types';
import { createOrm } from './utils/orm';

export type ConfigValue =
  | number
  | boolean
  | string
  | Record<string, any>
  | Date;

export type ConfigType =
  | 'number'
  | 'boolean'
  | 'string'
  | 'object'
  | 'datetime';

export interface AppConfigRow<
  Schema extends Record<string, ConfigValue> = Record<string, ConfigValue>,
  Key extends keyof Schema & string = keyof Schema & string,
> {
  app_id: string;
  key: Key;
  value: Schema[Key];
  type: ConfigType;
  updated_at: string;
  environment: string;
}

export function createAppConfigModel<
  Schema extends Record<string, ConfigValue> = Record<string, ConfigValue>,
>(supabase: Client) {
  type Row = AppConfigRow<Schema>;
  const orm = createOrm<Row>(supabase, 'app_config');
  return {
    ...orm,
    listByEnv(env: string, appId: string) {
      return (supabase as any)
        .from('app_config')
        .select('key,value,type,updated_at')
        .eq('environment', env)
        .eq('app_id', appId)
        .throwOnError();
    },
    upsertConfig<K extends keyof Schema & string>(data: {
      appId: string;
      key: K;
      value: Schema[K];
      type: ConfigType;
      environment: string;
    }) {
      return (supabase as any)
        .from('app_config')
        .upsert(
          {
            app_id: data.appId,
            key: data.key,
            value: data.value,
            type: data.type,
            environment: data.environment,
          },
          { onConflict: 'app_id,key' },
        )
        .single()
        .throwOnError();
    },
  };
}
