"use client";

export default function TablePagination({
  showing = "Showing 1 to 20 of 100 entries",
  total = 5,
  current = 1,
  onPageChange,
  ariaLabel = "Table pagination",
}: {
  showing?: string;
  total?: number;
  current?: number;
  onPageChange?: (page: number) => void;
  ariaLabel?: string;
}) {
  const pageCount = Math.max(total, 1);
  const activePage = Math.min(Math.max(current, 1), pageCount);

  return (
    <nav aria-label={ariaLabel} className="flex items-center justify-between pt-4">
      <p className="font-sf-pro text-sm font-bold text-ink-bright">{showing}</p>
      <div className="flex items-center gap-5">
        <button
          type="button"
          disabled={!onPageChange || activePage === 1}
          onClick={() => onPageChange?.(activePage - 1)}
          className="h-[30px] w-[75px] rounded-[7px] bg-app-green/5 px-2.5 py-1.5 text-center font-sf-pro text-sm font-normal text-app-green transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-app-green disabled:cursor-not-allowed disabled:text-app-green/50"
        >
          Previous
        </button>
        <div className="flex items-center gap-2.5">
          {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
            <button
              type="button"
              key={page}
              aria-label={`Go to page ${page}`}
              aria-current={page === activePage ? "page" : undefined}
              disabled={!onPageChange}
              onClick={() => onPageChange?.(page)}
              className={`flex size-[37px] items-center justify-center rounded-[8px] text-center font-sf-pro text-sm font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-app-green disabled:cursor-default ${
                page === activePage
                  ? "bg-accent-purple"
                  : "border border-ink-soft/10 bg-surface-raised"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          type="button"
          disabled={!onPageChange || activePage === pageCount}
          onClick={() => onPageChange?.(activePage + 1)}
          className="h-[30px] w-[75px] rounded-[7px] bg-app-green/5 px-2.5 py-1.5 text-center font-sf-pro text-sm font-normal text-app-green transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-app-green disabled:cursor-not-allowed disabled:text-app-green/50"
        >
          Next
        </button>
      </div>
    </nav>
  );
}
