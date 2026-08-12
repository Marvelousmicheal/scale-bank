import { NextResponse } from "next/server"
import { isScale9AdminRole, loginToScale9 } from "@/lib/scale9/auth"
import { Scale9ApiError } from "@/lib/scale9/client"
import { setScale9Session } from "@/lib/scale9/session"

type LoginBody = {
  identifier?: unknown
  password?: unknown
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as LoginBody
  const identifier = typeof body.identifier === "string" ? body.identifier.trim() : ""
  const password = typeof body.password === "string" ? body.password : ""

  if (!identifier || password.length < 6) {
    return NextResponse.json(
      { message: "Enter a valid email or phone number and password." },
      { status: 400 },
    )
  }

  try {
    const result = await loginToScale9(identifier, password)

    if (result.requiresTwoFactor) {
      return NextResponse.json(
        { requiresTwoFactor: true, challengeId: result.challengeId },
        { status: 202 },
      )
    }

    if (!isScale9AdminRole(result.role)) {
      return NextResponse.json({ message: "This account cannot access the admin dashboard." }, { status: 403 })
    }

    await setScale9Session(result)
    return NextResponse.json({ success: true })
  } catch (error) {
    if (error instanceof Scale9ApiError) {
      const status = error.status === 401 || error.status === 403 ? 401 : error.status
      return NextResponse.json(
        { message: error.message, requestId: error.requestId },
        { status },
      )
    }

    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to sign in." },
      { status: 500 },
    )
  }
}
