import type { Client } from "../types";
import { createDomainModel } from "../domain";

interface DomainData {
  name: string;
  description?: string;
  [key: string]: any; // Allow additional properties if necessary
}

export async function createDomain(
  supabase: Client,
  data: DomainData,
): Promise<void> {
  await createDomainModel(supabase).create(data);
}

export async function updateDomain(
  supabase: Client,
  id: string,
  data: Partial<DomainData>, // Allow partial updates
): Promise<void> {
  await createDomainModel(supabase).update(id, data);
}

export async function deleteDomain(supabase: Client, id: string): Promise<void> {
  await createDomainModel(supabase).delete(id);
}
