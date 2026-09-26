import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  MapPin,
  User,
  FlaskConical,
  ChevronLeft,
  ChevronRight,
  Compass,
  Bell,
  Search,
  ArrowLeft,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Avatar } from "@/components/ui/Avatar";
import { IconButton } from "@/components/ui/IconButton";
import { toast } from "@/store/toastStore";

export const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const sidebarLinks = [
    { label: "Dashboard", href: "/app/dashboard", icon: <LayoutDashboard size={18} /> },
    { label: "My Trips", href: "/app/trips", icon: <MapPin size={18} /> },
    { label: "DSA Lab", href: "/dsa-lab", icon: <FlaskConical size={18} /> },
    { label: "Profile", href: "/app/profile", icon: <User size={18} /> },
  ];

  const handleNotificationClick = () => {
    toast.info("Notifications", "You have 2 pending algorithmic optimizations to review.");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--color-bg)" }}>
      {/* Desktop Sidebar */}
      <aside
        className="app-sidebar"
        style={{
          width: collapsed ? "4.5rem" : "16rem",
          backgroundColor: "var(--color-surface)",
          borderRight: "1px solid var(--color-border)",
          display: "flex",
          flexDirection: "column",
          transition: "width var(--duration-normal) var(--ease-default)",
          position: "sticky",
          top: 0,
          height: "100vh",
          zIndex: "var(--z-sticky)",
          flexShrink: 0,
        }}
      >
        {/* Sidebar Header */}
        <div
          style={{
            height: "4.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "space-between",
            padding: collapsed ? "0" : "0 var(--space-4)",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-2)",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: "2.25rem",
                height: "2.25rem",
                borderRadius: "var(--radius-lg)",
                backgroundColor: "var(--color-primary-600)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Compass size={20} />
            </div>
            {!collapsed && (
              <span
                style={{
                  fontSize: "var(--text-base)",
                  fontWeight: 800,
                  fontFamily: "var(--font-display)",
                  color: "var(--color-text)",
                }}
              >
                TravelMind
              </span>
            )}
          </Link>

          {!collapsed && (
            <IconButton
              icon={<ChevronLeft size={16} />}
              aria-label="Collapse sidebar"
              size="sm"
              onClick={() => setCollapsed(true)}
            />
          )}
        </div>

        {collapsed && (
          <div style={{ display: "flex", justifyContent: "center", padding: "var(--space-2) 0" }}>
            <IconButton
              icon={<ChevronRight size={16} />}
              aria-label="Expand sidebar"
              size="sm"
              onClick={() => setCollapsed(false)}
            />
          </div>
        )}

        {/* Sidebar Navigation */}
        <nav style={{ flex: 1, padding: "var(--space-3)", display: "flex", flexDirection: "column", gap: "var(--space-1)" }}>
          {sidebarLinks.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                title={collapsed ? item.label : undefined}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "var(--space-3)",
                  padding: collapsed ? "var(--space-3) 0" : "var(--space-3) var(--space-3)",
                  justifyContent: collapsed ? "center" : "flex-start",
                  borderRadius: "var(--radius-lg)",
                  fontSize: "var(--text-sm)",
                  fontWeight: isActive ? 600 : 500,
                  backgroundColor: isActive ? "var(--color-primary-50)" : "transparent",
                  color: isActive ? "var(--color-primary-700)" : "var(--color-text-secondary)",
                  textDecoration: "none",
                  transition: "all var(--duration-fast)",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = "var(--color-surface-hover)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <span style={{ color: isActive ? "var(--color-primary-600)" : "currentColor" }}>
                  {item.icon}
                </span>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Bottom: Back to Website & User Profile */}
        <div style={{ padding: "var(--space-3)", borderTop: "1px solid var(--color-border)" }}>
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-3)",
              padding: collapsed ? "var(--space-2) 0" : "var(--space-2) var(--space-3)",
              justifyContent: collapsed ? "center" : "flex-start",
              fontSize: "var(--text-xs)",
              color: "var(--color-text-secondary)",
              textDecoration: "none",
              borderRadius: "var(--radius-md)",
            }}
          >
            <ArrowLeft size={16} />
            {!collapsed && <span>Back to Website</span>}
          </Link>

          {!collapsed && (
            <div
              style={{
                marginTop: "var(--space-3)",
                padding: "var(--space-3)",
                backgroundColor: "var(--color-bg-subtle)",
                borderRadius: "var(--radius-lg)",
                display: "flex",
                alignItems: "center",
                gap: "var(--space-2-5, 0.625rem)",
              }}
            >
              <Avatar name="Aditya Sharma" size="sm" />
              <div style={{ overflow: "hidden" }}>
                <div style={{ fontSize: "var(--text-xs)", fontWeight: 700, color: "var(--color-text)", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>
                  Aditya Sharma
                </div>
                <div style={{ fontSize: "0.68rem", color: "var(--color-text-secondary)" }}>
                  Traveler (Demo Account)
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Workspace Column */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, paddingBottom: "4.5rem" }} className="app-main-col">
        {/* Top Header */}
        <header
          style={{
            height: "4.25rem",
            backgroundColor: "var(--color-surface)",
            borderBottom: "1px solid var(--color-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 var(--space-6)",
            position: "sticky",
            top: 0,
            zIndex: "var(--z-sticky)",
          }}
        >
          {/* Search bar placeholder shell */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-2)",
              backgroundColor: "var(--color-bg-subtle)",
              padding: "0.45rem 0.85rem",
              borderRadius: "var(--radius-full)",
              border: "1px solid var(--color-border)",
              width: "100%",
              maxWidth: "340px",
            }}
          >
            <Search size={15} color="var(--color-text-muted)" />
            <input
              type="text"
              placeholder="Search trips, routes, or algorithms..."
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                fontSize: "var(--text-xs)",
                color: "var(--color-text)",
                width: "100%",
              }}
            />
          </div>

          {/* Right Header items */}
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
            <IconButton
              icon={<Bell size={18} />}
              aria-label="View notifications"
              size="sm"
              onClick={handleNotificationClick}
            />
            <ThemeToggle />
            <Avatar name="Aditya Sharma" size="sm" />
          </div>
        </header>

        {/* Content Outlet */}
        <main style={{ flex: 1, padding: "var(--space-6)" }}>
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation (Visible on <768px) */}
      <nav
        className="mobile-bottom-nav"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "3.75rem",
          backgroundColor: "var(--color-surface)",
          borderTop: "1px solid var(--color-border)",
          display: "none",
          alignItems: "center",
          justifyContent: "space-around",
          zIndex: "var(--z-fixed, 250)",
        }}
      >
        {sidebarLinks.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2px",
                fontSize: "0.68rem",
                fontWeight: isActive ? 700 : 500,
                color: isActive ? "var(--color-primary-600)" : "var(--color-text-secondary)",
                textDecoration: "none",
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Responsive layout styles */}
      <style>{`
        @media (max-width: 767px) {
          .app-sidebar {
            display: none !important;
          }
          .mobile-bottom-nav {
            display: flex !important;
          }
          .app-main-col {
            padding-bottom: 4rem !important;
          }
        }
      `}</style>
    </div>
  );
};
