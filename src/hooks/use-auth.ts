import { useState, useEffect, useCallback } from "react";
import { getCurrentUser, setCurrentUser, clearCurrentUser } from "@/store/craftora-store";
import type { User, UserRole } from "@/types/craftora";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = getCurrentUser();
    if (stored) {
      setUser(stored);
    }
    setIsLoading(false);
  }, []);

  const signInAsRole = useCallback((role: UserRole, name?: string) => {
    const u: User = {
      id: "user-" + Date.now().toString(36),
      name: name || (role === "artisan" ? "Ramesh Kumar" : "Priya Mehta"),
      email:
        role === "artisan"
          ? "ramesh@craftora.com"
          : "priya@craftora.com",
      role,
      location: role === "artisan" ? "Rajasthan, India" : "Mumbai, India",
      phone: "+91 98765 43210",
      bio:
        role === "artisan"
          ? "Master artisan with 15+ years of experience in traditional Indian handicrafts."
          : "Art enthusiast and supporter of rural artisans.",
      joinDate: new Date().toISOString(),
      verified: true,
    };
    setCurrentUser(u);
    setUser(u);
    return u;
  }, []);

  const signOut = useCallback(() => {
    clearCurrentUser();
    setUser(null);
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    signInAsRole,
    signOut,
  };
}
