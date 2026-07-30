import { notFound } from "next/navigation";
import { Check, Clock3, Download, Flag, Gavel, RotateCcw, Users } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { transactions } from "@/lib/transaction-data";

export function generateStaticParams() {
  return transactions.map((transaction) => ({ id: transaction.slug }));
}

const timeline = [
  ["Transaction Initiated", "March 12, 2026  14:22 PM"],
  ["Authorization Received", "March 12, 2026  14:22 PM"],
  ["Transfer Confirmed", "March 12, 2026  14:22 PM"],
  ["Settlement Queue", "Estimated: Mar 12, 2026  14:22 PM"],
];

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="flex min-h-[94px] flex-col justify-center rounded-[20px] border border-light-gray/10 bg-surface-raised p-[15px] font-sf-pro">
      <p className="text-sm text-ink-muted">{label}</p>
      <p className="mt-2 text-xl font-bold text-white">{value}</p>
    </article>
  );
}

function DetailRow({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-ink-muted">{label}</dt>
      <dd className={`font-bold ${accent ?? "text-ink-bright"}`}>{value}</dd>
    </div>
  );
}

export default async function TransactionDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const transaction = transactions.find((item) => item.slug === id);
  if (!transaction) notFound();

  return (
    <div className="flex min-h-full flex-col gap-[15px] px-[30px] pb-[30px] pt-[46px]">
      <PageHeader title="Transaction Details" backHref="/transactions" />

      <section className="grid grid-cols-[1fr_282px] gap-[15px] rounded-[12px] border border-light-gray/10 bg-app-black p-[15px]">
        <div>
          <div className="flex min-h-[84px] items-center justify-between rounded-[12px] border border-light-gray/10 bg-surface-raised px-[15px]">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="font-sf-pro text-base font-bold">{transaction.slug}</h2>
                <span className="w-[107px] rounded-[7px] bg-app-green/5 py-1 text-center font-sf-pro text-base text-app-green">Success</span>
              </div>
              <p className="mt-1 font-sf-pro text-sm text-ink-muted">Detailed ledger information and system trace for internal audit</p>
            </div>
            <div className="flex gap-2.5">
              <button className="h-11 rounded-[12px] bg-action-blue px-6 font-sf-pro text-base font-bold">Print Ledge</button>
              <button disabled className="flex h-11 items-center gap-3 rounded-[12px] bg-surface-overlay px-[15px] font-sf-pro text-base font-bold text-ink-muted">Download Receipt <Download className="size-5" /></button>
            </div>
          </div>
          <div className="mt-[18px] grid grid-cols-2 gap-[8px_15px]">
            <SummaryCard label="Amount" value="₦12,500" /><SummaryCard label="Type" value="POS Payment" />
            <SummaryCard label="Date" value="Feb 10 — 10:23 AM" /><SummaryCard label="Status" value="Success" />
          </div>
        </div>

        <aside className="rounded-[20px] bg-surface-base p-[15px]">
          <h2 className="mb-4 flex items-center gap-2 font-sf-pro text-base font-bold"><Clock3 className="size-5 fill-app-blue text-app-blue" />Timeline</h2>
          <div className="space-y-2.5">
            {timeline.map(([title, date], index) => (
              <div key={title} className="flex min-h-[50px] items-center gap-3 rounded-[12px] border border-app-green/20 bg-surface-muted px-3">
                <span className={`flex size-5 shrink-0 items-center justify-center rounded-full ${index === 3 ? "bg-action-blue" : "bg-accent-check"}`}>
                  {index === 3 ? <span className="size-2 rounded-full bg-white" /> : <Check className="size-3 text-accent-check-ink" strokeWidth={3} />}
                </span>
                <div className="font-sf-pro"><p className="text-sm font-bold text-ink-soft">{title}</p><p className="text-xs text-ink-muted">{date}</p></div>
              </div>
            ))}
          </div>
        </aside>
      </section>

      <section className="grid grid-cols-[1fr_280px] gap-[15px] rounded-[12px] border border-light-gray/10 bg-app-black p-[15px]">
        <div>
          <h2 className="mb-4 flex items-center gap-2 font-sf-pro text-base font-bold"><Users className="size-5 fill-app-blue text-app-blue" />Participants</h2>
          <div className="grid grid-cols-2 gap-[15px]">
            <SummaryCard label="Amount" value="₦12,500" /><SummaryCard label="Type" value="POS Payment" />
            <SummaryCard label="Date" value="Feb 10 — 10:23 AM" /><SummaryCard label="Status" value="Success" />
          </div>
        </div>
        <aside className="rounded-[16px] bg-surface-base p-[15px]">
          <h2 className="mb-2 font-sf-pro text-xl font-bold">Admin Actions</h2>
          <div className="space-y-2.5">
            <button className="flex h-11 w-full items-center justify-center gap-3 rounded-[12px] bg-surface-muted font-sf-pro font-bold text-ink-muted">Flag for fraud <Flag className="size-5 fill-current" /></button>
            <button className="flex h-11 w-full items-center justify-center gap-3 rounded-[12px] bg-surface-muted font-sf-pro font-bold text-ink-muted">Open Dispute Case <Gavel className="size-5" /></button>
            <button className="flex h-11 w-full items-center justify-center gap-3 rounded-[12px] bg-action-red font-sf-pro font-bold text-white">Reverse Transaction <RotateCcw className="size-5" /></button>
          </div>
        </aside>
      </section>

      <section className="grid grid-cols-[0.85fr_0.85fr_1.25fr] gap-[15px]">
        <article className="rounded-[12px] bg-app-black p-[15px]"><h2 className="mb-5 font-sf-pro text-xl font-bold">Payment Method</h2><dl className="space-y-7 font-sf-pro text-sm"><DetailRow label="Method" value="Bank Transfer" /><DetailRow label="Bank Name" value="First Bank of Nigeria" /><DetailRow label="Reference" value="RF-78932992" accent="text-app-blue" /></dl></article>
        <article className="rounded-[12px] bg-app-black p-[15px]"><h2 className="mb-5 font-sf-pro text-xl font-bold">System Trace</h2><dl className="space-y-7 font-sf-pro text-sm"><DetailRow label="Processing" value="1.5 Seconds" /><DetailRow label="Gateway" value="NIBBS" /><DetailRow label="Authorization" value="Approved" accent="text-app-green" /></dl></article>
        <article className="rounded-[12px] bg-app-black p-[15px]">
          <h2 className="font-sf-pro text-xl font-bold">Financial Breakdown</h2>
          <div className="mt-4 flex justify-between px-3 font-sf-pro text-sm font-bold text-ink-muted"><span>Description</span><span>Amount</span></div>
          <div className="mt-5 space-y-2.5 font-sf-pro text-sm font-bold">
            <div className="flex h-[45px] items-center justify-between rounded-[12px] bg-surface-elevated px-[15px] text-ink-muted"><span>Amount Paid</span><span className="text-ink-bright">₦12,500</span></div>
            <div className="flex h-[45px] items-center justify-between rounded-[12px] bg-surface-elevated px-[15px] text-ink-muted"><span>Platform Fee</span><span className="text-ink-bright">₦125</span></div>
            <div className="flex h-[45px] items-center justify-between rounded-[12px] bg-action-blue-deep px-[15px] text-white"><span>Net Business Receives</span><span>₦12,625</span></div>
          </div>
        </article>
      </section>
    </div>
  );
}
