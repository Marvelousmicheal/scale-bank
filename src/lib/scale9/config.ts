const DEFAULT_API_URL = "https://api.scale9.ng"

export function getScale9ApiUrl() {
  const value = process.env.SCALE9_API_BASE_URL?.trim() || DEFAULT_API_URL

  try {
    return new URL(value).origin
  } catch {
    throw new Error("SCALE9_API_BASE_URL must be a valid absolute URL")
  }
}
