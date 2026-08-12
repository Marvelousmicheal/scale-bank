import { NextResponse } from "next/server"
import { scale9AdminRequest } from "@/lib/scale9/admin-client"
import { toAdminUser } from "@/lib/scale9/admin-models"
import { scale9RouteError } from "@/lib/scale9/route-response"

export async function GET(_request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params

  try {
    const response = await scale9AdminRequest<unknown>(`/api/admin/users/${encodeURIComponent(id)}`)
    return NextResponse.json(toAdminUser(response.data))
  } catch (error) {
    return scale9RouteError(error, "Unable to load the user.")
  }
}
