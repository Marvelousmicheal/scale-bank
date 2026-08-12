"use client"

import Link from "next/link"
import { useState, type FormEvent } from "react"
import { LoaderCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Mode = "otp" | "forgot" | "reset"

export function PublicAuthForm({ mode }: { mode: Mode }) {
  const [pending, setPending] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [otpRequested, setOtpRequested] = useState(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPending(true)
    setMessage("")
    setError("")
    const values = Object.fromEntries(new FormData(event.currentTarget))
    const endpoint = `/api/auth/${mode === "otp" ? (otpRequested ? "verify-otp" : "request-otp") : mode === "forgot" ? "forgot-password" : "reset-password"}`

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      const payload = await response.json() as { message?: string }
      if (!response.ok) {
        setError(payload.message || "Unable to complete the request.")
        return
      }
      if (mode === "otp" && !otpRequested) {
        setOtpRequested(true)
        setMessage("A verification code has been requested.")
        return
      }
      setMessage(payload.message || (mode === "reset" ? "Password updated successfully." : "Request completed successfully."))
      if (mode === "otp") window.location.assign("/")
    } catch {
      setError("Unable to reach the service. Try again shortly.")
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5" aria-busy={pending}>
      {mode === "forgot" && <Field id="identifier" label="Email or phone number" autoComplete="username" />}
      {mode === "otp" && <Field id="phone" label="Phone number" autoComplete="tel" readOnly={otpRequested} />}
      {mode === "otp" && otpRequested && <Field id="otp" label="Six-digit verification code" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} autoComplete="one-time-code" />}
      {mode === "reset" && <Field id="token" label="Six-digit reset code" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} autoComplete="one-time-code" />}
      {mode === "reset" && <Field id="password" label="New password" type="password" minLength={6} autoComplete="new-password" />}
      {mode === "reset" && <Field id="confirmPassword" label="Confirm new password" type="password" minLength={6} autoComplete="new-password" />}
      {error && <p id="auth-error" role="alert" className="rounded-lg border border-app-red/30 bg-app-red/10 px-4 py-3 text-sm text-app-light-red">{error}</p>}
      {message && <p role="status" className="rounded-lg border border-app-green/30 bg-app-green/10 px-4 py-3 text-sm text-app-green">{message}</p>}
      <Button type="submit" disabled={pending} className="h-12 w-full bg-app-green text-base font-bold text-black hover:bg-app-green/90">
        {pending && <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />}
        {pending ? "Please wait" : mode === "otp" ? (otpRequested ? "Verify and sign in" : "Request code") : mode === "forgot" ? "Send reset instructions" : "Reset password"}
      </Button>
      <Link href="/login" className="block text-center text-sm font-medium text-app-green hover:underline">Back to sign in</Link>
    </form>
  )
}

function Field({ id, label, ...props }: React.ComponentProps<"input"> & { id: string; label: string }) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium text-ink-bright">{label}</label>
      <Input id={id} name={id} required aria-describedby="auth-error" className="h-12 border-white/10 bg-surface-input px-4 text-base text-white focus-visible:border-app-green focus-visible:ring-app-green/20" {...props} />
    </div>
  )
}
