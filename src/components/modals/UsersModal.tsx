"use client";
import React from "react";

export default function UsersModal() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [visible, setVisible] = React.useState(false);
  const ANIM_DURATION = 300; // ms, keep in sync with transition duration

  const open = () => {
    setIsOpen(true);
    setMounted(true);
    // trigger next frame so CSS transition runs
    requestAnimationFrame(() => setVisible(true));
  };

  const close = () => {
    setVisible(false);
    // wait for animation to finish before unmounting
    setTimeout(() => {
      setMounted(false);
      setIsOpen(false);
    }, ANIM_DURATION);
  };

  return (
    <>
      <button
        aria-label="Open user modal"
        className="bg-green-400 rounded-full w-[32px] h-[32px] inline-flex items-center justify-center cursor-pointer"
        onClick={open}
      />

      {mounted && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={close}
          />
          <div
            // slide-in/out from right using translate-x and a transition
            className={`space-y-5 bg-[#0C0A17] border border-[#18181B]/6 w-124.25 h-screen overflow-y-scroll absolute right-0 top-0 rounded-none z-50 px-4 py-5 transform transition-transform duration-300 ease-in-out ${
              visible ? "translate-x-0" : "translate-x-full"
            }`}
            style={{
              boxShadow: "0 4px 45px 0 rgba(14, 253, 193, 0.15)",
            }}
            role="dialog"
            aria-modal="true"
          >
            <div className="px-2.5 py-1.25 border border-[#18181B]/10 flex items-center justify-between ">
              <div className="flex items-center gap-3.75 ">
                <button
                  aria-label="Close user panel"
                  onClick={close}
                  className="size-6 inline-flex items-center justify-center cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#BEC2DA]"
                    aria-hidden="true"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
                <p className="text-xl font-bold text-[#BEC2DA] font-sf-pro">
                  User Profile
                </p>
              </div>
              <div className="p-1.5 w-[115px] rounded-[7px] flex items-center justify-center bg-app-green/5 font-normal text-sm text-app-green font-sf-pro">
                Active
              </div>
            </div>
            <div className="p-[15px] border border-[#BEC2DA]/10 w-full rounded-[12px] space-y-5">
              <div className="space-y-2.5 flex items-center justify-center flex-col">
                <div className="bg-green-500 size-[150px]"></div>
                <div className="space-y-[-5px] text-center">
                  <p className="text-base font-bold text-[#BEC2DA] font-sf-pro">
                    Adebayo Kayode
                  </p>
                  <p className="text-sm font-normal text-[#BEC2DA]/65 font-sf-pro">
                    Adebayo.jo@gmail.com
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between ">
                <div className="space-y-[5px]">
                  <p className="text-sm font-normal text-[#BEC2DA]/65 font-sf-pro">
                    Phone Number
                  </p>
                  <p className="text-base font-bold text-[#BEC2DA] font-sf-pro">
                    +234 804 567 8345
                  </p>
                </div>
                <div className="space-y-[5px]">
                  <p className="text-sm font-normal text-[#BEC2DA]/65 font-sf-pro">
                    Email Verified
                  </p>
                  <p className="text-base font-bold text-[#BEC2DA] font-sf-pro">
                    Yes
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full p-[15px] border border-app-blue/10 rounded-[12px] bg-app-blue/12 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div className="space-y-[10px]">
                  <p className="font-normal text-sm text-[#BEC2DA]/65 font-sf-pro">
                    Current Balance
                  </p>
                  <p className="text-base font-bold text-[#6C57E4] font-sf-pro">
                    ₦25,300,000
                  </p>
                </div>
                <div className="space-y-[10px]">
                  <p className="font-normal text-sm text-[#BEC2DA]/65 font-sf-pro">
                    Number of Transactions
                  </p>
                  <p className="text-base font-bold text-right text-[#BEC2DA] font-sf-pro">
                    1,245
                  </p>
                </div>
              </div>
              <div>
                <div className="w-full h-[8px] bg-app-green/15 py-0.5 px-[1px] rounded-[6px]">
                  <div className="w-[80%] bg-app-green h-full rounded-[6px]" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="font-normal text-sm text-[#BEC2DA]/65 font-sf-pro">
                  Lifetime Volume
                </p>
                <p className="text-base text-[#BEC2DA] font-bold font-sf-pro">
                  ₦2,505,300,000
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-[15px]">
              <div className="p-2.5 rounded-[12px] border border-[#BEC2DA]/10 bg-[#201E29]/15 backdrop:blur-[50px] space-y-3.75 ">
                <h4 className="font-sf-pro text-xl font-bold text-[#BEC2DA]">
                  KYC Verification
                </h4>
                <div className="flex flex-col gap-2.5">
                  <div className="px-[15px] py-2.5 bg-[#090614] border border-[#BEC2DA]/10 rounded-[8px] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="bg-green-300 size-6"></div>
                      <p className="font-bold text-white text-base font-sf-pro">
                        Government ID
                      </p>
                    </div>
                    <div className="p-1.5 w-[80px] rounded-[7px] flex items-center justify-center bg-app-yellow/5 font-normal text-sm text-app-yellow font-sf-pro">
                      Pending
                    </div>
                  </div>
                  <div className="px-[15px] py-2.5 bg-[#090614] border border-[#BEC2DA]/10 rounded-[8px] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="bg-green-300 size-6"></div>
                      <p className="font-bold text-white text-base font-sf-pro">
                        BVN Verification
                      </p>
                    </div>
                    <div className="p-1.5 w-[80px] rounded-[7px] flex items-center justify-center bg-app-green/5 font-normal text-sm text-app-green font-sf-pro">
                      Passed
                    </div>
                  </div>
                  <div className="px-[15px] py-2.5 bg-[#090614] border border-[#BEC2DA]/10 rounded-[8px] flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="bg-green-300 size-6"></div>
                      <p className="font-bold text-white text-base font-sf-pro">
                        NIN Verification
                      </p>
                    </div>
                    <div className="p-1.5 w-[80px] rounded-[7px] flex items-center justify-center bg-app-green/5 font-normal text-sm text-app-green font-sf-pro">
                      Passed
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
            <div className="flex flex-col gap-[15px]">
              <div className="p-2.5 rounded-[12px] border border-[#BEC2DA]/10 bg-[#201E29]/15 backdrop:blur-[50px] space-y-3.75 ">
                <h4 className="font-sf-pro text-base font-bold text-[#BEC2DA]">
                  Activity Timeline
                </h4>
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-2.5">
                    <p className="font-chakra">13:10</p>
                    <div className="w-full px-2 py-2.5 rounded-[8px] border border-[#BEC2DA]/10 bg-[#090614] flex items-center ">
                      <p className="font-sf-pro font-normal text-xs text-app-yellow">
                        Logout
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <p className="font-chakra">13:10</p>
                    <div className="w-full px-2 py-2.5 rounded-[8px] border border-[#BEC2DA]/10 bg-[#090614] flex items-center ">
                      <p className="font-sf-pro font-normal text-xs text-app-yellow">
                        Initiated Transaction
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <p className="font-chakra">13:10</p>
                    <div className="w-full px-2 py-2.5 rounded-[8px] border border-[#BEC2DA]/10 bg-[#090614] flex items-center ">
                      <p className="font-sf-pro font-normal text-xs text-app-yellow">
                        Login
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <p className="font-chakra">13:10</p>
                    <div className="w-full px-2 py-2.5 rounded-[8px] border border-[#BEC2DA]/10 bg-[#090614] flex items-center ">
                      <p className="font-sf-pro font-normal text-xs text-app-yellow">
                        Changed password
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2.5">
              <h4 className="font-sf-pro text-base font-bold text-[#BEC2DA]">
                Admin Control
              </h4>
              <div className="space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-[8px] border border-[#BEC2DA]/10 bg-[#090614]  w-full flex items-center gap-2.5 ">
                    <div className="bg-app-yellow/12 size-8 flex items-center justify-center rounded-[8px]">
                      <div className="h-5 w-4.25 bg-app-red"></div>
                    </div>
                    <p className="font-sf-pro font-normal text-sm text-app-red">
                      Suspend
                    </p>
                  </div>
                  <div className="p-2 rounded-[8px] border border-[#BEC2DA]/10 bg-[#090614]  w-full flex items-center gap-2.5 ">
                    <div className="bg-app-blue/12 size-8 flex items-center justify-center rounded-[8px]">
                      <div className="h-5 w-4.25 bg-app-blue"></div>
                    </div>
                    <p className="font-chakra font-normal text-sm text-app-blue">
                      Freeze
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-[8px] border border-[#BEC2DA]/10 bg-[#090614]  w-full flex items-center gap-2.5 ">
                    <div className="bg-[#201E29]/50 size-8 flex items-center justify-center rounded-[8px]">
                      <div className="h-5 w-4.25 bg-white"></div>
                    </div>
                    <p className="font-sf-pro font-normal text-sm text-[#BEC2DA]/65">
                      Reset
                    </p>
                  </div>
                  <div className="p-2 rounded-[8px] border border-[#BEC2DA]/10 bg-[#090614]  w-full flex items-center gap-2.5 ">
                    <div className="bg-[#201E29]/50 size-8 flex items-center justify-center rounded-[8px]">
                      <div className="h-5 w-4.25 bg-app-yellow"></div>
                    </div>
                    <p className="font-chakra font-normal text-sm text-app-yellow">
                      Flag AML
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
