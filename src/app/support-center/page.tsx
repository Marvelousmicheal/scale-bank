import { AlertTriangle, ChevronDown, Tag } from "lucide-react";
import PageHeader from "@/components/PageHeader";

const metrics = [
  { label: "Open Tickets", value: "24", featured: true },
  { label: "Chargebacks", value: "11", change: "+1.8%" },
  { label: "Resolved This Week", value: "28", change: "-10.2%", warning: true },
  { label: "Refund Value", value: "₦3,420,000", change: "0%", amber: true },
  { label: "Fraud Flags", value: "7", change: "-12.2%", danger: true },
];

function MetricCard({
  metric,
}: {
  metric: (typeof metrics)[number];
}) {
  return (
    <article
      className={`relative h-[94px] rounded-[20px] border border-light-gray/5 px-[15px] py-[18px] ${
        metric.featured
          ? "border-app-green/20 bg-[linear-gradient(135deg,rgba(16,151,50,0.3)_70%,#1C1C1E_100%)]"
          : "bg-app-black"
      }`}
    >
      <p className="font-sf-pro text-sm font-medium text-white">{metric.label}</p>
      <p
        className={`font-sf-pro text-2xl font-bold ${
          metric.featured
            ? "text-white"
            : metric.amber
              ? "text-app-yellow"
              : metric.danger
                ? "text-app-red"
                : "text-app-green"
        }`}
      >
        {metric.value}
      </p>
      {metric.change && (
        <span
          className={`absolute bottom-[31px] right-[15px] font-sf-pro text-sm ${
            metric.warning || metric.danger
              ? "text-app-yellow"
              : metric.change === "0%"
                ? "text-[#8E8E93]"
                : "text-app-green"
          }`}
        >
          {metric.change}
        </span>
      )}
    </article>
  );
}

function FeeInput({
  label,
  value,
  suffix,
  note,
}: {
  label: string;
  value: string;
  suffix?: string;
  note?: string;
}) {
  return (
    <label className="min-w-0 flex-1">
      <span className="mb-2 block font-sf-pro text-sm text-[#BEC2DA]">{label}</span>
      <span className="flex h-[45px] items-center justify-between rounded-[12px] border border-light-gray/10 bg-[#101011] px-3 font-sf-pro text-sm text-[#8E8E93]">
        {value}
        {suffix && (
          <span className="flex items-center gap-4">
            {suffix}
            <ChevronDown className="size-5 text-[#BEC2DA]" />
          </span>
        )}
      </span>
      {note && <span className="mt-1 block font-sf-pro text-xs text-[#8E8E93]">{note}</span>}
    </label>
  );
}

function FeeSectionHeader({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-[65px] items-center justify-between rounded-[12px] bg-[linear-gradient(110deg,#171717,#222)] px-2.5">
      <div>
        <h3 className="font-sf-pro text-base font-bold text-white">{title}</h3>
        <p className="font-sf-pro text-sm text-[#8E8E93]">{description}</p>
      </div>
      <button
        disabled
        className="h-[45px] w-[170px] rounded-[12px] bg-app-blue/60 font-sf-pro text-base font-bold text-[#8E8E93]"
      >
        Update Fees
      </button>
    </div>
  );
}

export default function SupportCenterPage() {
  return (
    <div className="flex min-h-full flex-col gap-[15px] px-[25px] pb-[30px] pt-[46px]">
      <PageHeader title="Support Center" />

      <section className="mt-[15px]">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-sf-pro text-base font-bold text-white">Dispute Metrics</h2>
          <div className="flex h-[42px] w-[254px] items-center justify-between rounded-[12px] border border-app-blue px-[15px] font-sf-pro text-base">
            <span className="font-bold text-app-blue">Daily</span>
            <span className="text-[#8E8E93]">Weekly</span>
            <span className="text-[#8E8E93]">Monthly</span>
            <span className="text-[#8E8E93]">Yearly</span>
          </div>
        </div>
        <div className="space-y-3">
          {[0, 1].map((row) => (
            <div key={row} className="grid grid-cols-5 gap-3">
              {metrics.map((metric) => <MetricCard key={`${row}-${metric.label}`} metric={metric} />)}
            </div>
          ))}
        </div>
      </section>

      <section className="flex min-h-[94px] items-center justify-between rounded-[12px] border border-light-gray/10 bg-app-black px-[15px]">
        <div>
          <h2 className="font-sf-pro text-xl font-bold text-white">Fees and Pricing</h2>
          <p className="font-sf-pro text-sm text-[#8E8E93]">Transaction costs across ecosystem</p>
        </div>
        <div className="flex min-h-[64px] w-[430px] items-center gap-3 rounded-[12px] border border-app-yellow/10 bg-app-yellow/15 px-[15px]">
          <AlertTriangle className="size-6 shrink-0 text-app-yellow" fill="currentColor" />
          <div>
            <p className="font-sf-pro text-base font-bold text-app-yellow">High-Risk Action</p>
            <p className="font-sf-pro text-sm text-app-yellow/80">Changes here affect live transactions and revenue.</p>
          </div>
        </div>
      </section>

      <section className="rounded-[12px] border border-light-gray/10 bg-app-black p-[15px]">
        <div className="rounded-[12px] bg-[#050506] p-2.5">
          <FeeSectionHeader title="Consumer Fees" description="Fees charged to individual users" />
          <div className="mt-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-sf-pro text-base font-bold text-white">Wallet → Bank Transfer</h3>
              <Tag className="size-5 text-[#FFC400]" fill="currentColor" />
            </div>
            <div className="flex gap-2.5">
              <FeeInput label="Standard Fee" value="₦20" />
              <FeeInput label="Plus/Premium Fee" value="₦0" />
              <FeeInput label="After Limit" value="₦30" />
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[12px] border border-light-gray/10 bg-app-black p-[15px]">
        <div className="rounded-[12px] bg-[#050506] p-2.5">
          <FeeSectionHeader
            title="Merchant MDR (Business Fees)"
            description="Merchant Discount Rate for business transactions"
          />

          <div className="mt-6 space-y-5">
            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-sf-pro text-base font-bold text-white">Pay-with-Transfer</h3>
                <Tag className="size-5 text-[#FFC400]" fill="currentColor" />
              </div>
              <div className="flex gap-2.5">
                <FeeInput label="Standard Tier" value="1.30%" suffix="Percentage" note="Cap: ₦1,500" />
                <FeeInput label="Titanium Tier" value="₦1,150" suffix="Fiat" note="Cap: ₦1,150" />
                <FeeInput label="Diamond Tier" value="1.30%" suffix="Percentage" note="Cap: ₦1,150" />
              </div>
            </div>

            <div>
              <h3 className="mb-2 font-sf-pro text-base font-bold text-white">Local Cards</h3>
              <div className="flex gap-2.5">
                <FeeInput label="Standard Tier" value="1.50%" suffix="Percentage" />
                <FeeInput label="Titanium Tier" value="1.25%" suffix="Percentage" />
                <FeeInput label="Diamond Tier" value="1.10%" suffix="Percentage" />
              </div>
            </div>

            <div>
              <h3 className="mb-2 font-sf-pro text-base font-bold text-white">International Cards</h3>
              <div className="flex gap-2.5">
                <FeeInput label="Standard Tier" value="3.50%" suffix="Percentage" />
                <FeeInput label="Titanium Tier" value="3.25%" suffix="Percentage" />
                <FeeInput label="Diamond Tier" value="3.00%" suffix="Percentage" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
