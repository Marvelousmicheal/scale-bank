"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export function Sidebar() {
  const pathname = usePathname();
  if (pathname.startsWith('/login') || pathname.startsWith('/pay') || pathname.startsWith('/checkout')) return null;

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
        <form action="/api/auth/logout" method="post" className="mx-auto w-[258px]">
          <button
            type="submit"
            className="flex h-[45px] w-full items-center gap-2.5 rounded-[10px] bg-app-light-red/15 px-3 text-base text-app-light-red transition-colors hover:bg-app-light-red/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-app-light-red"
          >
            <span aria-hidden="true" className='h-[24px] w-[24px] bg-app-red'></span>
            Logout
          </button>
        </form>
      </div>
    </aside>
  );
}
