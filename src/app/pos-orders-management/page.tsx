import PageHeader from "@/components/PageHeader";
import OrdersTable from "@/components/pos-orders/OrdersTable";
import {
  ActionButton,
  ClearFilters,
  FilterButton,
  SearchField,
} from "@/components/pos/PosControls";

const metrics = [
  { label: "Total Orders", value: "1,243", change: "+2.4%", featured: true },
  { label: "Pending Approval", value: "1,225", change: "+1.8%" },
  { label: "Processing", value: "18", change: "-10.2%", warning: true },
  { label: "Processing", value: "6", change: "0%" },
  { label: "Cancelled", value: "42", change: "-12.2%", warning: true },
];

export default function PosOrdersManagementPage() {
  return (
    <div className="flex min-h-full flex-col gap-[31px] px-[30px] pb-4 pt-[46px]">
      <PageHeader
        title="POS Orders"
        description="Manage POS device orders placed by businesses."
      />

      <section className="grid grid-cols-5 gap-3">
        {metrics.map((metric, index) => (
          <article
            key={`${metric.label}-${index}`}
            className={`relative h-[94px] rounded-[20px] border border-light-gray/5 px-[15px] py-[18px] ${
              metric.featured
                ? "border-app-green/20 bg-[linear-gradient(135deg,rgba(16,151,50,0.3)_70%,#1C1C1E_100%)]"
                : "bg-app-black"
            }`}
          >
            <p className="font-sf-pro text-sm font-medium text-white">{metric.label}</p>
            <p className={`font-sf-pro text-2xl font-bold ${metric.featured ? "text-white" : "text-app-green"}`}>{metric.value}</p>
            <span className={`absolute bottom-[30px] right-[15px] font-sf-pro text-sm ${metric.warning ? "text-app-yellow" : metric.change === "0%" ? "text-[#8E8E93]" : "text-app-green"}`}>{metric.change}</span>
          </article>
        ))}
      </section>

      <section className="rounded-[12px] border border-light-gray/10 bg-app-black px-[15px] py-5">
        <div className="mb-[25px] flex items-center justify-between">
          <h2 className="font-sf-pro text-xl font-bold text-white">Orders List</h2>
          <div className="flex items-center gap-2.5">
            <ActionButton variant="outline" icon="download">Export</ActionButton>
            <ActionButton>Add Manual Order</ActionButton>
          </div>
        </div>
        <div className="space-y-5">
          <SearchField placeholder="Search POS orders by business name or order ID" />
          <div className="flex gap-5">
            <FilterButton>Order Status</FilterButton>
            <FilterButton>Order Status</FilterButton>
            <FilterButton>Device Model</FilterButton>
            <FilterButton calendar>Date Range</FilterButton>
            <ClearFilters />
          </div>
        </div>
      </section>

      <OrdersTable />
    </div>
  );
}
