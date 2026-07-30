"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export function Sidebar() {
  const pathname = usePathname();
  const links = [
    { name: 'Dashboard', href: '/' },
    { name: 'Users', href: '/users' },
    { name: 'Businesses', href: '/businesses' },
    {
      name: 'KYC & KYB Verification',
      href: '/kyc-kyb-verification',
    },
    {
      name: 'POS Orders Management',
      href: '/pos-orders-management',
    },
    { name: 'POS Terminals', href: '/pos-terminals' },
    { name: 'Transactions', href: '/transactions' },
    { name: 'Settlements', href: '/settlements' },
    {
      name: 'Disputes & Compliance',
      href: '/dispute-and-compliance',
    },
    { name: 'Reports & Analytics', href: '/reports-and-analysis' },
    { name: 'Support Center', href: '/support-center' },
    { name: 'System Controls', href: '/system-control' },
  ];

  return (
    <aside className=" h-screen w-[290px]  bg-app-black text-light-gray flex flex-col  ">
      <nav className="flex-1 overflow-y-auto">
        <div className=" mb-[38px] h-[130px] border-b border-border-dark flex items-center justify-center text-white ">
          <Image
            src="/image/logo.svg"
            alt="Scale Bank Logo"
            width={101}
            height={40}
            priority
          />
        </div>
        <ul className="space-y-[15px] pr-1 pl-[33px]">
          {links.map((link) => {
            const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
            return (
              <li key={link.name} className=" h-[36px] flex items-center ">
                <Link
                  href={link.href}
                  className={`font-sf-pro ${isActive ? 'font-bold text-app-green' : 'font-medium text-white'} text-[18px] leading-[30px] flex items-center justify-between w-full transition-colors`}
                >
                  <div className='flex items-center gap-[10px]'>
                    <div className='w-[24px] h-[24px] bg-app-red'></div>
                    {link.name}
                  </div>
                  {isActive && <div className='h-[36px] w-[4px] rounded-[25px] bg-app-green'/>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mb-10 pt-4  ">
        <Link
          href="/login"
          className="flex gap-2.5 w-[258px] bg-app-light-red/15 rounded-[10px] mx-auto  px-3 h-[45px] text-app-light-red  items-center text-base font-sf-pro "
        >
          <div className='w-[24px] h-[24px] bg-app-red'></div>
          Logout
        </Link>
      </div>
    </aside>
  );
}
