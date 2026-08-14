"use client"

import { useEffect, useMemo, useState } from "react"
import PageHeader from "@/components/PageHeader"
import ApiLoadingState from "@/components/ApiLoadingState"
import CreateDisputeModal from "@/components/disputes/CreateDisputeModal"
import DisputesTable, { type DisputeTableRow } from "@/components/disputes/DisputesTable"
import { FilterButton, SearchField } from "@/components/pos/PosControls"
import { Button } from "@/components/ui/button"
import { disputes } from "@/lib/dispute-data"
import type { AdminDispute, AdminPage } from "@/lib/scale9/admin-models"

const statuses = ["", "OPEN", "INVESTIGATING", "RESOLVED", "REJECTED"]

export default function DisputeAndCompliancePage() {
  const [data, setData] = useState<AdminPage<AdminDispute>>()
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState("")
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [viewMode, setViewMode] = useState<"live" | "mock">("live")

  useEffect(() => {
    const controller = new AbortController()
    const params = new URLSearchParams({ page: String(page), limit: "20" })
    if (status) params.set("status", status)
    fetch(`/api/admin/disputes?${params}`, { signal: controller.signal })
      .then(async (response) => {
        const payload = await response.json()
        if (!response.ok) throw new Error(payload.message || "Unable to load disputes.")
        setData(payload)
      })
      .catch((requestError) => {
        if (requestError.name !== "AbortError") setError(requestError.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })
    return () => controller.abort()
  }, [page, status])

  const mockRows = useMemo(() => disputes
    .filter((dispute) => [dispute.disputeId, dispute.transactionId, dispute.user, dispute.business, dispute.type, dispute.status]
      .some((value) => value.toLowerCase().includes(query.trim().toLowerCase())))
    .map(toMockRow), [query])
  const liveRows = useMemo(() => (data?.items ?? [])
    .filter((dispute) => [dispute.id, dispute.reason, dispute.status]
      .some((value) => value.toLowerCase().includes(query.trim().toLowerCase())))
    .map(toLiveRow), [data, query])

  return <div className="flex min-h-full flex-col gap-[15px] px-[30px] pb-4 pt-[46px]">
    <div className="flex items-start justify-between gap-6"><PageHeader title="Disputes & Chargebacks" description="Manage payment disputes, fraud reports, and chargeback investigations." /><div className="flex rounded-[10px] border border-light-gray/10 bg-app-black p-1" role="group" aria-label="Dispute data view"><button type="button" aria-pressed={viewMode === "live"} onClick={() => setViewMode("live")} className={`rounded-[7px] px-4 py-2 text-sm font-bold focus-visible:outline-2 focus-visible:outline-app-green ${viewMode === "live" ? "bg-accent-purple text-white" : "text-ink-muted"}`}>Live API</button><button type="button" aria-pressed={viewMode === "mock"} onClick={() => setViewMode("mock")} className={`rounded-[7px] px-4 py-2 text-sm font-bold focus-visible:outline-2 focus-visible:outline-app-green ${viewMode === "mock" ? "bg-accent-purple text-white" : "text-ink-muted"}`}>Mock preview</button></div></div>
    {viewMode === "mock" && <div role="status" className="rounded-[10px] border border-app-yellow/20 bg-app-yellow/5 px-4 py-3 text-sm text-app-yellow">Preview data only. These disputes are not returned by the staging API.</div>}
    <section><h2 className="mb-3 text-base font-bold">Dispute metrics</h2><div className="grid grid-cols-5 gap-3"><Metric label="Open Disputes" value={viewMode === "mock" ? "24" : "—"} featured /><Metric label="Chargebacks" value={viewMode === "mock" ? "11" : "—"} /><Metric label="Resolved This Week" value={viewMode === "mock" ? "28" : "—"} /><Metric label="Refund Value" value={viewMode === "mock" ? "₦3,420,000" : "—"} /><Metric label="Fraud Flags" value={viewMode === "mock" ? "7" : "—"} /></div></section>
    <section className="rounded-[12px] border border-light-gray/10 bg-app-black px-[15px] py-[18px]"><div className="mb-[25px] flex items-center justify-between"><h2 className="text-xl font-bold">Dispute list</h2><CreateDisputeModal disabled={viewMode === "live"} /></div><div className="space-y-5"><SearchField placeholder="Search disputes by transaction ID or user" value={query} onChange={setQuery} /><div className="flex gap-[15px]"><label className="relative flex h-[45px] flex-1 items-center rounded-[8px] border border-light-gray/10 bg-surface-raised"><span className="sr-only">Dispute Status</span><select value={status} onChange={(event) => { setLoading(true); setError(""); setPage(1); setStatus(event.target.value) }} className="size-full appearance-none bg-transparent px-[15px] text-sm font-bold text-ink-muted outline-none"><option value="">Dispute Status</option>{statuses.slice(1).map((option) => <option key={option}>{option}</option>)}</select><span aria-hidden="true" className="pointer-events-none absolute right-[15px] text-ink-soft">⌄</span></label><FilterButton disabled={viewMode === "live"}>Dispute Type</FilterButton><FilterButton disabled={viewMode === "live"}>Transaction Channel</FilterButton><FilterButton disabled={viewMode === "live"}>Priority Level</FilterButton><FilterButton calendar disabled={viewMode === "live"}>Date Range</FilterButton></div></div></section>
    <section className="flex min-h-[320px] flex-1 flex-col rounded-[12px] border border-light-gray/10 bg-app-black p-5" aria-busy={viewMode === "live" && loading}>
      {viewMode === "mock" ? <DisputesTable rows={mockRows} showing={`Showing ${mockRows.length ? 1 : 0} to ${mockRows.length} of ${mockRows.length} entries`} /> : error ? <ErrorState message={error} /> : loading ? <ApiLoadingState label="Loading disputes" /> : liveRows.length ? <DisputesTable rows={liveRows} showing={paginationLabel(data!.meta.page, data!.meta.limit, data!.meta.total)} current={data!.meta.page} total={data!.meta.totalPages} onPageChange={(next) => { setLoading(true); setError(""); setPage(next) }} /> : <EmptyState meta={data?.meta} />}
      {viewMode === "live" && data && !loading && !error && !liveRows.length && <DisputesTable rows={[]} showing={paginationLabel(data.meta.page, data.meta.limit, data.meta.total)} current={data.meta.page} total={data.meta.totalPages} onPageChange={(next) => { setLoading(true); setError(""); setPage(next) }} empty />}
    </section>
  </div>
}

function toLiveRow(dispute: AdminDispute): DisputeTableRow { return { key: dispute.id, href: `/dispute-and-compliance/${encodeURIComponent(dispute.id)}`, disputeId: dispute.id, transactionId: "—", user: "—", business: "—", type: dispute.reason, amount: "—", date: displayDate(dispute.createdAt), priority: "—", status: displayStatus(dispute.status) } }
function toMockRow(dispute: (typeof disputes)[number]): DisputeTableRow { return { key: dispute.slug, href: `/dispute-and-compliance/${dispute.slug}`, disputeId: dispute.disputeId, transactionId: dispute.transactionId, user: dispute.user, business: dispute.business, type: dispute.type, amount: dispute.amount, date: "03.02.2026 12:45 PM", priority: dispute.priority, status: dispute.status } }
function Metric({ label, value, featured = false }: { label: string; value: string; featured?: boolean }) { return <article className={`rounded-[20px] border px-[25px] py-[18px] ${featured ? "border-app-green/20 bg-metric-featured" : "border-light-gray/5 bg-app-black"}`}><p className="text-sm text-white">{label}</p><p className={`text-2xl font-bold ${featured ? "text-white" : "text-app-green"}`}>{value}</p></article> }
function EmptyState({ meta }: { meta?: AdminPage<AdminDispute>["meta"] }) { return <div className="flex flex-1 items-center justify-center text-center"><div><h2 className="text-lg font-bold">No disputes found</h2><p className="mt-1 text-sm text-ink-muted">No disputes match the current status.</p><span className="sr-only">{meta?.total ?? 0} disputes</span></div></div> }
function ErrorState({ message }: { message: string }) { return <div role="alert" className="flex flex-1 items-center justify-center text-center"><div><h2 className="text-lg font-bold">Disputes could not be loaded</h2><p className="my-3 text-sm text-app-light-red">{message}</p><Button onClick={() => window.location.reload()}>Try again</Button></div></div> }
function displayDate(value: string) { const date = new Date(value); return value && !Number.isNaN(date.getTime()) ? new Intl.DateTimeFormat("en-NG", { dateStyle: "medium", timeStyle: "short" }).format(date) : "—" }
function displayStatus(value: string) { const normalized = value.toUpperCase(); return normalized === "INVESTIGATING" ? "Under Review" : normalized ? normalized.charAt(0) + normalized.slice(1).toLowerCase() : "—" }
function paginationLabel(page: number, limit: number, total: number) { const start = total === 0 ? 0 : (page - 1) * limit + 1; return `Showing ${start} to ${Math.min(page * limit, total)} of ${total} entries` }
