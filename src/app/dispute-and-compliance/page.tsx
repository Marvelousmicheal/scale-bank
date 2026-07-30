import PageHeader from "@/components/PageHeader";
import DisputesTable from "@/components/disputes/DisputesTable";
import CreateDisputeModal from "@/components/disputes/CreateDisputeModal";
import { FilterButton, SearchField } from "@/components/pos/PosControls";
import { MetricCard, PeriodSelector } from "@/components/dashboard/DashboardPrimitives";

const metrics = [
  { label: "Open Disputes", value: "24", featured: true },
  { label: "Chargebacks", value: "11", change: "+1.8%" },
  { label: "Resolved This Week", value: "28", change: "-10.2%", changeTone: "warning" as const },
  { label: "Refund Value", value: "₦3,420,000", change: "0%", valueTone: "warning" as const, changeTone: "muted" as const },
  { label: "Fraud Flags", value: "7", change: "-12.2%", valueTone: "danger" as const, changeTone: "warning" as const },
];

export default function DisputeAndCompliancePage() {
  return (
    <div className="flex min-h-full flex-col gap-[15px] px-[30px] pb-4 pt-[46px]">
      <PageHeader title="Disputes & Chargebacks" description="Manage payment disputes, fraud reports, and chargeback investigations." />
      <section>
        <div className="mb-3 flex items-center justify-between"><h2 className="font-sf-pro text-base font-bold">Dispute Metrics</h2><PeriodSelector value="Daily" options={["Daily", "Weekly", "Monthly", "Yearly"]} /></div>
        <div className="grid grid-cols-5 gap-3">
          {metrics.map((metric) => <MetricCard key={metric.label} metric={metric} />)}
        </div>
      </section>
      <section className="rounded-[12px] border border-light-gray/10 bg-app-black px-[15px] py-[18px]">
        <div className="mb-[25px] flex items-center justify-between"><h2 className="font-sf-pro text-xl font-bold">Dispute List</h2><CreateDisputeModal /></div>
        <div className="space-y-5"><SearchField placeholder="Search disputes by transaction ID or user" /><div className="flex gap-[15px]"><FilterButton>Dispute Status</FilterButton><FilterButton>Dispute Type</FilterButton><FilterButton>Transaction Channel</FilterButton><FilterButton>Priority Level</FilterButton><FilterButton calendar>Date Range</FilterButton></div></div>
      </section>
      <DisputesTable />
    </div>
  );
}
