import "server-only"

import { cookies } from "next/headers"
import type { Scale9Tokens } from "@/lib/scale9/types"

export const ACCESS_TOKEN_COOKIE = "scale9_access_token"
export const REFRESH_TOKEN_COOKIE = "scale9_refresh_token"
export const ROLE_COOKIE = "scale9_role"

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  priority: "high" as const,
}

export async function setScale9Session(tokens: Scale9Tokens) {
  const cookieStore = await cookies()
  const accessMaxAge = tokens.expiresIn && tokens.expiresIn > 0 ? tokens.expiresIn : 15 * 60

  cookieStore.set(ACCESS_TOKEN_COOKIE, tokens.accessToken, {
    ...cookieOptions,
    maxAge: accessMaxAge,
  })
  cookieStore.set(REFRESH_TOKEN_COOKIE, tokens.refreshToken, {
    ...cookieOptions,
    maxAge: 30 * 24 * 60 * 60,
  })
  if (tokens.role) {
    cookieStore.set(ROLE_COOKIE, tokens.role, {
      ...cookieOptions,
      maxAge: 30 * 24 * 60 * 60,
    })
  }
}

export async function clearScale9Session() {
  const cookieStore = await cookies()
  cookieStore.delete(ACCESS_TOKEN_COOKIE)
  cookieStore.delete(REFRESH_TOKEN_COOKIE)
  cookieStore.delete(ROLE_COOKIE)
}

export async function getScale9Session() {
  const cookieStore = await cookies()

  return {
    accessToken: cookieStore.get(ACCESS_TOKEN_COOKIE)?.value,
    refreshToken: cookieStore.get(REFRESH_TOKEN_COOKIE)?.value,
    role: cookieStore.get(ROLE_COOKIE)?.value,
  }
}
