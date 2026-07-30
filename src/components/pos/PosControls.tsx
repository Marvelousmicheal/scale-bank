import {
  CalendarDays,
  ChevronDown,
  Download,
  Search,
  Upload,
  X,
} from "lucide-react";

export function ActionButton({
  children,
  variant = "primary",
  icon,
}: {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "muted";
  icon?: "download" | "upload";
}) {
  const Icon = icon === "upload" ? Upload : Download;
  const styles = {
    primary: "border-app-blue bg-[#2999dc] text-white",
    outline: "border-app-blue text-app-blue",
    muted: "border-white text-white",
  };

  return (
    <button
      type="button"
      className={`flex h-11 items-center justify-center gap-2.5 rounded-[12px] border px-6 font-sf-pro text-base font-bold ${styles[variant]}`}
    >
      {children}
      {icon && <Icon className="size-5" strokeWidth={2} />}
    </button>
  );
}

export function SearchField({ placeholder }: { placeholder: string }) {
  return (
    <label className="flex h-[30px] items-center gap-2.5 rounded-[8px] border border-light-gray/10 bg-[#090614] px-2.5">
      <Search className="size-5 shrink-0 text-[#BEC2DA]" />
      <input
        type="search"
        aria-label={placeholder}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent font-sf-pro text-sm text-white outline-none placeholder:text-[#8E8E93]"
      />
    </label>
  );
}

export function FilterButton({
  children,
  calendar = false,
}: {
  children: React.ReactNode;
  calendar?: boolean;
}) {
  const Icon = calendar ? CalendarDays : ChevronDown;
  return (
    <button
      type="button"
      className="flex h-[45px] flex-1 items-center justify-between rounded-[8px] border border-light-gray/10 bg-[#090614] px-[15px] font-sf-pro text-sm font-bold text-[#8E8E93]"
    >
      {children}
      <Icon className="size-5 text-[#BEC2DA]" />
    </button>
  );
}

export function ClearFilters() {
  return (
    <button
      type="button"
      className="flex h-[45px] w-[135px] shrink-0 items-center justify-between rounded-[8px] border border-app-blue/20 bg-app-blue/25 px-[15px] font-sf-pro text-sm font-bold text-white"
    >
      Clear Filter
      <X className="size-5" strokeWidth={2.5} />
    </button>
  );
}

