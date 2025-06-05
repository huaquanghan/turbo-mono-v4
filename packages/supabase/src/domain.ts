import type { Client } from "./types";
import { createOrm } from "./utils/orm";

export interface DomainRow {
  id: string;
  [key: string]: any;
}

export function createDomainModel(supabase: Client) {
  return createOrm<DomainRow>(supabase, "domains");
}
