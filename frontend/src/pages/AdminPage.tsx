import React from "react";
import { StatCard } from "@/components/ui/StatCard";
import { TrustBadge } from "@/components/ui/TrustBadge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Shield, Activity, Database, Server, RefreshCw } from "lucide-react";
import { toast } from "@/store/toastStore";

export const AdminPage: React.FC = () => {
  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "var(--space-6)" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--space-2)" }}>
            <h1 style={{ fontSize: "var(--text-2xl)", fontWeight: 800 }}>Admin Console</h1>
            <TrustBadge level="DEMO" />
          </div>
          <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", marginTop: "2px" }}>
            Operational cluster status, cache eviction metrics, and Celery worker health.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          leftIcon={<RefreshCw size={14} />}
          onClick={() => toast.success("Cache Cleared", "Redis cache prefix travelmind: flushed.")}
        >
          Flush Algorithmic Cache
        </Button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "var(--space-4)", marginBottom: "var(--space-8)" }}>
        <StatCard title="API Requests (24h)" value="1,492" subtitle="99.98% 2xx responses" icon={<Activity size={18} />} trustLevel="DEMO" />
        <StatCard title="Redis Cache Hit Ratio" value="94.6%" subtitle="Key prefix travelmind:" icon={<Database size={18} />} trustLevel="DEMO" />
        <StatCard title="Celery Queue Depth" value="0 tasks" subtitle="Workers idle and ready" icon={<Server size={18} />} trustLevel="DEMO" />
        <StatCard title="Active Algorithms" value="10/10" subtitle="Pure Python DSA verified" icon={<Shield size={18} />} trustLevel="DEMO" />
      </div>

      <Card className="surface-card">
        <CardHeader>
          <CardTitle>System Architecture Status</CardTitle>
        </CardHeader>
        <CardContent>
          <p style={{ fontSize: "var(--text-sm)", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
            Django 5.x REST backend running alongside PostgreSQL 16 and Redis 7. All Celery periodic heartbeat ping tasks running nominally.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPage;
