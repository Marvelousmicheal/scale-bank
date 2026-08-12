"use client"

import { useState, type FormEvent } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { LoaderCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState("")
  const [pending, setPending] = useState(false)
  const [challengeId, setChallengeId] = useState("")

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setPending(true)

    const formData = new FormData(event.currentTarget)

    try {
      const response = await fetch(challengeId ? "/api/auth/2fa/verify" : "/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(challengeId ? {
          challengeId,
          otp: formData.get("otp"),
        } : {
          identifier: formData.get("identifier"),
          password: formData.get("password"),
        }),
      })
      const payload = (await response.json()) as {
        message?: string
        requiresTwoFactor?: boolean
        challengeId?: string
      }

      if (response.status === 202 && payload.requiresTwoFactor) {
        if (!payload.challengeId) {
          setError("Scale9 did not return a two-factor challenge.")
          return
        }
        setChallengeId(payload.challengeId)
        return
      }

      if (!response.ok) {
        setError(payload.message || "Unable to sign in.")
        return
      }

      const destination = searchParams.get("next")
      const safeDestination = destination?.startsWith("/") && !destination.startsWith("//") ? destination : "/"
      router.replace(safeDestination)
      router.refresh()
    } catch {
      setError("Unable to reach the sign-in service. Try again shortly.")
    } finally {
      setPending(false)
    }
  }

  async function resendCode() {
    setPending(true)
    setError("")
    try {
      const response = await fetch("/api/auth/2fa/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId }),
      })
      const payload = await response.json() as { message?: string }
      if (!response.ok) setError(payload.message || "Unable to resend the code.")
    } catch {
      setError("Unable to reach the sign-in service. Try again shortly.")
    } finally {
      setPending(false)
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} aria-busy={pending}>
      {!challengeId && <div className="space-y-2">
        <label htmlFor="identifier" className="text-sm font-medium text-ink-bright">
          Email or phone number
        </label>
        <Input
          id="identifier"
          name="identifier"
          autoComplete="username"
          required
          aria-describedby={error ? "login-error" : undefined}
          aria-invalid={Boolean(error)}
          className="h-12 border-white/10 bg-surface-input px-4 text-base text-white placeholder:text-ink-dim focus-visible:border-app-green focus-visible:ring-app-green/20"
          placeholder="admin@scalebank.com"
        />
      </div>}
      {!challengeId && <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-ink-bright">
          Password
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          minLength={6}
          required
          aria-describedby={error ? "login-error" : undefined}
          aria-invalid={Boolean(error)}
          className="h-12 border-white/10 bg-surface-input px-4 text-base text-white placeholder:text-ink-dim focus-visible:border-app-green focus-visible:ring-app-green/20"
          placeholder="Enter your password"
        />
      </div>}
      {challengeId && <div className="space-y-2">
        <label htmlFor="otp" className="text-sm font-medium text-ink-bright">Six-digit verification code</label>
        <Input id="otp" name="otp" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} autoComplete="one-time-code" required className="h-12 border-white/10 bg-surface-input px-4 text-base text-white focus-visible:border-app-green focus-visible:ring-app-green/20" />
      </div>}
      {error && (
        <p id="login-error" role="alert" className="rounded-lg border border-app-red/30 bg-app-red/10 px-4 py-3 text-sm text-app-light-red">
          {error}
        </p>
      )}
      <Button
        type="submit"
        disabled={pending}
        className="h-12 w-full bg-app-green text-base font-bold text-black hover:bg-app-green/90 focus-visible:ring-app-green/40"
      >
        {pending && <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />}
        {pending ? "Signing in" : challengeId ? "Verify and sign in" : "Sign in"}
      </Button>
      {!challengeId && <div className="flex items-center justify-between text-sm">
        <Link href="/login/otp" className="font-medium text-app-green hover:underline">Sign in with OTP</Link>
        <Link href="/login/forgot-password" className="font-medium text-ink-bright hover:text-app-green">Forgot password?</Link>
      </div>}
      {challengeId && <button type="button" onClick={resendCode} disabled={pending} className="w-full text-center text-sm font-medium text-app-green hover:underline disabled:opacity-50">Resend verification code</button>}
    </form>
  )
}
