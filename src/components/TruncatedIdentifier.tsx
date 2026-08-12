export default function TruncatedIdentifier({ value, className = "max-w-[120px]" }: { value: string; className?: string }) {
  return <span className={`block truncate tabular-nums ${className}`} title={value}>{value}</span>
}
