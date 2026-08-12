"use client"

import { Fragment, useEffect, useMemo, useState } from "react"
import { ChevronDown, Search } from "lucide-react"
import PageHeader from "@/components/PageHeader"
import ApiLoadingState from "@/components/ApiLoadingState"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import TablePagination from "@/components/TablePagination"
import TruncatedIdentifier from "@/components/TruncatedIdentifier"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { AdminPage, AdminUser } from "@/lib/scale9/admin-models"

export default function UsersPage() {
  const [data, setData] = useState<AdminPage<AdminUser>>()
  const [page, setPage] = useState(1)
  const [query, setQuery] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()
    fetch(`/api/admin/users?page=${page}&limit=20`, { signal: controller.signal })
      .then(async (response) => {
        const payload = await response.json()
        if (!response.ok) throw new Error(payload.message || "Unable to load users.")
        setData(payload)
      })
      .catch((requestError) => {
        if (requestError.name !== "AbortError") setError(requestError.message)
      })
      .finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [page])

  const users = useMemo(() => {
    const normalized = query.trim().toLowerCase()
    if (!normalized) return data?.items || []
    return (data?.items || []).filter((user) => [user.name, user.email, user.phone, user.id, user.role].some((value) => value.toLowerCase().includes(normalized)))
  }, [data, query])

  return <div className="flex h-full flex-col gap-[34px] px-[30px] pb-[16px] pt-[46px]">
    <PageHeader title="User Management" description="Manage all Scale accounts." />
    <section className="flex flex-col gap-5 rounded-[12px] border border-light-gray/10 bg-app-black p-5">
      <div className="flex items-center justify-between">
        <h1 className="font-sf-pro text-xl font-bold text-white">User List</h1>
        <p className="text-sm font-medium text-ink-muted">{data ? `${data.meta.total} users` : "Loading users"}</p>
      </div>
      <label className="relative block">
        <span className="sr-only">Search users</span>
        <Search aria-hidden="true" className="absolute left-3 top-1/2 size-5 -translate-y-1/2 text-ink-muted" />
        <Input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by name, email, phone, role, or ID" className="h-11 border-app-gray/10 bg-transparent pl-10 text-white placeholder:text-app-gray/65" />
      </label>
    </section>
    <section className="flex min-h-0 flex-1 flex-col rounded-[12px] border border-light-gray/10 bg-app-black p-5" aria-busy={loading}>
      {error ? <ErrorState message={error} retry={() => window.location.reload()} /> : loading ? <ApiLoadingState label="Loading users" /> : users.length === 0 ? <EmptyState /> : <UserTable users={users} />}
      {data && !loading && !error && <TablePagination ariaLabel="User list pagination" showing={paginationLabel(data.meta.page, data.meta.limit, data.meta.total)} current={data.meta.page} total={data.meta.totalPages} onPageChange={(nextPage) => { setLoading(true); setError(""); setPage(nextPage) }} />}
    </section>
  </div>
}

function UserTable({ users }: { users: AdminUser[] }) {
  const [expanded, setExpanded] = useState("")
  return <div className="min-h-0 flex-1 overflow-y-auto">
    <Table className="border-separate border-spacing-y-[10px]">
      <TableHeader><TableRow className="border-none">
        {["User ID", "Name", "Email", "Role", "KYC", "Status", ""].map((heading, index) => <TableHead key={`${heading}-${index}`} className={`px-[15px] py-[10px] text-sm font-bold text-white ${heading === "Status" ? "text-right" : ""}`}>{heading || <span className="sr-only">Details</span>}</TableHead>)}
      </TableRow></TableHeader>
      <TableBody>{users.map((user) => { const isExpanded = expanded === user.id; const panelId = `live-user-${user.id}`; return <Fragment key={user.id}><TableRow className="h-[55px] border-none"><TableCell className="w-[135px] max-w-[135px] rounded-l-[8px] border-y border-l border-ink-soft/10 bg-surface-raised px-[15px] font-bold text-white"><TruncatedIdentifier value={user.id} className="max-w-[105px]" /></TableCell><TableCell className="border-y border-ink-soft/10 bg-surface-raised px-[15px] font-medium text-white">{user.name}</TableCell><TableCell className="border-y border-ink-soft/10 bg-surface-raised px-[15px] text-ink-dim">{user.email}</TableCell><TableCell className="border-y border-ink-soft/10 bg-surface-raised px-[15px] text-white">{displayRole(user.role)}</TableCell><TableCell className="border-y border-ink-soft/10 bg-surface-raised px-[15px] text-ink-soft">{user.kycStatus}</TableCell><TableCell className="border-y border-ink-soft/10 bg-surface-raised px-[15px] text-right"><span className={`inline-block w-[107px] rounded-[7px] p-1.5 text-center text-sm ${user.active ? "bg-app-green/5 text-app-green" : "bg-app-red/5 text-app-red"}`}>{user.active ? "Active" : "Inactive"}</span></TableCell><TableCell className="rounded-r-[8px] border-y border-r border-ink-soft/10 bg-surface-raised px-[15px]"><button type="button" aria-expanded={isExpanded} aria-controls={panelId} aria-label={`${isExpanded ? "Hide" : "View"} details for ${user.id}`} onClick={() => setExpanded(isExpanded ? "" : user.id)} className="flex size-9 items-center justify-center text-ink-soft hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-app-green"><ChevronDown aria-hidden="true" className={`size-5 transition-transform ${isExpanded ? "rotate-180" : ""}`} /></button></TableCell></TableRow>{isExpanded && <TableRow className="border-none"><TableCell colSpan={7} className="rounded-[8px] bg-white/[0.025] p-5"><div id={panelId}><UserDetails user={user} /></div></TableCell></TableRow>}</Fragment> })}</TableBody>
    </Table>
  </div>
}

function UserDetails({ user }: { user: AdminUser }) { const items = [{ label: "User ID", value: user.id }, { label: "Phone", value: user.phone }, { label: "Tier", value: user.tier }, { label: "Date joined", value: displayDate(user.joinedAt) }, { label: "Account status", value: user.active ? "Active" : "Inactive" }]; return <dl className="grid grid-cols-2 gap-x-8 gap-y-4 lg:grid-cols-5">{items.map((item) => <div key={item.label} className="min-w-0"><dt className="text-xs font-medium uppercase text-ink-muted">{item.label}</dt><dd className="mt-1 text-sm font-bold text-white">{item.label === "User ID" ? <span className="block whitespace-normal [overflow-wrap:anywhere]">{item.value}</span> : item.value}</dd></div>)}</dl> }

function EmptyState() { return <div className="flex flex-1 items-center justify-center text-center"><div><h2 className="text-lg font-bold text-white">No users found</h2><p className="mt-1 text-sm text-ink-muted">Try another page or search term.</p></div></div> }
function ErrorState({ message, retry }: { message: string; retry: () => void }) { return <div role="alert" className="flex flex-1 items-center justify-center text-center"><div><h2 className="text-lg font-bold text-white">Users could not be loaded</h2><p className="my-3 text-sm text-app-light-red">{message}</p><Button onClick={retry}>Try again</Button></div></div> }
function formatDate(value: string) { const date = new Date(value); return Number.isNaN(date.getTime()) ? "Unknown" : new Intl.DateTimeFormat("en-NG", { dateStyle: "medium" }).format(date) }
function displayDate(value: string) { return value ? formatDate(value) : "—" }
function displayRole(value: string) { return value === "—" ? value : value.replaceAll("_", " ") }
function paginationLabel(page: number, limit: number, total: number) { const start = total === 0 ? 0 : (page - 1) * limit + 1; const end = Math.min(page * limit, total); return `Showing ${start} to ${end} of ${total} entries` }
