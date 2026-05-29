import PageHeader from "@/components/PageHeader";
import UsersModal from "@/components/modals/UsersModal";

export default function BusinessesPage() {
  return (
    <div className="py-[46px] px-[30px] space-y-[34px]">
      <PageHeader
        title="Business Management"
        description="Manage all business Scale accounts."
        modal={<UsersModal />}
      />
    </div>
  );
}
