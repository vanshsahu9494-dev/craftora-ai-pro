import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

interface AuthProps {
  redirectAfterAuth?: string;
}

export default function AuthPage({ redirectAfterAuth = "/artisan/dashboard" }: AuthProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const returnTo = searchParams.get("returnTo") || redirectAfterAuth;
    navigate(`/role?returnTo=${encodeURIComponent(returnTo)}`, { replace: true });
  }, [navigate, searchParams, redirectAfterAuth]);

  return null;
}
