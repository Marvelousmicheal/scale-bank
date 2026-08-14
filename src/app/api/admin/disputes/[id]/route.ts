import { NextResponse } from "next/server"
import { scale9AdminRequest } from "@/lib/scale9/admin-client"
import { toAdminDispute } from "@/lib/scale9/admin-models"
import { scale9RouteError } from "@/lib/scale9/route-response"

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const response = await scale9AdminRequest<unknown>(`/api/admin/transactions/disputes/${encodeURIComponent(id)}`)
    return NextResponse.json(toAdminDispute(response.data))
  } catch (error) {
    return scale9RouteError(error, "Unable to load dispute.")
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const body = await request.json()
    const response = await scale9AdminRequest<unknown>(`/api/admin/transactions/disputes/${encodeURIComponent(id)}`, {
      method: "PATCH",
      body,
    })
    return NextResponse.json(toAdminDispute(response.data))
  } catch (error) {
    return scale9RouteError(error, "Unable to update dispute.")
  }
}
