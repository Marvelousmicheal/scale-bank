import { notFound } from "next/navigation";
import { BarChart3, Building2, Download, Flag, Gavel, RotateCcw } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { settlements } from "@/lib/settlement-data";

export function generateStaticParams() {
  return settlements.map((settlement) => ({ id: settlement.slug }));
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <article className="flex min-h-[77px] flex-col justify-center rounded-[20px] border border-light-gray/10 bg-[#020203] px-[15px] font-sf-pro">
      <p className="text-sm text-[#8E8E93]">{label}</p>
      <p className="mt-1 text-xl font-bold text-white">{value}</p>
    </article>
  );
}

export default async function SettlementDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const settlement = settlements.find((item) => item.slug === id);
  if (!settlement) notFound();

  return (
    <div className="flex min-h-full flex-col gap-[15px] px-[30px] pb-[30px] pt-[46px]">
      <PageHeader title="Settlement Details" backHref="/settlements" />

      <section className="grid grid-cols-[1fr_282px] gap-[15px] rounded-[12px] border border-light-gray/10 bg-app-black p-[15px]">
        <div>
          <div className="flex min-h-[84px] items-center justify-between rounded-[12px] border border-light-gray/10 bg-[#090614] px-[15px]">
            <div className="font-sf-pro">
              <div className="flex items-center gap-3"><h2 className="text-base font-bold">Settlement {settlement.slug}</h2><span className="w-[107px] rounded-[7px] bg-app-green/5 py-1 text-center text-app-green">Success</span></div>
              <div className="mt-1 flex gap-4 text-sm text-[#8E8E93]"><span>Reeva Supermarket</span><span>Feb 10 2026</span></div>
            </div>
            <div className="flex gap-2.5">
              <button className="h-11 rounded-[12px] bg-[#2999dc] px-[15px] font-sf-pro text-base font-bold">Retry Settlement</button>
              <button disabled className="flex h-11 items-center gap-3 rounded-[12px] bg-[#2D2D3A] px-[15px] font-sf-pro text-base font-bold text-[#8E8E93]">Download Report <Download className="size-5" /></button>
            </div>
          </div>
          <div className="mt-[18px] grid grid-cols-2 gap-[15px]"><Stat label="Settlement Amount" value="₦12,500" /><Stat label="Settlement Type" value="T+1 Daily Settlement" /></div>
        </div>
        <aside className="rounded-[20px] bg-[#050506] p-[15px] font-sf-pro">
          <h2 className="mb-5 flex items-center gap-2 text-base font-bold"><Building2 className="size-6 fill-app-blue text-app-blue" />Bank Details</h2>
          <div className="rounded-[12px] bg-[#1C1C1E] px-3 py-2"><p className="text-sm font-bold text-[#BEC2DA]">Access Bank</p><p className="text-sm text-[#8E8E93]">•••• 9021</p></div>
          <div className="mt-4"><p className="text-sm font-bold text-[#BEC2DA]">Account Name</p><p className="text-xs text-[#8E8E93]">Reeva Supermarket Ltd</p></div>
        </aside>
      </section>

      <section className="grid grid-cols-[1fr_280px] gap-[15px] rounded-[12px] border border-light-gray/10 bg-app-black p-[15px]">
        <div>
          <h2 className="mb-4 flex items-center gap-2 font-sf-pro text-base font-bold"><span className="flex size-5 items-center justify-center rounded-[5px] bg-app-blue text-black"><BarChart3 className="size-3.5" /></span>Transaction Breakdown</h2>
          <div className="grid grid-cols-2 gap-[15px]"><Stat label="Total Transactions" value="382" /><Stat label="Total Volume" value="₦1,268,000" /><Stat label="Platform Fees" value="₦18,000" /><Stat label="Settlement Amount" value="₦1,250,000" /></div>
        </div>
        <aside className="rounded-[16px] bg-[#050506] p-[15px]">
          <h2 className="mb-2 font-sf-pro text-xl font-bold">Admin Actions</h2>
          <div className="space-y-2.5">
            <button className="flex h-11 w-full items-center justify-center gap-3 rounded-[12px] bg-[#1C1C1E] font-sf-pro font-bold text-[#8E8E93]">Flag for fraud <Flag className="size-5 fill-current" /></button>
            <button className="flex h-11 w-full items-center justify-center gap-3 rounded-[12px] bg-[#1C1C1E] font-sf-pro font-bold text-[#8E8E93]">Open Dispute Case <Gavel className="size-5" /></button>
            <button className="flex h-11 w-full items-center justify-center gap-3 rounded-[12px] bg-[#EE171B] font-sf-pro font-bold">Reverse Transaction <RotateCcw className="size-5" /></button>
          </div>
        </aside>
      </section>

      <section className="grid grid-cols-[1fr_0.7fr] gap-[15px]">
        <article className="rounded-[12px] bg-app-black p-[15px] font-sf-pro">
          <h2 className="mb-2 text-xl font-bold">System Trace</h2>
          <div className="flex h-11 items-center justify-between rounded-[12px] bg-[#252331] px-3 text-sm font-bold text-[#8E8E93]"><span>Time Stamp</span><span className="text-[#DADADA]">Status</span></div>
          <div className="space-y-7 pt-6 text-sm text-[#8E8E93]">
            <div className="flex justify-between"><span>Processing</span><b className="text-app-green">Success</b></div>
            <div className="flex justify-between"><span>Gateway</span><b className="text-app-green">Viewed</b></div>
            <div className="flex justify-between"><span>Authorization</span><b className="text-app-green">Success</b></div>
          </div>
        </article>
        <article className="rounded-[12px] bg-app-black p-[15px] font-sf-pro">
          <h2 className="text-xl font-bold">Financial Breakdown</h2>
          <div className="mt-4 flex justify-between px-3 text-sm font-bold text-[#8E8E93]"><span>Description</span><span>Amount</span></div>
          <div className="mt-5 space-y-2.5 text-sm font-bold">
            <div className="flex h-11 items-center justify-between rounded-[12px] bg-[#252331] px-[15px] text-[#8E8E93]"><span>Gross Transaction Volume</span><span className="text-[#DADADA]">₦1,240,500</span></div>
            <div className="flex h-11 items-center justify-between rounded-[12px] bg-[#252331] px-[15px] text-[#8E8E93]"><span>Total Platform Fee</span><span className="text-[#DADADA]">₦12,500</span></div>
            <div className="flex h-11 items-center justify-between rounded-[12px] bg-[#086BF2] px-[15px]"><span>Net Settlement Amount</span><span>₦1,228,000</span></div>
          </div>
        </article>
      </section>
    </div>
  );
}
