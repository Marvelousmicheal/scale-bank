"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import PageHeader from "@/components/PageHeader"
import ApiLoadingState from "@/components/ApiLoadingState"
import TablePagination from "@/components/TablePagination"
import TruncatedIdentifier from "@/components/TruncatedIdentifier"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { AdminPage, AdminTransaction } from "@/lib/scale9/admin-models"

const statuses = ["", "PENDING", "SUCCESS", "FAILED", "REVERSED"]
const channels = ["", "POS", "QR", "TRANSFER", "PAYMENT_LINK", "CARD"]
const categories = ["", "PAYMENT", "SERVICE", "WITHDRAWAL", "DEPOSIT"]
const serviceTypes = ["", "AIRTIME", "DATA", "ELECTRICITY", "CABLE_TV", "INTERNET", "BETTING"]

export default function TransactionsPage() {
  const [data, setData] = useState<AdminPage<AdminTransaction>>()
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState("")
  const [channel, setChannel] = useState("")
  const [category, setCategory] = useState("")
  const [serviceType, setServiceType] = useState("")
  const [from, setFrom] = useState("")
  const [to, setTo] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const deferredQuery = useDeferredQuery(query)

  useEffect(() => {
    const controller = new AbortController()
    const params = new URLSearchParams({ page: String(page), limit: "20" })
    if (deferredQuery) params.set("q", deferredQuery)
    if (status) params.set("status", status)
    if (channel) params.set("channel", channel)
    if (category) params.set("category", category)
    if (serviceType) params.set("serviceType", serviceType)
    if (from) params.set("from", from)
    if (to) params.set("to", to)
    fetch(`/api/admin/transactions?${params}`, { signal: controller.signal })
      .then(async (response) => { const payload = await response.json(); if (!response.ok) throw new Error(payload.message || "Unable to load transactions."); setData(payload) })
      .catch((requestError) => { if (requestError.name !== "AbortError") setError(requestError.message) })
      .finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [page, deferredQuery, status, channel, category, serviceType, from, to])

  return <div className="flex min-h-full flex-col gap-[15px] px-[30px] pb-4 pt-[46px]">
    <PageHeader title="Transactions" description="Monitor and investigate all platform transactions." />
    <section><h2 className="mb-3 text-base font-bold">Transaction metrics</h2><div className="grid grid-cols-5 gap-3"><Metric label="Total Transactions" value={String(data?.meta.total ?? 0)} featured /><Metric label="Total Volume" value="—" /><Metric label="Successful Transactions" value="—" /><Metric label="Failed Transactions" value="—" /><Metric label="Refunds Processed" value="—" /></div></section>
    <section className="space-y-5 rounded-[12px] border border-light-gray/10 bg-app-black px-[15px] py-[18px]"><h2 className="text-xl font-bold">Transaction list</h2><label className="relative block"><span className="sr-only">Search transactions</span><Search aria-hidden="true" className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-ink-muted" /><Input type="search" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); setLoading(true) }} placeholder="Search by reference or narration" className="h-11 border-light-gray/10 bg-surface-raised pl-10 text-white" /></label><div className="grid grid-cols-5 gap-5"><Filter label="Status" value={status} options={statuses} onChange={(value) => { setLoading(true); setError(""); setPage(1); setStatus(value) }} /><Filter label="Channel" value={channel} options={channels} onChange={(value) => { setLoading(true); setError(""); setPage(1); setChannel(value) }} /><Filter label="Category" value={category} options={categories} onChange={(value) => { setLoading(true); setError(""); setPage(1); setCategory(value) }} /><Filter label="Service" value={serviceType} options={serviceTypes} onChange={(value) => { setLoading(true); setError(""); setPage(1); setServiceType(value) }} /><div className="grid grid-cols-2 gap-3"><DateFilter label="From" value={from} max={to || undefined} onChange={(value) => { setLoading(true); setError(""); setPage(1); setFrom(value) }} /><DateFilter label="To" value={to} min={from || undefined} onChange={(value) => { setLoading(true); setError(""); setPage(1); setTo(value) }} /></div></div></section>
    <section className="flex min-h-[320px] flex-1 flex-col rounded-[12px] border border-light-gray/10 bg-app-black p-5" aria-busy={loading}>
      {error ? <ErrorState message={error} /> : loading ? <ApiLoadingState label="Loading transactions" /> : data?.items.length ? <LiveTable rows={data.items} /> : <EmptyState />}
      {data && !loading && !error && <TablePagination ariaLabel="Transaction pagination" showing={paginationLabel(data.meta.page, data.meta.limit, data.meta.total)} current={data.meta.page} total={data.meta.totalPages} onPageChange={(next) => { setLoading(true); setError(""); setPage(next) }} />}
    </section>
  </div>
}

function LiveTable({ rows }: { rows: AdminTransaction[] }) { return <TransactionTable rows={rows.map((row) => ({ key: row.id, href: `/transactions/${encodeURIComponent(row.id)}`, id: row.reference || row.id, type: row.type, business: row.business, amount: currency(row.amount), fee: currency(row.fee), date: displayDate(row.createdAt), status: displayStatus(row.status) }))} /> }

type TableRowData = { key: string; href: string; id: string; type: string; business: string; amount: string; fee: string; date: string; status: string }
function TransactionTable({ rows }: { rows: TableRowData[] }) { const router = useRouter(); return <div className="min-h-0 flex-1 overflow-x-auto"><table className="w-full border-separate border-spacing-y-2.5"><thead><tr className="text-left text-sm font-bold text-white">{["Transaction ID", "Type", "Business", "Amount", "Fee", "Date", "Status"].map((heading) => <th key={heading} className="px-[15px] py-2">{heading}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.key} tabIndex={0} onClick={() => router.push(row.href)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") router.push(row.href) }} className="h-[55px] cursor-pointer outline-none focus-visible:[&>td]:border-app-blue/60"><td className="w-[145px] max-w-[145px] rounded-l-lg border-y border-l border-light-gray/10 bg-surface-raised px-[15px] font-bold text-white"><TruncatedIdentifier value={row.id} className="max-w-[115px]" /></td><td className="border-y border-light-gray/10 bg-surface-raised px-[15px] text-ink-dim">{row.type}</td><td className="max-w-[285px] border-y border-light-gray/10 bg-surface-raised px-[15px] text-ink-dim">{row.business}</td><td className="border-y border-light-gray/10 bg-surface-raised px-[15px] text-white">{row.amount}</td><td className="border-y border-light-gray/10 bg-surface-raised px-[15px] text-ink-dim">{row.fee}</td><td className="border-y border-light-gray/10 bg-surface-raised px-[15px] text-ink-soft">{row.date}</td><td className="rounded-r-lg border-y border-r border-light-gray/10 bg-surface-raised px-[15px]"><Status value={row.status} /></td></tr>)}</tbody></table></div> }
function Filter({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) { return <label className="flex items-center gap-3 text-sm text-ink-muted">{label}<select value={value} onChange={(event) => onChange(event.target.value)} className="h-10 flex-1 rounded-lg border border-light-gray/10 bg-surface-raised px-3 text-white"><option value="">All</option>{options.slice(1).map((option) => <option key={option}>{option}</option>)}</select></label> }
function DateFilter({ label, value, min, max, onChange }: { label: string; value: string; min?: string; max?: string; onChange: (value: string) => void }) { return <label className="text-xs text-ink-muted"><span className="mb-1 block">{label}</span><Input type="date" value={value} min={min} max={max} onChange={(event) => onChange(event.target.value)} className="h-10 border-light-gray/10 bg-surface-raised px-3 text-white [color-scheme:dark]" /></label> }
function Status({ value }: { value: string }) { const normalized = value.toUpperCase(); const style = normalized === "SUCCESS" ? "bg-app-green/5 text-app-green" : normalized === "FAILED" ? "bg-app-red/5 text-app-red" : normalized === "REVERSED" ? "bg-white/[0.04] text-ink-soft" : "bg-app-yellow/5 text-app-yellow"; return <span className={`block w-[107px] rounded-[7px] px-2 py-1 text-center ${style}`}>{value}</span> }
function Metric({ label, value, featured = false }: { label: string; value: string; featured?: boolean }) { return <article className={`rounded-[20px] border px-[25px] py-[18px] ${featured ? 'border-app-green/20 bg-metric-featured' : 'border-light-gray/5 bg-app-black'}`}><p className="text-sm text-white">{label}</p><p className={`text-2xl font-bold ${featured ? 'text-white' : 'text-app-green'}`}>{value}</p></article> }
function EmptyState() { return <div className="flex flex-1 items-center justify-center text-center"><div><h2 className="text-lg font-bold text-white">No transactions found</h2><p className="mt-1 text-sm text-ink-muted">No transactions match the current filters.</p></div></div> }
function ErrorState({ message }: { message: string }) { return <div role="alert" className="flex flex-1 items-center justify-center text-center"><div><h2 className="text-lg font-bold text-white">Transactions could not be loaded</h2><p className="my-3 text-sm text-app-light-red">{message}</p><Button onClick={() => window.location.reload()}>Try again</Button></div></div> }
function useDeferredQuery(value: string) { const [deferred, setDeferred] = useState(value); useEffect(() => { const timeout = window.setTimeout(() => setDeferred(value.trim()), 300); return () => window.clearTimeout(timeout) }, [value]); return deferred }
function currency(value: number) { return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 2 }).format(value) }
function displayDate(value: string) { const date = new Date(value); return value && !Number.isNaN(date.getTime()) ? new Intl.DateTimeFormat("en-NG", { dateStyle: "medium", timeStyle: "short" }).format(date) : "—" }
function displayStatus(value: string) { return value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : "—" }
function paginationLabel(page: number, limit: number, total: number) { const start = total === 0 ? 0 : (page - 1) * limit + 1; const end = Math.min(page * limit, total); return `Showing ${start} to ${end} of ${total} entries` }
