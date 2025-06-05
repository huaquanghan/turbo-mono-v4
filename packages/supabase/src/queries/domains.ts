// @ts-nocheck
import type { Client } from "../types";
import { createDomainModel } from "../domain";

export function getDomainById(supabase: Client, id: string) {
  return createDomainModel(supabase).getById(id);
}

export function listDomains(supabase: Client) {
  return createDomainModel(supabase).list();
}
