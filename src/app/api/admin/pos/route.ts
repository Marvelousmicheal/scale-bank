import { NextResponse, type NextRequest } from "next/server"
import { scale9AdminRequest } from "@/lib/scale9/admin-client"
import { toAdminPage, toAdminPosDevice } from "@/lib/scale9/admin-models"
import { scale9RouteError } from "@/lib/scale9/route-response"

export async function GET(request: NextRequest) {
  const page = Math.max(1, Number(request.nextUrl.searchParams.get("page")) || 1)
  const limit = Math.min(100, Math.max(1, Number(request.nextUrl.searchParams.get("limit")) || 20))
  const status = request.nextUrl.searchParams.get("status")
  const query = new URLSearchParams({ page: String(page), limit: String(limit) })
  if (status) query.set("status", status)

  try {
    const response = await scale9AdminRequest<unknown>(`/api/admin/pos?${query}`)
    return NextResponse.json(toAdminPage(response.data, toAdminPosDevice))
  } catch (error) {
    return scale9RouteError(error, "Unable to load POS devices.")
  }
}
