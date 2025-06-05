import { Button, Input } from "@rp/ui";
import { fetchDomains, createDomainAction, updateDomainAction, deleteDomainAction } from "./actions";

export default async function DomainsPage() {
  const domains = await fetchDomains();

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-xl font-bold">Domains</h1>
      <form action={createDomainAction} className="flex gap-2">
        <Input name="name" placeholder="Name" className="flex-1" />
        <Input name="description" placeholder="Description" className="flex-1" />
        <Button type="submit">Create</Button>
      </form>
      <ul className="space-y-4">
        {domains.map((d: any) => (
          <li key={d.id} className="flex items-center gap-2">
            <span className="flex-1">{d.name}</span>
            <form action={updateDomainAction.bind(null, d.id)} className="flex gap-2">
              <Input name="name" defaultValue={d.name} className="flex-1" />
              <Input name="description" defaultValue={d.description ?? ""} className="flex-1" />
              <Button type="submit" variant="outline">Update</Button>
            </form>
            <form action={deleteDomainAction.bind(null, d.id)}>
              <Button type="submit" variant="destructive">Delete</Button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
