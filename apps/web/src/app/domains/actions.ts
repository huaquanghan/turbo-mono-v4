"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@rp/supabase/server";
import { listDomains } from "@rp/supabase/queries/domains";
import { createDomain, updateDomain, deleteDomain } from "@rp/supabase/mutations/domains";
import type { DomainRow } from "@rp/supabase/domain";

export async function fetchDomains(): Promise<DomainRow[]> {
  const supabase = await createClient();
  const { data } = await listDomains(supabase);
  if (!Array.isArray(data)) {
    return [];
  }
  return data.filter((item): item is DomainRow => typeof item === "object" && item !== null && "name" in item && "description" in item);
}

export async function createDomainAction(formData: FormData) {
  const supabase = await createClient();
  await createDomain(supabase, {
    name: String(formData.get("name")),
    description: formData.get("description")?.toString(),
  });
  revalidatePath("/domains");
}

export async function updateDomainAction(id: string, formData: FormData) {
  const supabase = await createClient();
  await updateDomain(supabase, id, {
    name: formData.get("name")?.toString(),
    description: formData.get("description")?.toString(),
  });
  revalidatePath("/domains");
}

export async function deleteDomainAction(id: string) {
  const supabase = await createClient();
  await deleteDomain(supabase, id);
  revalidatePath("/domains");
}
