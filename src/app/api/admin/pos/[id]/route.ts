import { NextResponse } from "next/server"
import { scale9AdminRequest } from "@/lib/scale9/admin-client"
import { toAdminPosDevice } from "@/lib/scale9/admin-models"
import { scale9RouteError } from "@/lib/scale9/route-response"

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const response = await scale9AdminRequest<unknown>(`/api/admin/pos/${encodeURIComponent(id)}`)
    return NextResponse.json(toAdminPosDevice(response.data))
  } catch (error) {
    return scale9RouteError(error, "Unable to load POS device.")
  }
}
