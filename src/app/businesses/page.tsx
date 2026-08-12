"use client"

import { useEffect, useMemo, useState } from "react"
import { Search } from "lucide-react"
import PageHeader from "@/components/PageHeader"
import ApiLoadingState from "@/components/ApiLoadingState"
import BusinessTable from "@/components/businesses/BusinessTable"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import TablePagination from "@/components/TablePagination"
import type { AdminBusiness, AdminPage } from "@/lib/scale9/admin-models"

export default function BusinessesPage() {
  const [data, setData] = useState<AdminPage<AdminBusiness>>()
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const controller = new AbortController()
    fetch(`/api/admin/businesses?page=${page}&limit=20`, { signal: controller.signal })
      .then(async (response) => {
        const payload = await response.json()
        if (!response.ok) throw new Error(payload.message || "Unable to load businesses.")
        setData(payload)
      })
      .catch((requestError) => {
        if (requestError.name !== "AbortError") setError(requestError.message)
      })
      .finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [page])

  const businesses = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return data?.items || []
    return (data?.items || []).filter((business) => [business.name, business.email, business.phone, business.owner, business.id].some((value) => value.toLowerCase().includes(normalized)))
  }, [data, query])

  return <div className="flex h-full flex-col gap-[31px] px-[30px] pb-[16px] pt-[46px]">
    <PageHeader title="Business Management" description="Manage all business Scale accounts." />
    <section className="space-y-3">
      <h1 className="text-xl font-bold text-white">Business metrics</h1>
      <div className="grid grid-cols-4 gap-3">
        <Metric label="Total Volume" value="—" featured />
        <Metric label="Active Terminals" value="—" />
        <Metric label="Pending KYC" value="—" />
        <Metric label="Suspended Accounts" value="—" />
      </div>
    </section>
    <section className="flex flex-col gap-5 rounded-[12px] border border-ink-soft/10 bg-app-black p-5">
      <div className="flex items-center justify-between"><h2 className="text-xl font-bold text-white">Business list</h2><p className="text-sm font-medium text-ink-muted">{data ? `${data.meta.total} businesses` : "Loading businesses"}</p></div>
      <label className="relative block"><span className="sr-only">Search businesses</span><Search aria-hidden="true" className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-ink-muted" /><Input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name, email, phone, owner, or ID" className="h-11 border-app-gray/10 bg-transparent pl-10 text-white placeholder:text-app-gray/65" /></label>
    </section>
    <section className="flex min-h-0 flex-1 flex-col rounded-[12px] border border-light-gray/10 bg-app-black p-5" aria-busy={loading}>
      {error ? <ErrorState message={error} /> : loading ? <ApiLoadingState label="Loading businesses" /> : businesses.length === 0 ? <EmptyState /> : <div className="min-h-0 flex-1 overflow-y-auto"><BusinessTable businesses={businesses} /></div>}
      {data && !loading && !error && <TablePagination ariaLabel="Business list pagination" showing={paginationLabel(data.meta.page, data.meta.limit, data.meta.total)} current={data.meta.page} total={data.meta.totalPages} onPageChange={(next) => { setLoading(true); setError(""); setPage(next) }} />}
    </section>
  </div>
}

function Metric({ label, value, featured = false }: { label: string; value: string; featured?: boolean }) { return <article className={`rounded-[20px] border px-[25px] py-[18px] ${featured ? 'border-app-green/20 bg-metric-featured' : 'border-transparent bg-app-black'}`}><p className="text-sm font-medium text-white">{label}</p><p className={`text-2xl font-bold ${featured ? 'text-white' : 'text-app-green'}`}>{value}</p></article> }
function EmptyState() { return <div className="flex flex-1 items-center justify-center text-center"><div><h2 className="text-lg font-bold text-white">No businesses found</h2><p className="mt-1 text-sm text-ink-muted">Try another page or search term.</p></div></div> }
function ErrorState({ message }: { message: string }) { return <div role="alert" className="flex flex-1 items-center justify-center text-center"><div><h2 className="text-lg font-bold text-white">Businesses could not be loaded</h2><p className="my-3 text-sm text-app-light-red">{message}</p><Button onClick={() => window.location.reload()}>Try again</Button></div></div> }
function paginationLabel(page: number, limit: number, total: number) { const start = total === 0 ? 0 : (page - 1) * limit + 1; const end = Math.min(page * limit, total); return `Showing ${start} to ${end} of ${total} entries` }
