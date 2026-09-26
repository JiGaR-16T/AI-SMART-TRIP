import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Compass, Home, ArrowLeft } from "lucide-react";

export const NotFoundPage: React.FC = () => {
  return (
    <div
      style={{
        minHeight: "75vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "var(--space-8)",
      }}
    >
      <div
        style={{
          width: "5rem",
          height: "5rem",
          borderRadius: "var(--radius-2xl)",
          backgroundColor: "var(--color-primary-50)",
          color: "var(--color-primary-600)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "var(--space-6)",
        }}
      >
        <Compass size={44} />
      </div>

      <h1
        style={{
          fontSize: "clamp(3rem, 8vw, 5rem)",
          fontWeight: 900,
          fontFamily: "var(--font-mono)",
          color: "var(--color-primary-600)",
          lineHeight: 1,
          marginBottom: "var(--space-2)",
        }}
      >
        404
      </h1>

      <h2
        style={{
          fontSize: "var(--text-2xl)",
          fontWeight: 800,
          color: "var(--color-text)",
          marginBottom: "var(--space-3)",
        }}
      >
        Waypoint Not Found
      </h2>

      <p
        style={{
          fontSize: "var(--text-base)",
          color: "var(--color-text-secondary)",
          maxWidth: "460px",
          marginBottom: "var(--space-8)",
          lineHeight: 1.6,
        }}
      >
        The transit node or route you are attempting to reach does not exist in the graph. Let&apos;s reroute you back to the main trail.
      </p>

      <div style={{ display: "flex", gap: "var(--space-4)" }}>
        <Link to="/">
          <Button variant="primary" size="md" leftIcon={<Home size={16} />}>
            Return Home
          </Button>
        </Link>
        <Link to="/app/dashboard">
          <Button variant="outline" size="md" leftIcon={<ArrowLeft size={16} />}>
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
