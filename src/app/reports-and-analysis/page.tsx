import { Download } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ReportCharts from "@/components/reports/ReportCharts";
import { DashboardPanel, MetricCard, PeriodSelector } from "@/components/dashboard/DashboardPrimitives";

const overview = [
  { label: "Total Volume", value: "₦53.2B", change: "+2.4%", featured: true },
  { label: "Total Revenue (from fees)", value: "₦82.4M", change: "+1.8%" },
  { label: "Active Businesses", value: "18", change: "-10.2%", changeTone: "warning" as const },
  { label: "Active Users", value: "42,580", change: "+1.8%" },
  { label: "Success Rate", value: "99.2%" },
  { label: "Avg Transaction", value: "₦3,850", change: "-10.2%", changeTone: "warning" as const },
];

const businesses = [
  ["Global Start", "TX-789034", "Okechukwu Valentine", "Titanium", "₦1,440,300,500"],
  ["TechStark Corp", "TX-789034", "Adesanya Khabib", "Standard", "₦1,440,300,500"],
  ["Skyline Logistics", "TX-789034", "Aljaxa Francis", "Diamond", "₦1,440,300,500"],
  ["Main St. Cafe", "TX-789098", "Anastasia Priscilla", "Standard", "₦102,300,500"],
];

function CardTitle({ title, subtitle, period }: { title: string; subtitle?: string; period?: string }) {
  return <div className="flex items-start justify-between"><div><h2 className="font-sf-pro text-xl font-bold">{title}</h2>{subtitle && <p className="font-sf-pro text-sm text-ink-subtle">{subtitle}</p>}</div>{period && <PeriodSelector value={period} />}</div>;
}

export default function ReportsAndAnalysisPage() {
  return (
    <div className="flex min-h-full flex-col gap-[15px] px-[25px] pb-[30px] pt-[40px]">
      <PageHeader title="Reports & Analytics" description="Track performance, revenue, and system activity." />

      <DashboardPanel>
        <div className="mb-5 flex justify-between"><h2 className="font-sf-pro text-xl font-bold">Reports Overview</h2><PeriodSelector /></div>
        <div className="grid grid-cols-3 gap-3">
          {overview.map((item) => <MetricCard key={item.label} metric={item} compact outlined />)}
        </div>
      </DashboardPanel>

      <section className="rounded-[12px] border border-light-gray/10 bg-app-black p-[15px]">
        <CardTitle title="Exportable Reports" subtitle="Download detailed reports in various formats" />
        <div className="mt-5 grid grid-cols-4 gap-[15px]">{["Transaction Report","Settlement Report","Business Performance","Revenue Summary"].map((report) => <button key={report} className="flex h-[36px] items-center justify-between rounded-[6px] bg-app-blue/30 px-3 text-sm font-bold">{report}<Download className="size-5" /></button>)}</div>
      </section>

      <ReportCharts />

      <section className="rounded-[12px] border border-light-gray/10 bg-app-black p-[15px]">
        <CardTitle title="Top Performing Businesses" subtitle="Highest transaction volumes" period="Weekly" />
        <div className="mt-5 rounded-[12px] border border-light-gray/10 p-[15px]">
          <div className="grid grid-cols-[1.2fr_.8fr_1fr_.85fr_1fr] px-3 py-2 text-sm font-bold"><span>Business name</span><span>Business ID</span><span>Owner</span><span>Tier</span><span>Monthly Volume</span></div>
          {businesses.map((row) => <div key={row[0]} className="mb-2 grid min-h-[40px] grid-cols-[1.2fr_.8fr_1fr_.85fr_1fr] items-center rounded-[7px] border border-light-gray/10 bg-surface-raised px-3 text-sm"><b>{row[0]}</b><b>{row[1]}</b><span className="text-ink-dim">{row[2]}</span><span className={row[3] === "Titanium" ? "text-accent-gold" : row[3] === "Diamond" ? "text-accent-violet" : "text-app-blue"}>{row[3]}</span><span>{row[4]}</span></div>)}
        </div>
      </section>

      <section className="grid grid-cols-2 gap-[15px]">
        <article className="rounded-[12px] bg-app-black p-[15px]"><CardTitle title="Transaction Insights" subtitle="User behavior patterns" /><div className="mt-7 space-y-7 text-sm text-ink-muted"><div className="flex justify-between"><span>Peak Transaction Time</span><b className="text-ink-soft">2 PM – 5 PM</b></div><div className="flex justify-between"><span>Most Used Payment Method</span><b className="text-ink-soft">POS</b></div><div className="flex justify-between"><span>Avg Transactions per User per day</span><b className="text-app-blue">3</b></div></div></article>
        <article className="rounded-[12px] bg-app-black p-[15px]"><CardTitle title="Risk Monitoring" subtitle="System health indicators" /><div className="mt-5 space-y-3 text-sm font-bold"><div className="flex justify-between rounded-[8px] bg-app-green/15 px-3 py-2 text-app-green"><span>Failure Rate</span><span>0.8%</span></div><div className="flex justify-between rounded-[8px] bg-app-yellow/20 px-3 py-2 text-accent-gold"><span>Active Disputes</span><span>42</span></div><div className="flex justify-between rounded-[8px] bg-app-red/15 px-3 py-2 text-app-red"><span>Chargebacks</span><span>11</span></div></div></article>
      </section>
    </div>
  );
}
