import type { Client } from "../types";

export function createOrm<TRow extends Record<string, any>>(
  supabase: Client,
  table: string,
) {
  return {
    getById(id: string) {
      return supabase.from<TRow>(table).select("*").eq("id", id).single();
    },
    list() {
      return supabase.from<TRow>(table).select("*");
    },
    create(data: Partial<TRow>) {
      return supabase.from<TRow>(table).insert(data).single();
    },
    update(id: string, data: Partial<TRow>) {
      return supabase.from<TRow>(table).update(data).eq("id", id).single();
    },
    delete(id: string) {
      return supabase.from<TRow>(table).delete().eq("id", id).single();
    },
  };
}
