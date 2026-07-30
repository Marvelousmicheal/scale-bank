import PageHeader from "@/components/PageHeader";
import TerminalTable from "@/components/pos/TerminalTable";
import {
  ActionButton,
  ClearFilters,
  FilterButton,
  SearchField,
} from "@/components/pos/PosControls";

const metrics = [
  { label: "Total Devices", value: "1,243", change: "+2.4%", featured: true },
  { label: "Active Devices", value: "1,225", change: "+1.8%" },
  { label: "Offline Devices", value: "18", change: "-10.2%", warning: true },
  { label: "Suspended Devices", value: "6", change: "0%" },
  { label: "Unassigned Devices", value: "42", change: "-12.2%", warning: true },
];

export default function POSTerminalsPage() {
  return (
    <div className="flex min-h-full flex-col gap-[31px] px-[30px] pb-4 pt-[46px]">
      <PageHeader
        title="POS Devices"
        description="Monitor and manage all ScanBank POS terminals deployed across businesses."
      />

      <section className="grid grid-cols-5 gap-3">
        {metrics.map((metric) => (
          <article
            key={metric.label}
            className={`relative h-[94px] rounded-[20px] border border-light-gray/5 px-[15px] py-[18px] ${
              metric.featured
                ? "border-app-green/20 bg-metric-featured"
                : "bg-app-black"
            }`}
          >
            <p className="font-sf-pro text-sm font-medium text-white">{metric.label}</p>
            <p className={`font-sf-pro text-2xl font-bold ${metric.featured ? "text-white" : "text-app-green"}`}>
              {metric.value}
            </p>
            <span
              className={`absolute bottom-[30px] right-[15px] font-sf-pro text-sm ${
                metric.warning ? "text-app-yellow" : metric.change === "0%" ? "text-ink-muted" : "text-app-green"
              }`}
            >
              {metric.change}
            </span>
          </article>
        ))}
      </section>

      <section className="rounded-[12px] border border-light-gray/10 bg-app-black px-[15px] py-5">
        <div className="mb-[25px] flex items-center justify-between">
          <h2 className="font-sf-pro text-xl font-bold text-white">POS List</h2>
          <div className="flex items-center gap-2.5">
            <ActionButton variant="outline" icon="download">Export</ActionButton>
            <ActionButton>Add POS Device</ActionButton>
            <ActionButton variant="muted" icon="upload">Bulk Upload</ActionButton>
          </div>
        </div>
        <div className="space-y-5">
          <SearchField placeholder="Search POS by device ID, serial number, or business" />
          <div className="flex gap-5">
            <FilterButton>Status</FilterButton>
            <FilterButton>Region</FilterButton>
            <FilterButton>Last Activity</FilterButton>
            <FilterButton calendar>Date Registered</FilterButton>
            <ClearFilters />
          </div>
        </div>
      </section>

      <TerminalTable />
    </div>
  );
}
