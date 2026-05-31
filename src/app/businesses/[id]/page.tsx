import PageHeader from "@/components/PageHeader";
import UsersModal from "@/components/modals/UsersModal";

const businesses: Record<string, { name: string }> = {
  "BIZ-789034": { name: "Chicken Republic" },
  "BIZ-789035": { name: "Shoprite Nigeria" },
  "BIZ-789036": { name: "Tantalizers" },
  "BIZ-789037": { name: "Mr Biggs" },
  "BIZ-789038": { name: "Domino's Pizza" },
};

export default async function BusinessDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const business = businesses[id];
  const name = business?.name ?? id;

  return (
    <div className="py-[46px] px-[30px] space-y-[31px]">
      <PageHeader title={name} backHref="/businesses" modal={<UsersModal />} />
      <div className="space-y-3">
        <div className="p-[15px]  rounded-[12px] bg-[#0C0A17] border border-[#BEC2DA]/10 flex  gap-[15px]">
          <div className="space-y-5 flex-1">
            <div className="bg-[#201E29]/10 border border-[#BEC2DA]/10 rounded-[12px] flex items-center p-[15px] justify-between">
              <div className="flex items-center gap-2.5">
                <div className="size-[60px] rounded-full bg-red-400"></div>
                <div className="">
                  <div className="flex items-center gap-2.5">
                    <p className="text-base font-bold text-white font-sf-pro">
                      Global Start
                    </p>
                    <div className="flex items-center gap-2.5">
                      <div className="bg-app-yellow size-6"></div>
                      <p className="text-app-yellow font-medium text-sm font-sf-pro">
                        Pending KYB
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <p className="text-sm text-[#BEC2DA]/64 font-sf-pro">
                      ID:TX-78020
                    </p>
                    <p className="text-sm text-[#BEC2DA]/64 font-sf-pro">
                      Tier:{" "}
                      <span className="text-[#BEC2DA] text-base font-bold ml-[5px]">
                        Standard
                      </span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <p className="text-sm text-[#BEC2DA]/64 font-sf-pro">
                      Owner::{" "}
                      <span className="text-[#BEC2DA] text-base font-bold ml-[5px]">
                        Adebayo Kayode
                      </span>
                    </p>
                    <p className="text-base text-[#565656] font-sf-pro">
                      Adebayo.jo@gmail.com
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="bg-app-red/15 px-[15px] py-2.5 rounded-[12px] h-11  flex items-center gap-2.5">
                  <p className="font-bold text-app-red text-base font-sf-pro">
                    Suspend
                  </p>
                  <div className="bg-app-red size-6"></div>
                </div>
                <div className="bg-app-blue px-[15px] py-2.5 rounded-[12px] h-11  flex items-center gap-2.5">
                  <p className="font-bold text-white text-base font-sf-pro">
                    Approve KYC
                  </p>
                  <div className="bg-white size-6"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className="w-[210px]  px-[25px] py-[18px] rounded-[20px] flex flex-1 flex-col gap-0.5 border border-app-green/20 "
                style={{
                  background:
                    "linear-gradient(135deg, rgba(16, 151, 50, 0.3) 70%, #1C1C1E 100%)",
                }}
              >
                <p className="text-sm text-white font-medium font-sf-pro ">
                  Total Volume
                </p>
                <p className="text-2xl text-white font-bold font-sf-pro ">
                  ₦184,300,500
                </p>
              </div>
              <div className="w-[210px]  flex-1  px-[25px] py-[18px] rounded-[20px] flex items-center justify-between  bg-app-black ">
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm text-white font-medium font-sf-pro ">
                    Monthly Volume
                  </p>
                  <p className="text-2xl text-app-green font-bold font-sf-pro ">
                    ₦12,400,000
                  </p>
                </div>
                <p className="font-medium text-[13px] font-sf-pro text-app-green">
                  +3%
                </p>
              </div>
              <div className="w-[210px]  flex-1  px-[25px] py-[18px] rounded-[20px] flex items-center justify-between  bg-app-black ">
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm text-white font-medium font-sf-pro ">
                    Success Rate
                  </p>
                  <p className="text-2xl text-app-green font-bold font-sf-pro ">
                    94.5%
                  </p>
                </div>
                <p className="font-medium text-[13px] font-sf-pro text-[#8E8E93]">
                  4,235 txns
                </p>
              </div>
            </div>
          </div>
          <div className="p-[15px] rounded-[20px] bg-[#412CDD] w-[282px] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <p className="font-medium text-[#DADADA] font-sf-pro text-sm ">Current Balance</p>
              <div className="bg-white size-6"></div>
            </div>
            <p className="font-bold text-white text-[32px] font-sf-pro ">₦5,240,200</p>
            <div className="flex items-center justify-between">
              <div className="">
                <p className="text-sm text-[#BEC2DA]/65 font-normal font-sf-pro ">Pending Settlement</p>
                <p className="text-base text-[#BEC2DA] font-bold font-sf-pro ">₦12,400,000</p>
              </div>
              <div className="">
                <p className="text-sm text-[#BEC2DA]/65 font-normal font-sf-pro ">Settlement</p>
                <p className="text-base text-[#BEC2DA] font-bold font-sf-pro ">T+1</p>
              </div>
            </div>
            <div className="bg-[#F2F2F7] w-full h-[45px] rounded-[12px] px-3 py-2.5 flex items-center justify-center ">
              <p className="font-bold text-base text-[#1E88CF] font-sf-pro">Settle Now</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
