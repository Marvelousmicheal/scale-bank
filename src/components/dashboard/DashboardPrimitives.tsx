import { ChevronDown } from "lucide-react";

export type DashboardMetric = {
  label: string;
  value: string;
  change?: string;
  featured?: boolean;
  valueTone?: "default" | "success" | "warning" | "danger";
  changeTone?: "success" | "warning" | "danger" | "muted";
  labelTone?: "default" | "warning" | "danger";
};

const valueTones = {
  default: "text-white",
  success: "text-app-green",
  warning: "text-app-yellow",
  danger: "text-app-red",
};

const changeTones = {
  success: "text-app-green",
  warning: "text-app-yellow",
  danger: "text-app-red",
  muted: "text-ink-muted",
};

const labelTones = {
  default: "text-ink-soft",
  warning: "text-app-yellow",
  danger: "text-app-red",
};

export function MetricCard({
  metric,
  compact = false,
  outlined = false,
}: {
  metric: DashboardMetric;
  compact?: boolean;
  outlined?: boolean;
}) {
  const valueTone = metric.featured ? "default" : metric.valueTone ?? "success";
  return (
    <article
      className={`relative rounded-[20px] border px-[15px] ${
        compact ? "h-[74px] py-3" : "h-[94px] py-[18px]"
      } ${
        metric.featured
          ? "border-app-green/20 bg-metric-featured"
          : outlined
            ? "border-app-green/20 bg-surface-raised"
            : "border-light-gray/5 bg-app-black"
      }`}
    >
      <p className={`text-sm ${labelTones[metric.labelTone ?? "default"]}`}>
        {metric.label}
      </p>
      <p className={`${compact ? "text-xl" : "text-2xl"} mt-1 font-bold ${valueTones[valueTone]}`}>
        {metric.value}
      </p>
      {metric.change && (
        <span
          className={`absolute right-[15px] text-sm ${
            compact ? "bottom-4" : "bottom-[30px]"
          } ${changeTones[metric.changeTone ?? "success"]}`}
        >
          {metric.change}
        </span>
      )}
    </article>
  );
}

export function PeriodSelector({
  value = "Monthly",
  options,
}: {
  value?: string;
  options?: string[];
}) {
  if (options) {
    return (
      <div className="flex h-[43px] items-center gap-5 rounded-[12px] border border-app-blue px-[15px] text-base text-ink-muted">
        {options.map((option) => (
          <span key={option} className={option === value ? "font-bold text-app-blue" : ""}>
            {option}
          </span>
        ))}
      </div>
    );
  }

  return (
    <button className="flex h-[37px] items-center gap-8 rounded-[8px] border border-light-gray/10 px-[15px] text-sm font-bold text-ink-muted">
      {value}
      <ChevronDown className="size-5 text-ink-soft" />
    </button>
  );
}

export function DashboardPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-[12px] border border-light-gray/10 bg-app-black p-[15px] ${className}`}>
      {children}
    </section>
  );
}
