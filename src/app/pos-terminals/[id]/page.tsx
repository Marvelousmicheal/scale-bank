import { notFound } from "next/navigation";
import {
  AlertTriangle,
  BatteryMedium,
  Download,
  MapPin,
  ShieldCheck,
  Wifi,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import TablePagination from "@/components/TablePagination";
import {
  ClearFilters,
  FilterButton,
  SearchField,
} from "@/components/pos/PosControls";
import {
  posTerminals,
  terminalTransactions,
} from "@/lib/pos-terminal-data";

export function generateStaticParams() {
  return posTerminals.map((terminal) => ({ id: terminal.id }));
}

export default async function POSTerminalDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const terminal = posTerminals.find((item) => item.id === id);

  if (!terminal) notFound();

  return (
    <div className="flex min-h-full flex-col gap-[15px] px-[30px] pb-[30px] pt-[46px]">
      <PageHeader title="Devices Details" backHref="/pos-terminals" />

      <section className="grid min-h-[252px] grid-cols-[1fr_282px] gap-[15px] rounded-[12px] border border-light-gray/10 bg-app-black p-[15px]">
        <div className="flex flex-col gap-5">
          <div className="flex min-h-[108px] items-center justify-between rounded-[12px] border border-light-gray/10 bg-surface-raised px-[15px] py-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="font-sf-pro text-base font-bold text-white">{terminal.id}</h1>
                <span className="w-[107px] rounded-[7px] bg-app-green/5 px-3 py-1.5 text-center font-sf-pro text-base text-app-green">
                  Active
                </span>
              </div>
              <p className="font-sf-pro text-sm text-ink-muted">
                ScanBank POS S1
                <span className="ml-3">Device Model: <b className="text-ink-soft">ScanBank POS S1</b></span>
              </p>
              <div className="flex items-center gap-3 font-sf-pro text-sm text-ink-muted">
                <span>{terminal.serialNumber}: <b className="text-ink-soft">{terminal.firmware}</b></span>
                <span className="flex items-center gap-1.5"><BatteryMedium className="size-5 text-app-blue" />{terminal.battery}%</span>
                <span className="flex items-center gap-1.5 font-bold text-white"><Wifi className="size-5 text-app-green" />{terminal.signal}</span>
              </div>
            </div>
            <div className="flex gap-2.5">
              <button className="flex h-11 items-center gap-2 rounded-[12px] bg-action-blue px-[15px] font-sf-pro font-bold text-white">
                Update FW <ShieldCheck className="size-5" />
              </button>
              <button className="flex h-11 items-center gap-2 rounded-[12px] bg-app-red/20 px-[15px] font-sf-pro font-bold text-app-red">
                Suspend <AlertTriangle className="size-5" />
              </button>
            </div>
          </div>

          <div className="grid flex-1 grid-cols-3 gap-[15px]">
            {[
              { label: "Today’s Volume", value: terminal.todayVolume, note: "+3%", featured: true },
              { label: "Monthly Volume", value: terminal.monthlyVolume, note: "+3%" },
              { label: "Transactions Today", value: "84", note: "avg ₦1,420/txns" },
            ].map((metric) => (
              <article
                key={metric.label}
                className={`relative rounded-[20px] border border-light-gray/5 px-[25px] py-[18px] ${
                  metric.featured
                    ? "border-app-green/20 bg-metric-featured"
                    : "bg-surface-raised"
                }`}
              >
                <p className="font-sf-pro text-sm text-white">{metric.label}</p>
                <p className={`font-sf-pro text-2xl font-bold ${metric.featured ? "text-white" : "text-app-green"}`}>{metric.value}</p>
                <span className="absolute bottom-[22px] right-[15px] font-sf-pro text-xs text-app-green">{metric.note}</span>
              </article>
            ))}
          </div>
        </div>

        <div className="rounded-[20px] bg-device-dark p-[15px]">
          <div className="relative mb-3 h-[118px] overflow-hidden rounded-[12px] border border-light-gray/10 bg-device-paper">
            <div className="absolute inset-0 opacity-70 [background-image:linear-gradient(25deg,transparent_46%,var(--device-label)_47%,var(--device-label)_49%,transparent_50%),linear-gradient(115deg,transparent_46%,var(--device-muted)_47%,var(--device-muted)_49%,transparent_50%)] [background-size:55px_42px]" />
            <MapPin className="absolute left-1/2 top-1/2 size-7 -translate-x-1/2 -translate-y-1/2 text-app-red" fill="currentColor" />
          </div>
          <p className="font-sf-pro text-sm text-ink-muted">Location Details</p>
          <p className="font-sf-pro text-base font-bold text-ink-soft">{terminal.location}</p>
          <p className="font-sf-pro text-sm text-ink-muted">{terminal.address}</p>
        </div>
      </section>

      <section className="rounded-[12px] border border-light-gray/10 bg-app-black p-5">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-sf-pro text-xl font-bold text-white">Recent Transactions</h2>
          <button className="flex h-11 w-[154px] items-center justify-center gap-2.5 rounded-[12px] border border-app-blue font-sf-pro font-bold text-app-blue">
            Export <Download className="size-5" />
          </button>
        </div>
        <div className="space-y-5">
          <SearchField placeholder="Search by business name, owner, or business ID" />
          <div className="flex gap-5">
            <FilterButton>Channel</FilterButton>
            <FilterButton>Amount</FilterButton>
            <FilterButton>Status</FilterButton>
            <FilterButton calendar>Date</FilterButton>
            <ClearFilters />
          </div>
        </div>
        <table className="mt-5 w-full border-separate border-spacing-y-2.5 font-sf-pro">
          <thead>
            <tr className="text-left text-sm font-bold text-white">
              <th className="px-[15px]">Transaction ID</th>
              <th className="px-[15px]">Amount</th>
              <th className="px-[15px]">Time</th>
              <th className="px-[15px] text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {terminalTransactions.map((transaction) => (
              <tr key={transaction.id} className="h-[43px]">
                <td className="rounded-l-[8px] border-y border-l border-light-gray/10 bg-surface-raised px-[15px] font-bold text-white">{transaction.id}</td>
                <td className="border-y border-light-gray/10 bg-surface-raised px-[15px] text-white">{transaction.amount}</td>
                <td className="border-y border-light-gray/10 bg-surface-raised px-[15px] text-ink-soft">{transaction.time}</td>
                <td className="rounded-r-[8px] border-y border-r border-light-gray/10 bg-surface-raised px-[15px]">
                  <span className={`ml-auto block w-[107px] rounded-[7px] px-2 py-1 text-center ${transaction.status === "Success" ? "bg-app-green/5 text-app-green" : "bg-app-red/5 text-app-red"}`}>
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <TablePagination showing="Showing 1 to 11 of 50 entries" total={4} />
      </section>

      <section className="grid grid-cols-[1.45fr_1fr] gap-5">
        <div className="rounded-[12px] border border-light-gray/10 bg-app-black p-[15px]">
          <h2 className="mb-4 font-sf-pro text-base font-bold text-white">Activity Timeline</h2>
          <div className="grid grid-cols-2 gap-2.5">
            {["Logout", "Initiated Transaction", "Login", "Changed password", "Login", "Changed password"].map((activity, index) => (
              <div key={`${activity}-${index}`} className="flex items-center gap-3 font-sf-pro text-xs">
                <span className="text-ink-muted">13:10/11 Jan 2026</span>
                <span className="flex-1 rounded-[7px] border border-light-gray/10 bg-surface-raised px-2 py-1.5 text-app-yellow">{activity}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[12px] border border-light-gray/10 bg-app-black p-[15px]">
          <h2 className="mb-3 font-sf-pro text-base font-bold text-white">Device error logs</h2>
          <div className="space-y-2.5">
            {[
              ["Network timeout", "Failed to reach gateway, txn 267490. Aborted", "red"],
              ["Transaction failure", "Recipient bank not responding, transaction failed.", "yellow"],
              ["Settlement Delay", "Interbank Network lag detected", "gray"],
            ].map(([title, detail, tone]) => (
              <div key={title} className={`rounded-[8px] border p-2.5 ${tone === "red" ? "border-app-red/20 bg-app-red/15" : tone === "yellow" ? "border-app-yellow/20 bg-app-yellow/15" : "border-light-gray/10 bg-light-gray/10"}`}>
                <p className="font-sf-pro text-sm font-bold text-white">{title}</p>
                <p className={`font-sf-pro text-xs ${tone === "red" ? "text-app-red" : tone === "yellow" ? "text-app-yellow" : "text-ink-soft"}`}>{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
