"use client";

import { useRouter } from "next/navigation";
import TablePagination from "@/components/TablePagination";
import { posOrders } from "@/lib/pos-order-data";

const locations: Record<string, string> = {
  "ORD-2031": "Garki, Abuja",
  "ORD-2032": "Katampe, Abuja",
  "ORD-2033": "Lugbe, Abuja",
  "ORD-2034": "Kubwa, Abuja",
  "ORD-2035": "Garki, Abuja",
  "ORD-2036": "Wuse 2, Abuja",
};

const paymentStyles = {
  Paid: "bg-app-green/10 text-app-green",
  Pending: "bg-app-yellow/10 text-app-yellow",
  Failed: "bg-app-red/10 text-app-red",
};

const orderStyles = {
  Delivered: "bg-app-green/5 text-app-green",
  Processing: "bg-app-blue/5 text-app-blue",
  Pending: "bg-app-yellow/5 text-app-yellow",
  Shipped: "bg-light-gray/10 text-ink-bright",
  Cancelled: "bg-app-red/5 text-app-red",
};

export default function OrdersTable() {
  const router = useRouter();

  return (
    <section className="flex min-h-0 flex-1 flex-col rounded-[12px] border border-light-gray/10 bg-app-black p-5">
      <div className="min-h-0 flex-1 overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-2.5 font-sf-pro">
          <thead>
            <tr className="text-left text-sm font-bold text-white">
              <th className="px-[15px] py-2">Order ID</th>
              <th className="px-[15px] py-2">Business</th>
              <th className="px-[15px] py-2">Device Model</th>
              <th className="px-[15px] py-2">Quantity</th>
              <th className="px-[15px] py-2">Total Amount</th>
              <th className="px-[15px] py-2">Payment Status</th>
              <th className="px-[15px] py-2">Order Date</th>
              <th className="px-[15px] py-2">Order Status</th>
            </tr>
          </thead>
          <tbody>
            {posOrders.map((order) => (
              <tr
                key={order.id}
                tabIndex={0}
                onClick={() => router.push(`/pos-orders-management/${order.id}`)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    router.push(`/pos-orders-management/${order.id}`);
                  }
                }}
                className="h-[52px] cursor-pointer outline-none focus-visible:[&>td]:border-app-blue/60"
              >
                <td className="rounded-l-[8px] border-y border-l border-light-gray/10 bg-surface-raised px-[15px] text-base font-bold text-white">
                  {order.id}
                </td>
                <td className="border-y border-light-gray/10 bg-surface-raised px-[15px]">
                  <p className="text-base font-bold text-white">{order.business}</p>
                  <p className="text-base text-ink-dim">{locations[order.id]}</p>
                </td>
                <td className="border-y border-light-gray/10 bg-surface-raised px-[15px] text-base text-ink-dim">{order.model}</td>
                <td className="border-y border-light-gray/10 bg-surface-raised px-[15px] text-base font-bold text-white">{order.quantity}</td>
                <td className="border-y border-light-gray/10 bg-surface-raised px-[15px] text-base text-white">{order.totalPrice}</td>
                <td className="border-y border-light-gray/10 bg-surface-raised px-[15px]">
                  <span className={`block w-[107px] rounded-[7px] px-2 py-1 text-center ${paymentStyles[order.paymentStatus]}`}>{order.paymentStatus}</span>
                </td>
                <td className="border-y border-light-gray/10 bg-surface-raised px-[15px] text-base text-ink-dim">{order.orderDate}</td>
                <td className="rounded-r-[8px] border-y border-r border-light-gray/10 bg-surface-raised px-[15px]">
                  <span className={`block w-[107px] rounded-[7px] px-2 py-1 text-center ${orderStyles[order.status]}`}>{order.status}</span>
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
