import PageHeader from "@/components/PageHeader";
import DisputesTable from "@/components/disputes/DisputesTable";
import CreateDisputeModal from "@/components/disputes/CreateDisputeModal";
import { FilterButton, SearchField } from "@/components/pos/PosControls";

const metrics = [
  { label: "Open Disputes", value: "24", featured: true },
  { label: "Chargebacks", value: "11", change: "+1.8%" },
  { label: "Resolved This Week", value: "28", change: "-10.2%", warning: true },
  { label: "Refund Value", value: "₦3,420,000", change: "0%", amber: true },
  { label: "Fraud Flags", value: "7", change: "-12.2%", danger: true },
];

export default function DisputeAndCompliancePage() {
  return (
    <div className="flex min-h-full flex-col gap-[15px] px-[30px] pb-4 pt-[46px]">
      <PageHeader title="Disputes & Chargebacks" description="Manage payment disputes, fraud reports, and chargeback investigations." />
      <section>
        <div className="mb-3 flex items-center justify-between"><h2 className="font-sf-pro text-base font-bold">Dispute Metrics</h2><div className="flex h-[43px] items-center gap-5 rounded-[12px] border border-app-blue px-[15px] font-sf-pro text-base text-[#8E8E93]"><span className="font-bold text-app-blue">Daily</span><span>Weekly</span><span>Monthly</span><span>Yearly</span></div></div>
        <div className="grid grid-cols-5 gap-3">
          {metrics.map((metric) => (
            <article key={metric.label} className={`relative h-[94px] rounded-[20px] border border-light-gray/5 px-[15px] py-[18px] ${metric.featured ? "border-app-green/20 bg-[linear-gradient(135deg,rgba(16,151,50,0.3)_70%,#1C1C1E_100%)]" : "bg-app-black"}`}>
              <p className="font-sf-pro text-sm">{metric.label}</p><p className={`mt-1 font-sf-pro text-xl font-bold ${metric.featured ? "text-white" : metric.amber ? "text-app-yellow" : metric.danger ? "text-app-red" : "text-app-green"}`}>{metric.value}</p>
              {metric.change && <span className={`absolute bottom-[30px] right-[15px] text-sm ${metric.warning || metric.danger ? "text-app-yellow" : metric.change === "0%" ? "text-[#8E8E93]" : "text-app-green"}`}>{metric.change}</span>}
            </article>
          ))}
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
