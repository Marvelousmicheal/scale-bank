import { notFound } from "next/navigation";
import {
  Check,
  CreditCard,
  PackageCheck,
  Truck,
  WalletCards,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { orderActivity, posOrders } from "@/lib/pos-order-data";

export function generateStaticParams() {
  return posOrders.map((order) => ({ id: order.id }));
}

export default async function PosOrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = posOrders.find((item) => item.id === id);

  if (!order) notFound();

  return (
    <div className="flex min-h-full flex-col gap-[15px] px-[30px] pb-[30px] pt-[46px]">
      <PageHeader title="POS Order Details" backHref="/pos-orders-management" />

      <section className="grid min-h-[330px] grid-cols-[1fr_282px] gap-[15px] rounded-[12px] border border-light-gray/10 bg-app-black p-[15px]">
        <div className="flex flex-col gap-[18px]">
          <div className="flex min-h-[84px] items-center justify-between rounded-[12px] border border-light-gray/10 bg-surface-raised px-[15px]">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="font-sf-pro text-base font-bold text-white">{order.id}</h1>
                <span className="w-[107px] rounded-[7px] bg-app-green/5 px-3 py-1.5 text-center font-sf-pro text-base text-app-green">
                  {order.status}
                </span>
              </div>
              <p className="mt-1 font-sf-pro text-sm text-ink-muted">
                {order.businessId}
                <span className="ml-2">
                  Business: <b className="text-base text-ink-soft">{order.business}</b>
                </span>
              </p>
            </div>
            <div className="flex gap-2.5">
              <button className="h-11 rounded-[12px] bg-action-blue px-6 font-sf-pro text-base font-bold text-white">
                Accept Order
              </button>
              <button className="h-11 min-w-[120px] rounded-[12px] bg-app-red/15 px-[15px] font-sf-pro text-base font-bold text-app-red">
                Reject
              </button>
            </div>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-[15px]">
            <article className="rounded-[20px] border border-light-gray/10 bg-surface-raised p-[15px]">
              <h2 className="mb-4 flex items-center gap-2 font-sf-pro text-base font-bold text-white">
                <CreditCard className="size-5 text-app-blue" fill="currentColor" />
                Device Details
              </h2>
              <dl className="space-y-2 font-sf-pro text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink-muted">Model</dt>
                  <dd className="text-base font-bold text-ink-soft">{order.model}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-muted">Quantity</dt>
                  <dd className="text-base font-bold text-ink-soft">{order.quantity}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-muted">Unit Price</dt>
                  <dd className="text-base font-bold text-ink-soft">{order.unitPrice}</dd>
                </div>
              </dl>
              <div className="my-[14px] h-px bg-light-gray/10" />
              <div className="flex justify-between font-sf-pro text-sm">
                <span className="text-ink-muted">Total Price</span>
                <span className="text-base font-bold text-app-blue">{order.totalPrice}</span>
              </div>
            </article>

            <article className="rounded-[20px] border border-light-gray/10 bg-surface-raised p-[15px]">
              <h2 className="mb-4 flex items-center gap-2 font-sf-pro text-base font-bold text-white">
                <WalletCards className="size-5 text-app-blue" fill="currentColor" />
                Payment Details
              </h2>
              <dl className="space-y-3 font-sf-pro text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink-muted">Transaction ID</dt>
                  <dd className="text-base font-bold text-ink-soft">{order.transactionId}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-ink-muted">Payment Status</dt>
                  <dd className="flex items-center gap-2 text-base font-bold text-app-green">
                    <span className="flex size-5 items-center justify-center rounded-full bg-app-green text-surface-raised">
                      <Check className="size-3.5" strokeWidth={3} />
                    </span>
                    {order.paymentStatus}
                  </dd>
                </div>
              </dl>
              <div className="mt-6 flex h-[45px] items-center justify-between rounded-[12px] bg-app-blue/15 px-[15px] font-sf-pro">
                <span className="text-sm text-ink-muted">Total Price</span>
                <span className="text-base font-bold text-app-blue">{order.totalPrice}</span>
              </div>
            </article>
          </div>
        </div>

        <aside className="flex flex-col rounded-[20px] bg-surface-base p-[15px]">
          <h2 className="mb-4 flex items-center gap-2 font-sf-pro text-base font-bold text-white">
            <Truck className="size-6 text-app-blue" fill="currentColor" />
            Shipping
          </h2>
          <div className="space-y-3 font-sf-pro text-sm">
            <div>
              <p className="text-ink-muted">Recipient</p>
              <p className="text-base font-bold text-ink-soft">{order.recipient}</p>
              <p className="text-ink-muted">{order.phone}</p>
            </div>
            <div>
              <p className="text-ink-muted">Shipping Address</p>
              <p className="text-base font-bold text-ink-soft">{order.location}</p>
              <p className="text-ink-muted">{order.address}</p>
            </div>
            <div>
              <p className="text-ink-muted">Tracking Number</p>
              <p className="text-base font-bold text-ink-soft">{order.trackingNumber}</p>
            </div>
          </div>
          <button
            disabled
            className="mt-auto flex h-[40px] items-center justify-center gap-2 rounded-[12px] bg-surface-neutral font-sf-pro text-base font-bold text-ink-muted"
          >
            <PackageCheck className="size-5" />
            Mark as Shipped
          </button>
        </aside>
      </section>

      <section className="rounded-[12px] border border-light-gray/10 bg-app-black p-2.5">
        <h2 className="mb-3 font-sf-pro text-base font-bold text-ink-soft">Activity Log</h2>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
          {orderActivity.map((activity, index) => (
            <div key={`${activity}-${index}`} className="flex items-center gap-3 font-sf-pro text-xs">
              <span className="shrink-0 text-ink-muted">13:10/11 Jan 2026</span>
              <span className="flex-1 rounded-[7px] border border-light-gray/10 bg-surface-raised px-2 py-1.5 text-app-yellow">
                {activity}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
