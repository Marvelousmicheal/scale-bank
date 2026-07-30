import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import UsersModal from "@/components/modals/UsersModal";
import PageHeader from "@/components/PageHeader";
import TablePagination from "@/components/TablePagination";

export default function UsersPage() {
  return (
    <div className="h-full flex flex-col pt-[46px] pb-[16px] px-[30px] gap-[34px]">
      <PageHeader
        title="User Management"
        description="Manage all consumer Scale accounts."
        modal={<UsersModal />}
      />
      <div className="px-[15px] py-5 w-full  flex flex-col gap-[25px] rounded-[12px] border border-light-gray/10 bg-app-black">
        <div className="flex w-full items-center justify-between gap-[20px]">
          <p className="text-xl text-white font-bold font-sf-pro ">User List</p>
          <div className="flex items-center gap-2.5">
            <div className="w-[154px] h-11 bg-app-blue/42 flex items-center justify-center gap-2.5 px-[15px] py-2.5 rounded-[12px]">
              <p className="text-base text-ink-pale font-bold font-sf-pro ">
                Export
              </p>
              <div className="bg-app-yellow size-[24px] "></div>
            </div>
            <div className="w-[168px] h-11 bg-app-blue flex items-center justify-center gap-2.5 px-[15px] py-2.5 rounded-[12px]">
              <p className="text-base text-ink-pale font-bold font-sf-pro ">
                Add New User
              </p>
              <div className="bg-app-yellow size-[24px] "></div>
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-5 ">
          <div className="relative flex items-center w-full">
            <div className="absolute left-[15px] size-5 bg-white rounded-full" />
            <input
              type="search"
              placeholder="Search user by name, email or account ID.."
              className="rounded-[8px] w-full h-11 pl-[40px] pr-[15px] border border-app-gray/10 bg-transparent placeholder:text-sm placeholder:font-normal placeholder:font-sf-pro placeholder:text-app-gray/65 focus:outline-none text-white"
              name=""
              id=""
            />
          </div>
          <div className="flex items-center gap-5 ">
            <div className="flex-1 flex items-center justify-between h-[45px] border border-light-gray/10 rounded-[8px] px-[15px] py-[5px]">
              <p className="text-sm font-bold text-ink-muted font-sf-pro">
                Channel
              </p>

              <div className="size-[24px] bg-app-red"></div>
            </div>

            <div className="flex-1 flex items-center justify-between h-[45px] border border-light-gray/10 rounded-[8px] px-[15px] py-[5px]">
              <p className="text-sm font-bold text-ink-muted font-sf-pro">
                Tiers
              </p>

              <div className="size-[24px] bg-app-red"></div>
            </div>
            <div className="flex-1 flex items-center justify-between h-[45px] border border-light-gray/10 rounded-[8px] px-[15px] py-[5px]">
              <p className="text-sm font-bold text-ink-muted font-sf-pro">
                KYC
              </p>

              <div className="size-[24px] bg-app-red"></div>
            </div>
            <div className="flex-1 flex items-center justify-between h-[45px] border border-light-gray/10 rounded-[8px] px-[15px] py-[5px]">
              <p className="text-sm font-bold text-ink-muted font-sf-pro">
               Date Joined
              </p>

              <div className="size-[24px] bg-app-red"></div>
            </div>
             <div className="w-[135px] flex items-center justify-between h-[45px] border border-light-gray/10 rounded-[8px] px-[15px] py-[5px] bg-app-blue/25">
              <p className="text-sm font-bold text-white font-sf-pro">
                Clear Filter
              </p>

              <div className="size-[24px] bg-app-red"></div>
            </div>

          </div>

        </div>

      </div>
      <div className="flex-1 flex flex-col min-h-0 border border-light-gray/10 bg-app-black rounded-[12px] p-5">
          <div className="flex-1 overflow-y-auto min-h-0">
            <Table className="border-separate border-spacing-y-[10px] p-0">
              <TableHeader>
                <TableRow className="border-none hover:bg-transparent">
                  <TableHead className="font-bold text-sm text-white px-[15px] py-[10px] font-sf-pro">User ID</TableHead>
                  <TableHead className="font-bold text-sm text-white px-[15px] py-[10px] font-sf-pro">Channel</TableHead>
                  <TableHead className="font-bold text-sm text-white px-[15px] py-[10px] font-sf-pro w-[350px]">Business Name</TableHead>
                  <TableHead className="font-bold text-sm text-white px-[15px] py-[10px] font-sf-pro">Amount</TableHead>
                  <TableHead className="font-bold text-sm text-white px-[15px] py-[10px] font-sf-pro">Time</TableHead>
                  <TableHead className="font-bold text-sm text-white px-[15px] py-[10px] font-sf-pro text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { id: 'USR-789034', channel: 'POS Terminal', business: 'Chicken Republic', amount: '₦184,300,500', time: '2m ago', status: 'Success' },
                  { id: 'USR-789035', channel: 'POS Terminal', business: 'Chicken Republic', amount: '₦184,300,500', time: '2m ago', status: 'Success' },
                  { id: 'USR-789036', channel: 'POS Terminal', business: 'Chicken Republic', amount: '₦184,300,500', time: '2m ago', status: 'Failed' },
                  { id: 'USR-789037', channel: 'POS Terminal', business: 'Chicken Republic', amount: '₦184,300,500', time: '2m ago', status: 'Success' },
                  { id: 'USR-789038', channel: 'POS Terminal', business: 'Chicken Republic', amount: '₦184,300,500', time: '2m ago', status: 'Success' },
                ].map((tx, i) => (
                  <TableRow key={i} className="border-none hover:bg-transparent group h-[43px]">
                    <TableCell className="bg-surface-raised border-y border-l border-ink-soft/10 rounded-l-[8px] px-[15px] text-base font-bold text-white font-sf-pro">
                      {tx.id}
                    </TableCell>
                    <TableCell className="bg-surface-raised border-y border-ink-soft/10 px-[15px] text-base font-normal text-ink-dim font-sf-pro">
                      {tx.channel}
                    </TableCell>
                    <TableCell className="bg-surface-raised border-y border-ink-soft/10 px-[15px] text-base font-normal text-ink-dim font-sf-pro">
                      {tx.business}
                    </TableCell>
                    <TableCell className="bg-surface-raised border-y border-ink-soft/10 px-[15px] text-base font-medium text-white font-sf-pro">
                      {tx.amount}
                    </TableCell>
                    <TableCell className="bg-surface-raised border-y border-ink-soft/10 px-[15px] text-base font-normal text-ink-soft font-sf-pro">
                      {tx.time}
                    </TableCell>
                    <TableCell className="bg-surface-raised border-y border-r border-ink-soft/10 rounded-r-[8px] px-[15px]">
                      <div className="flex justify-end">
                        <div className={`w-[107px] rounded-[7px] p-[6px] text-center text-base font-normal font-sf-pro ${
                          tx.status === 'Success'
                          ? 'text-app-green bg-app-green/5'
                          : 'text-app-red bg-app-red/5'
                        }`}>
                          {tx.status}
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <TablePagination />
      </div>
    </div>
  );
}



