import { NextResponse, type NextRequest } from "next/server"
import { scale9AdminRequest } from "@/lib/scale9/admin-client"
import { toAdminPage, toAdminVerification, type AdminVerification } from "@/lib/scale9/admin-models"
import { scale9RouteError } from "@/lib/scale9/route-response"

const sourceLimit = 100

export async function GET(request: NextRequest) {
  const page = Math.max(1, Number(request.nextUrl.searchParams.get("page")) || 1)
  const limit = Math.min(100, Math.max(1, Number(request.nextUrl.searchParams.get("limit")) || 20))
  const status = request.nextUrl.searchParams.get("status")

  try {
    const [kycTotal, kybTotal] = await Promise.all([
      getTotal("/api/admin/kyc", "KYC", status),
      getTotal("/api/admin/kyc/business", "KYB", status),
    ])
    const total = kycTotal + kybTotal
    const offset = (page - 1) * limit
    const kycStart = Math.min(offset, kycTotal)
    const kycCount = Math.min(limit, Math.max(0, kycTotal - offset))
    const kybStart = Math.max(0, offset - kycTotal)
    const kybCount = Math.min(limit - kycCount, Math.max(0, kybTotal - kybStart))
    const [kycItems, kybItems] = await Promise.all([
      getRange("/api/admin/kyc", "KYC", kycStart, kycCount, status),
      getRange("/api/admin/kyc/business", "KYB", kybStart, kybCount, status),
    ])

    return NextResponse.json({
      items: [...kycItems, ...kybItems],
      meta: { page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) },
      counts: { kyc: kycTotal, kyb: kybTotal },
    })
  } catch (error) {
    return scale9RouteError(error, "Unable to load verification records.")
  }
}

async function getTotal(path: string, type: "KYC" | "KYB", status: string | null) {
  const response = await scale9AdminRequest<unknown>(`${path}?${createQuery(1, 1, status)}`)
  return toAdminPage(response.data, (item) => toAdminVerification(item, type)).meta.total
}

async function getRange(path: string, type: "KYC" | "KYB", start: number, count: number, status: string | null) {
  if (count === 0) return []
  const items: AdminVerification[] = []
  let cursor = start

  while (items.length < count) {
    const sourcePage = Math.floor(cursor / sourceLimit) + 1
    const pageOffset = cursor % sourceLimit
    const response = await scale9AdminRequest<unknown>(`${path}?${createQuery(sourcePage, sourceLimit, status)}`)
    const source = toAdminPage(response.data, (item) => toAdminVerification(item, type)).items
    const next = source.slice(pageOffset, pageOffset + count - items.length)
    if (next.length === 0) break
    items.push(...next)
    cursor += next.length
  }

  return items
}

function createQuery(page: number, limit: number, status: string | null) {
  const query = new URLSearchParams({ page: String(page), limit: String(limit) })
  if (status) query.set("status", status)
  return query
}
