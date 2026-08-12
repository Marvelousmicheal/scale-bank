import "server-only"

import { scale9Request } from "@/lib/scale9/client"
import type { Scale9LoginResult, Scale9Tokens } from "@/lib/scale9/types"

type UnknownRecord = Record<string, unknown>

function asRecord(value: unknown): UnknownRecord {
  return value && typeof value === "object" ? (value as UnknownRecord) : {}
}

function findString(source: UnknownRecord, keys: string[]) {
  for (const key of keys) {
    const value = source[key]
    if (typeof value === "string" && value.length > 0) return value
  }
}

export function normalizeScale9Tokens(value: unknown): Scale9LoginResult {
  const root = asRecord(value)
  const nested = asRecord(root.tokens)
  const user = asRecord(root.user)
  const accessToken = findString(root, ["accessToken", "access_token", "token"]) ?? findString(nested, ["accessToken", "access_token", "token"])
  const refreshToken = findString(root, ["refreshToken", "refresh_token"]) ?? findString(nested, ["refreshToken", "refresh_token"])

  if (!accessToken || !refreshToken) {
    const requiresTwoFactor = root.requiresTwoFactor === true || root.requires2FA === true
    if (requiresTwoFactor) {
      return {
        accessToken: "",
        refreshToken: "",
        requiresTwoFactor: true,
        challengeId: findString(root, ["challengeId", "challenge_id"]),
      }
    }
    throw new Error("Scale9 returned an unrecognized authentication response")
  }

  const expiresIn = root.expiresIn ?? nested.expiresIn

  return {
    accessToken,
    refreshToken,
    expiresIn: typeof expiresIn === "number" ? expiresIn : undefined,
    role: findString(user, ["role"]) ?? findString(root, ["role"]),
  }
}

export function isScale9AdminRole(role: string | undefined) {
  return role === "ADMIN" || role === "SUPER_ADMIN"
}

export async function loginToScale9(identifier: string, password: string) {
  const response = await scale9Request<unknown>("/api/auth/login", {
    method: "POST",
    body: { identifier, password },
  })
  return normalizeScale9Tokens(response.data)
}

export async function refreshScale9Session(refreshToken: string): Promise<Scale9Tokens> {
  const response = await scale9Request<unknown>("/api/auth/refresh", {
    method: "POST",
    body: { refreshToken },
  })
  const tokens = normalizeScale9Tokens(response.data)

  if (!tokens.accessToken || !tokens.refreshToken) {
    throw new Error("Scale9 did not return refreshed tokens")
  }

  return tokens
}
