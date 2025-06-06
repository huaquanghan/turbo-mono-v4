import { createClient } from '@rp/supabase/server';

export const runtime = 'edge';

export async function GET() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('app_config')
    .select('key,value')
    .eq('environment', process.env.NODE_ENV);

  const obj: Record<string, any> = {};
  for (const row of data ?? []) {
    obj[row.key] = row.value;
  }

  return new Response(JSON.stringify(obj), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=59',
    },
  });
}
