import React, { useState } from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Pagination } from "./Pagination";

export interface Column<T> {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (row: T, index: number) => React.ReactNode;
  width?: string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  pageSize?: number;
  emptyMessage?: string;
  keyExtractor: (row: T, index: number) => string | number;
  className?: string;
}

export function DataTable<T extends object>({
  columns,
  data,
  pageSize = 5,
  emptyMessage = "No records found.",
  keyExtractor,
  className = "",
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortOrder === "asc") {
        setSortOrder("desc");
      } else {
        setSortKey(null);
        setSortOrder("asc");
      }
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const sortedData = React.useMemo(() => {
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const valA = String((a as Record<string, unknown>)[sortKey] ?? "");
      const valB = String((b as Record<string, unknown>)[sortKey] ?? "");
      if (valA === valB) return 0;
      if (sortOrder === "asc") {
        return valA < valB ? -1 : 1;
      } else {
        return valA > valB ? -1 : 1;
      }
    });
  }, [data, sortKey, sortOrder]);

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div
      className={className}
      style={{
        width: "100%",
        overflowX: "auto",
        backgroundColor: "var(--color-surface)",
        borderRadius: "var(--radius-xl)",
        border: "1px solid var(--color-border)",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          textAlign: "left",
          fontSize: "var(--text-sm)",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "var(--color-bg-subtle)",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            {columns.map((col) => (
              <th
                key={col.key}
                style={{
                  padding: "var(--space-3) var(--space-4)",
                  fontWeight: "var(--weight-semibold)",
                  color: "var(--color-text-secondary)",
                  width: col.width,
                  cursor: col.sortable ? "pointer" : "default",
                  userSelect: "none",
                }}
                onClick={() => col.sortable && handleSort(col.key)}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "var(--space-1-5)" }}>
                  <span>{col.header}</span>
                  {col.sortable && (
                    <span style={{ color: "var(--color-text-muted)" }}>
                      {sortKey === col.key ? (
                        sortOrder === "asc" ? <ArrowUp size={13} /> : <ArrowDown size={13} />
                      ) : (
                        <ArrowUpDown size={13} />
                      )}
                    </span>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                style={{
                  padding: "var(--space-8)",
                  textAlign: "center",
                  color: "var(--color-text-secondary)",
                }}
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            paginatedData.map((row, idx) => (
              <tr
                key={keyExtractor(row, idx)}
                style={{
                  borderBottom: "1px solid var(--color-border)",
                  transition: "background-color var(--duration-fast)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--color-surface-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    style={{
                      padding: "var(--space-3-5, 0.875rem) var(--space-4)",
                      color: "var(--color-text)",
                    }}
                  >
                    {col.render ? col.render(row, idx) : ((row as Record<string, unknown>)[col.key] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div style={{ padding: "var(--space-3) var(--space-4)", borderTop: "1px solid var(--color-border)" }}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
