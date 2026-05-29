import React from "react";

interface PageHeaderProps {
  title: string;
  description: string;
  modal?: React.ReactNode;
}

export default function PageHeader({ title, description, modal }: PageHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl text-white font-bold font-sf-pro">{title}</h1>
        <p className="text-base text-[#707EAE] font-medium font-sf-pro">{description}</p>
      </div>
      <div className="flex items-center gap-2.5">
        {modal}
        <div className="bg-amber-200 size-[24px]"></div>
      </div>
    </div>
  );
}
