"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { BadgeCheck, Building2, CircleAlert, CreditCard, WalletCards } from "lucide-react"
import PageHeader from "@/components/PageHeader"
import ApiLoadingState from "@/components/ApiLoadingState"
import { Button } from "@/components/ui/button"
import type { AdminBusiness } from "@/lib/scale9/admin-models"

export default function BusinessDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [business, setBusiness] = useState<AdminBusiness>()
  const [error, setError] = useState("")

  useEffect(() => {
    const controller = new AbortController()
    fetch(`/api/admin/businesses/${encodeURIComponent(id)}`, { signal: controller.signal })
      .then(async (response) => {
        const payload = await response.json()
        if (!response.ok) throw new Error(payload.message || "Unable to load the business.")
        setBusiness(payload)
      })
      .catch((requestError) => {
        if (requestError.name !== "AbortError") setError(requestError.message)
      })
    return () => controller.abort()
  }, [id])

  if (error) return <div className="flex min-h-full items-center justify-center px-[30px]" role="alert"><div className="text-center"><CircleAlert className="mx-auto mb-4 size-10 text-app-red" /><h1 className="text-xl font-bold text-white">Business could not be loaded</h1><p className="my-3 text-app-light-red">{error}</p><Button onClick={() => window.location.reload()}>Try again</Button></div></div>
  if (!business) return <div className="flex min-h-full px-[30px]"><ApiLoadingState label="Loading business details" /></div>

  return <div className="flex min-h-full flex-col gap-[15px] px-[30px] pb-[30px] pt-[46px]">
    <PageHeader title={business.name} backHref="/businesses" />
    <section className="grid grid-cols-[1fr_300px] gap-[15px] rounded-[12px] border border-light-gray/10 bg-app-black p-[15px]">
      <div className="space-y-5">
        <div className="flex min-h-[100px] items-center gap-4 rounded-[12px] border border-light-gray/10 bg-surface-raised px-[15px] py-4">
          <div className="relative flex size-[60px] shrink-0 items-center justify-center rounded-full bg-danger-gradient"><Building2 aria-hidden="true" className="size-7 text-white" />{business.verified && <BadgeCheck aria-hidden="true" className="absolute -bottom-1 -right-1 size-6 text-app-green" fill="currentColor" />}</div>
          <div className="min-w-0"><div className="flex items-center gap-2"><h1 className="truncate text-lg font-bold text-white">{business.name}</h1><span className={`rounded-full px-2 py-1 text-xs font-bold ${business.verified ? 'bg-app-green/10 text-app-green' : 'bg-app-yellow/10 text-app-yellow'}`}>{business.verified ? 'Verified' : 'Unverified'}</span></div><p className="mt-1 truncate text-sm text-ink-muted">ID: {business.id}</p><p className="text-sm text-ink-muted">Owner: <span className="font-medium text-ink-bright">{business.owner}</span></p></div>
        </div>
        <div className="grid grid-cols-3 gap-3"><Metric label="Wallet balance" value={currency(business.balance)} featured /><Metric label="Ledger balance" value={currency(business.ledgerBalance)} /><Metric label="Transactions" value={String(business.transactions)} /></div>
      </div>
      <aside className="flex flex-col justify-between rounded-[20px] bg-action-indigo p-[18px]"><div className="flex items-center justify-between"><p className="text-sm text-ink-bright">Account status</p><WalletCards aria-hidden="true" className="size-6 text-white" /></div><p className="text-3xl font-bold text-white">{business.active ? 'Active' : 'Inactive'}</p><div className="grid grid-cols-2 gap-3"><div><p className="text-xs text-ink-soft/65">Tier</p><p className="font-bold text-white">{business.tier}</p></div><div><p className="text-xs text-ink-soft/65">POS devices</p><p className="font-bold text-white">{business.posDevices}</p></div></div></aside>
    </section>
    <section className="grid grid-cols-2 gap-[15px]">
      <InfoCard title="Business information" items={[["Email", business.email], ["Phone", business.phone], ["Address", business.address], ["RC number", business.rcNumber]]} />
      <InfoCard title="Account information" items={[["Owner ID", business.ownerId], ["Created", formatDate(business.createdAt)], ["Verification", business.verified ? "Verified" : "Not verified"], ["Status", business.active ? "Active" : "Inactive"]]} />
    </section>
    <section className="rounded-[12px] border border-light-gray/10 bg-app-black p-5"><div className="flex items-center justify-between"><div><h2 className="text-xl font-bold text-white">POS terminals</h2><p className="mt-1 text-sm text-ink-muted">Live count reported by Scale9</p></div><div className="flex items-center gap-3 rounded-xl bg-surface-raised px-4 py-3"><CreditCard aria-hidden="true" className="size-5 text-app-blue" /><span className="text-xl font-bold text-white">{business.posDevices}</span></div></div></section>
  </div>
}

function Metric({ label, value, featured = false }: { label: string; value: string; featured?: boolean }) { return <article className={`rounded-[20px] border px-[25px] py-[18px] ${featured ? 'border-app-green/20 bg-metric-featured' : 'border-light-gray/5 bg-surface-raised'}`}><p className="text-sm font-medium text-white">{label}</p><p className={`text-2xl font-bold ${featured ? 'text-white' : 'text-app-green'}`}>{value}</p></article> }
function InfoCard({ title, items }: { title: string; items: string[][] }) { return <section className="rounded-[12px] border border-light-gray/10 bg-app-black p-5"><h2 className="mb-4 text-xl font-bold text-white">{title}</h2><dl className="space-y-3">{items.map(([label, value]) => <div key={label} className="flex items-start justify-between gap-6 rounded-lg bg-surface-raised px-4 py-3"><dt className="text-sm text-ink-muted">{label}</dt><dd className="max-w-[65%] break-all text-right text-sm font-medium text-white">{value}</dd></div>)}</dl></section> }
function currency(value: number) { return new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(value) }
function formatDate(value: string) { const date = new Date(value); return Number.isNaN(date.getTime()) ? "Unknown" : new Intl.DateTimeFormat('en-NG', { dateStyle: 'long' }).format(date) }
