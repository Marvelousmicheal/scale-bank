"use client"

import { useRouter } from "next/navigation"
import TablePagination from "@/components/TablePagination"
import TruncatedIdentifier from "@/components/TruncatedIdentifier"

export type DisputeTableRow = {
  key: string
  href: string
  disputeId: string
  transactionId: string
  user: string
  business: string
  type: string
  amount: string
  date: string
  priority: string
  status: string
}

export default function DisputesTable({ rows, showing, current = 1, total = 1, onPageChange, empty = false }: { rows: DisputeTableRow[]; showing: string; current?: number; total?: number; onPageChange?: (page: number) => void; empty?: boolean }) {
  const router = useRouter()
  return <>
    {!empty && <div className="min-h-0 flex-1 overflow-x-auto"><table className="w-full border-separate border-spacing-y-2.5 font-sf-pro"><thead><tr className="text-left text-sm font-bold text-white">{["Dispute ID", "Transaction ID", "User / Business", "Dispute Type", "Amount", "Date", "Priority Level", "Status"].map((heading) => <th key={heading} className="px-[15px] py-2">{heading}</th>)}</tr></thead><tbody>{rows.map((row) => <tr key={row.key} tabIndex={0} onClick={() => router.push(row.href)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") router.push(row.href) }} className="h-[52px] cursor-pointer outline-none focus-visible:[&>td]:border-app-blue/60"><td className="max-w-[145px] rounded-l-lg border-y border-l border-light-gray/10 bg-surface-raised px-[15px] font-bold"><TruncatedIdentifier value={row.disputeId} className="max-w-[115px]" /></td><td className="max-w-[145px] border-y border-light-gray/10 bg-surface-raised px-[15px] font-bold"><TruncatedIdentifier value={row.transactionId} className="max-w-[115px]" /></td><td className="border-y border-light-gray/10 bg-surface-raised px-[15px]"><p className="text-sm text-ink-soft">{row.user}</p><p className="text-xs text-ink-dim">{row.business}</p></td><td className="max-w-[170px] border-y border-light-gray/10 bg-surface-raised px-[15px] text-ink-dim">{row.type}</td><td className="border-y border-light-gray/10 bg-surface-raised px-[15px]">{row.amount}</td><td className="border-y border-light-gray/10 bg-surface-raised px-[15px] text-sm text-ink-soft">{row.date}</td><td className={`border-y border-light-gray/10 bg-surface-raised px-[15px] font-bold ${priorityStyle(row.priority)}`}>{row.priority}</td><td className="rounded-r-lg border-y border-r border-light-gray/10 bg-surface-raised px-[15px]"><Status value={row.status} /></td></tr>)}</tbody></table></div>}
    <TablePagination ariaLabel="Dispute pagination" showing={showing} current={current} total={total} onPageChange={onPageChange} />
  </>
}

function priorityStyle(value: string) { return value === "Critical" ? "text-accent-critical" : value === "High" ? "text-accent-violet" : value === "Medium" ? "text-app-yellow" : "text-ink-muted" }
function Status({ value }: { value: string }) { const normalized = value.toLowerCase(); const style = normalized === "resolved" ? "bg-app-green/5 text-app-green" : normalized === "rejected" ? "bg-app-red/5 text-app-red" : normalized === "under review" ? "bg-app-blue/15 text-app-blue" : "bg-app-yellow/5 text-app-yellow"; return <span className={`block w-[107px] rounded-[7px] px-2 py-1 text-center ${style}`}>{value}</span> }
