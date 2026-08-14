import "server-only"

import { getScale9ApiUrl } from "@/lib/scale9/config"
import type { Scale9Envelope } from "@/lib/scale9/types"

export type RequestOptions = Omit<RequestInit, "body"> & {
  accessToken?: string
  body?: unknown
  timeoutMs?: number
}

type ErrorPayload = {
  message?: string | string[]
  error?: string
}

export class Scale9ApiError extends Error {
  readonly status: number
  readonly requestId?: string
  readonly payload?: unknown

  constructor(message: string, status: number, requestId?: string, payload?: unknown) {
    super(message)
    this.name = "Scale9ApiError"
    this.status = status
    this.requestId = requestId
    this.payload = payload
  }
}

function getErrorMessage(payload: ErrorPayload | undefined, status: number) {
  if (Array.isArray(payload?.message)) return payload.message.join(" ")
  if (payload?.message) return payload.message
  if (payload?.error) return payload.error
  return `Scale9 API request failed with status ${status}`
}

export async function scale9Request<T>(path: string, options: RequestOptions = {}) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs ?? 15_000)
  const headers = new Headers(options.headers)

  headers.set("Accept", "application/json")
  if (options.body !== undefined) headers.set("Content-Type", "application/json")
  if (options.accessToken) headers.set("Authorization", `Bearer ${options.accessToken}`)

  try {
    const response = await fetch(new URL(path, getScale9ApiUrl()), {
      ...options,
      body: options.body === undefined ? undefined : JSON.stringify(options.body),
      cache: "no-store",
      headers,
      signal: controller.signal,
    })
    const requestId = response.headers.get("x-request-id") ?? undefined
    const payload = await response.json().catch(() => undefined)

    if (!response.ok) {
      throw new Scale9ApiError(
        getErrorMessage(payload as ErrorPayload | undefined, response.status),
        response.status,
        requestId,
        payload,
      )
    }

    return payload as Scale9Envelope<T>
  } catch (error) {
    if (error instanceof Scale9ApiError) throw error
    if (error instanceof Error && error.name === "AbortError") {
      throw new Scale9ApiError("Scale9 API request timed out", 504)
    }
    throw new Scale9ApiError("Scale9 API is unavailable", 503)
  } finally {
    clearTimeout(timeout)
  }
}
