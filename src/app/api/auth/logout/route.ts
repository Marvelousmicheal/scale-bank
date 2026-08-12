import { NextResponse } from "next/server"
import { scale9Request } from "@/lib/scale9/client"
import { clearScale9Session, getScale9Session } from "@/lib/scale9/session"

export async function POST(request: Request) {
  const { accessToken, refreshToken } = await getScale9Session()

  if (accessToken && refreshToken) {
    await scale9Request("/api/auth/logout", {
      method: "POST",
      accessToken,
      body: { refreshToken },
    }).catch(() => undefined)
  }

  await clearScale9Session()
  return NextResponse.redirect(new URL("/login", request.url), 303)
}
