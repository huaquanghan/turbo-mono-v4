import type { ConfigValue, ConfigType } from '../app-config'

export interface UpsertConfigInput {
  appId: string
  key: string
  value: ConfigValue
  type: ConfigType
  environment: string
}

