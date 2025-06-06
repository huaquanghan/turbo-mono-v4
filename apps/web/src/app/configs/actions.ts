"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@rp/supabase/server";
import { listConfig } from "@rp/supabase/queries/config";
import { upsertConfig, deleteConfig } from "@rp/supabase/mutations";
import type { ConfigValue } from "@rp/supabase/app-config";

const APP_ID = "web";
const ENV = process.env.NODE_ENV ?? "development";

export async function fetchConfigs() {
  const supabase = await createClient();
  const { data } = await listConfig(supabase, ENV, APP_ID);
  return data ?? [];
}

function parseValue(raw: FormDataEntryValue | null): ConfigValue {
  const str = raw?.toString() ?? "";
  try {
    return JSON.parse(str);
  } catch {
    return str;
  }
}

export async function upsertConfigAction(formData: FormData) {
  const supabase = await createClient();
  await upsertConfig(supabase, {
    appId: APP_ID,
    key: String(formData.get("key")),
    value: parseValue(formData.get("value")),
    environment: ENV,
  });
  revalidatePath("/configs");
}

export async function deleteConfigAction(key: string) {
  const supabase = await createClient();
  await deleteConfig(supabase, APP_ID, key);
  revalidatePath("/configs");
}
