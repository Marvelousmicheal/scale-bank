import PageHeader from "@/components/PageHeader";
import SettlementsTable from "@/components/settlements/SettlementsTable";
import { ActionButton, ClearFilters, FilterButton, SearchField } from "@/components/pos/PosControls";
import { MetricCard, PeriodSelector } from "@/components/dashboard/DashboardPrimitives";

const metrics = [
  { label: "Pending Settlements", value: "₦8,420,000", featured: true },
  { label: "Total Settled", value: "₦184,300,500", change: "+1.8%" },
  { label: "Successful Transactions", value: "12,481", change: "-10.2%", changeTone: "warning" as const },
  { label: "Settlement Failures", value: "126", change: "0%", valueTone: "danger" as const, changeTone: "muted" as const },
  { label: "Refunds Processed", value: "₦2,420,000", change: "-12.2%", valueTone: "warning" as const, changeTone: "warning" as const },
];

export default function SettlementsPage() {
  return (
    <div className="flex min-h-full flex-col gap-[15px] px-[30px] pb-4 pt-[46px]">
      <PageHeader title="Settlements" description="Manage payouts to businesses and monitor settlement activity." />
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-sf-pro text-base font-bold">Settlement Metrics</h2>
          <PeriodSelector value="Daily" options={["Daily", "Weekly", "Monthly", "Yearly"]} />
        </div>
        <div className="grid grid-cols-5 gap-3">
          {metrics.map((metric) => <MetricCard key={metric.label} metric={metric} />)}
        </div>
      </section>
      <section className="rounded-[12px] border border-light-gray/10 bg-app-black px-[15px] py-[18px]">
        <div className="mb-[25px] flex items-center justify-between">
          <h2 className="font-sf-pro text-xl font-bold">Settlement List</h2>
          <div className="flex gap-2.5"><ActionButton variant="outline" icon="download">Export</ActionButton><ActionButton>Add Manual Order</ActionButton></div>
        </div>
        <div className="space-y-5">
          <SearchField placeholder="Search by Business Name, Settlement ID, Settlement ID, or Account Number" />
          <div className="flex gap-5"><FilterButton>Settlement Status</FilterButton><FilterButton>Settlement Type</FilterButton><FilterButton calendar>Date Range</FilterButton><ClearFilters /></div>
        </div>
      </section>
      <SettlementsTable />
    </div>
  );
}
