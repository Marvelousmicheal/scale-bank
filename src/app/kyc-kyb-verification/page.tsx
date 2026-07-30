import { ChevronDown, Download, Search, ShieldCheck, X } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import VerificationTable from "@/components/verification/VerificationTable";
import { DashboardPanel, MetricCard, PeriodSelector } from "@/components/dashboard/DashboardPrimitives";

const metrics = [
  { label: "Total Approved", value: "630", change: "+2.4%", featured: true },
  { label: "Pending Reviews", value: "12", change: "-1.8%", labelTone: "warning" as const },
  { label: "Rejected", value: "18", change: "+10.2%", labelTone: "danger" as const, changeTone: "warning" as const },
  { label: "Avg Review Time", value: "14 mins", change: "-1.8%" },
  { label: "Flagged", value: "9" },
  { label: "Escalated Cases", value: "5", change: "-10.2%", changeTone: "warning" as const },
];

function Filter({ children }: { children: React.ReactNode }) {
  return <button className="flex h-[45px] flex-1 items-center justify-between rounded-[8px] border border-light-gray/10 bg-surface-raised px-[15px] font-sf-pro text-sm font-bold text-ink-muted">{children}<ChevronDown className="size-5 text-ink-soft" /></button>;
}

export default function KycKybVerificationPage() {
  return (
    <div className="flex min-h-full flex-col gap-[15px] px-[25px] pb-[30px] pt-[46px]">
      <PageHeader title="KYC & KYB Verification" description="Manage identity and business verification processes." />

      <DashboardPanel>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-sf-pro text-xl font-bold">Reports Overview</h2>
          <PeriodSelector />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {metrics.map((metric) => <MetricCard key={metric.label} metric={metric} outlined />)}
        </div>
      </DashboardPanel>

      <section className="rounded-[12px] border border-light-gray/10 bg-app-black p-[15px]">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-sf-pro text-xl font-bold">KYC?KYB List</h2>
          <div className="flex gap-2.5">
            <button className="flex h-11 items-center gap-3 rounded-[12px] bg-app-blue/30 px-9 font-sf-pro font-bold">Export <Download className="size-5" /></button>
            <button className="flex h-11 items-center gap-3 rounded-[12px] bg-action-blue px-5 font-sf-pro font-bold">Add New User <ShieldCheck className="size-5 fill-white" /></button>
          </div>
        </div>
        <label className="flex h-[30px] items-center gap-2.5 rounded-[8px] border border-light-gray/10 bg-surface-raised px-2.5"><Search className="size-5 text-ink-soft" /><input aria-label="Search verification records" placeholder="Search user by name, business or account ID.." className="flex-1 bg-transparent text-sm outline-none placeholder:text-ink-muted" /></label>
        <div className="mt-5 flex gap-5"><Filter>All Verification</Filter><Filter>All Status</Filter><Filter>All Risk Levels</Filter><Filter>Today</Filter><button className="flex h-[45px] w-[135px] items-center justify-between rounded-[8px] bg-app-blue/25 px-[15px] text-sm font-bold">Clear Filter <X className="size-5" /></button></div>
      </section>

      <VerificationTable />
    </div>
  );
}
