import "server-only"

import { normalizeScale9Tokens } from "@/lib/scale9/auth"
import { scale9Request } from "@/lib/scale9/client"

export function requestOtp(phone: string) {
  return scale9Request<unknown>("/api/auth/request-otp", {
    method: "POST",
    body: { phone },
  })
}

export async function verifyOtp(phone: string, otp: string) {
  const response = await scale9Request<unknown>("/api/auth/verify-otp", {
    method: "POST",
    body: { phone, otp },
  })
  return normalizeScale9Tokens(response.data)
}

export async function verifyTwoFactor(challengeId: string, otp: string) {
  const response = await scale9Request<unknown>("/api/auth/2fa/verify", {
    method: "POST",
    body: { challengeId, otp },
  })
  return normalizeScale9Tokens(response.data)
}

export function resendTwoFactor(challengeId: string) {
  return scale9Request<unknown>("/api/auth/2fa/resend", {
    method: "POST",
    body: { challengeId },
  })
}

export function forgotPassword(identifier: string) {
  const field = identifier.includes("@") ? "email" : "phone"
  return scale9Request<unknown>("/api/auth/forgot-password", {
    method: "POST",
    body: { [field]: identifier },
  })
}

export function resetPassword(token: string, password: string, confirmPassword: string) {
  return scale9Request<unknown>("/api/auth/reset-password", {
    method: "POST",
    body: { token, password, confirmPassword },
  })
}

export function getPaymentLink(slug: string) {
  return scale9Request<unknown>(`/api/pay/${encodeURIComponent(slug)}`)
}

export function payPaymentLink(slug: string, body: PublicPaymentInput) {
  return scale9Request<unknown>(`/api/pay/${encodeURIComponent(slug)}`, {
    method: "POST",
    body,
  })
}

export function getCheckout(identifier: string) {
  return scale9Request<unknown>(`/api/pay/checkout/${encodeURIComponent(identifier)}`)
}

export function payCheckout(identifier: string, body: PublicPaymentInput) {
  return scale9Request<unknown>(`/api/pay/checkout/${encodeURIComponent(identifier)}/pay`, {
    method: "POST",
    body,
  })
}

export type PublicPaymentInput = {
  amount: number
  payerName?: string
  payerEmail?: string
  externalReference: string
}
