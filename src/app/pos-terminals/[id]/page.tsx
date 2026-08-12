"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { BatteryMedium, MapPin, Wifi } from "lucide-react"
import PageHeader from "@/components/PageHeader"
import ApiLoadingState from "@/components/ApiLoadingState"
import { Button } from "@/components/ui/button"
import type { AdminPosDevice } from "@/lib/scale9/admin-models"

export default function POSTerminalDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const [device, setDevice] = useState<AdminPosDevice>()
  const [error, setError] = useState("")

  useEffect(() => {
    const controller = new AbortController()
    fetch(`/api/admin/pos/${encodeURIComponent(id)}`, { signal: controller.signal }).then(async (response) => { const payload = await response.json(); if (!response.ok) throw new Error(payload.message || "Unable to load POS device."); setDevice(payload) }).catch((requestError) => { if (requestError.name !== "AbortError") setError(requestError.message) })
    return () => controller.abort()
  }, [id])

  if (error) return <ErrorState message={error} />
  if (!device) return <div className="flex min-h-full px-[30px]"><ApiLoadingState label="Loading POS device details" /></div>

  return <div className="flex min-h-full flex-col gap-[15px] px-[30px] pb-[30px] pt-[46px]">
    <PageHeader title="Device Details" backHref="/pos-terminals" />
    <section className="grid grid-cols-[1fr_282px] gap-[15px] rounded-[12px] border border-light-gray/10 bg-app-black p-[15px]">
      <div className="space-y-5"><div className="rounded-[12px] border border-light-gray/10 bg-surface-raised px-[15px] py-5"><div className="flex items-center gap-3"><h1 className="break-all text-base font-bold text-white">{device.id}</h1><Status value={displayStatus(device)} /></div><p className="mt-2 text-sm text-ink-muted">Serial number: <b className="text-ink-soft">{device.serialNumber}</b></p><div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-ink-muted"><span>Firmware: <b className="text-ink-soft">{device.firmwareVersion || "—"}</b></span><span className="flex items-center gap-1.5"><BatteryMedium className="size-5 text-app-blue" />—</span><span className="flex items-center gap-1.5"><Wifi className="size-5 text-app-green" />—</span></div></div><div className="grid grid-cols-3 gap-[15px]"><Metric label="Today's Volume" value="—" featured /><Metric label="Monthly Volume" value="—" /><Metric label="Total Transactions" value={String(device.transactions)} /></div></div>
      <aside className="rounded-[20px] bg-device-dark p-[15px]"><div className="relative mb-3 flex h-[118px] items-center justify-center rounded-[12px] border border-light-gray/10 bg-device-paper"><MapPin className="size-7 text-app-red" fill="currentColor" /></div><p className="text-sm text-ink-muted">Location Details</p><p className="font-bold text-ink-soft">—</p><p className="text-sm text-ink-muted">—</p></aside>
    </section>
    <section className="rounded-[12px] border border-light-gray/10 bg-app-black p-5"><h2 className="mb-5 text-xl font-bold text-white">Device information</h2><DetailGrid items={[["Device model", "—"], ["Business", device.businessId ? device.business : "—"], ["Business ID", device.businessId || "—"], ["Merchant", "—"], ["Location", "—"], ["Address", "—"], ["Last activity", displayDate(device.lastSeenAt)], ["Registered", displayDate(device.createdAt)], ["Updated", displayDate(device.updatedAt)], ["Status", displayStatus(device)]]} /></section>
    <section className="rounded-[12px] border border-light-gray/10 bg-app-black p-5"><h2 className="text-xl font-bold text-white">Recent Transactions</h2><p className="mt-2 text-sm text-ink-muted">Transaction records for this device require a POS-specific transaction filter from the backend.</p></section>
  </div>
}

function DetailGrid({ items }: { items: string[][] }) { return <dl className="grid grid-cols-2 gap-5 lg:grid-cols-3">{items.map(([label, value]) => <div key={label} className="min-w-0"><dt className="text-xs font-medium uppercase text-ink-muted">{label}</dt><dd className="mt-1 whitespace-normal [overflow-wrap:anywhere] text-sm font-bold text-white">{value}</dd></div>)}</dl> }
function Metric({ label, value, featured = false }: { label: string; value: string; featured?: boolean }) { return <article className={`rounded-[20px] border px-[25px] py-[18px] ${featured ? "border-app-green/20 bg-metric-featured" : "border-light-gray/5 bg-surface-raised"}`}><p className="text-sm text-white">{label}</p><p className={`text-2xl font-bold ${featured ? "text-white" : "text-app-green"}`}>{value}</p></article> }
function Status({ value }: { value: string }) { return <span className={`w-[107px] rounded-[7px] px-3 py-1.5 text-center text-sm ${value === "Online" ? "bg-app-green/5 text-app-green" : value === "Suspended" ? "bg-app-yellow/5 text-app-yellow" : "bg-white/[0.04] text-ink-soft"}`}>{value}</span> }
function displayStatus(device: AdminPosDevice) { if (!device.businessId) return "Unassigned"; if (device.status === "ACTIVE") return "Online"; if (device.status === "DISABLED") return "Suspended"; return "Offline" }
function displayDate(value: string) { const date = new Date(value); return value && !Number.isNaN(date.getTime()) ? new Intl.DateTimeFormat("en-NG", { dateStyle: "medium", timeStyle: "short" }).format(date) : "—" }
function ErrorState({ message }: { message: string }) { return <div role="alert" className="flex min-h-full items-center justify-center px-[30px] text-center"><div><h1 className="text-xl font-bold text-white">POS device could not be loaded</h1><p className="my-3 text-app-light-red">{message}</p><Button onClick={() => window.location.reload()}>Try again</Button></div></div> }
