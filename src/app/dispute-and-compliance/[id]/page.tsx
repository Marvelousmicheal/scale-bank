import { notFound } from "next/navigation";
import { BarChart3, Check, ImageIcon } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import InvestigativeActions from "@/components/disputes/InvestigativeActions";
import { disputes } from "@/lib/dispute-data";

export function generateStaticParams() {
  return disputes.map((dispute) => ({ id: dispute.slug }));
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return <div className="flex min-h-[82px] flex-col justify-center rounded-[20px] border border-light-gray/10 bg-[#090614] px-[15px] font-sf-pro"><p className="text-sm text-[#8E8E93]">{label}</p><p className="mt-2 text-xl font-bold">{value}</p></div>;
}

export default async function DisputeDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const dispute = disputes.find((item) => item.slug === id);
  if (!dispute) notFound();

  return (
    <div className="flex min-h-full flex-col gap-[15px] px-[30px] pb-[30px] pt-[46px]">
      <PageHeader title="Dispute Details" backHref="/dispute-and-compliance" />
      <section className="grid grid-cols-[1fr_366px] gap-[15px] rounded-[12px] border border-light-gray/10 bg-app-black p-[15px]">
        <div>
          <div className="grid min-h-[129px] grid-cols-[1fr_287px] items-center gap-6 rounded-[12px] border border-light-gray/10 bg-[#090614] px-[15px]">
            <div className="font-sf-pro"><h2 className="text-xl font-bold">Dispute {dispute.slug}</h2><div className="mt-1 flex gap-4 text-sm text-[#8E8E93]"><span>Reeva Supermarket</span><span>Feb 10 2026</span></div><div className="mt-2.5 flex h-[37px] w-[202px] items-center justify-center rounded-[7px] bg-app-yellow/5 text-app-yellow">Pending</div></div>
            <MiniStat label="Dispute Type" value="Duplicate Charge" />
          </div>
          <div className="mt-[18px] grid grid-cols-2 gap-[15px]"><MiniStat label="Amount" value="₦12,500" /><MiniStat label="Reported By" value="Customer" /></div>
        </div>
        <InvestigativeActions disputeId={dispute.slug} />
      </section>

      <section className="grid grid-cols-[1fr_320px] gap-[15px] rounded-[12px] border border-light-gray/10 bg-app-black p-[15px]">
        <div>
          <h2 className="mb-4 flex items-center gap-2 font-sf-pro text-base font-bold"><span className="flex size-5 items-center justify-center rounded-[5px] bg-app-blue text-black"><BarChart3 className="size-3.5" /></span>Customer Claim</h2>
          <blockquote className="flex min-h-[112px] items-center border-l-4 border-[#157BFF] bg-[#020203] px-3 font-sf-pro text-sm leading-6 text-[#8E8E93]">I was charged twice for a single purchase at the POS terminal. The first attempt said “failed” on the POS Machine, but i was debited. I then paid again which was successful. The issue here is that i have two debits of ₦12,500 but one ticket</blockquote>
          <div className="mt-6 flex items-center gap-3"><div className="flex size-[66px] items-center justify-center rounded-[14px] border border-dashed border-[#8E8E93] bg-[#1C1C1E]"><ImageIcon className="size-6 text-[#8E8E93]" /></div><div className="font-sf-pro"><p className="text-sm font-bold text-[#BEC2DA]">POS_Failure_Receipt.jpg</p><p className="text-xs text-[#8E8E93]">Uploaded by customer . 2.4mb</p></div></div>
        </div>
        <aside className="rounded-[20px] border border-app-green/20 bg-[#050506] p-[15px] font-sf-pro">
          <h2 className="mb-4 text-base font-bold">Dispute Timeline</h2>
          <div className="space-y-5">
            {[["Customer reported dispute", "Feb 10 — 11:05 AM"], ["Admin assigned case", "Feb 10 — 11:20 AM"], ["Requesting business response", "Feb 10 — 11:05 AM"]].map(([title, date], index) => (
              <div key={title} className="flex min-h-[50px] items-center justify-between rounded-[12px] bg-[#1C1C1E] px-3"><div><p className="text-sm font-bold text-[#BEC2DA]">{title}</p><p className="text-xs text-[#8E8E93]">{date}</p></div><span className={`flex size-5 items-center justify-center rounded-full ${index < 2 ? "bg-app-green" : "bg-[#2D2D2E]"}`}><Check className="size-3 text-black" strokeWidth={3} /></span></div>
            ))}
          </div>
        </aside>
      </section>

      <section className="grid grid-cols-[1fr_0.7fr] gap-[15px]">
        <article className="rounded-[12px] bg-app-black p-[15px] font-sf-pro"><h2 className="mb-3 text-xl font-bold">Transaction Evidence</h2><div className="space-y-5 text-sm text-[#8E8E93]"><div className="flex h-11 items-center justify-between rounded-[12px] bg-[#252331] px-3 font-bold"><span>Payment Authorized</span><span className="text-[#BEC2DA]">Feb 10 — 11:20 AM</span></div><div className="flex justify-between"><span>Payment Completed</span><b className="text-[#BEC2DA]">Feb 10 — 11:20 AM</b></div><div className="flex justify-between"><span>POS Response</span><b className="text-app-green">Success</b></div></div></article>
        <article className="rounded-[12px] bg-app-black p-[15px] font-sf-pro"><h2 className="mb-3 text-xl font-bold">Device Logs</h2><div className="space-y-2.5 text-sm font-bold"><div className="flex h-11 items-center justify-between rounded-[12px] bg-[#252331] px-[15px]"><span className="text-[#8E8E93]">Terminal ID</span><span className="text-[#DADADA]">POS-4391</span></div><div className="flex h-11 items-center justify-between rounded-[12px] bg-[#252331] px-[15px]"><span className="text-[#8E8E93]">Connection Status</span><span className="text-app-green">Stable</span></div></div></article>
      </section>
    </div>
  );
}
