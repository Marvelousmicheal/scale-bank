import ApiLoadingState from "@/components/ApiLoadingState"

export default function Loading() {
  return <div className="flex min-h-full px-[30px]"><ApiLoadingState label="Loading User Management" /></div>
}
