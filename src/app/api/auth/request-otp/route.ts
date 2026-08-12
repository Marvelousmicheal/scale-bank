import { NextResponse } from "next/server"
import { requestOtp } from "@/lib/scale9/public"
import { scale9RouteError } from "@/lib/scale9/route-response"

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const phone = typeof body.phone === "string" ? body.phone.trim() : ""

  if (!phone) return NextResponse.json({ message: "Enter a phone number." }, { status: 400 })

  try {
    const response = await requestOtp(phone)
    return NextResponse.json(response)
  } catch (error) {
    return scale9RouteError(error, "Unable to request an OTP.")
  }
}
