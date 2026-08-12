import { AuthShell } from "@/components/auth/AuthShell"
import { PublicPaymentForm } from "@/components/payments/PublicPaymentForm"

type PaymentRecord = Record<string, unknown>

function record(value: unknown): PaymentRecord {
  return value && typeof value === "object" ? value as PaymentRecord : {}
}

function text(source: PaymentRecord, keys: string[]) {
  for (const key of keys) if (typeof source[key] === "string") return source[key] as string
}

function amount(source: PaymentRecord) {
  for (const key of ["amount", "fixedAmount", "totalAmount"]) {
    const value = source[key]
    if (typeof value === "number" && value > 0) return value
  }
}

export function PublicPaymentPage({ data, endpoint, kind }: { data: unknown; endpoint: string; kind: "link" | "checkout" }) {
  const root = record(data)
  const nested = record(root.paymentLink || root.checkout || root.session)
  const source = Object.keys(nested).length ? nested : root
  const title = text(source, ["title", "businessName", "merchantName", "name"]) || (kind === "link" ? "Payment link" : "Hosted checkout")
  const description = text(source, ["description", "narration"]) || "Complete your payment securely with Scale Bank."

  return <AuthShell title={title} description={description}>
    <PublicPaymentForm endpoint={endpoint} fixedAmount={amount(source)} />
  </AuthShell>
}
