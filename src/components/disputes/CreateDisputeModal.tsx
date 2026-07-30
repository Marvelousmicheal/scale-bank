"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Download, X } from "lucide-react";

export default function CreateDisputeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <>
      <div className="flex gap-2.5">
        <button type="button" className="flex h-11 items-center gap-2.5 rounded-[12px] border border-app-blue px-6 font-sf-pro text-base font-bold text-app-blue">
          Export Dispute Report <Download className="size-5" />
        </button>
        <button type="button" onClick={() => setOpen(true)} className="h-11 rounded-[12px] border border-app-blue bg-action-blue px-6 font-sf-pro text-base font-bold text-white">
          Create Dispute
        </button>
      </div>

      {open && (
        <div
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-5 backdrop-blur-[2px]"
        >
          <section role="dialog" aria-modal="true" aria-labelledby="create-dispute-title" className="w-full max-w-[666px] rounded-[20px] border border-light-gray/20 bg-surface-deep p-[14px] shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 id="create-dispute-title" className="font-sf-pro text-base font-bold text-white">Create Dispute</h2>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close create dispute modal" className="flex size-8 items-center justify-center text-white"><X className="size-7" /></button>
            </div>
            <form className="space-y-3.5" onSubmit={(event) => event.preventDefault()}>
              <ModalField label="Transaction ID" value="TXN-98321-2345-3456" accent />
              <ModalField label="Customer Name" value="Osaze Iyamu" />
              <div className="flex gap-2.5">
                <ModalField label="Dispute Type" value="Duplicate Charge" select />
                <ModalField label="Priority" value="Medium" select />
              </div>
              <ModalField label="Dispute Amount (₦)" value="₦12,500" />
              <label className="block font-sf-pro">
                <span className="mb-2 block text-sm text-ink-soft">Description/Reason</span>
                <textarea
                  aria-label="Description or reason"
                  placeholder="Provide a detailed explanation for this sovereign audit exception"
                  className="h-[96px] w-full resize-none rounded-[12px] border border-light-gray/15 bg-surface-input px-3 py-2.5 text-sm text-white outline-none placeholder:text-ink-muted focus:border-app-blue"
                />
              </label>
              <button type="submit" className="mt-2 h-[45px] w-full rounded-[10px] bg-app-green font-sf-pro text-base font-bold text-black">Create Dispute</button>
            </form>
          </section>
        </div>
      )}
    </>
  );
}

function ModalField({ label, value, accent = false, select = false }: { label: string; value: string; accent?: boolean; select?: boolean }) {
  return (
    <label className="block min-w-0 flex-1 font-sf-pro">
      <span className="mb-2 block text-sm text-ink-soft">{label}</span>
      <span className={`flex h-[44px] items-center justify-between rounded-[12px] border border-light-gray/15 bg-surface-input px-3 text-sm ${accent ? "text-app-blue" : "text-ink-muted"}`}>
        {value}
        {select && <ChevronDown className="size-5 text-ink-soft" />}
      </span>
    </label>
  );
}
