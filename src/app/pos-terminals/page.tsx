"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import PageHeader from "@/components/PageHeader"
import ApiLoadingState from "@/components/ApiLoadingState"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import TablePagination from "@/components/TablePagination"
import TruncatedIdentifier from "@/components/TruncatedIdentifier"
import type { AdminPage, AdminPosDevice } from "@/lib/scale9/admin-models"

const statuses = ["", "ACTIVE", "INACTIVE", "DISABLED"]

export default function POSTerminalsPage() {
  const [data, setData] = useState<AdminPage<AdminPosDevice>>()
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState("")
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const controller = new AbortController()
    const params = new URLSearchParams({ page: String(page), limit: "20" })
    if (status) params.set("status", status)
    fetch(`/api/admin/pos?${params}`, { signal: controller.signal })
      .then(async (response) => { const payload = await response.json(); if (!response.ok) throw new Error(payload.message || "Unable to load POS devices."); setData(payload) })
      .catch((requestError) => { if (requestError.name !== "AbortError") setError(requestError.message) })
      .finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [page, status])

  const devices = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return data?.items || []
    return (data?.items || []).filter((device) => [device.id, device.serialNumber, device.business, device.status].some((value) => value.toLowerCase().includes(normalized)))
  }, [data, query])
  const totalDevices = data?.meta.total ?? 0

  return <div className="flex min-h-full flex-col gap-[31px] px-[30px] pb-4 pt-[46px]">
    <PageHeader title="POS Devices" description="Monitor all ScanBank POS terminals deployed across businesses." />
    <section className="grid grid-cols-5 gap-3"><Metric label="Total Devices" value={String(totalDevices)} featured /><Metric label="Active Devices" value="—" /><Metric label="Offline Devices" value="—" /><Metric label="Suspended Devices" value="—" /><Metric label="Unassigned Devices" value="—" /></section>
    <section className="space-y-5 rounded-[12px] border border-light-gray/10 bg-app-black p-5"><div className="flex items-center justify-between"><h1 className="text-xl font-bold text-white">POS list</h1><label className="flex items-center gap-3 text-sm text-ink-muted">Status<select aria-label="Filter by POS status" value={status} onChange={(event) => { setLoading(true); setError(""); setPage(1); setStatus(event.target.value) }} className="h-10 rounded-lg border border-light-gray/10 bg-surface-raised px-3 text-white"><option value="">All statuses</option>{statuses.slice(1).map((item) => <option key={item}>{item}</option>)}</select></label></div><label className="relative block"><span className="sr-only">Search POS devices</span><Search aria-hidden="true" className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-ink-muted" /><Input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by device ID, serial number, business, or status" className="h-11 border-light-gray/10 bg-surface-raised pl-10 text-white" /></label></section>
    <section className="flex min-h-[320px] flex-1 flex-col rounded-[12px] border border-light-gray/10 bg-app-black p-5" aria-busy={loading}>
      {error ? <ErrorState message={error} /> : loading ? <ApiLoadingState label="Loading POS devices" /> : devices.length === 0 ? <EmptyState /> : <DeviceTable devices={devices} />}
      {data && !loading && !error && <TablePagination ariaLabel="POS pagination" showing={paginationLabel(data.meta.page, data.meta.limit, data.meta.total)} current={data.meta.page} total={data.meta.totalPages} onPageChange={(next) => { setLoading(true); setError(""); setPage(next) }} />}
    </section>
  </div>
}

function DeviceTable({ devices }: { devices: AdminPosDevice[] }) {
  const router = useRouter()
  return <div className="min-h-0 flex-1 overflow-x-auto"><table className="w-full border-separate border-spacing-y-2.5"><thead><tr className="text-left text-sm font-bold">{["Device ID", "Serial Number", "Business / Merchant", "Location", "Today's Volume", "Last Activity", "Status"].map((title) => <th key={title} className="px-[15px] py-2">{title}</th>)}</tr></thead><tbody>{devices.map((device) => <tr key={device.id} tabIndex={0} onClick={() => router.push(`/pos-terminals/${device.id}`)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") router.push(`/pos-terminals/${device.id}`) }} className="h-[55px] cursor-pointer outline-none focus-visible:[&>td]:border-app-blue/60"><td className="w-[135px] max-w-[135px] rounded-l-lg border-y border-l border-light-gray/10 bg-surface-raised px-[15px] font-bold text-white"><TruncatedIdentifier value={device.id} className="max-w-[105px]" /></td><td className="w-[150px] max-w-[150px] border-y border-light-gray/10 bg-surface-raised px-[15px] text-ink-soft"><TruncatedIdentifier value={device.serialNumber} className="max-w-[120px]" /></td><td className="border-y border-light-gray/10 bg-surface-raised px-[15px]"><p className="font-bold text-white">{device.businessId ? device.business : "—"}</p><p className="text-xs text-ink-muted">—</p></td><td className="border-y border-light-gray/10 bg-surface-raised px-[15px] text-white">—</td><td className="border-y border-light-gray/10 bg-surface-raised px-[15px] text-white">—</td><td className="border-y border-light-gray/10 bg-surface-raised px-[15px] text-ink-muted">{displayDate(device.lastSeenAt)}</td><td className="rounded-r-lg border-y border-r border-light-gray/10 bg-surface-raised px-[15px]"><Status value={displayStatus(device)} /></td></tr>)}</tbody></table></div>
}
function Status({ value }: { value: string }) { const style = value === "Online" ? "bg-app-green/5 text-app-green" : value === "Suspended" ? "bg-app-yellow/5 text-app-yellow" : "bg-white/[0.03] text-ink-muted"; return <span className={`block w-[107px] rounded-[7px] px-2 py-1 text-center text-sm ${style}`}>{value}</span> }
function Metric({ label, value, featured = false }: { label: string; value: string; featured?: boolean }) { return <article className={`rounded-[20px] border px-[25px] py-[18px] ${featured ? 'border-app-green/20 bg-metric-featured' : 'border-light-gray/5 bg-app-black'}`}><p className="text-sm text-white">{label}</p><p className={`text-2xl font-bold ${featured ? 'text-white' : 'text-app-green'}`}>{value}</p></article> }
function EmptyState() { return <div className="flex flex-1 items-center justify-center text-center"><div><h2 className="text-lg font-bold text-white">No POS devices</h2><p className="mt-1 text-sm text-ink-muted">The staging API currently has no POS devices matching this filter.</p></div></div> }
function ErrorState({ message }: { message: string }) { return <div role="alert" className="flex flex-1 items-center justify-center text-center"><div><h2 className="text-lg font-bold text-white">POS devices could not be loaded</h2><p className="my-3 text-sm text-app-light-red">{message}</p><Button onClick={() => window.location.reload()}>Try again</Button></div></div> }
function formatDate(value: string) { const date = new Date(value); return Number.isNaN(date.getTime()) ? "Not reported" : new Intl.DateTimeFormat("en-NG", { dateStyle: "medium", timeStyle: "short" }).format(date) }
function displayDate(value: string) { return value ? formatDate(value) : "—" }
function displayStatus(device: AdminPosDevice) { if (!device.businessId) return "Unassigned"; if (device.status === "ACTIVE") return "Online"; if (device.status === "DISABLED") return "Suspended"; return "Offline" }
function paginationLabel(page: number, limit: number, total: number) { const start = total === 0 ? 0 : (page - 1) * limit + 1; const end = Math.min(page * limit, total); return `Showing ${start} to ${end} of ${total} entries` }
