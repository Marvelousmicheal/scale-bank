import { NextResponse } from "next/server"
import { refreshScale9Session } from "@/lib/scale9/auth"
import { clearScale9Session, getScale9Session, setScale9Session } from "@/lib/scale9/session"

export async function POST() {
  const { refreshToken } = await getScale9Session()

  if (!refreshToken) {
    return NextResponse.json({ message: "No active session." }, { status: 401 })
  }

  try {
    const tokens = await refreshScale9Session(refreshToken)
    await setScale9Session(tokens)
    return NextResponse.json({ success: true })
  } catch {
    await clearScale9Session()
    return NextResponse.json({ message: "Your session has expired." }, { status: 401 })
  }
}
