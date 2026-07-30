"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, CalendarDays, Check, ChevronDown, Flag, MessageSquare, RotateCcw, X } from "lucide-react";

export default function InvestigativeActions({ disputeId }: { disputeId: string }) {
  const [open, setOpen] = useState(false);
  const [refundOpen, setRefundOpen] = useState(false);

  useEffect(() => {
    if (!open && !refundOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        setRefundOpen(false);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open, refundOpen]);

  return (
    <>
      <aside className="rounded-[16px] bg-surface-base p-[15px] font-sf-pro">
        <h2 className="mb-3 text-xl font-bold">Investigative Actions</h2>
        <button onClick={() => setRefundOpen(true)} className="h-11 w-full rounded-[12px] bg-accent-cyan font-bold">Refund Customer</button>
        <button onClick={() => setOpen(true)} className="mt-[15px] flex h-11 w-full items-center justify-center gap-3 rounded-[12px] bg-surface-muted font-bold text-ink-muted">
          Request Response <MessageSquare className="size-5 fill-current" />
        </button>
        <div className="mt-[15px] flex gap-2.5">
          <button className="flex h-11 flex-1 items-center justify-center gap-3 rounded-[12px] bg-surface-muted font-bold text-ink-muted">Flag for fraud <Flag className="size-5 fill-current" /></button>
          <button className="flex h-11 flex-1 items-center justify-center gap-2 rounded-[12px] bg-action-red font-bold">Reject <RotateCcw className="size-5" /></button>
        </div>
      </aside>

      {open && (
        <div
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-5 backdrop-blur-[2px]"
        >
          <section role="dialog" aria-modal="true" aria-labelledby="response-modal-title" className="w-full max-w-[666px] rounded-[20px] border border-light-gray/20 bg-surface-deep p-[14px] shadow-2xl">
            <div className="relative mb-4 flex items-center justify-center">
              <h2 id="response-modal-title" className="font-sf-pro text-xl font-bold">Request Business Response</h2>
              <button onClick={() => setOpen(false)} aria-label="Close request response modal" className="absolute right-0 flex size-8 items-center justify-center"><X className="size-7" /></button>
            </div>
            <p className="mb-3 text-center font-sf-pro text-base font-bold">
              Requesting response from Reeva Supermarket for Dispute <span className="text-action-blue-deep">{disputeId}</span>
            </p>
            <form className="space-y-3.5" onSubmit={(event) => event.preventDefault()}>
              <ResponseField label="Response Deadline" value="11/05/2026" icon="calendar" />
              <ResponseField label="Specific Evidence Requested" value="POS Receipt" icon="select" />
              <label className="block font-sf-pro">
                <span className="mb-2 block text-sm text-ink-soft">Message to Business Owner</span>
                <textarea aria-label="Message to business owner" placeholder="Enter specific instructions or context for the merchant" className="h-[96px] w-full resize-none rounded-[12px] border border-light-gray/15 bg-surface-input px-3 py-2.5 text-sm outline-none placeholder:text-ink-muted focus:border-app-blue" />
              </label>
              <button type="submit" className="mt-2 h-[46px] w-full rounded-[10px] bg-app-green font-sf-pro text-base font-bold text-black">Send Request</button>
            </form>
          </section>
        </div>
      )}

      {refundOpen && (
        <div
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setRefundOpen(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-5 backdrop-blur-[2px]"
        >
          <section role="alertdialog" aria-modal="true" aria-labelledby="refund-modal-title" className="w-full max-w-[666px] rounded-[20px] border border-light-gray/20 bg-surface-deep p-[14px] shadow-2xl">
            <div className="flex justify-center"><AlertTriangle className="size-6 fill-app-red text-app-red" /></div>
            <h2 id="refund-modal-title" className="mt-1 text-center font-sf-pro text-xl font-bold">Confirm Customer Refund</h2>
            <p className="mx-auto mt-2 max-w-[600px] text-center font-sf-pro text-base leading-6 text-ink-muted">
              Are you sure you want to refund <b className="text-white">Adebayo John?</b> This will reverse <b className="text-app-red">₦12,500</b> back to the customer wallet
            </p>
            <div className="mt-3 font-sf-pro">
              <p className="mb-2 text-sm text-ink-soft">Message to Business Owner</p>
              <div className="rounded-[12px] border border-light-gray/15 bg-surface-input p-3">
                <div className="flex h-[44px] items-center justify-between rounded-[12px] bg-surface-subtle px-[15px] text-sm font-bold text-ink-muted">
                  <span>Transaction ID</span><span className="text-ink-bright">TXN-98321</span>
                </div>
                <label className="mt-3 flex items-center gap-3 text-sm font-bold text-ink-soft">
                  <input type="checkbox" defaultChecked className="sr-only" />
                  <span className="flex size-5 items-center justify-center rounded-full bg-app-blue"><Check className="size-3.5 text-black" strokeWidth={3} /></span>
                  Notify Business Owner
                </label>
              </div>
            </div>
            <button type="button" className="mt-6 h-[46px] w-full rounded-[10px] bg-app-green font-sf-pro text-base font-bold text-black">Process Refund</button>
            <button type="button" onClick={() => setRefundOpen(false)} className="mt-3 h-[48px] w-full rounded-[10px] border-2 border-white font-sf-pro text-base font-bold">Go back</button>
          </section>
        </div>
      )}
    </>
  );
}

function ResponseField({ label, value, icon }: { label: string; value: string; icon: "calendar" | "select" }) {
  return (
    <label className="block font-sf-pro">
      <span className="mb-2 block text-sm text-ink-soft">{label}</span>
      <span className="flex h-[44px] items-center justify-between rounded-[12px] border border-light-gray/15 bg-surface-input px-3 text-sm text-ink-muted">
        {value}
        {icon === "calendar" ? <CalendarDays className="size-5 text-ink-bright" fill="currentColor" /> : <ChevronDown className="size-5 text-ink-soft" />}
      </span>
    </label>
  );
}
