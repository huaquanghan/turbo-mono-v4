import type { Client } from "../types";

export function createOrm<TRow extends Record<string, any>>(
  supabase: Client,
  table: string,
) {
  return {
    getById(id: string) {
      return supabase.from<TRow>(table).select("*").eq("id", id).single().throwOnError();
    },
    list() {
      return supabase.from<TRow>(table).select("*").throwOnError();
    },
    create(data: Partial<TRow>) {
      return supabase.from<TRow>(table).insert(data).single().throwOnError();
    },
    update(id: string, data: Partial<TRow>) {
      return supabase.from<TRow>(table).update(data).eq("id", id).single().throwOnError();
    },
    delete(id: string) {
      return supabase.from<TRow>(table).delete().eq("id", id).single().throwOnError();
    },
  };
}
