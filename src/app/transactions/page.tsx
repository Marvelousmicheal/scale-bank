import PageHeader from "@/components/PageHeader";
import TransactionsTable from "@/components/transactions/TransactionsTable";
import { ActionButton, ClearFilters, FilterButton, SearchField } from "@/components/pos/PosControls";

const metrics = [
  { label: "Total Transactions", value: "1,243", change: "+2.4%", featured: true },
  { label: "Total Volume", value: "₦184,300,500", change: "+1.8%" },
  { label: "Successful Transactions", value: "12,481", change: "-10.2%", warning: true },
  { label: "Failed Transactions", value: "126", change: "0%", danger: true },
  { label: "Refunds Processed", value: "₦2,420,000", change: "-12.2%", amber: true },
];

export default function TransactionsPage() {
  return (
    <div className="flex min-h-full flex-col gap-[15px] px-[30px] pb-4 pt-[46px]">
      <PageHeader title="Transactions" description="Monitor and investigate all platform transactions." />

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-sf-pro text-base font-bold">Transaction Metrics</h2>
          <div className="flex h-[43px] items-center gap-5 rounded-[12px] border border-app-blue px-[15px] font-sf-pro text-base text-[#8E8E93]">
            <span className="font-bold text-app-blue">Daily</span><span>Weekly</span><span>Monthly</span><span>Yearly</span>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {metrics.map((metric) => (
            <article key={metric.label} className={`relative h-[94px] rounded-[20px] border border-light-gray/5 px-[15px] py-[18px] ${metric.featured ? "border-app-green/20 bg-[linear-gradient(135deg,rgba(16,151,50,0.3)_70%,#1C1C1E_100%)]" : "bg-app-black"}`}>
              <p className="font-sf-pro text-sm font-medium">{metric.label}</p>
              <p className={`font-sf-pro text-2xl font-bold ${metric.featured ? "text-white" : metric.danger ? "text-app-red" : metric.amber ? "text-app-yellow" : "text-app-green"}`}>{metric.value}</p>
              <span className={`absolute bottom-[30px] right-[15px] font-sf-pro text-sm ${metric.warning || metric.amber ? "text-app-yellow" : metric.change === "0%" ? "text-[#8E8E93]" : "text-app-green"}`}>{metric.change}</span>
            </article>
          ))}
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
