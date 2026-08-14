import "server-only"

import { isScale9AdminRole, refreshScale9Session } from "@/lib/scale9/auth"
import { Scale9ApiError, scale9Request, type RequestOptions } from "@/lib/scale9/client"
import { clearScale9Session, getScale9Session, setScale9Session } from "@/lib/scale9/session"

export async function scale9AdminRequest<T>(path: string, options: Omit<RequestOptions, "accessToken"> = {}) {
  const session = await getScale9Session()

  if (!session.accessToken || !session.refreshToken || !isScale9AdminRole(session.role)) {
    throw new Scale9ApiError("Admin authentication is required.", 401)
  }

  try {
    return await scale9Request<T>(path, { ...options, accessToken: session.accessToken })
  } catch (error) {
    if (!(error instanceof Scale9ApiError) || error.status !== 401) throw error
  }

  try {
    const tokens = await refreshScale9Session(session.refreshToken)
    await setScale9Session({ ...tokens, role: session.role })
    return await scale9Request<T>(path, { ...options, accessToken: tokens.accessToken })
  } catch (error) {
    await clearScale9Session()
    if (error instanceof Scale9ApiError) throw error
    throw new Scale9ApiError("Your session has expired.", 401)
  }
}
