"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"
import { BarChart3, Check, ImageIcon } from "lucide-react"
import PageHeader from "@/components/PageHeader"
import ApiLoadingState from "@/components/ApiLoadingState"
import InvestigativeActions from "@/components/disputes/InvestigativeActions"
import { Button } from "@/components/ui/button"
import { disputes } from "@/lib/dispute-data"
import type { AdminDispute } from "@/lib/scale9/admin-models"

export default function DisputeDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const mock = useMemo(() => disputes.find((item) => item.slug === id), [id])
  const [dispute, setDispute] = useState<AdminDispute>()
  const [error, setError] = useState("")

  useEffect(() => {
    if (mock) return
    const controller = new AbortController()
    fetch(`/api/admin/disputes/${encodeURIComponent(id)}`, { signal: controller.signal })
      .then(async (response) => {
        const payload = await response.json()
        if (!response.ok) throw new Error(payload.message || "Unable to load dispute.")
        setDispute(payload)
      })
      .catch((requestError) => {
        if (requestError.name !== "AbortError") setError(requestError.message)
      })
    return () => controller.abort()
  }, [id, mock])

  if (!mock && error) return <ErrorState message={error} />
  if (!mock && !dispute) return <div className="flex min-h-full px-[30px]"><ApiLoadingState label="Loading dispute details" /></div>

  const details = dispute ? liveDetails(dispute) : mockDetails(mock!)
  return <div className="flex min-h-full flex-col gap-[15px] px-[30px] pb-[30px] pt-[46px]">
    <PageHeader title="Dispute Details" backHref="/dispute-and-compliance" />
    <section className="grid grid-cols-[1fr_366px] gap-[15px] rounded-[12px] border border-light-gray/10 bg-app-black p-[15px]"><div><div className="grid min-h-[129px] grid-cols-[1fr_287px] items-center gap-6 rounded-[12px] border border-light-gray/10 bg-surface-raised px-[15px]"><div><h1 className="break-all text-xl font-bold">Dispute {details.id}</h1><div className="mt-1 flex gap-4 text-sm text-ink-muted"><span>{details.business}</span><span>{details.date}</span></div><div className={`mt-2.5 flex h-[37px] w-[202px] items-center justify-center rounded-[7px] ${statusStyle(details.status)}`}>{details.status}</div></div><MiniStat label="Dispute Type" value={details.type} /></div><div className="mt-[18px] grid grid-cols-2 gap-[15px]"><MiniStat label="Amount" value={details.amount} /><MiniStat label="Reported By" value={details.reportedBy} /></div></div>{dispute ? <ReviewActions dispute={dispute} onUpdated={setDispute} /> : <InvestigativeActions disputeId={details.id} />}</section>
    <section className="grid grid-cols-[1fr_320px] gap-[15px] rounded-[12px] border border-light-gray/10 bg-app-black p-[15px]"><div><h2 className="mb-4 flex items-center gap-2 text-base font-bold"><span className="flex size-5 items-center justify-center rounded-[5px] bg-app-blue text-black"><BarChart3 className="size-3.5" /></span>Customer Claim</h2><blockquote className="flex min-h-[112px] items-center border-l-4 border-accent-blue bg-surface-deep px-3 text-sm leading-6 text-ink-muted">{details.claim}</blockquote><div className="mt-6 flex items-center gap-3"><div className="flex size-[66px] items-center justify-center rounded-[14px] border border-dashed border-ink-muted bg-surface-muted"><ImageIcon className="size-6 text-ink-muted" /></div><div><p className="text-sm font-bold text-ink-soft">{details.attachment}</p><p className="text-xs text-ink-muted">{details.attachmentMeta}</p></div></div></div><aside className="rounded-[20px] border border-app-green/20 bg-surface-base p-[15px]"><h2 className="mb-4 font-bold">Dispute Timeline</h2><div className="space-y-5">{details.timeline.map(([title, date], index) => <div key={`${title}-${index}`} className="flex min-h-[50px] items-center justify-between rounded-[12px] bg-surface-muted px-3"><div><p className="text-sm font-bold text-ink-soft">{title}</p><p className="text-xs text-ink-muted">{date}</p></div><span className="flex size-5 items-center justify-center rounded-full bg-app-green"><Check className="size-3 text-black" strokeWidth={3} /></span></div>)}</div></aside></section>
    <section className="grid grid-cols-[1fr_0.7fr] gap-[15px]"><DetailCard title="Transaction Evidence" items={details.evidence} /><DetailCard title="Device Logs" items={details.device} /></section>
  </div>
}

type Details = { id: string; business: string; date: string; status: string; type: string; amount: string; reportedBy: string; claim: string; attachment: string; attachmentMeta: string; timeline: string[][]; evidence: string[][]; device: string[][] }
function liveDetails(item: AdminDispute): Details { return { id: item.id, business: "—", date: displayDate(item.createdAt), status: displayStatus(item.status), type: item.reason, amount: "—", reportedBy: "—", claim: item.reason, attachment: "—", attachmentMeta: "—", timeline: [["Dispute created", displayDate(item.createdAt)]], evidence: [["Transaction ID", "—"], ["Payment status", "—"], ["POS response", "—"]], device: [["Terminal ID", "—"], ["Connection status", "—"]] } }
function mockDetails(item: (typeof disputes)[number]): Details { return { id: item.slug, business: item.business, date: "Feb 10 2026", status: item.status, type: item.type, amount: item.amount, reportedBy: item.user, claim: "I was charged twice for a single purchase at the POS terminal. The first attempt failed on the POS machine, but I was debited. I then paid again successfully.", attachment: "POS_Failure_Receipt.jpg", attachmentMeta: "Uploaded by customer · 2.4 MB", timeline: [["Customer reported dispute", "Feb 10 — 11:05 AM"], ["Admin assigned case", "Feb 10 — 11:20 AM"], ["Requesting business response", "Feb 10 — 11:05 AM"]], evidence: [["Payment Authorized", "Feb 10 — 11:20 AM"], ["Payment Completed", "Feb 10 — 11:20 AM"], ["POS Response", "Success"]], device: [["Terminal ID", "POS-4391"], ["Connection Status", "Stable"]] } }
function ReviewActions({ dispute, onUpdated }: { dispute: AdminDispute; onUpdated: (dispute: AdminDispute) => void }) { const [status, setStatus] = useState(dispute.status); const [resolution, setResolution] = useState(""); const [saving, setSaving] = useState(false); const [message, setMessage] = useState(""); async function submit() { setSaving(true); setMessage(""); try { const response = await fetch(`/api/admin/disputes/${encodeURIComponent(dispute.id)}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status, ...(resolution.trim() ? { resolution: resolution.trim() } : {}) }) }); const payload = await response.json(); if (!response.ok) throw new Error(payload.message || "Unable to update dispute."); onUpdated(payload); setMessage("Dispute updated.") } catch (requestError) { setMessage(requestError instanceof Error ? requestError.message : "Unable to update dispute.") } finally { setSaving(false) } } return <aside className="rounded-[16px] bg-surface-base p-[15px]"><h2 className="mb-3 text-xl font-bold">Review Dispute</h2><label className="block text-sm text-ink-muted">Status<select value={status} onChange={(event) => setStatus(event.target.value)} className="mt-2 h-11 w-full rounded-[12px] border border-light-gray/10 bg-surface-muted px-3 text-white">{["OPEN", "INVESTIGATING", "RESOLVED", "REJECTED"].map((option) => <option key={option}>{option}</option>)}</select></label><label className="mt-4 block text-sm text-ink-muted">Resolution<textarea value={resolution} onChange={(event) => setResolution(event.target.value)} maxLength={500} className="mt-2 h-24 w-full resize-none rounded-[12px] border border-light-gray/10 bg-surface-muted p-3 text-white" /></label><Button type="button" disabled={saving} onClick={submit} className="mt-4 w-full">{saving ? "Saving" : "Save Review"}</Button>{message && <p role="status" className="mt-3 text-sm text-ink-muted">{message}</p>}</aside> }
function MiniStat({ label, value }: { label: string; value: string }) { return <article className="flex min-h-[82px] flex-col justify-center rounded-[20px] border border-light-gray/10 bg-surface-raised px-[15px]"><p className="text-sm text-ink-muted">{label}</p><p className="mt-2 break-words text-xl font-bold">{value}</p></article> }
function DetailCard({ title, items }: { title: string; items: string[][] }) { return <article className="rounded-[12px] bg-app-black p-[15px]"><h2 className="mb-3 text-xl font-bold">{title}</h2><div className="space-y-2.5">{items.map(([label, value]) => <div key={label} className="flex min-h-11 items-center justify-between rounded-[12px] bg-surface-elevated px-3 text-sm"><span className="text-ink-muted">{label}</span><b className="max-w-[65%] text-right [overflow-wrap:anywhere]">{value}</b></div>)}</div></article> }
function ErrorState({ message }: { message: string }) { return <div role="alert" className="flex min-h-full items-center justify-center px-[30px] text-center"><div><h1 className="text-xl font-bold">Dispute could not be loaded</h1><p className="my-3 text-app-light-red">{message}</p><Button onClick={() => window.location.reload()}>Try again</Button></div></div> }
function displayDate(value: string) { const date = new Date(value); return value && !Number.isNaN(date.getTime()) ? new Intl.DateTimeFormat("en-NG", { dateStyle: "medium", timeStyle: "short" }).format(date) : "—" }
function displayStatus(value: string) { const normalized = value.toUpperCase(); return normalized === "INVESTIGATING" ? "Under Review" : normalized.charAt(0) + normalized.slice(1).toLowerCase() }
function statusStyle(value: string) { const normalized = value.toLowerCase(); return normalized === "resolved" ? "bg-app-green/5 text-app-green" : normalized === "rejected" ? "bg-app-red/5 text-app-red" : normalized === "under review" ? "bg-app-blue/15 text-app-blue" : "bg-app-yellow/5 text-app-yellow" }
