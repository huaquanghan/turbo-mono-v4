import { Button, Input } from "@rp/ui";
import {
  fetchConfigs,
  upsertConfigAction,
  deleteConfigAction,
} from "./actions";

export default async function ConfigsPage() {
  const configs = await fetchConfigs();

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-xl font-bold">Remote Config</h1>
      <form action={upsertConfigAction} className="flex gap-2">
        <Input name="key" placeholder="Key" className="flex-1" />
        <Input name="value" placeholder="Value" className="flex-1" />
        <Button type="submit">Save</Button>
      </form>
      <ul className="space-y-4">
        {configs.map((c: any) => (
          <li key={c.key} className="flex items-center gap-2">
            <span className="flex-1 break-all">
              {c.key}: {JSON.stringify(c.value)}
            </span>
            <form action={upsertConfigAction} className="flex gap-2">
              <input type="hidden" name="key" value={c.key} />
              <Input name="value" defaultValue={JSON.stringify(c.value)} className="flex-1" />
              <Button type="submit" variant="outline">Update</Button>
            </form>
            <form action={deleteConfigAction.bind(null, c.key)}>
              <Button type="submit" variant="destructive">Delete</Button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
