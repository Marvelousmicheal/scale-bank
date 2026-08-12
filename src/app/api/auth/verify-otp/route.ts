import { NextResponse } from "next/server"
import { verifyOtp } from "@/lib/scale9/public"
import { isScale9AdminRole } from "@/lib/scale9/auth"
import { scale9RouteError } from "@/lib/scale9/route-response"
import { setScale9Session } from "@/lib/scale9/session"

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}))
  const phone = typeof body.phone === "string" ? body.phone.trim() : ""
  const otp = typeof body.otp === "string" ? body.otp.trim() : ""

  if (!phone || !/^\d{6}$/.test(otp)) {
    return NextResponse.json({ message: "Enter a phone number and six-digit OTP." }, { status: 400 })
  }

  try {
    const tokens = await verifyOtp(phone, otp)
    if (!isScale9AdminRole(tokens.role)) {
      return NextResponse.json({ message: "This account cannot access the admin dashboard." }, { status: 403 })
    }
    await setScale9Session(tokens)
    return NextResponse.json({ success: true })
  } catch (error) {
    return scale9RouteError(error, "Unable to verify the OTP.")
  }
}
