import {
  BadgeCheck,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  CircleAlert,
  CreditCard,
  Download,
  FileBadge,
  FileCheck2,
  Search,
  ShieldCheck,
  WalletCards,
  X,
} from "lucide-react";
import PageHeader from "@/components/PageHeader";
import TablePagination from "@/components/TablePagination";

const businesses: Record<
  string,
  { name: string; owner: string; email: string; tier: string }
> = {
  "BIZ-789034": {
    name: "Global Start",
    owner: "Adebayo Kayode",
    email: "Adebayo.jo@gmail.com",
    tier: "Standard",
  },
  "BIZ-789035": {
    name: "Shoprite Nigeria",
    owner: "Chukwuemeka Obi",
    email: "chukwuemeka@shoprite.ng",
    tier: "Gold",
  },
  "BIZ-789036": {
    name: "Tantalizers",
    owner: "Funke Adeola",
    email: "funke@tantalizers.com",
    tier: "Standard",
  },
  "BIZ-789037": {
    name: "Mr Biggs",
    owner: "Segun Martins",
    email: "segun@mrbiggs.ng",
    tier: "Gold",
  },
  "BIZ-789038": {
    name: "Domino's Pizza",
    owner: "Ngozi Okonkwo",
    email: "ngozi@dominos.ng",
    tier: "Platinum",
  },
};

const documents = [
  { name: "CAC Certificate", state: "Pending", icon: FileBadge },
  { name: "Utility Bill", state: "Verified", icon: FileCheck2 },
  { name: "TIN Verification", state: "Verified", icon: FileBadge },
];

const terminals = Array.from({ length: 9 }, (_, index) => ({
  id: `POS-456-09${index + 1}`,
  location: "Garki Branch",
  status: index === 3 || index > 6 ? "online" : index === 4 || index === 5 ? "warning" : "idle",
}));

const transactions = [
  { id: "TX-789034", channel: "POS", business: "Macdel Stores Abuja", amount: "₦14,300,500", time: "2m ago", status: "Success" },
  { id: "TX-789098", channel: "Transfer", business: "Medhealth Kubwa", amount: "₦12,300,500", time: "5d ago", status: "Success" },
  { id: "TX-789021", channel: "Card", business: "Agrofinatel Agricultural and Financial Institutions Garki", amount: "₦4,300,500", time: "1w ago", status: "Failed" },
  { id: "TX-789033", channel: "NFC", business: "Checkpoint Restaurants Wuse II", amount: "₦184,300", time: "4mon ago", status: "Success" },
];

function Filter({
  children,
  calendar = false,
}: {
  children: React.ReactNode;
  calendar?: boolean;
}) {
  const Icon = calendar ? CalendarDays : ChevronDown;
  return (
    <button className="flex h-[45px] flex-1 items-center justify-between rounded-[8px] border border-light-gray/10 bg-surface-raised px-[15px] font-sf-pro text-sm font-bold text-ink-muted">
      {children}
      <Icon className="size-5 text-ink-soft" />
    </button>
  );
}

export default async function BusinessDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const business = businesses[id] ?? businesses["BIZ-789034"];

  return (
    <div className="flex min-h-full flex-col gap-[15px] px-[30px] pb-[30px] pt-[46px]">
      <PageHeader title={business.name} backHref="/businesses" />

      <section className="grid min-h-[241px] grid-cols-[1fr_282px] gap-[15px] rounded-[12px] border border-light-gray/10 bg-app-black p-[15px]">
        <div className="flex flex-col gap-5">
          <div className="flex min-h-[90px] items-center justify-between rounded-[12px] border border-light-gray/10 bg-surface-raised px-[15px] py-3.5">
            <div className="flex items-center gap-2.5">
              <div className="relative flex size-[60px] items-center justify-center rounded-full bg-danger-gradient">
                <Building2 className="size-7 text-white" />
                <BadgeCheck className="absolute -bottom-1 -right-1 size-6 text-app-green" fill="currentColor" />
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h2 className="font-sf-pro text-base font-bold text-white">{business.name}</h2>
                  <FileBadge className="size-5 text-app-yellow" />
                  <span className="font-sf-pro text-sm font-medium text-app-yellow">Pending KYB</span>
                </div>
                <p className="font-sf-pro text-sm text-ink-muted">
                  ID:TX-78020
                  <span className="ml-3">Tier: <b className="text-base text-ink-soft">{business.tier}</b></span>
                </p>
                <p className="font-sf-pro text-sm text-ink-muted">
                  Owner: <b className="text-base text-ink-soft">{business.owner}</b>
                  <span className="ml-2 text-ink-dim">{business.email}</span>
                </p>
              </div>
            </div>
            <div className="flex gap-2.5">
              <button className="flex h-11 items-center gap-2.5 rounded-[12px] bg-app-red/15 px-[15px] font-sf-pro text-base font-bold text-app-red">
                Suspend <CircleAlert className="size-6" fill="currentColor" />
              </button>
              <button className="flex h-11 items-center gap-2.5 rounded-[12px] bg-action-blue px-[15px] font-sf-pro text-base font-bold text-white">
                Approve KYC <ShieldCheck className="size-6" fill="currentColor" />
              </button>
            </div>
          </div>

          <div className="grid flex-1 grid-cols-3 gap-[15px]">
            {[
              { label: "Total Volume", value: "₦184,300,500", featured: true },
              { label: "Monthly Volume", value: "₦12,400,000", note: "+3%" },
              { label: "Success Rate", value: "94.5%", note: "4,235 txns" },
            ].map((metric) => (
              <article
                key={metric.label}
                className={`relative rounded-[20px] border border-light-gray/5 px-[25px] py-[18px] ${
                  metric.featured
                    ? "border-app-green/20 bg-metric-featured"
                    : "bg-surface-raised"
                }`}
              >
                <p className="font-sf-pro text-sm font-medium text-white">{metric.label}</p>
                <p className={`font-sf-pro text-2xl font-bold ${metric.featured ? "text-white" : "text-app-green"}`}>{metric.value}</p>
                {metric.note && (
                  <span className={`absolute bottom-[31px] right-[15px] font-sf-pro text-xs ${metric.note.startsWith("+") ? "text-app-green" : "text-ink-muted"}`}>
                    {metric.note}
                  </span>
                )}
              </article>
            ))}
          </div>
        </div>

        <aside className="flex flex-col justify-between rounded-[20px] bg-action-indigo p-[15px]">
          <div className="flex items-center justify-between">
            <p className="font-sf-pro text-sm text-ink-bright">Current Balance</p>
            <WalletCards className="size-6 text-white" fill="currentColor" />
          </div>
          <p className="font-sf-pro text-[32px] font-bold text-white">₦12,400,000</p>
          <div className="flex items-end justify-between">
            <div>
              <p className="font-sf-pro text-sm text-ink-soft/65">Pending Settlement</p>
              <p className="font-sf-pro text-base font-bold text-ink-soft">₦1,200,000</p>
            </div>
            <div>
              <p className="font-sf-pro text-sm text-ink-soft/65">Settlement</p>
              <p className="font-sf-pro text-base font-bold text-ink-soft">T+1</p>
            </div>
          </div>
          <button className="h-[45px] rounded-[12px] bg-ink-pale font-sf-pro text-base font-bold text-action-sky">Settle Now</button>
        </aside>
      </section>

      <section className="grid grid-cols-[0.86fr_1.14fr] gap-[15px]">
        <div className="rounded-[12px] border border-light-gray/10 bg-app-black p-2.5">
          <h2 className="mb-3 font-sf-pro text-xl font-bold text-white">KYB Documents</h2>
          <div className="space-y-2.5">
            {documents.map((document) => {
              const Icon = document.icon;
              return (
                <div key={document.name} className="flex h-12 items-center justify-between rounded-[8px] border border-light-gray/10 bg-surface-raised px-[15px]">
                  <div className="flex items-center gap-3">
                    <Icon className="size-5 text-app-blue" />
                    <span className="font-sf-pro text-base font-bold text-white">{document.name}</span>
                  </div>
                  <div className="flex items-center gap-7">
                    {document.state === "Verified" ? (
                      <span className="flex size-5 items-center justify-center rounded-full bg-app-green text-surface-raised"><Check className="size-3.5" /></span>
                    ) : (
                      <FileBadge className="size-5 text-app-yellow" />
                    )}
                    <button className="h-[29px] w-20 rounded-[8px] bg-app-blue font-sf-pro text-sm font-bold text-white">View</button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-[12px] bg-app-black p-[15px]">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-sf-pro text-xl font-bold text-white">Active POS Terminal</h2>
            <span className="font-sf-pro text-base font-bold text-app-blue">9</span>
          </div>
          <div className="grid grid-cols-3 gap-2.5">
            {terminals.map((terminal) => (
              <div key={terminal.id} className="flex h-12 items-center gap-2.5 rounded-[8px] border border-light-gray/10 bg-panel-tint px-2.5">
                <CreditCard className="size-5 shrink-0 text-white" fill="currentColor" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-sf-pro text-sm font-bold text-white">{terminal.location}</p>
                  <p className="truncate font-sf-pro text-xs text-ink-soft">ID: {terminal.id}</p>
                </div>
                <span className={`size-2 rounded-full ${terminal.status === "online" ? "bg-app-green" : terminal.status === "warning" ? "bg-app-yellow" : "bg-ink-muted"}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-[12px] border border-light-gray/10 bg-app-black p-5">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="font-sf-pro text-xl font-bold text-white">Recent Transactions</h2>
          <button className="flex h-11 w-[154px] items-center justify-center gap-2.5 rounded-[12px] border border-app-blue font-sf-pro font-bold text-app-blue">
            Export <Download className="size-5" />
          </button>
        </div>
        <label className="flex h-[30px] items-center gap-2.5 rounded-[8px] border border-light-gray/10 bg-surface-raised px-2.5">
          <Search className="size-5 text-ink-soft" />
          <input className="flex-1 bg-transparent font-sf-pro text-sm text-white outline-none placeholder:text-ink-muted" placeholder="Search by business name, owner, or business ID" />
        </label>
        <div className="mt-5 flex gap-5">
          <Filter>Channel</Filter>
          <Filter>Amount</Filter>
          <Filter>Status</Filter>
          <Filter calendar>Date</Filter>
          <button className="flex h-[45px] w-[135px] shrink-0 items-center justify-between rounded-[8px] border border-app-blue/20 bg-app-blue/25 px-[15px] font-sf-pro text-sm font-bold text-white">
            Clear Filter <X className="size-5" />
          </button>
        </div>

        <table className="mt-5 w-full border-separate border-spacing-y-2.5 font-sf-pro">
          <thead>
            <tr className="text-left text-sm font-bold text-white">
              <th className="px-[15px]">Transaction ID</th>
              <th className="px-[15px]">Channel</th>
              <th className="px-[15px]">Business</th>
              <th className="px-[15px]">Amount</th>
              <th className="px-[15px]">Time</th>
              <th className="px-[15px] text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="h-[43px]">
                <td className="rounded-l-[8px] border-y border-l border-light-gray/10 bg-surface-raised px-[15px] font-bold text-white">{transaction.id}</td>
                <td className="border-y border-light-gray/10 bg-surface-raised px-[15px] text-ink-dim">{transaction.channel}</td>
                <td className="max-w-[260px] border-y border-light-gray/10 bg-surface-raised px-[15px] text-ink-dim">{transaction.business}</td>
                <td className="border-y border-light-gray/10 bg-surface-raised px-[15px] text-white">{transaction.amount}</td>
                <td className="border-y border-light-gray/10 bg-surface-raised px-[15px] text-ink-soft">{transaction.time}</td>
                <td className="rounded-r-[8px] border-y border-r border-light-gray/10 bg-surface-raised px-[15px]">
                  <span className={`ml-auto block w-[107px] rounded-[7px] px-2 py-1 text-center ${transaction.status === "Success" ? "bg-app-green/5 text-app-green" : "bg-app-red/5 text-app-red"}`}>{transaction.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <TablePagination showing="Showing 1 to 11 of 50 entries" total={4} />
      </section>

      <section className="rounded-[12px] border border-light-gray/10 bg-app-black p-2.5">
        <h2 className="mb-3 font-sf-pro text-base font-bold text-white">Activity Timeline</h2>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
          {["Logout", "Initiated Transaction", "Logout", "Initiated Transaction", "Logout", "Initiated Transaction", "Login", "Changed password", "Login", "Changed password"].map((activity, index) => (
            <div key={`${activity}-${index}`} className="flex items-center gap-3 font-sf-pro text-xs">
              <span className="text-ink-muted">13:10</span>
              <span className="flex-1 rounded-[7px] border border-light-gray/10 bg-surface-raised px-2 py-1.5 text-app-yellow">{activity}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
