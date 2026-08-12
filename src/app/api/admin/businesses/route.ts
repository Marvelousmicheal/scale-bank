import { NextResponse, type NextRequest } from "next/server"
import { scale9AdminRequest } from "@/lib/scale9/admin-client"
import { toAdminBusiness, toAdminPage } from "@/lib/scale9/admin-models"
import { scale9RouteError } from "@/lib/scale9/route-response"

export async function GET(request: NextRequest) {
  const page = Math.max(1, Number(request.nextUrl.searchParams.get("page")) || 1)
  const limit = Math.min(100, Math.max(1, Number(request.nextUrl.searchParams.get("limit")) || 20))

  try {
    const response = await scale9AdminRequest<unknown>(`/api/admin/users/businesses?page=${page}&limit=${limit}`)
    return NextResponse.json(toAdminPage(response.data, toAdminBusiness))
  } catch (error) {
    return scale9RouteError(error, "Unable to load businesses.")
  }
}
