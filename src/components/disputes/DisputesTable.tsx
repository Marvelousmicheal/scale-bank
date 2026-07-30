"use client";

import { useRouter } from "next/navigation";
import TablePagination from "@/components/TablePagination";
import { disputes, type DisputeStatus, type Priority } from "@/lib/dispute-data";

const statusStyles: Record<DisputeStatus, string> = {
  "Under Review": "bg-app-blue/15 text-app-blue",
  Pending: "bg-app-yellow/5 text-app-yellow",
  Resolved: "bg-app-green/5 text-app-green",
  Rejected: "bg-app-red/5 text-app-red",
};
const priorityStyles: Record<Priority, string> = {
  Low: "text-[#8E8E93]", Medium: "text-app-yellow", High: "text-[#7651FF]", Critical: "text-[#FF4747]",
};

export default function DisputesTable() {
  const router = useRouter();
  return (
    <section className="flex min-h-0 flex-1 flex-col rounded-[12px] border border-light-gray/10 bg-app-black p-5">
      <div className="min-h-0 flex-1 overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-2.5 font-sf-pro">
          <thead><tr className="text-left text-sm font-bold text-white">
            {["Dispute ID", "Transaction ID", "User / Business", "Dispute Type", "Amount", "Date", "Priority Level", "Status"].map((heading) => <th key={heading} className="px-[15px] py-2">{heading}</th>)}
          </tr></thead>
          <tbody>
            {disputes.map((dispute) => (
              <tr key={dispute.slug} tabIndex={0} onClick={() => router.push(`/dispute-and-compliance/${dispute.slug}`)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") router.push(`/dispute-and-compliance/${dispute.slug}`); }} className="h-[52px] cursor-pointer outline-none hover:[&>td]:bg-white/[0.025] focus-visible:[&>td]:border-app-blue/60">
                <td className="rounded-l-[8px] border-y border-l border-light-gray/10 bg-[#090614] px-[15px] text-base font-bold">{dispute.disputeId}</td>
                <td className="border-y border-light-gray/10 bg-[#090614] px-[15px] text-base font-bold">{dispute.transactionId}</td>
                <td className="border-y border-light-gray/10 bg-[#090614] px-[15px]"><p className="text-sm text-[#BEC2DA]">{dispute.user}</p><p className="text-xs text-[#565656]">{dispute.business}</p></td>
                <td className="max-w-[170px] border-y border-light-gray/10 bg-[#090614] px-[15px] text-base text-[#565656]">{dispute.type}</td>
                <td className="border-y border-light-gray/10 bg-[#090614] px-[15px] text-base">{dispute.amount}</td>
                <td className="border-y border-light-gray/10 bg-[#090614] px-[15px] text-sm text-[#BEC2DA]"><p>03.02.2026</p><p className="text-xs text-[#565656]">12:45 PM</p></td>
                <td className={`border-y border-light-gray/10 bg-[#090614] px-[15px] text-base font-bold ${priorityStyles[dispute.priority]}`}>{dispute.priority}</td>
                <td className="rounded-r-[8px] border-y border-r border-light-gray/10 bg-[#090614] px-[15px]"><span className={`block w-[107px] rounded-[7px] px-2 py-1 text-center ${statusStyles[dispute.status]}`}>{dispute.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TablePagination showing="Showing 1 to 11 of 50 entries" total={4} />
    </section>
  );
}
