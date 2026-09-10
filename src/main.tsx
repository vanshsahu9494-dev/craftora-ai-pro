import { Toaster } from "@/components/ui/sonner";
import { RequireAuth } from "@/components/RequireAuth";
import React, { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";

// Lazy load route components
const Landing = lazy(() => import("./pages/Landing.tsx"));
const RoleSelection = lazy(() => import("./pages/RoleSelection.tsx"));
const ArtisanDashboard = lazy(() => import("./pages/ArtisanDashboard.tsx"));
const AICataloging = lazy(() => import("./pages/AICataloging.tsx"));
const ArtisanProducts = lazy(() => import("./pages/ArtisanProducts.tsx"));
const ArtisanOrders = lazy(() => import("./pages/ArtisanOrders.tsx"));
const ArtisanProfile = lazy(() => import("./pages/ArtisanProfile.tsx"));
const Marketplace = lazy(() => import("./pages/Marketplace.tsx"));
const ProductDetails = lazy(() => import("./pages/ProductDetails.tsx"));
const BuyerOrders = lazy(() => import("./pages/BuyerOrders.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

function RouteLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDF8F0]">
      <div className="animate-pulse text-[#6B5E50]">Loading...</div>
    </div>
  );
}

/** Silent error boundary — if VlyToolbar crashes it renders nothing */
class ToolbarErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err: Error) {
    console.warn("[VlyToolbar] Caught error, toolbar disabled:", err.message);
  }
  render() {
    return this.state.hasError ? null : this.props.children;
  }
}

/** Hard guard so runtime errors never leave the preview as a blank page. */
class RootErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; message: string; stack: string }
> {
  state = { hasError: false, message: "", stack: "" };
  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      message: error.message || "Unknown runtime error",
      stack: error.stack || "",
    };
  }
  componentDidCatch(err: Error) {
    console.error("[WebContainer preview] Root crash:", err);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDF8F0] text-[#2D1B0E] p-6">
          <div className="max-w-lg text-center">
            <p className="text-sm font-semibold">Preview runtime error</p>
            <p className="mt-2 text-xs text-[#6B5E50] break-words">
              {this.state.message}
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function RouteSyncer() {
  React.useEffect(() => {
    window.parent.postMessage(
      { type: "iframe-route-change", path: window.location.pathname },
      "*",
    );
  }, []);

  React.useEffect(() => {
    function handleMessage(event: MessageEvent) {
      if (event.data?.type === "navigate") {
        if (event.data.direction === "back") window.history.back();
        if (event.data.direction === "forward") window.history.forward();
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return null;
}

// VlyToolbar is injected by the platform build; not available in prod
let VlyToolbar: React.ComponentType = () => null;
try {
  const mod = await import(/* @vite-ignore */ "../vly-toolbar-readonly.tsx").catch(() => null);
  if (mod) VlyToolbar = mod.VlyToolbar;
} catch {
  // Ignore - toolbar not available
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootErrorBoundary>
      <ToolbarErrorBoundary>
        <VlyToolbar />
      </ToolbarErrorBoundary>
      <BrowserRouter>
        <RouteSyncer />
        <Suspense fallback={<RouteLoading />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/role" element={<RoleSelection />} />

            {/* Artisan Routes */}
            <Route
              path="/artisan/dashboard"
              element={
                <RequireAuth>
                  <ArtisanDashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/artisan/cataloging"
              element={
                <RequireAuth>
                  <AICataloging />
                </RequireAuth>
              }
            />
            <Route
              path="/artisan/products"
              element={
                <RequireAuth>
                  <ArtisanProducts />
                </RequireAuth>
              }
            />
            <Route
              path="/artisan/orders"
              element={
                <RequireAuth>
                  <ArtisanOrders />
                </RequireAuth>
              }
            />
            <Route
              path="/artisan/profile"
              element={
                <RequireAuth>
                  <ArtisanProfile />
                </RequireAuth>
              }
            />

            {/* Buyer Routes */}
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/marketplace/:id" element={<ProductDetails />} />
            <Route path="/buyer/orders" element={<BuyerOrders />} />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster />
    </RootErrorBoundary>
  </StrictMode>,
);
