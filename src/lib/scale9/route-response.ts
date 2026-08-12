import { NextResponse } from "next/server"
import { Scale9ApiError } from "@/lib/scale9/client"

export function scale9RouteError(error: unknown, fallback: string) {
  if (error instanceof Scale9ApiError) {
    return NextResponse.json(
      { message: error.message, requestId: error.requestId },
      { status: error.status },
    )
  }

  return NextResponse.json({ message: fallback }, { status: 500 })
}
