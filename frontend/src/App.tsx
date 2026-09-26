import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PublicLayout } from "@/layouts/PublicLayout";
import { AppLayout } from "@/layouts/AppLayout";
import { AdminLayout } from "@/layouts/AdminLayout";
import { AuthGuard } from "@/components/common/AuthGuard";
import { Toaster } from "@/components/ui/Toaster";
import { Spinner } from "@/components/ui/Spinner";

// Lazy-loaded pages for route-level code splitting
const LandingPage = lazy(() => import("@/pages/LandingPage"));
const DestinationsPage = lazy(() => import("@/pages/DestinationsPage"));
const HowItWorksPage = lazy(() => import("@/pages/HowItWorksPage"));
const DsaLabPage = lazy(() => import("@/pages/DsaLabPage"));
const DesignSystemPage = lazy(() => import("@/pages/DesignSystemPage"));
const StatusPage = lazy(() => import("@/pages/StatusPage"));

const DashboardPage = lazy(() => import("@/pages/DashboardPage"));
const TripsPage = lazy(() => import("@/pages/TripsPage"));
const ProfilePage = lazy(() => import("@/pages/ProfilePage"));
const AdminPage = lazy(() => import("@/pages/AdminPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

const LoadingFallback: React.FC = () => (
  <div
    style={{
      minHeight: "60vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "var(--space-3)",
    }}
  >
    <Spinner size="lg" />
    <span style={{ fontSize: "var(--text-xs)", color: "var(--color-text-secondary)" }}>
      Loading route...
    </span>
  </div>
);

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      {/* Global Toaster for notifications */}
      <Toaster />

      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/destinations" element={<DestinationsPage />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/dsa-lab" element={<DsaLabPage />} />
            <Route path="/design-system" element={<DesignSystemPage />} />
            <Route path="/status" element={<StatusPage />} />
          </Route>

          {/* App / Dashboard Routes */}
          <Route
            path="/app"
            element={
              <AuthGuard>
                <AppLayout />
              </AuthGuard>
            }
          >
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="trips" element={<TripsPage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminPage />} />
          </Route>

          {/* Catch-all 404 Route */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
