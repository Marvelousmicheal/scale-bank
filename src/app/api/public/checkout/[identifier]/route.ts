import { NextResponse } from "next/server"
import { getCheckout, payCheckout, type PublicPaymentInput } from "@/lib/scale9/public"
import { scale9RouteError } from "@/lib/scale9/route-response"

function paymentInput(body: Record<string, unknown>): PublicPaymentInput | undefined {
  const amount = typeof body.amount === "number" ? body.amount : Number(body.amount)
  if (!Number.isFinite(amount) || amount < 1) return

  return {
    amount,
    payerName: typeof body.payerName === "string" ? body.payerName.trim().slice(0, 80) : undefined,
    payerEmail: typeof body.payerEmail === "string" ? body.payerEmail.trim().slice(0, 120) : undefined,
    externalReference: typeof body.externalReference === "string" && body.externalReference
      ? body.externalReference.slice(0, 64)
      : crypto.randomUUID(),
  }
}

export async function GET(_request: Request, context: RouteContext<"/api/public/checkout/[identifier]">) {
  const { identifier } = await context.params

  try {
    return NextResponse.json(await getCheckout(identifier))
  } catch (error) {
    return scale9RouteError(error, "Unable to load checkout.")
  }
}

export async function POST(request: Request, context: RouteContext<"/api/public/checkout/[identifier]">) {
  const { identifier } = await context.params
  const input = paymentInput(await request.json().catch(() => ({})))

  if (!input) return NextResponse.json({ message: "Enter a valid amount." }, { status: 400 })

  try {
    return NextResponse.json(await payCheckout(identifier, input))
  } catch (error) {
    return scale9RouteError(error, "Unable to process checkout.")
  }
}
