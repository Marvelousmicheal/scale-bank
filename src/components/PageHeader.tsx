import React from "react";
import Link from "next/link";

interface PageHeaderProps {
  title: string;
  description?: string;
  modal?: React.ReactNode;
  backHref?: string;
}

export default function PageHeader({ title, description, modal, backHref }: PageHeaderProps) {
  if (backHref) {
    return (
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link
            href={backHref}
            className="flex items-center justify-center size-8 rounded-[8px] border border-[#BEC2DA]/10 bg-[#090614] text-[#BEC2DA] hover:text-white transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </Link>
          <h1 className="text-2xl text-white font-bold font-sf-pro">{title}</h1>
        </div>
        <div className="flex items-center gap-2.5">
          {modal}
          <div className="bg-amber-200 size-[24px]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl text-white font-bold font-sf-pro">{title}</h1>
        {description && (
          <p className="text-base text-[#707EAE] font-medium font-sf-pro">{description}</p>
        )}
      </div>
      <div className="flex items-center gap-2.5">
        {modal}
        <div className="bg-amber-200 size-[24px]"></div>
      </div>
    </div>
  );
}
