"use client";

import { useRouter } from "next/navigation";
import TablePagination from "@/components/TablePagination";
import { settlements, type SettlementStatus } from "@/lib/settlement-data";

const statusStyles: Record<SettlementStatus, string> = {
  Success: "bg-app-green/5 text-app-green",
  Processing: "bg-app-blue/15 text-app-blue",
  Failed: "bg-app-red/5 text-app-red",
  Pending: "bg-app-yellow/5 text-app-yellow",
};

export default function SettlementsTable() {
  const router = useRouter();
  return (
    <section className="flex min-h-0 flex-1 flex-col rounded-[12px] border border-light-gray/10 bg-app-black p-5">
      <div className="min-h-0 flex-1 overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-2.5 font-sf-pro">
          <thead><tr className="text-left text-sm font-bold text-white">
            {["Settlement ID", "Business", "Amount", "Bank Account", "Date", "Status"].map((heading) => <th key={heading} className="px-[15px] py-2">{heading}</th>)}
          </tr></thead>
          <tbody>
            {settlements.map((settlement) => (
              <tr
                key={settlement.slug}
                tabIndex={0}
                onClick={() => router.push(`/settlements/${settlement.slug}`)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") router.push(`/settlements/${settlement.slug}`);
                }}
                className="h-[52px] cursor-pointer outline-none focus-visible:[&>td]:border-app-blue/60"
              >
                <td className="rounded-l-[8px] border-y border-l border-light-gray/10 bg-surface-raised px-[15px] text-base font-bold text-white">{settlement.displayId}</td>
                <td className="max-w-[300px] border-y border-light-gray/10 bg-surface-raised px-[15px] text-base text-ink-dim">{settlement.business}</td>
                <td className="border-y border-light-gray/10 bg-surface-raised px-[15px] text-base text-white">{settlement.amount}</td>
                <td className="border-y border-light-gray/10 bg-surface-raised px-[15px] text-sm text-ink-soft"><p>{settlement.bank}</p><p className="text-ink-dim">{settlement.account}</p></td>
                <td className="border-y border-light-gray/10 bg-surface-raised px-[15px] text-sm text-ink-soft"><p>{settlement.date}</p><p className="text-xs text-ink-dim">{settlement.time}</p></td>
                <td className="rounded-r-[8px] border-y border-r border-light-gray/10 bg-surface-raised px-[15px]"><span className={`block w-[107px] rounded-[7px] px-2 py-1 text-center ${statusStyles[settlement.status]}`}>{settlement.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TablePagination showing="Showing 1 to 11 of 50 entries" total={4} />
    </section>
  );
}
