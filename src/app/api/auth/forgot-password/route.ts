import { NextResponse } from "next/server"
import { forgotPassword } from "@/lib/scale9/public"
import { scale9RouteError } from "@/lib/scale9/route-response"

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const identifier = typeof body.identifier === "string" ? body.identifier.trim() : ""

  if (!identifier) return NextResponse.json({ message: "Enter an email or phone number." }, { status: 400 })

  try {
    await forgotPassword(identifier)
    return NextResponse.json({ message: "If the account exists, reset instructions have been sent." })
  } catch (error) {
    return scale9RouteError(error, "Unable to request a password reset.")
  }
}
