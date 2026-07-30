import { Download } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ReportCharts from "@/components/reports/ReportCharts";

const overview = [
  { label: "Total Volume", value: "₦53.2B", change: "+2.4%", featured: true },
  { label: "Total Revenue (from fees)", value: "₦82.4M", change: "+1.8%" },
  { label: "Active Businesses", value: "18", change: "-10.2%", warning: true },
  { label: "Active Users", value: "42,580", change: "+1.8%" },
  { label: "Success Rate", value: "99.2%" },
  { label: "Avg Transaction", value: "₦3,850", change: "-10.2%", warning: true },
];

const businesses = [
  ["Global Start", "TX-789034", "Okechukwu Valentine", "Titanium", "₦1,440,300,500"],
  ["TechStark Corp", "TX-789034", "Adesanya Khabib", "Standard", "₦1,440,300,500"],
  ["Skyline Logistics", "TX-789034", "Aljaxa Francis", "Diamond", "₦1,440,300,500"],
  ["Main St. Cafe", "TX-789098", "Anastasia Priscilla", "Standard", "₦102,300,500"],
];

function Period({ label = "Weekly" }: { label?: string }) {
  return <button className="h-[34px] rounded-[8px] border border-light-gray/10 bg-[#090614] px-4 font-sf-pro text-sm text-[#8E8E93]">{label}　⌄</button>;
}
function CardTitle({ title, subtitle, period }: { title: string; subtitle?: string; period?: string }) {
  return <div className="flex items-start justify-between"><div><h2 className="font-sf-pro text-xl font-bold">{title}</h2>{subtitle && <p className="font-sf-pro text-sm text-[#707EAE]">{subtitle}</p>}</div>{period && <Period label={period} />}</div>;
}

export default function ReportsAndAnalysisPage() {
  return (
    <div className="flex min-h-full flex-col gap-[15px] px-[25px] pb-[30px] pt-[40px]">
      <PageHeader title="Reports & Analytics" description="Track performance, revenue, and system activity." />

      <section className="rounded-[12px] border border-light-gray/10 bg-app-black p-[15px]">
        <div className="mb-5 flex justify-between"><h2 className="font-sf-pro text-xl font-bold">Reports Overview</h2><Period label="Monthly" /></div>
        <div className="grid grid-cols-3 gap-3">
          {overview.map((item) => <article key={item.label} className={`relative h-[74px] rounded-[20px] border px-[15px] py-3 ${item.featured ? "border-app-green/20 bg-[linear-gradient(135deg,rgba(16,151,50,.3),#1C1C1E)]" : "border-app-green/20 bg-[#090614]"}`}><p className="text-sm text-[#BEC2DA]">{item.label}</p><p className={`text-xl font-bold ${item.featured ? "text-white" : "text-app-green"}`}>{item.value}</p>{item.change && <span className={`absolute bottom-4 right-3 text-sm ${item.warning ? "text-app-yellow" : "text-app-green"}`}>{item.change}</span>}</article>)}
        </div>
      </section>

      <section className="rounded-[12px] border border-light-gray/10 bg-app-black p-[15px]">
        <CardTitle title="Exportable Reports" subtitle="Download detailed reports in various formats" />
        <div className="mt-5 grid grid-cols-4 gap-[15px]">{["Transaction Report","Settlement Report","Business Performance","Revenue Summary"].map((report) => <button key={report} className="flex h-[36px] items-center justify-between rounded-[6px] bg-app-blue/30 px-3 text-sm font-bold">{report}<Download className="size-5" /></button>)}</div>
      </section>

      <ReportCharts />

      <section className="rounded-[12px] border border-light-gray/10 bg-app-black p-[15px]">
        <CardTitle title="Top Performing Businesses" subtitle="Highest transaction volumes" period="Weekly" />
        <div className="mt-5 rounded-[12px] border border-light-gray/10 p-[15px]">
          <div className="grid grid-cols-[1.2fr_.8fr_1fr_.85fr_1fr] px-3 py-2 text-sm font-bold"><span>Business name</span><span>Business ID</span><span>Owner</span><span>Tier</span><span>Monthly Volume</span></div>
          {businesses.map((row) => <div key={row[0]} className="mb-2 grid min-h-[40px] grid-cols-[1.2fr_.8fr_1fr_.85fr_1fr] items-center rounded-[7px] border border-light-gray/10 bg-[#090614] px-3 text-sm"><b>{row[0]}</b><b>{row[1]}</b><span className="text-[#565656]">{row[2]}</span><span className={row[3] === "Titanium" ? "text-[#FFC400]" : row[3] === "Diamond" ? "text-[#7651FF]" : "text-app-blue"}>{row[3]}</span><span>{row[4]}</span></div>)}
        </div>
      </section>

      <section className="grid grid-cols-2 gap-[15px]">
        <article className="rounded-[12px] bg-app-black p-[15px]"><CardTitle title="Transaction Insights" subtitle="User behavior patterns" /><div className="mt-7 space-y-7 text-sm text-[#8E8E93]"><div className="flex justify-between"><span>Peak Transaction Time</span><b className="text-[#BEC2DA]">2 PM – 5 PM</b></div><div className="flex justify-between"><span>Most Used Payment Method</span><b className="text-[#BEC2DA]">POS</b></div><div className="flex justify-between"><span>Avg Transactions per User per day</span><b className="text-app-blue">3</b></div></div></article>
        <article className="rounded-[12px] bg-app-black p-[15px]"><CardTitle title="Risk Monitoring" subtitle="System health indicators" /><div className="mt-5 space-y-3 text-sm font-bold"><div className="flex justify-between rounded-[8px] bg-app-green/15 px-3 py-2 text-app-green"><span>Failure Rate</span><span>0.8%</span></div><div className="flex justify-between rounded-[8px] bg-app-yellow/20 px-3 py-2 text-[#FFC400]"><span>Active Disputes</span><span>42</span></div><div className="flex justify-between rounded-[8px] bg-app-red/15 px-3 py-2 text-app-red"><span>Chargebacks</span><span>11</span></div></div></article>
      </section>
    </div>
  );
}
