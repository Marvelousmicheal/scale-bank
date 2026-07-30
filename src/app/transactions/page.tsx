import PageHeader from "@/components/PageHeader";
import TransactionsTable from "@/components/transactions/TransactionsTable";
import { ActionButton, ClearFilters, FilterButton, SearchField } from "@/components/pos/PosControls";
import { MetricCard, PeriodSelector } from "@/components/dashboard/DashboardPrimitives";

const metrics = [
  { label: "Total Transactions", value: "1,243", change: "+2.4%", featured: true },
  { label: "Total Volume", value: "₦184,300,500", change: "+1.8%" },
  { label: "Successful Transactions", value: "12,481", change: "-10.2%", changeTone: "warning" as const },
  { label: "Failed Transactions", value: "126", change: "0%", valueTone: "danger" as const, changeTone: "muted" as const },
  { label: "Refunds Processed", value: "₦2,420,000", change: "-12.2%", valueTone: "warning" as const, changeTone: "warning" as const },
];

export default function TransactionsPage() {
  return (
    <div className="flex min-h-full flex-col gap-[15px] px-[30px] pb-4 pt-[46px]">
      <PageHeader title="Transactions" description="Monitor and investigate all platform transactions." />

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-sf-pro text-base font-bold">Transaction Metrics</h2>
          <PeriodSelector value="Daily" options={["Daily", "Weekly", "Monthly", "Yearly"]} />
        </div>
        <div className="grid grid-cols-5 gap-3">
          {metrics.map((metric) => <MetricCard key={metric.label} metric={metric} />)}
        </div>
      </section>

      <section className="rounded-[12px] border border-light-gray/10 bg-app-black px-[15px] py-[18px]">
        <div className="mb-[25px] flex items-center justify-between">
          <h2 className="font-sf-pro text-xl font-bold">Transaction List</h2>
          <div className="flex gap-2.5"><ActionButton variant="outline" icon="download">Export</ActionButton><ActionButton>Add Manual Order</ActionButton></div>
        </div>
        <div className="space-y-5">
          <SearchField placeholder="Search by transaction ID, user, business, or POS device" />
          <div className="flex gap-5">
            <FilterButton>Transaction Type</FilterButton><FilterButton>Transaction Status</FilterButton><FilterButton>Payment Channel</FilterButton><FilterButton calendar>Date Range</FilterButton><ClearFilters />
          </div>
        </div>
      </section>

      <TransactionsTable />
    </div>
  );
}
