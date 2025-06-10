import { NextResponse } from 'next/server'
import { getConfig } from '@rp/remote-config/server'
import { runtime, appId } from '@/config/api.config'

export { runtime }

export async function GET() {
  const config = await getConfig(appId)
  return NextResponse.json(config, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=59',
    },
  })
}
