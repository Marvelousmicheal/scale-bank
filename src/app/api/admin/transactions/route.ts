import { NextResponse, type NextRequest } from "next/server"
import { scale9AdminRequest } from "@/lib/scale9/admin-client"
import { toAdminPage, toAdminTransaction } from "@/lib/scale9/admin-models"
import { scale9RouteError } from "@/lib/scale9/route-response"

const filters = ["status", "channel", "category", "serviceType", "from", "to", "q"]

export async function GET(request: NextRequest) {
  const page = Math.max(1, Number(request.nextUrl.searchParams.get("page")) || 1)
  const limit = Math.min(100, Math.max(1, Number(request.nextUrl.searchParams.get("limit")) || 20))
  const query = new URLSearchParams({ page: String(page), limit: String(limit) })
  for (const filter of filters) {
    const value = request.nextUrl.searchParams.get(filter)
    if (value) query.set(filter, value)
  }

  try {
    const response = await scale9AdminRequest<unknown>(`/api/admin/transactions?${query}`)
    return NextResponse.json(toAdminPage(response.data, toAdminTransaction))
  } catch (error) {
    return scale9RouteError(error, "Unable to load transactions.")
  }
}
