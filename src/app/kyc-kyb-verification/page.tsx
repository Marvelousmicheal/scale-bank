"use client"

import { useEffect, useMemo, useState } from "react"
import { Search, X } from "lucide-react"
import PageHeader from "@/components/PageHeader"
import ApiLoadingState from "@/components/ApiLoadingState"
import TablePagination from "@/components/TablePagination"
import TruncatedIdentifier from "@/components/TruncatedIdentifier"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { AdminPage, AdminVerification } from "@/lib/scale9/admin-models"

type VerificationResponse = AdminPage<AdminVerification> & { counts: { kyc: number; kyb: number } }
const statuses = ["", "PENDING", "APPROVED", "REJECTED", "FLAGGED"]

export default function KycKybVerificationPage() {
  const [data, setData] = useState<VerificationResponse>()
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState("")
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const controller = new AbortController()
    const params = new URLSearchParams({ page: String(page), limit: "20" })
    if (status) params.set("status", status)
    fetch(`/api/admin/verifications?${params}`, { signal: controller.signal })
      .then(async (response) => { const payload = await response.json(); if (!response.ok) throw new Error(payload.message || "Unable to load verification records."); setData(payload) })
      .catch((requestError) => { if (requestError.name !== "AbortError") setError(requestError.message) })
      .finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [page, status])

  const records = useMemo(() => filterLiveRecords(data?.items || [], query), [data, query])

  return <div className="flex min-h-full flex-col gap-[15px] px-[25px] pb-[30px] pt-[46px]">
    <PageHeader title="KYC & KYB Verification" description="Monitor identity and business verification processes." />
    <section className="grid grid-cols-3 gap-3">
      <Metric label="Total Approved" value="—" featured />
      <Metric label="Pending Reviews" value="—" />
      <Metric label="Rejected" value="—" />
      <Metric label="Avg Review Time" value="—" />
      <Metric label="Flagged" value="—" />
      <Metric label="Escalated Cases" value="—" />
    </section>
    <section className="space-y-5 rounded-[12px] border border-light-gray/10 bg-app-black p-[15px]">
      <div className="flex items-center justify-between"><h1 className="text-xl font-bold">KYC/KYB list</h1><label className="flex items-center gap-3 text-sm text-ink-muted">Status<select aria-label="Filter by status" value={status} onChange={(event) => { setLoading(true); setError(""); setPage(1); setStatus(event.target.value) }} className="h-10 rounded-lg border border-light-gray/10 bg-surface-raised px-3 text-white"><option value="">All statuses</option>{statuses.slice(1).map((item) => <option key={item} value={item}>{item}</option>)}</select></label></div>
      <label className="relative block"><span className="sr-only">Search verification records</span><Search aria-hidden="true" className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-ink-muted" /><Input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name, business, contact, type, status, or account ID" className="h-11 border-light-gray/10 bg-surface-raised pl-10 text-white" /></label>
    </section>
    <section className="flex min-h-[320px] flex-1 flex-col rounded-[12px] border border-light-gray/10 bg-app-black p-5" aria-busy={loading}>
      {error ? <ErrorState message={error} /> : loading ? <ApiLoadingState label="Loading verification records" /> : records.length === 0 ? <EmptyState /> : <LiveVerificationTable records={records} />}
      {data && !loading && !error && <TablePagination ariaLabel="Verification pagination" showing={paginationLabel(data.meta.page, data.meta.limit, data.meta.total)} current={data.meta.page} total={data.meta.totalPages} onPageChange={(next) => { setLoading(true); setError(""); setPage(next) }} />}
    </section>
  </div>
}

function LiveVerificationTable({ records }: { records: AdminVerification[] }) {
  const [selected, setSelected] = useState<AdminVerification>()
  return <><div className="min-h-0 flex-1 overflow-x-auto"><table className="w-full border-separate border-spacing-y-2.5"><thead><tr className="text-left text-sm font-bold">{["User / Business", "Account ID", "Type", "Tier Request", "Submitted", "Status"].map((title) => <th key={title} className="px-[15px] py-2">{title}</th>)}</tr></thead><tbody>{records.map((record) => <tr key={`${record.type}-${record.id}`} tabIndex={0} onClick={() => setSelected(record)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setSelected(record) }} className="h-[62px] cursor-pointer outline-none focus-visible:[&>td]:border-app-blue/60"><td className="rounded-l-lg border-y border-l border-light-gray/10 bg-surface-raised px-[15px]"><p className="font-bold text-white">{record.subject}</p><p className="text-sm text-ink-muted">{record.secondary}</p></td><td className="w-[145px] max-w-[145px] border-y border-light-gray/10 bg-surface-raised px-[15px] font-bold"><TruncatedIdentifier value={record.id} className="max-w-[115px]" /></td><td className="border-y border-light-gray/10 bg-surface-raised px-[15px]">{record.type}</td><td className="border-y border-light-gray/10 bg-surface-raised px-[15px] text-ink-dim">—</td><td className="border-y border-light-gray/10 bg-surface-raised px-[15px] text-ink-soft">{displayDate(record.submittedAt)}</td><td className="rounded-r-lg border-y border-r border-light-gray/10 bg-surface-raised px-[15px]"><Status value={displayStatus(record.status)} /></td></tr>)}</tbody></table></div>{selected && <VerificationDrawer record={selected} onClose={() => setSelected(undefined)} />}</>
}

function VerificationDrawer({ record, onClose }: { record: AdminVerification; onClose: () => void }) { useEffect(() => { const close = (event: KeyboardEvent) => { if (event.key === "Escape") onClose() }; window.addEventListener("keydown", close); return () => window.removeEventListener("keydown", close) }, [onClose]); const items = [["Account ID", record.id], ["Subject", record.subject], ["Contact", record.secondary], ["Type", record.type], ["Tier request", "—"], ["Submitted", displayDate(record.submittedAt)], ["Status", displayStatus(record.status)], ["Risk level", record.riskLevel]]; return <div className="fixed inset-0 z-50 bg-black/65" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}><aside role="dialog" aria-modal="true" aria-label={`Verification details for ${record.subject}`} className="absolute right-4 top-4 h-[calc(100vh-32px)] w-[690px] overflow-y-auto border border-app-green/40 bg-surface-raised p-[15px]"><div className="flex items-center justify-between"><h2 className="text-xl font-bold">Profile Overview</h2><button type="button" aria-label="Close verification details" onClick={onClose} className="flex size-10 items-center justify-center text-ink-soft hover:text-white"><X aria-hidden="true" className="size-6" /></button></div><section className="mt-6 rounded-[12px] border border-light-gray/10 p-[15px]"><h3 className="text-lg font-bold text-white">{record.subject}</h3><p className="mt-1 text-sm text-ink-muted">{record.secondary}</p></section><section className="mt-4 rounded-[12px] border border-light-gray/10 p-[15px]"><h3 className="mb-4 font-bold">Verification details</h3><dl className="space-y-3">{items.map(([label, value]) => <div key={label} className="flex items-start justify-between gap-6 rounded-[8px] bg-app-black px-3 py-2"><dt className="text-sm text-ink-muted">{label}</dt><dd className="max-w-[65%] whitespace-normal text-right text-sm font-bold text-white [overflow-wrap:anywhere]">{value}</dd></div>)}</dl></section><section className="mt-4 rounded-[12px] border border-light-gray/10 p-[15px]"><h3 className="font-bold">Submitted documents</h3><p className="mt-2 text-sm text-ink-muted">Document URLs are available from the dedicated {record.type} documents endpoint and will be integrated separately.</p></section></aside></div> }
function Status({ value }: { value: string }) { const normalized = value.toUpperCase(); const style = normalized === "APPROVED" ? "bg-app-green/5 text-app-green" : normalized === "REJECTED" || normalized === "FLAGGED" ? "bg-app-red/5 text-app-red" : "bg-app-yellow/5 text-app-yellow"; return <span className={`block w-[107px] rounded-[7px] px-2 py-1 text-center text-sm ${style}`}>{value}</span> }
function Metric({ label, value, featured = false }: { label: string; value: string; featured?: boolean }) { return <article className={`rounded-[20px] border px-[25px] py-[18px] ${featured ? 'border-app-green/20 bg-metric-featured' : 'border-light-gray/5 bg-app-black'}`}><p className="text-sm text-white">{label}</p><p className={`text-2xl font-bold ${featured ? 'text-white' : 'text-app-green'}`}>{value}</p></article> }
function EmptyState() { return <div className="flex flex-1 items-center justify-center text-center"><div><h2 className="text-lg font-bold text-white">No verification records</h2><p className="mt-1 text-sm text-ink-muted">No KYC or KYB submissions match the current view.</p></div></div> }
function ErrorState({ message }: { message: string }) { return <div role="alert" className="flex flex-1 items-center justify-center text-center"><div><h2 className="text-lg font-bold text-white">Verification records could not be loaded</h2><p className="my-3 text-sm text-app-light-red">{message}</p><Button onClick={() => window.location.reload()}>Try again</Button></div></div> }
function displayDate(value: string) { const date = new Date(value); return value && !Number.isNaN(date.getTime()) ? new Intl.DateTimeFormat("en-NG", { dateStyle: "medium", timeStyle: "short" }).format(date) : "—" }
function displayStatus(value: string) { return value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : "—" }
function paginationLabel(page: number, limit: number, total: number) { const start = total === 0 ? 0 : (page - 1) * limit + 1; const end = Math.min(page * limit, total); return `Showing ${start} to ${end} of ${total} entries` }
function filterLiveRecords(records: AdminVerification[], query: string) { const normalized = query.trim().toLowerCase(); if (!normalized) return records; return records.filter((record) => [record.subject, record.secondary, record.id, record.type, record.status].some((value) => value.toLowerCase().includes(normalized))) }
