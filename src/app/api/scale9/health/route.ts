import { NextResponse } from "next/server"
import { Scale9ApiError, scale9Request } from "@/lib/scale9/client"
import type { Scale9Health } from "@/lib/scale9/types"

export async function GET() {
  try {
    const response = await scale9Request<Scale9Health>("/api", { timeoutMs: 5_000 })
    return NextResponse.json(response)
  } catch (error) {
    const status = error instanceof Scale9ApiError ? error.status : 503
    return NextResponse.json({ message: "Scale9 API is unavailable." }, { status })
  }
}
