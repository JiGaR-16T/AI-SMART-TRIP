import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Compass, Menu, X, ArrowRight, Github, ExternalLink, Cpu } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Button } from "@/components/ui/Button";
import { TrustBadge } from "@/components/ui/TrustBadge";

export const PublicLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Destinations", href: "/destinations" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "DSA Lab", href: "/dsa-lab" },
    { label: "Design System", href: "/design-system" },
    { label: "System Health", href: "/status" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Skip to Content for a11y */}
      <a href="#main-content" className="skip-to-content">
        Skip to content
      </a>

      {/* Global Navbar */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: "var(--z-sticky)",
          backgroundColor: "var(--color-bg-glass)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "4.25rem",
          }}
        >
          {/* Brand Logo */}
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "var(--space-2-5, 0.625rem)",
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: "2.35rem",
                height: "2.35rem",
                borderRadius: "var(--radius-lg)",
                backgroundColor: "var(--color-primary-600)",
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 2px 8px rgba(79, 70, 229, 0.35)",
              }}
            >
              <Compass size={22} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "var(--text-lg)",
                  fontWeight: "var(--weight-extrabold)",
                  fontFamily: "var(--font-display)",
                  letterSpacing: "var(--tracking-tight)",
                  color: "var(--color-text)",
                  lineHeight: 1.1,
                }}
              >
                TravelMind
              </span>
              <span
                style={{
                  fontSize: "0.65rem",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  color: "var(--color-primary-600)",
                  letterSpacing: "0.05em",
                }}
              >
                AI + DSA ENGINE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            style={{ display: "none", alignItems: "center", gap: "var(--space-1)" }}
            className="desktop-nav"
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  style={{
                    padding: "var(--space-2) var(--space-3)",
                    fontSize: "var(--text-sm)",
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? "var(--color-primary-600)" : "var(--color-text-secondary)",
                    borderRadius: "var(--radius-md)",
                    textDecoration: "none",
                    transition: "color var(--duration-fast)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = "var(--color-text)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = "var(--color-text-secondary)";
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons & CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
            <ThemeToggle />

            <Link to="/app/dashboard" style={{ textDecoration: "none" }} className="desktop-cta">
              <Button variant="primary" size="sm" rightIcon={<ArrowRight size={14} />}>
                Launch App
              </Button>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn btn-sm btn-ghost mobile-menu-btn"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
              style={{ display: "none" }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            style={{
              padding: "var(--space-4) var(--space-6)",
              backgroundColor: "var(--color-surface)",
              borderBottom: "1px solid var(--color-border)",
              display: "flex",
              flexDirection: "column",
              gap: "var(--space-2)",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  padding: "var(--space-2) 0",
                  fontSize: "var(--text-base)",
                  fontWeight: location.pathname === link.href ? 700 : 500,
                  color: location.pathname === link.href ? "var(--color-primary-600)" : "var(--color-text)",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </Link>
            ))}
            <div style={{ marginTop: "var(--space-2)", paddingTop: "var(--space-3)", borderTop: "1px solid var(--color-border)" }}>
              <Link to="/app/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" size="md" style={{ width: "100%" }}>
                  Launch App
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main id="main-content" style={{ flex: 1 }}>
        <Outlet />
      </main>

      {/* Global Footer */}
      <footer
        style={{
          backgroundColor: "var(--color-bg-subtle)",
          borderTop: "1px solid var(--color-border)",
          paddingTop: "var(--space-16)",
          paddingBottom: "var(--space-10)",
          marginTop: "auto",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "var(--space-8)",
              marginBottom: "var(--space-12)",
            }}
          >
            {/* Col 1: Brand & Philosophy */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)", marginBottom: "var(--space-3)" }}>
                <div
                  style={{
                    width: "1.75rem",
                    height: "1.75rem",
                    borderRadius: "var(--radius-md)",
                    backgroundColor: "var(--color-primary-600)",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Compass size={16} />
                </div>
                <span style={{ fontSize: "var(--text-base)", fontWeight: 800, fontFamily: "var(--font-display)" }}>
                  TravelMind
                </span>
              </div>
              <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", lineHeight: 1.6, marginBottom: "var(--space-4)" }}>
                An intelligent India-first multi-objective travel planning system. Real data structures & algorithms perform the computing; AI powers language understanding.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
                <TrustBadge level="LIVE" />
                <TrustBadge level="DEMO" />
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div>
              <h4 style={{ fontSize: "var(--text-sm)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "var(--space-4)", color: "var(--color-text)" }}>
                Platform
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "var(--space-2-5, 0.625rem)", fontSize: "var(--text-sm)" }}>
                <li><Link to="/destinations" style={{ color: "var(--color-text-secondary)" }}>Destinations</Link></li>
                <li><Link to="/how-it-works" style={{ color: "var(--color-text-secondary)" }}>How It Works</Link></li>
                <li><Link to="/dsa-lab" style={{ color: "var(--color-text-secondary)" }}>Interactive DSA Lab</Link></li>
                <li><Link to="/design-system" style={{ color: "var(--color-text-secondary)" }}>Design System Catalog</Link></li>
                <li><Link to="/status" style={{ color: "var(--color-text-secondary)" }}>System Health & Readiness</Link></li>
              </ul>
            </div>

            {/* Col 3: Real DSA Engines */}
            <div>
              <h4 style={{ fontSize: "var(--text-sm)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "var(--space-4)", color: "var(--color-text)" }}>
                Algorithms & Engines
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "var(--space-2-5, 0.625rem)", fontSize: "var(--text-sm)", color: "var(--color-text-secondary)" }}>
                <li style={{ display: "flex", alignItems: "center", gap: "6px" }}><Cpu size={14} color="var(--color-primary-600)" /> Trie Autocomplete Engine</li>
                <li style={{ display: "flex", alignItems: "center", gap: "6px" }}><Cpu size={14} color="var(--color-primary-600)" /> Dijkstra / A* Routing Graph</li>
                <li style={{ display: "flex", alignItems: "center", gap: "6px" }}><Cpu size={14} color="var(--color-primary-600)" /> 0/1 Knapsack Budget DP</li>
                <li style={{ display: "flex", alignItems: "center", gap: "6px" }}><Cpu size={14} color="var(--color-primary-600)" /> Pareto Multi-Objective Frontier</li>
                <li style={{ display: "flex", alignItems: "center", gap: "6px" }}><Cpu size={14} color="var(--color-primary-600)" /> Backtracking Itinerary Scheduler</li>
              </ul>
            </div>

            {/* Col 4: Trust & Engineering */}
            <div>
              <h4 style={{ fontSize: "var(--text-sm)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "var(--space-4)", color: "var(--color-text)" }}>
                Engineering Standards
              </h4>
              <p style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)", lineHeight: 1.6, marginBottom: "var(--space-3)" }}>
                Built in adherence to the TravelMind Constitution: 100% deterministic cost calculation, zero hallucinated prices, and four-tier trust transparency.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}
                >
                  <Github size={14} /> GitHub Repository <ExternalLink size={11} />
                </a>
              </div>
            </div>
          </div>

          <div
            style={{
              paddingTop: "var(--space-6)",
              borderTop: "1px solid var(--color-border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "var(--space-3)",
              fontSize: "var(--text-xs)",
              color: "var(--color-text-muted)",
            }}
          >
            <div>
              © {new Date().getFullYear()} TravelMind System. All rights reserved. Academic Major Project.
            </div>
            <div>
              Engineered with React + TypeScript + Django + Pure DSA Python Engine.
            </div>
          </div>
        </div>
      </footer>

      {/* Responsive media query styling */}
      <style>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
          .desktop-cta {
            display: inline-flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
        @media (max-width: 767px) {
          .desktop-nav {
            display: none !important;
          }
          .desktop-cta {
            display: none !important;
          }
          .mobile-menu-btn {
            display: inline-flex !important;
          }
        }
      `}</style>
    </div>
  );
};
