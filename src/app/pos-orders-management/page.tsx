import PageHeader from "@/components/PageHeader";
import OrdersTable from "@/components/pos-orders/OrdersTable";
import {
  ActionButton,
  ClearFilters,
  FilterButton,
  SearchField,
} from "@/components/pos/PosControls";
import { MetricCard } from "@/components/dashboard/DashboardPrimitives";

const metrics = [
  { label: "Total Orders", value: "1,243", change: "+2.4%", featured: true },
  { label: "Pending Approval", value: "1,225", change: "+1.8%" },
  { label: "Processing", value: "18", change: "-10.2%", changeTone: "warning" as const },
  { label: "Processing", value: "6", change: "0%", changeTone: "muted" as const },
  { label: "Cancelled", value: "42", change: "-12.2%", changeTone: "warning" as const },
];

export default function PosOrdersManagementPage() {
  return (
    <div className="flex min-h-full flex-col gap-[31px] px-[30px] pb-4 pt-[46px]">
      <PageHeader
        title="POS Orders"
        description="Manage POS device orders placed by businesses."
      />

      <section className="grid grid-cols-5 gap-3">
        {metrics.map((metric, index) => <MetricCard key={`${metric.label}-${index}`} metric={metric} />)}
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
