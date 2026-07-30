import PageHeader from "@/components/PageHeader";
import SystemControlTabs from "@/components/system-control/SystemControlTabs";

export default function SystemControlPage() {
  return (
    <div className="flex min-h-full flex-col gap-[30px] px-[25px] pb-[30px] pt-[46px]">
      <PageHeader title="System and Control Settings" />
      <SystemControlTabs />
    </div>
  );
}
