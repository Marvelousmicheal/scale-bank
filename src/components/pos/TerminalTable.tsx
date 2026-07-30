"use client";

import { useRouter } from "next/navigation";
import { posTerminals, type TerminalStatus } from "@/lib/pos-terminal-data";
import TablePagination from "@/components/TablePagination";

const statusStyles: Record<TerminalStatus, string> = {
  Online: "bg-app-green/5 text-app-green",
  Suspended: "bg-app-yellow/5 text-app-yellow",
  Unassigned: "bg-white/[0.03] text-[#8E8E93]",
};

export default function TerminalTable() {
  const router = useRouter();

  return (
    <div className="flex min-h-0 flex-1 flex-col rounded-[12px] border border-light-gray/10 bg-app-black p-5">
      <div className="min-h-0 flex-1 overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-2.5 font-sf-pro">
          <thead>
            <tr className="text-left text-sm font-bold text-white">
              <th className="px-[15px] py-2">Device ID</th>
              <th className="px-[15px] py-2">Serial Number</th>
              <th className="px-[15px] py-2">Business/Merchant</th>
              <th className="px-[15px] py-2">Location</th>
              <th className="px-[15px] py-2">Today&apos;s Volume</th>
              <th className="px-[15px] py-2">Last activity</th>
              <th className="px-[15px] py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {posTerminals.map((terminal) => (
              <tr
                key={terminal.id}
                tabIndex={0}
                onClick={() => router.push(`/pos-terminals/${terminal.id}`)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    router.push(`/pos-terminals/${terminal.id}`);
                  }
                }}
                className="h-[52px] cursor-pointer text-base outline-none transition-colors hover:[&>td]:bg-white/[0.025] focus-visible:[&>td]:border-app-blue/60"
              >
                <td className="rounded-l-[8px] border-y border-l border-light-gray/10 bg-[#090614] px-[15px] font-bold text-white">
                  {terminal.id}
                </td>
                <td className="border-y border-light-gray/10 bg-[#090614] px-[15px] text-[#565656]">
                  {terminal.serialNumber}
                </td>
                <td className="border-y border-light-gray/10 bg-[#090614] px-[15px]">
                  <p className="font-bold text-white">{terminal.business}</p>
                  <p className="text-[#565656]">{terminal.owner}</p>
                </td>
                <td className="border-y border-light-gray/10 bg-[#090614] px-[15px] font-medium text-white">
                  {terminal.location}
                </td>
                <td className="border-y border-light-gray/10 bg-[#090614] px-[15px] font-medium text-white">
                  {terminal.todayVolume}
                </td>
                <td className="border-y border-light-gray/10 bg-[#090614] px-[15px] text-[#565656]">
                  {terminal.lastActivity}
                </td>
                <td className="rounded-r-[8px] border-y border-r border-light-gray/10 bg-[#090614] px-[15px]">
                  <span
                    className={`block w-[107px] rounded-[7px] px-2 py-1.5 text-center ${statusStyles[terminal.status]}`}
                  >
                    {terminal.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TablePagination showing="Showing 1 to 11 of 50 entries" total={4} />
    </div>
  );
}

