import { NextResponse } from "next/server"
import { scale9AdminRequest } from "@/lib/scale9/admin-client"
import { toAdminTransaction } from "@/lib/scale9/admin-models"
import { scale9RouteError } from "@/lib/scale9/route-response"

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const response = await scale9AdminRequest<unknown>(`/api/admin/transactions/${encodeURIComponent(id)}`)
    return NextResponse.json(toAdminTransaction(response.data))
  } catch (error) {
    return scale9RouteError(error, "Unable to load transaction.")
  }
}
