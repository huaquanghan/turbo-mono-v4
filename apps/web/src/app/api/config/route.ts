import { appId } from "@/config/api.config"
import { getConfig } from "@rp/remote-config/server"
import { NextResponse } from "next/server"

export const runtime = "edge"

export async function GET() {
	const config = await getConfig(appId)
	return NextResponse.json(config, {
		headers: {
			"Cache-Control": "public, s-maxage=300, stale-while-revalidate=59"
		}
	})
}
