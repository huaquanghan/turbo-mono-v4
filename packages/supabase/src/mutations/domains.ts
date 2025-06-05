// @ts-nocheck
import type { Client } from "../types";
import { createDomainModel } from "../domain";

export function createDomain(supabase: Client, data: Record<string, any>) {
  return createDomainModel(supabase).create(data);
}

export function updateDomain(
  supabase: Client,
  id: string,
  data: Record<string, any>,
) {
  return createDomainModel(supabase).update(id, data);
}

export function deleteDomain(supabase: Client, id: string) {
  return createDomainModel(supabase).delete(id);
}
