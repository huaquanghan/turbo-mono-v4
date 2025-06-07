import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../types/db";

export type Client = SupabaseClient<Database>;

export * from "./db";

export type DomainRow = Database["public"]["Tables"]["domains"]["Row"];
export type DomainInsert = Database["public"]["Tables"]["domains"]["Insert"];
export type DomainUpdate = Database["public"]["Tables"]["domains"]["Update"];

export * from './config'
