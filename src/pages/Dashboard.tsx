import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/use-auth";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === "artisan") {
        navigate("/artisan/dashboard", { replace: true });
      } else {
        navigate("/marketplace", { replace: true });
      }
    } else {
      navigate("/role", { replace: true });
    }
  }, [user, isAuthenticated, navigate]);

  return null;
}
