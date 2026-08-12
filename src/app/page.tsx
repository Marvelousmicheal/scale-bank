import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"

export default function DashboardPage() {
  return (
    <div className="py-[46px] px-[30px] space-y-[34px]">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-sm text-ink-subtle font-bold font-sf-pro ">
            Hi Admin
          </h1>
          <p className="text-[34px] text-white font-bold font-sf-pro ">
            Welcome to your dashboard
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="bg-app-green rounded-full size-[32px]"></div>
          <div className="bg-app-yellow size-[24px] "></div>
        </div>
      </div>
      <div className="space-y-5">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-[20px] text-white font-bold font-sf-pro ">
              Dashboard Metrics
            </p>
            <div className="h-[42px] w-[254px] border px-[15px] border-app-blue rounded-[12px] justify-between flex items-center ">
              <p className="text-base text-app-blue font-bold font-sf-pro ">
                Daily
              </p>
              <p className="text-base text-ink-muted font-normal font-sf-pro ">
                Weekly
              </p>
              <p className="text-base text-ink-muted font-normal font-sf-pro ">
                Monthly
              </p>
              <p className="text-base text-ink-muted font-normal font-sf-pro ">
                Yearly
              </p>
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
                Transaction Volume
              </p>
              <p className="text-2xl text-white font-bold font-sf-pro ">
                ₦184,300,500
              </p>
            </div>
            <div className="w-[210px] flex-1  px-[25px] py-[18px] rounded-[20px] flex flex-col gap-0.5 bg-app-black ">
              <p className="text-sm text-white font-medium font-sf-pro ">
                Total Transactions
              </p>
              <p className="text-2xl text-app-green font-bold font-sf-pro ">
                12,345
              </p>
            </div>
            <div className="w-[210px] flex-1  px-[25px] py-[18px] rounded-[20px] flex flex-col gap-0.5 bg-app-black ">
              <p className="text-sm text-white font-medium font-sf-pro ">
                Active Businesses
              </p>
              <p className="text-2xl text-app-green font-bold font-sf-pro ">
                345
              </p>
            </div>
            <div className="w-[210px] flex-1  px-[25px] py-[18px] rounded-[20px] flex flex-col gap-0.5 bg-app-black ">
              <p className="text-sm text-white font-medium font-sf-pro ">
                Active POS Devices
              </p>
              <p className="text-2xl text-app-green font-bold font-sf-pro ">
                1,345
              </p>
            </div>
            <div className="w-[210px] flex-1  px-[25px] py-[18px] rounded-[20px] flex flex-col gap-0.5 bg-app-black ">
              <p className="text-sm text-white font-medium font-sf-pro ">
                Total Users
              </p>
              <p className="text-2xl text-app-green font-bold font-sf-pro ">
                42,520
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="flex-1 h-[400px] bg-app-black rounded-[20px]"></div>
          <div className="w-[400px] h-[400px] bg-app-black rounded-[20px] p-[25px] flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <p className="text-sm text-ink-subtle font-bold font-sf-pro">
                SETTLEMENTS
              </p>
              <p className="text-2xl text-white font-bold font-sf-pro">
                Status Distribution
              </p>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center gap-8">

              <div className="relative size-48">
                <svg className="size-full -rotate-90" viewBox="0 0 100 100">

                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="var(--surface-overlay)"
                    strokeWidth="12"
                  />

                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="var(--app-green)"
                    strokeWidth="12"
                    strokeDasharray="180 251.2"
                    strokeLinecap="round"
                  />

                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="var(--app-yellow)"
                    strokeWidth="12"
                    strokeDasharray="40 251.2"
                    strokeDashoffset="-185"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-3xl text-white font-bold font-sf-pro">
                    88%
                  </p>
                  <p className="text-xs text-ink-subtle font-medium font-sf-pro">
                    Success Rate
                  </p>
                </div>
              </div>

              <div className="w-full grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-app-green"></div>
                    <p className="text-sm text-white font-medium font-sf-pro">
                      Settled
                    </p>
                  </div>
                  <p className="text-sm text-white font-bold font-sf-pro">
                    72%
                  </p>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full bg-app-yellow"></div>
                    <p className="text-sm text-white font-medium font-sf-pro">
                      Pending
                    </p>
                  </div>
                  <p className="text-sm text-white font-bold font-sf-pro">
                    18%
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-5">
          <div className="flex-1  bg-app-black rounded-[12px] p-[15px] flex flex-col gap-5">
            <p className="text-[20px] text-white font-bold font-sf-pro ">
              System Alert
            </p>
            <div className="space-y-[18px]">
              <div className="w-full p-2.5 flex items-center gap-2.5 bg-app-red/15 rounded-[8px] border border-app-green/10 ">
                <div className="bg-app-red size-6"></div>
                <div className="">
                  <p className="font-bold text-sm text-white font-sf-pro">
                    POS Offline: Abuja Cluster
                  </p>
                  <p className="text-sm text-app-red font-normal font-sf-pro">
                    3 POS reported Offline in Garki area
                  </p>
                </div>
              </div>
              <div className="w-full p-2.5 flex items-center gap-2.5 bg-app-yellow/15 rounded-[8px] border border-app-yellow/10 ">
                <div className="bg-app-yellow size-6"></div>
                <div className="">
                  <p className="font-bold text-sm text-white font-sf-pro">
                    5 KYB Pending
                  </p>
                  <p className="text-sm text-app-yellow font-normal font-sf-pro">
                    Business verification overdue 24hrs
                  </p>
                </div>
              </div>
              <div className="w-full p-2.5 flex items-center gap-2.5 bg-app-gray/15 rounded-[8px] border border-app-gray/10 ">
                <div className="bg-app-gray size-6"></div>
                <div className="">
                  <p className="font-bold text-sm text-white font-sf-pro">
                    POS Offline: Abuja Cluster
                  </p>
                  <p className="text-sm text-app-gray font-normal font-sf-pro">
                    3 POS reported Offline in Garki area
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-app-black rounded-[12px] p-[15px] flex flex-col gap-5">
            <div className="flex flex-col gap-[11px]">
              <p className="text-base text-white font-bold font-sf-pro ">
                Verification Queue
              </p>
              <div className="flex flex-col gap-[7px]">
                <div className="w-full p-2.5 flex items-center justify-between bg-app-gray/15 rounded-[8px] border border-app-gray/10 ">
                  <div className="flex items-center gap-2.5">
                    <div className="bg-app-gray size-6"></div>

                    <p className="font-bold text-sm text-white font-sf-pro">
                      KYC
                    </p>
                  </div>
                  <p className="font-bold text-sm font-sf-pro text-app-gray">
                    12
                  </p>
                </div>
                <div className="w-full p-2.5 flex items-center justify-between bg-app-blue/15 rounded-[8px] border border-app-blue/10 ">
                  <div className="flex items-center gap-2.5">
                    <div className="bg-app-blue size-6"></div>

                    <p className="font-bold text-sm text-app-blue font-sf-pro">
                      KYB
                    </p>
                  </div>
                  <p className="font-bold text-sm font-sf-pro text-app-blue">
                    25
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-auto">
              <p className="text-base text-white font-bold font-sf-pro ">
                Support Tickets
              </p>
              <div className="flex flex-col gap-[7px]">
                <div className="w-full p-2.5 flex items-center justify-between bg-app-gray/15 rounded-[8px] border border-app-gray/10 ">
                  <div className="flex items-center gap-2.5">
                    <p className="text-sm text-white font-bold font-sf-pro">
                      Open Tickets
                    </p>

                    <p className=" text-sm text-white font-sf-pro">9</p>
                  </div>
                  <p className="font-bold text-sm font-sf-pro text-app-light-red">
                    3 high priority
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 h-[400px] bg-app-black p-[15px] rounded-[20px] flex flex-col gap-[15px]">
            <p className="text-xl text-white font-bold font-sf-pro ">
              POS Device Health
            </p>
            <div className="flex flex-col gap-[15px]">
              <div className="p-2.5 flex justify-between items-center ">
                <div className="flex items-center gap-2.5">
                  <div className="bg-app-green rounded-[5px] w-[12.21px] h-[12.68px]" />
                  <p className="text-sm text-white font-bold font-sf-pro">
                    Online
                  </p>
                </div>
                <p className="text-sm text-white font-medium font-sf-pro">
                  1,225
                </p>
              </div>
              <div className="p-2.5 flex justify-between items-center ">
                <div className="flex items-center gap-2.5">
                  <div className="bg-ink-muted rounded-[5px] w-[12.21px] h-[12.68px]" />
                  <p className="text-sm text-white font-bold font-sf-pro">
                    Offline
                  </p>
                </div>
                <p className="text-sm text-white font-medium font-sf-pro">
                  15
                </p>
              </div>
              <div className="p-2.5 flex justify-between items-center ">
                <div className="flex items-center gap-2.5">
                  <div className="bg-app-red rounded-[5px] w-[12.21px] h-[12.68px]" />
                  <p className="text-sm text-white font-bold font-sf-pro">
                    Suspended
                  </p>
                </div>
                <p className="text-sm text-white font-medium font-sf-pro">
                  5
                </p>
              </div>
              <div className="p-2.5 flex justify-between items-center ">
                <div className="flex items-center gap-2.5">
                  <div className="bg-chart-blue rounded-[5px] w-[12.21px] h-[12.68px]" />
                  <p className="text-sm text-white font-bold font-sf-pro">
                    Network Issue
                  </p>
                </div>
                <p className="text-sm text-white font-medium font-sf-pro">
                  3
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[25px] bg-app-black rounded-[12px] p-[20px]">
          <div className="flex items-center justify-between">
            <p className="text-[20px] text-white font-bold font-sf-pro">
              Recent Transactions
            </p>
            <p className="text-sm text-white bg-app-blue rounded-[10px] p-2.5 w-[96px] text-center font-bold font-sf-pro cursor-pointer ">
              View All
            </p>
          </div>

          <div className="w-full">
            <Table className="border-separate border-spacing-y-[10px]">
              <TableHeader>
                <TableRow className="border-none">
                  <TableHead className="font-bold text-sm text-white px-[15px] py-[10px] font-sf-pro w-[350px]">Transaction ID</TableHead>
                  <TableHead className="font-bold text-sm text-white px-[15px] py-[10px] font-sf-pro">Channel</TableHead>
                  <TableHead className="font-bold text-sm text-white px-[15px] py-[10px] font-sf-pro w-[450px]">Business</TableHead>
                  <TableHead className="font-bold text-sm text-white px-[15px] py-[10px] font-sf-pro">Amount</TableHead>
                  <TableHead className="font-bold text-sm text-white px-[15px] py-[10px] font-sf-pro">Time</TableHead>
                  <TableHead className="font-bold text-sm text-white px-[15px] py-[10px] font-sf-pro ">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { id: 'TX-789034', channel: 'POS Terminal', business: 'Chicken Republic', amount: '₦184,300,500', time: '2m ago', status: 'Success' },
                  { id: 'TX-789035', channel: 'POS Terminal', business: 'Chicken Republic', amount: '₦184,300,500', time: '2m ago', status: 'Success' },
                  { id: 'TX-789036', channel: 'POS Terminal', business: 'Chicken Republic', amount: '₦184,300,500', time: '2m ago', status: 'Failed' },
                  { id: 'TX-789037', channel: 'POS Terminal', business: 'Chicken Republic', amount: '₦184,300,500', time: '2m ago', status: 'Success' },
                  { id: 'TX-789038', channel: 'POS Terminal', business: 'Chicken Republic', amount: '₦184,300,500', time: '2m ago', status: 'Success' },
                ].map((tx, i) => (
                  <TableRow key={i} className="border-none group h-[43px]">
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
        </div>
      </div>
    </div>
  );
}
