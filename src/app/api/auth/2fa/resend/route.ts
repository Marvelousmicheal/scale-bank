import { NextResponse } from "next/server"
import { resendTwoFactor } from "@/lib/scale9/public"
import { scale9RouteError } from "@/lib/scale9/route-response"

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const challengeId = typeof body.challengeId === "string" ? body.challengeId.trim() : ""

  if (!challengeId) return NextResponse.json({ message: "A challenge ID is required." }, { status: 400 })

  try {
    const response = await resendTwoFactor(challengeId)
    return NextResponse.json(response)
  } catch (error) {
    return scale9RouteError(error, "Unable to resend the OTP.")
  }
}
