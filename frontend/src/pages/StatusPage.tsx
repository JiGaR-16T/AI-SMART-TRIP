import React, { useEffect, useState } from "react";
import { apiClient, ApiError } from "@/services/apiClient";

export interface ComponentStatus {
  status: "healthy" | "unhealthy" | "degraded";
  latency_ms: number;
  engine?: string;
  message?: string;
}

export interface ReadinessData {
  status: "healthy" | "unhealthy" | "degraded";
  version: string;
  environment: string;
  timestamp: string;
  components: Record<string, ComponentStatus>;
}

export const StatusPage: React.FC = () => {
  const [data, setData] = useState<ReadinessData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const fetchStatus = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiClient.get<ReadinessData>("health/ready/");
      setData(result);
      setLastChecked(new Date());
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        setError(`${err.code}: ${err.message}`);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred while fetching system health.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <div className="status-container" style={styles.container}>
      <header style={styles.header}>
        <div style={styles.headerTitleRow}>
          <h1 style={styles.title}>System Health & Readiness</h1>
          <button
            onClick={fetchStatus}
            disabled={loading}
            style={styles.refreshButton}
            data-testid="refresh-btn"
          >
            {loading ? "Checking..." : "Refresh Status"}
          </button>
        </div>
        <p style={styles.subtitle}>
          TravelMind Infrastructure, Database, Cache, and Task Queue Telemetry.
        </p>
      </header>

      {loading && !data && (
        <div style={styles.card} data-testid="status-loading">
          <p style={styles.infoText}>Connecting to system health services...</p>
        </div>
      )}

      {error && (
        <div style={{ ...styles.card, ...styles.errorCard }} data-testid="status-error">
          <h3 style={styles.errorTitle}>Health Check Failed</h3>
          <p style={styles.errorText}>{error}</p>
          <button onClick={fetchStatus} style={styles.retryButton}>
            Try Again
          </button>
        </div>
      )}

      {data && (
        <div data-testid="status-success">
          {/* Overall System Banner */}
          <div
            style={{
              ...styles.card,
              borderLeft: `6px solid ${
                data.status === "healthy" ? "#10b981" : "#ef4444"
              }`,
            }}
          >
            <div style={styles.metaRow}>
              <div>
                <span style={styles.metaLabel}>Overall Status:</span>
                <span
                  style={{
                    ...styles.statusBadge,
                    backgroundColor:
                      data.status === "healthy" ? "#d1fae5" : "#fee2e2",
                    color: data.status === "healthy" ? "#065f46" : "#991b1b",
                  }}
                  data-testid="overall-status"
                >
                  {data.status.toUpperCase()}
                </span>
              </div>
              <div>
                <span style={styles.metaLabel}>Environment:</span>
                <strong style={styles.metaValue}>{data.environment}</strong>
              </div>
              <div>
                <span style={styles.metaLabel}>Version:</span>
                <strong style={styles.metaValue}>v{data.version}</strong>
              </div>
              <div>
                <span style={styles.metaLabel}>Last Checked:</span>
                <strong style={styles.metaValue}>
                  {lastChecked ? lastChecked.toLocaleTimeString() : "-"}
                </strong>
              </div>
            </div>
          </div>

          {/* Component Grid */}
          <h2 style={styles.sectionHeading}>Core Components</h2>
          <div style={styles.grid}>
            {Object.entries(data.components).map(([name, comp]) => {
              const isHealthy = comp.status === "healthy";
              return (
                <div
                  key={name}
                  style={styles.componentCard}
                  data-testid={`component-${name}`}
                >
                  <div style={styles.componentHeader}>
                    <span style={styles.componentName}>
                      {name.charAt(0).toUpperCase() + name.slice(1)}
                    </span>
                    <span
                      style={{
                        ...styles.statusDot,
                        backgroundColor: isHealthy ? "#10b981" : "#ef4444",
                      }}
                    />
                  </div>

                  <div style={styles.componentBody}>
                    <div style={styles.statRow}>
                      <span style={styles.statLabel}>Status:</span>
                      <span
                        style={{
                          fontWeight: 600,
                          color: isHealthy ? "#059669" : "#dc2626",
                        }}
                      >
                        {comp.status}
                      </span>
                    </div>

                    <div style={styles.statRow}>
                      <span style={styles.statLabel}>Latency:</span>
                      <span style={styles.statValue}>{comp.latency_ms} ms</span>
                    </div>

                    {comp.engine && (
                      <div style={styles.statRow}>
                        <span style={styles.statLabel}>Engine:</span>
                        <span style={styles.statValue}>{comp.engine}</span>
                      </div>
                    )}

                    {comp.message && (
                      <div style={styles.statRow}>
                        <span style={styles.statLabel}>Detail:</span>
                        <span style={styles.errorDetail}>{comp.message}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: "960px",
    margin: "0 auto",
    padding: "2rem 1.5rem",
    fontFamily:
      "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    color: "#0f172a",
  },
  header: {
    marginBottom: "2rem",
  },
  headerTitleRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: "1.875rem",
    fontWeight: "700",
    letterSpacing: "-0.025em",
    margin: 0,
  },
  subtitle: {
    fontSize: "1rem",
    color: "#64748b",
    marginTop: "0.5rem",
  },
  refreshButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#2563eb",
    color: "#ffffff",
    border: "none",
    borderRadius: "0.375rem",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "0.875rem",
  },
  retryButton: {
    marginTop: "0.75rem",
    padding: "0.4rem 0.8rem",
    backgroundColor: "#ef4444",
    color: "#ffffff",
    border: "none",
    borderRadius: "0.375rem",
    fontWeight: "600",
    cursor: "pointer",
  },
  card: {
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "0.5rem",
    padding: "1.25rem",
    marginBottom: "1.5rem",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  errorCard: {
    backgroundColor: "#fef2f2",
    borderColor: "#fecaca",
  },
  errorTitle: {
    color: "#991b1b",
    margin: "0 0 0.5rem 0",
    fontSize: "1.1rem",
  },
  errorText: {
    color: "#b91c1c",
    margin: 0,
    fontSize: "0.95rem",
  },
  metaRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1.5rem",
    alignItems: "center",
  },
  metaLabel: {
    color: "#64748b",
    marginRight: "0.5rem",
    fontSize: "0.875rem",
  },
  metaValue: {
    fontSize: "0.875rem",
    color: "#1e293b",
  },
  statusBadge: {
    padding: "0.25rem 0.6rem",
    borderRadius: "9999px",
    fontWeight: 700,
    fontSize: "0.75rem",
    letterSpacing: "0.05em",
  },
  sectionHeading: {
    fontSize: "1.25rem",
    fontWeight: 600,
    marginBottom: "1rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "1.25rem",
  },
  componentCard: {
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "0.5rem",
    padding: "1.25rem",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  },
  componentHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
    borderBottom: "1px solid #f1f5f9",
    paddingBottom: "0.5rem",
  },
  componentName: {
    fontWeight: "700",
    fontSize: "1.1rem",
    color: "#1e293b",
  },
  statusDot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    display: "inline-block",
  },
  componentBody: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    fontSize: "0.875rem",
  },
  statRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statLabel: {
    color: "#64748b",
  },
  statValue: {
    fontWeight: 600,
    color: "#334155",
  },
  errorDetail: {
    color: "#dc2626",
    fontSize: "0.8rem",
  },
  infoText: {
    color: "#64748b",
    margin: 0,
  },
};

export default StatusPage;
