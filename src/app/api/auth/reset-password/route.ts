import { NextResponse } from "next/server"
import { resetPassword } from "@/lib/scale9/public"
import { scale9RouteError } from "@/lib/scale9/route-response"

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const token = typeof body.token === "string" ? body.token.trim() : ""
  const password = typeof body.password === "string" ? body.password : ""
  const confirmPassword = typeof body.confirmPassword === "string" ? body.confirmPassword : ""

  if (!/^\d{6}$/.test(token) || password.length < 6 || password !== confirmPassword) {
    return NextResponse.json({ message: "Enter a valid code and matching passwords." }, { status: 400 })
  }

  try {
    const response = await resetPassword(token, password, confirmPassword)
    return NextResponse.json(response)
  } catch (error) {
    return scale9RouteError(error, "Unable to reset the password.")
  }
}
