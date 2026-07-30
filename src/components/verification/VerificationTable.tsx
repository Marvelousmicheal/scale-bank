"use client";

import { useEffect, useState } from "react";
import { Check, Download, FileImage, IdCard, ShieldCheck, Smile, X } from "lucide-react";
import TablePagination from "@/components/TablePagination";

const records = [
  ["Adebayo John", "Adebayo.jo@gmail.com", "TX-789034", "KYC", "Standard Verification", "Approved"],
  ["Reeva Supermarket", "Adebayo John", "TX-789034", "KYC", "Standard Verification", "Pending"],
  ["TechMart Lagos", "Aisha Mohammed", "TX-789034", "KYB", "Upgrade to Titanium", "Pending"],
  ["Chuks Laundromat", "Chukwudi Okafor", "TX-789098", "KYB", "Upgrade to Diamond", "Rejected"],
  ["Adebayo Kayode", "Adebayo.jo@gmail.com", "TX-789098", "KYB", "Upgrade to Diamond", "Approved"],
  ["Skyline Logistics", "Aljaxa Francis", "TX-789021", "KYB", "Standard Verification", "Pending"],
];
const statusStyles: Record<string, string> = { Approved: "bg-app-green/5 text-app-green", Pending: "bg-app-yellow/5 text-app-yellow", Rejected: "bg-app-red/5 text-app-red" };

export default function VerificationTable() {
  const [selected, setSelected] = useState<string | null>(null);
  useEffect(() => {
    if (!selected) return;
    const close = (event: KeyboardEvent) => event.key === "Escape" && setSelected(null);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [selected]);

  return <>
    <section className="rounded-[12px] border border-light-gray/10 bg-app-black p-5">
      <div className="overflow-x-auto"><table className="w-full border-separate border-spacing-y-2.5 font-sf-pro">
        <thead><tr className="text-left text-sm font-bold">{["User", "Account ID", "Type", "Tier Request", "Submitted", "Status"].map((title) => <th key={title} className="px-[15px] py-2">{title}</th>)}</tr></thead>
        <tbody>{records.map(([name, secondary, account, type, tier, status]) => <tr key={`${name}-${type}`} onClick={() => setSelected(name)} className="h-[62px] cursor-pointer hover:[&>td]:bg-white/[0.025]">
          <td className="rounded-l-[8px] border-y border-l border-light-gray/10 bg-surface-raised px-[15px]"><div className="flex items-center gap-3"><span className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-avatar-warm to-avatar-dark text-xs font-bold">{name.charAt(0)}</span><div><p className="font-bold">{name}</p><p className="text-sm text-ink-dim">{secondary}</p></div></div></td>
          <td className="border-y border-light-gray/10 bg-surface-raised px-[15px] font-bold">{account}</td><td className="border-y border-light-gray/10 bg-surface-raised px-[15px]">{type}</td><td className="max-w-[155px] border-y border-light-gray/10 bg-surface-raised px-[15px] text-ink-dim">{tier}</td><td className="border-y border-light-gray/10 bg-surface-raised px-[15px] text-ink-soft">10/03/2026 - 12:45</td><td className="rounded-r-[8px] border-y border-r border-light-gray/10 bg-surface-raised px-[15px]"><span className={`block w-[107px] rounded-[7px] px-2 py-1 text-center ${statusStyles[status]}`}>{status}</span></td>
        </tr>)}</tbody>
      </table></div><TablePagination showing="Showing 1 to 11 of 50 entries" total={4} />
    </section>
    {selected && <ProfileDrawer name={selected} onClose={() => setSelected(null)} />}
  </>;
}

function ProfileDrawer({ name, onClose }: { name: string; onClose: () => void }) {
  return <div className="fixed inset-0 z-50 bg-black/65" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <aside role="dialog" aria-modal="true" className="absolute right-4 top-4 h-[calc(100vh-32px)] w-[690px] overflow-y-auto border border-app-green/40 bg-surface-raised p-[15px] shadow-[var(--drawer-shadow)]">
      <div className="flex items-center justify-between"><button onClick={onClose} className="flex items-center gap-4 text-xl font-bold text-ink-soft"><X className="size-7" />Profile Overview</button><span className="w-[115px] rounded-[7px] bg-app-green/5 py-1 text-center text-sm text-app-green">Active</span></div>
      <section className="mt-6 rounded-[12px] border border-light-gray/10 p-[15px]"><div className="flex flex-col items-center"><div className="relative flex size-[150px] items-center justify-center rounded-full bg-avatar-red text-5xl font-bold">{name.charAt(0)}<ShieldCheck className="absolute bottom-1 right-3 size-7 fill-app-green text-app-green" /></div><h2 className="mt-2 text-lg font-bold text-ink-soft">{name}</h2><p className="text-sm text-ink-muted">Adebayo.jo@gmail.com</p></div><div className="mt-4 flex justify-between"><div><p className="text-sm text-ink-muted">Phone Number</p><b className="text-lg text-ink-soft">+234 804 567 8345</b></div><div><p className="text-sm text-ink-muted">Tier Request</p><b className="text-lg text-ink-soft">Upgrade to Premium</b></div></div></section>
      <ActionGrid />
      <section className="mt-5 rounded-[12px] bg-app-blue/15 p-[15px]"><h3 className="font-bold">Risk Assessment</h3><div className="mt-2 flex justify-between text-sm text-ink-muted"><span>Risk Score</span><b className="text-lg text-ink-soft">65</b></div><div className="mt-2 h-1 rounded bg-risk-track"><div className="h-full w-[62%] rounded bg-app-light-red" /></div><div className="mt-4 flex justify-end"><span className="rounded-[8px] bg-app-red/15 px-2 py-1 text-sm text-app-red">Medium Risk</span></div></section>
      <h3 className="mb-3 mt-5 font-bold">Review Details</h3><section className="rounded-[12px] border border-light-gray/10 p-2.5"><h3 className="mb-3 font-bold text-ink-soft">Submitted Details</h3><Info label="Full Name" value="Adebayo John" /><Info label="Date of Birth" value="15 January 1990" /><Info label="Address" value="12 Admiralty Way, Lekki Phase 1, Lagos" /><h3 className="my-4 font-bold">Identity Information</h3><Info label="BVN" value="2234567890" /><Info label="NIN" value="12345678901" /><Info label="ID Type" value="International Passport" /></section>
      <section className="mt-4 rounded-[12px] border border-light-gray/10 p-2.5"><h3 className="mb-3 font-bold">Submitted Documents</h3><Document icon={<IdCard />} title="Government Issued ID Card" /><Document icon={<Smile />} title="Selfie" /><Document icon={<FileImage />} title="Utility Bill" /></section>
      <section className="mt-4 rounded-[12px] border border-light-gray/10 p-2.5"><h3 className="mb-4 font-bold text-ink-soft">Automated Checks</h3><CheckRow label="BVN Match" value="Verified" style="bg-app-green/25 text-app-green" /><CheckRow label="Face Match" value="65% Match" style="bg-app-yellow/25 text-app-yellow" /><CheckRow label="Address Verification" value="Not Verified" style="bg-app-red/25 text-app-red" /></section>
      <ActionGrid secondary />
    </aside>
  </div>;
}
function ActionGrid({ secondary = false }: { secondary?: boolean }) { return <section className="mt-4"><h3 className="mb-2 font-bold text-ink-soft">Actions</h3><div className="grid grid-cols-2 gap-2.5"><button className="flex h-12 items-center gap-3 rounded-[8px] border border-light-gray/10 px-3 text-app-green"><Check className="size-6 rounded bg-app-green p-1 text-black" />Approve</button><button className="flex h-12 items-center gap-3 rounded-[8px] border border-light-gray/10 px-3 text-app-red"><X className="size-6 rounded-full bg-app-red p-1 text-black" />Reject</button>{secondary && <><button className="h-12 rounded-[8px] border border-light-gray/10 text-left px-3 text-ink-muted">▣　Request More Info</button><button className="h-12 rounded-[8px] border border-light-gray/10 text-left px-3 text-app-yellow">◆　Escalate to Compliance</button></>}</div></section>; }
function Info({ label, value }: { label: string; value: string }) { return <div className="mb-2 flex h-9 items-center justify-between rounded-[7px] border border-light-gray/10 bg-surface-raised px-2 text-sm"><span className="text-ink-muted">{label}</span><b className="text-ink-soft">{value}</b></div>; }
function Document({ icon, title }: { icon: React.ReactNode; title: string }) { return <div className="mb-2 flex h-12 items-center rounded-[7px] border border-light-gray/10 px-3"><span className="mr-3 size-5 text-app-blue">{icon}</span><b className="flex-1">{title}</b><button className="mr-3 w-[90px] rounded-[7px] bg-app-blue/15 py-1.5 text-app-blue">View</button><Download className="size-5" /></div>; }
function CheckRow({ label, value, style }: { label: string; value: string; style: string }) { return <div className={`mb-2 flex h-9 items-center justify-between rounded-[7px] px-2 text-sm ${style}`}><span className="text-white">{label}</span><b>{value}</b></div>; }
