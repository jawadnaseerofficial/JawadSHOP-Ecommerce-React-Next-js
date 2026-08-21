'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // If there's only one page (or invalid), render nothing — parent already guards, but double-safe
  if (totalPages <= 1) return null;

  // Safety clamp in case parent passes out-of-range value
  const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPages));
  const isFirstPage = safeCurrentPage === 1;
  const isLastPage = safeCurrentPage === totalPages;

  const goToPrev = () => {
    if (!isFirstPage) onPageChange(safeCurrentPage - 1);
  };

  const goToNext = () => {
    if (!isLastPage) onPageChange(safeCurrentPage + 1);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Previous Arrow */}
      <button
        onClick={goToPrev}
        disabled={isFirstPage}
        aria-label="Previous page"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-black transition-all hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-black"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {/* Current / Total Pill */}
      <div className="flex h-10 min-w-[64px] items-center justify-center rounded-full bg-black px-4 text-sm font-medium text-white">
        <span>{safeCurrentPage}</span>
        <span className="mx-1 text-white/50">/</span>
        <span className="text-white/70">{totalPages}</span>
      </div>

      {/* Next Arrow */}
      <button
        onClick={goToNext}
        disabled={isLastPage}
        aria-label="Next page"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-black transition-all hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-black"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}