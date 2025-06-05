import type { Client } from "../types";
import { createDomainModel } from "../domain";

interface DomainData {
  name: string;
  description?: string;
  [key: string]: any; // Allow additional properties if necessary
}

export function createDomain(supabase: Client, data: DomainData): Promise<void> {
  return createDomainModel(supabase).create(data);
}

export function updateDomain(
  supabase: Client,
  id: string,
  data: Partial<DomainData>, // Allow partial updates
): Promise<void> {
  return createDomainModel(supabase).update(id, data);
}

export function deleteDomain(supabase: Client, id: string): Promise<void> {
  return createDomainModel(supabase).delete(id);
}
