import PageHeader from "@/components/PageHeader";
import UsersModal from "@/components/modals/UsersModal";
import BusinessTable from "@/components/businesses/BusinessTable";
import TablePagination from "@/components/TablePagination";

export default function BusinessesPage() {
  return (
    <div className="h-full flex flex-col pt-[46px] pb-[16px] px-[30px] gap-[31px]">
      <PageHeader
        title="Business Management"
        description="Manage all business Scale accounts."
        modal={<UsersModal />}
      />
      <div className="flex-1 flex flex-col gap-[15px] min-h-0">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="font-bold font-xl text-white font-sf-pro">
              Businesses Metrics
            </p>
            <div className="px-[15px] py-2.5 flex items-center gap-2.5 border border-app-blue rounded-[12px] ">
              <p className="text-app-blue font-bold text-base font-sf-pro">
                Daily
              </p>
              <p className="text-base text-ink-muted font-sf-pro">Weekly</p>
              <p className="text-base text-ink-muted font-sf-pro">Monthly</p>
              <p className="text-base text-ink-muted font-sf-pro">Yearly</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="w-[210px]  px-[25px] py-[18px] rounded-[20px] flex flex-1 flex-col gap-0.5 border border-app-green/20 "
              style={{
                background:
                  "var(--metric-featured)",
              }}
            >
              <p className="text-sm text-white font-medium font-sf-pro ">
                Total Volume
              </p>
              <p className="text-2xl text-white font-bold font-sf-pro ">
                ₦184,300,500
              </p>
            </div>
            <div className="w-[210px] flex-1  px-[25px] py-[18px] rounded-[20px] flex flex-col gap-0.5 bg-app-black ">
              <p className="text-sm text-white font-medium font-sf-pro ">
                Active Terminalss
              </p>
              <p className="text-2xl text-app-green font-bold font-sf-pro ">
                345
              </p>
            </div>
            <div className="w-[210px] flex-1  px-[25px] py-[18px] rounded-[20px] flex flex-col gap-0.5 bg-app-black ">
              <p className="text-sm text-white font-medium font-sf-pro ">
                Pending KYC
              </p>
              <p className="text-2xl text-app-green font-bold font-sf-pro ">
                145
              </p>
            </div>
            <div className="w-[210px] flex-1  px-[25px] py-[18px] rounded-[20px] flex flex-col gap-0.5 bg-app-black ">
              <p className="text-sm text-white font-medium font-sf-pro ">
                Suspended Accounts
              </p>
              <p className="text-2xl text-app-green font-bold font-sf-pro ">
                1,345
              </p>
            </div>
          </div>
        </div>
        <div className="px-[15px] py-5 rounded-[12px] bg-app-black border border-ink-soft/10 flex flex-col gap-[25px] ">
          <div className="flex items-center justify-between ">
            <p className="font-bold tesxt-xl text-white font-sf-pro">
              Business List
            </p>
            <div className="w-[154px] bg-app-blue px-[15px] py-2.5 rounded-[12px] flex items-center justify-center gap-2.5 ">
              <p className="font-sf-pro font-bold text-base text-ink-pale">
                Export
              </p>
              <div className="size-6 bg-app-red"></div>
            </div>
          </div>
          <div className="space-y-5">
            <div className="relative flex items-center w-full gap-2.5 h-[30px]">
              <div className="absolute left-[15px] size-5 bg-white rounded-full" />
              <input
                type="search"
                placeholder="Search business by name, email or account ID.."
                className="rounded-[8px] w-full h-11 pl-[40px] pr-[15px] py-[5px] border border-app-gray/10 bg-transparent placeholder:text-sm placeholder:font-normal placeholder:font-sf-pro placeholder:text-app-gray/65 focus:outline-none text-white"
              />
            </div>
            <div className="flex items-center gap-5">
              <div className="flex-1 flex items-center justify-between h-[45px] border border-light-gray/10 rounded-[8px] px-[15px] py-[5px]">
                <p className="text-sm font-bold text-ink-muted font-sf-pro">KYB Status</p>
                <div className="size-[24px] bg-app-red"></div>
              </div>
              <div className="flex-1 flex items-center justify-between h-[45px] border border-light-gray/10 rounded-[8px] px-[15px] py-[5px]">
                <p className="text-sm font-bold text-ink-muted font-sf-pro">Business Tier</p>
                <div className="size-[24px] bg-app-red"></div>
              </div>
              <div className="flex-1 flex items-center justify-between h-[45px] border border-light-gray/10 rounded-[8px] px-[15px] py-[5px]">
                <p className="text-sm font-bold text-ink-muted font-sf-pro">Account Status</p>
                <div className="size-[24px] bg-app-red"></div>
              </div>
              <div className="flex-1 flex items-center justify-between h-[45px] border border-light-gray/10 rounded-[8px] px-[15px] py-[5px]">
                <p className="text-sm font-bold text-ink-muted font-sf-pro">Date Registered</p>
                <div className="size-[24px] bg-app-red"></div>
              </div>
              <div className="w-[135px] flex items-center justify-between h-[45px] border border-light-gray/10 rounded-[8px] px-[15px] py-[5px] bg-app-blue/25">
                <p className="text-sm font-bold text-white font-sf-pro">Clear Filter</p>
                <div className="size-[24px] bg-app-red"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col min-h-0 border border-light-gray/10 bg-app-black rounded-[12px] p-5">
          <div className="flex-1 overflow-y-auto min-h-0">
            <BusinessTable />
          </div>
          <TablePagination />
        </div>
      </div>
    </div>
  );
}
