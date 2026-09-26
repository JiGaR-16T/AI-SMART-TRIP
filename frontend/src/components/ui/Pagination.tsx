import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}) => {
  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Pagination Navigation"
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-1)",
      }}
    >
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous Page"
        className="btn btn-sm btn-ghost"
        style={{ padding: "0 var(--space-2)" }}
      >
        <ChevronLeft size={16} />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
        const isCurrent = page === currentPage;
        return (
          <button
            key={page}
            type="button"
            aria-current={isCurrent ? "page" : undefined}
            onClick={() => onPageChange(page)}
            className={`btn btn-sm ${isCurrent ? "btn-primary" : "btn-ghost"}`}
            style={{ minWidth: "2rem", padding: "0 0.5rem" }}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next Page"
        className="btn btn-sm btn-ghost"
        style={{ padding: "0 var(--space-2)" }}
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
};
