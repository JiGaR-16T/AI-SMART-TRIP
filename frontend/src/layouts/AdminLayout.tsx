import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Shield, Activity, Database, Cpu, ArrowLeft } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";

export const AdminLayout: React.FC = () => {
  const location = useLocation();

  const adminLinks = [
    { label: "Overview", href: "/admin", icon: <Shield size={16} /> },
    { label: "System Health", href: "/status", icon: <Activity size={16} /> },
    { label: "DSA Performance", href: "/dsa-lab", icon: <Cpu size={16} /> },
    { label: "Cache & Metrics", href: "/admin/cache", icon: <Database size={16} /> },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--color-bg)" }}>
      {/* Admin Sidebar */}
      <aside
        style={{
          width: "15rem",
          backgroundColor: "var(--color-surface)",
          borderRight: "1px solid var(--color-border)",
          padding: "var(--space-4)",
          display: "flex",
          flexDirection: "column",
          gap: "var(--space-4)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", padding: "0 var(--space-2)" }}>
          <div
            style={{
              padding: "var(--space-1-5)",
              backgroundColor: "var(--color-danger-100)",
              color: "var(--color-danger-700)",
              borderRadius: "var(--radius-md)",
            }}
          >
            <Shield size={18} />
          </div>
          <span style={{ fontSize: "var(--text-sm)", fontWeight: 800, fontFamily: "var(--font-display)" }}>
            TravelMind Admin
          </span>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
          {adminLinks.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-2-5, 0.625rem)",
                  padding: "var(--space-2-5, 0.625rem) var(--space-3)",
                  borderRadius: "var(--radius-md)",
                  fontSize: "var(--text-xs)",
                  fontWeight: isActive ? 700 : 500,
                  backgroundColor: isActive ? "var(--color-primary-50)" : "transparent",
                  color: isActive ? "var(--color-primary-700)" : "var(--color-text-secondary)",
                  textDecoration: "none",
                }}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div style={{ marginTop: "auto", borderTop: "1px solid var(--color-border)", paddingTop: "var(--space-3)" }}>
          <Link
            to="/app/dashboard"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-2)",
              fontSize: "var(--text-xs)",
              color: "var(--color-text-secondary)",
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={14} /> Back to User App
          </Link>
        </div>
      </aside>

      {/* Admin Content Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <header
          style={{
            height: "4rem",
            backgroundColor: "var(--color-surface)",
            borderBottom: "1px solid var(--color-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 var(--space-6)",
          }}
        >
          <Breadcrumbs
            items={[
              { label: "Admin Console", href: "/admin" },
              { label: location.pathname.replace("/admin", "").replace("/", "") || "Overview", isCurrent: true },
            ]}
          />
          <ThemeToggle />
        </header>

        <main style={{ padding: "var(--space-6)", flex: 1 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
