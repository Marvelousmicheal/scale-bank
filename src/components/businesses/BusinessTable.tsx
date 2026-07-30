"use client";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const businesses = [
  { name: 'Chicken Republic', id: 'BIZ-789034', owner: 'Adebayo Kayode', kyb: 'Verified', volume: '₦184,300,500', status: 'Active' },
  { name: 'Shoprite Nigeria', id: 'BIZ-789035', owner: 'Chukwuemeka Obi', kyb: 'Verified', volume: '₦92,100,000', status: 'Active' },
  { name: 'Tantalizers', id: 'BIZ-789036', owner: 'Funke Adeola', kyb: 'Pending', volume: '₦45,600,000', status: 'Inactive' },
  { name: 'Mr Biggs', id: 'BIZ-789037', owner: 'Segun Martins', kyb: 'Rejected', volume: '₦78,900,500', status: 'Inactive' },
  { name: "Domino's Pizza", id: 'BIZ-789038', owner: 'Ngozi Okonkwo', kyb: 'Verified', volume: '₦210,400,000', status: 'Active' },
];

export default function BusinessTable() {
  const router = useRouter();

  return (
    <Table className="border-separate border-spacing-y-[10px] p-0">
      <TableHeader>
        <TableRow className="border-none hover:bg-transparent">
          <TableHead className="font-bold text-sm text-white px-[15px] py-[10px] font-sf-pro">Business Name</TableHead>
          <TableHead className="font-bold text-sm text-white px-[15px] py-[10px] font-sf-pro">Business ID</TableHead>
          <TableHead className="font-bold text-sm text-white px-[15px] py-[10px] font-sf-pro w-[350px]">Owner</TableHead>
          <TableHead className="font-bold text-sm text-white px-[15px] py-[10px] font-sf-pro">KYB Status</TableHead>
          <TableHead className="font-bold text-sm text-white px-[15px] py-[10px] font-sf-pro">Monthly Volume</TableHead>
          <TableHead className="font-bold text-sm text-white px-[15px] py-[10px] font-sf-pro text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {businesses.map((biz, i) => (
          <TableRow
            key={i}
            className="border-none hover:bg-transparent group h-[43px] cursor-pointer"
            onClick={() => router.push(`/businesses/${biz.id}`)}
          >
            <TableCell className="bg-surface-raised border-y border-l border-ink-soft/10 rounded-l-[8px] px-[15px] text-base font-bold text-white font-sf-pro">
              {biz.name}
            </TableCell>
            <TableCell className="bg-surface-raised border-y border-ink-soft/10 px-[15px] text-sm font-bold capitalize text-white font-sf-pro">
              {biz.id}
            </TableCell>
            <TableCell className="bg-surface-raised border-y border-ink-soft/10 px-[15px] text-base font-normal text-ink-dim font-sf-pro">
              {biz.owner}
            </TableCell>
            <TableCell className="bg-surface-raised border-y border-ink-soft/10 px-[15px] font-sf-pro">
              <div className={`flex items-center gap-2.5 text-base font-medium ${
                biz.kyb === 'Verified'
                  ? 'text-app-blue'
                  : biz.kyb === 'Pending'
                  ? 'text-app-yellow'
                  : 'text-app-red'
              }`}>
                <div className={`size-6 rounded-sm ${
                  biz.kyb === 'Verified'
                    ? 'bg-app-blue'
                    : biz.kyb === 'Pending'
                    ? 'bg-app-yellow'
                    : 'bg-app-red'
                }`} />
                {biz.kyb}
              </div>
            </TableCell>
            <TableCell className="bg-surface-raised border-y border-ink-soft/10 px-[15px] text-base font-medium text-white font-sf-pro">
              {biz.volume}
            </TableCell>
            <TableCell className="bg-surface-raised border-y border-r border-ink-soft/10 rounded-r-[8px] px-[15px]">
              <div className="flex justify-end">
                <div className={`w-[107px] rounded-[7px] p-[6px] text-center text-base font-normal font-sf-pro ${
                  biz.status === 'Active'
                    ? 'text-app-green bg-app-green/5'
                    : 'text-app-red bg-app-red/5'
                }`}>
                  {biz.status}
                </div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
