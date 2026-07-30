"use client";

import { useRouter } from "next/navigation";
import TablePagination from "@/components/TablePagination";
import { transactions, type TransactionStatus } from "@/lib/transaction-data";

const statusStyles: Record<TransactionStatus, string> = {
  Success: "bg-app-green/5 text-app-green",
  Reversed: "border border-ink-muted/40 bg-surface-neutral/60 text-ink-bright",
  Failed: "bg-app-red/5 text-app-red",
  Pending: "bg-app-yellow/5 text-app-yellow",
};

export default function TransactionsTable() {
  const router = useRouter();

  return (
    <section className="flex min-h-0 flex-1 flex-col rounded-[12px] border border-light-gray/10 bg-app-black p-5">
      <div className="min-h-0 flex-1 overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-2.5 font-sf-pro">
          <thead>
            <tr className="text-left text-sm font-bold text-white">
              {["Transaction ID", "Type", "Business", "Amount", "Fee", "Date", "Status"].map((heading) => (
                <th key={heading} className="px-[15px] py-2">{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr
                key={transaction.slug}
                tabIndex={0}
                onClick={() => router.push(`/transactions/${transaction.slug}`)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") router.push(`/transactions/${transaction.slug}`);
                }}
                className="h-[52px] cursor-pointer outline-none transition-colors hover:[&>td]:bg-white/[0.025] focus-visible:[&>td]:border-app-blue/60"
              >
                <td className="rounded-l-[8px] border-y border-l border-light-gray/10 bg-surface-raised px-[15px] text-base font-bold text-white">{transaction.displayId}</td>
                <td className="border-y border-light-gray/10 bg-surface-raised px-[15px] text-base text-ink-dim">{transaction.type}</td>
                <td className="max-w-[285px] border-y border-light-gray/10 bg-surface-raised px-[15px] text-base text-ink-dim">{transaction.business}</td>
                <td className="border-y border-light-gray/10 bg-surface-raised px-[15px] text-base text-white">{transaction.amount}</td>
                <td className="border-y border-light-gray/10 bg-surface-raised px-[15px] text-base text-ink-dim">{transaction.fee}</td>
                <td className="border-y border-light-gray/10 bg-surface-raised px-[15px] text-base text-ink-soft">
                  <p>{transaction.date}</p><p className="text-xs text-ink-dim">{transaction.time}</p>
                </td>
                <td className="rounded-r-[8px] border-y border-r border-light-gray/10 bg-surface-raised px-[15px]">
                  <span className={`block w-[107px] rounded-[7px] px-2 py-1 text-center ${statusStyles[transaction.status]}`}>{transaction.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TablePagination showing="Showing 1 to 11 of 50 entries" total={4} />
    </section>
  );
}
