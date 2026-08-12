"use client"

import { useState, type FormEvent } from "react"
import { LoaderCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function PublicPaymentForm({ endpoint, fixedAmount }: { endpoint: string; fixedAmount?: number }) {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setError("")
    setMessage("")
    const values = Object.fromEntries(new FormData(event.currentTarget))

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      const payload = await response.json() as { message?: string; data?: { authorizationUrl?: string; authorization_url?: string } }
      if (!response.ok) {
        setError(payload.message || "Unable to start the payment.")
        return
      }
      const authorizationUrl = payload.data?.authorizationUrl || payload.data?.authorization_url
      if (authorizationUrl) {
        window.location.assign(authorizationUrl)
        return
      }
      setMessage(payload.message || "Payment initiated successfully.")
    } catch {
      setError("Unable to reach the payment service. Try again shortly.")
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5" aria-busy={pending}>
      <Field id="amount" label="Amount (NGN)" type="number" min="1" step="0.01" defaultValue={fixedAmount} readOnly={fixedAmount !== undefined} />
      <Field id="payerName" label="Name" maxLength={80} autoComplete="name" />
      <Field id="payerEmail" label="Email" type="email" maxLength={120} autoComplete="email" />
      {error && <p id="payment-error" role="alert" className="rounded-lg border border-app-red/30 bg-app-red/10 px-4 py-3 text-sm text-app-light-red">{error}</p>}
      {message && <p role="status" className="rounded-lg border border-app-green/30 bg-app-green/10 px-4 py-3 text-sm text-app-green">{message}</p>}
      <Button type="submit" disabled={pending} className="h-12 w-full bg-app-green text-base font-bold text-black hover:bg-app-green/90">
        {pending && <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />}
        {pending ? "Starting payment" : "Continue to payment"}
      </Button>
    </form>
  )
}

function Field({ id, label, ...props }: React.ComponentProps<"input"> & { id: string; label: string }) {
  return <div className="space-y-2">
    <label htmlFor={id} className="text-sm font-medium text-ink-bright">{label}</label>
    <Input id={id} name={id} required aria-describedby="payment-error" className="h-12 border-white/10 bg-surface-input px-4 text-base text-white focus-visible:border-app-green focus-visible:ring-app-green/20 read-only:opacity-70" {...props} />
  </div>
}
