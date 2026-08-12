import { Spinner } from "@/components/ui/spinner"

export default function ApiLoadingState({ label }: { label: string }) {
  return <div className="flex min-h-[240px] flex-1 flex-col items-center justify-center gap-3 text-center"><Spinner aria-label={label} className="size-8 text-app-green" /><p className="text-sm font-medium text-ink-muted">{label}</p></div>
}
