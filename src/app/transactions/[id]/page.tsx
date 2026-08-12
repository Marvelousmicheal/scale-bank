"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"
import PageHeader from "@/components/PageHeader"
import ApiLoadingState from "@/components/ApiLoadingState"
import { Button } from "@/components/ui/button"
import { transactions } from "@/lib/transaction-data"
import type { AdminTransaction } from "@/lib/scale9/admin-models"

export default function TransactionDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const mock = useMemo(() => transactions.find((item) => item.slug === id), [id])
  const [transaction, setTransaction] = useState<AdminTransaction>()
  const [error, setError] = useState("")

  useEffect(() => {
    if (mock) return
    const controller = new AbortController()
    fetch(`/api/admin/transactions/${encodeURIComponent(id)}`, { signal: controller.signal }).then(async (response) => { const payload = await response.json(); if (!response.ok) throw new Error(payload.message || "Unable to load transaction."); setTransaction(payload) }).catch((requestError) => { if (requestError.name !== "AbortError") setError(requestError.message) })
    return () => controller.abort()
  }, [id, mock])

  if (!mock && error) return <ErrorState message={error} />
  if (!mock && !transaction) return <div className="flex min-h-full px-[30px]"><ApiLoadingState label="Loading transaction details" /></div>

  const details = transaction ? liveDetails(transaction) : mockDetails(mock!)
  return <div className="flex min-h-full flex-col gap-[15px] px-[30px] pb-[30px] pt-[46px]">
    <PageHeader title="Transaction Details" backHref="/transactions" />
    <section className="rounded-[12px] border border-light-gray/10 bg-app-black p-[15px]"><div className="flex items-center justify-between rounded-[12px] border border-light-gray/10 bg-surface-raised px-[15px] py-5"><div className="min-w-0"><div className="flex items-center gap-3"><h1 className="break-all text-base font-bold">{details.id}</h1><Status value={details.status} /></div><p className="mt-1 text-sm text-ink-muted">Detailed ledger information and system trace for internal audit</p></div></div><div className="mt-[18px] grid grid-cols-2 gap-[15px]"><Summary label="Amount" value={details.amount} /><Summary label="Type" value={details.type} /><Summary label="Date" value={details.date} /><Summary label="Status" value={details.status} /></div></section>
    <section className="grid grid-cols-2 gap-[15px]"><DetailCard title="Participants" items={details.participants} /><DetailCard title="Payment information" items={details.payment} /></section>
    <section className="grid grid-cols-2 gap-[15px]"><DetailCard title="System trace" items={details.trace} /><DetailCard title="Financial breakdown" items={details.financial} /></section>
  </div>
}

type Details = { id: string; status: string; amount: string; type: string; date: string; participants: string[][]; payment: string[][]; trace: string[][]; financial: string[][] }
function liveDetails(item: AdminTransaction): Details { return { id: item.reference || item.id, status: displayStatus(item.status), amount: currency(item.amount), type: item.type, date: displayDate(item.createdAt), participants: [["Business", item.business], ["Business ID", item.businessId || "—"], ["User ID", item.userId || "—"], ["POS device ID", item.posDeviceId || "—"]], payment: [["Channel", item.channel], ["Category", item.category], ["Service type", item.serviceType], ["Narration", item.narration]], trace: [["Transaction ID", item.id], ["Reference", item.reference || "—"], ["Created", displayDate(item.createdAt)], ["Updated", displayDate(item.updatedAt)]], financial: [["Amount paid", currency(item.amount)], ["Platform fee", currency(item.fee)], ["Net business receives", currency(item.amount - item.fee)]] } }
function mockDetails(item: (typeof transactions)[number]): Details { return { id: item.displayId, status: item.status, amount: item.amount, type: item.type, date: `${item.date} ${item.time}`, participants: [["Business", item.business], ["Business ID", "—"], ["User ID", "—"], ["POS device ID", "—"]], payment: [["Channel", item.type], ["Category", "—"], ["Service type", "—"], ["Narration", "—"]], trace: [["Transaction ID", item.slug], ["Reference", item.displayId], ["Created", `${item.date} ${item.time}`], ["Updated", "—"]], financial: [["Amount paid", item.amount], ["Platform fee", item.fee], ["Net business receives", "—"]] } }
function Summary({ label, value }: { label: string; value: string }) { return <article className="rounded-[20px] border border-light-gray/10 bg-surface-raised p-[15px]"><p className="text-sm text-ink-muted">{label}</p><p className="mt-2 break-words text-xl font-bold text-white">{value}</p></article> }
function DetailCard({ title, items }: { title: string; items: string[][] }) { return <section className="rounded-[12px] border border-light-gray/10 bg-app-black p-5"><h2 className="mb-4 text-xl font-bold">{title}</h2><dl className="space-y-3">{items.map(([label, value]) => <div key={label} className="flex items-start justify-between gap-6 rounded-lg bg-surface-raised px-4 py-3"><dt className="text-sm text-ink-muted">{label}</dt><dd className="max-w-[65%] whitespace-normal text-right text-sm font-bold text-white [overflow-wrap:anywhere]">{value}</dd></div>)}</dl></section> }
function Status({ value }: { value: string }) { const normalized = value.toUpperCase(); const style = normalized === "SUCCESS" ? "bg-app-green/5 text-app-green" : normalized === "FAILED" ? "bg-app-red/5 text-app-red" : normalized === "REVERSED" ? "bg-white/[0.04] text-ink-soft" : "bg-app-yellow/5 text-app-yellow"; return <span className={`w-[107px] rounded-[7px] px-2 py-1 text-center text-sm ${style}`}>{value}</span> }
function currency(value: number) { return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 2 }).format(value) }
function displayDate(value: string) { const date = new Date(value); return value && !Number.isNaN(date.getTime()) ? new Intl.DateTimeFormat("en-NG", { dateStyle: "medium", timeStyle: "short" }).format(date) : "—" }
function displayStatus(value: string) { return value ? value.charAt(0).toUpperCase() + value.slice(1).toLowerCase() : "—" }
function ErrorState({ message }: { message: string }) { return <div role="alert" className="flex min-h-full items-center justify-center px-[30px] text-center"><div><h1 className="text-xl font-bold">Transaction could not be loaded</h1><p className="my-3 text-app-light-red">{message}</p><Button onClick={() => window.location.reload()}>Try again</Button></div></div> }
