export default function TablePagination({
  showing = "Showing 1 to 20 of 100 entries",
  total = 5,
  current = 1,
}: {
  showing?: string;
  total?: number;
  current?: number;
}) {
  return (
    <div className="flex items-center justify-between pt-4">
      <p className="font-sf-pro font-bold text-sm text-ink-bright">{showing}</p>
      <div className="flex items-center gap-5">
        <div className="px-2.5 py-1.5 bg-app-green/5 w-[75px] text-center h-[30px] rounded-[7px]">
          <p className="font-normal text-sm text-app-green/50 font-sf-pro">Previous</p>
        </div>
        <div className="flex items-center gap-2.5">
          {Array.from({ length: total }, (_, i) => i + 1).map((page) => (
            <div
              key={page}
              className={`size-[37px] text-center flex items-center justify-center rounded-[8px] ${
                page === current
                  ? "bg-accent-purple"
                  : "bg-surface-raised border border-ink-soft/10"
              }`}
            >
              <p className="font-sf-pro font-bold text-sm text-white">{page}</p>
            </div>
          ))}
        </div>
        <div className="px-2.5 py-1.5 w-[75px] text-center bg-app-green/5 h-[30px] rounded-[7px]">
          <p className="font-normal text-sm text-app-green font-sf-pro">Next</p>
        </div>
      </div>
    </div>
  );
}
