"use client"

import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect, useState } from "react";
import { AccessDenied } from "@/components";

type RoleGuardProps = PropsWithChildren<{
  roles?: string[];
}>;

export default function RoleGuard({ children, roles }: RoleGuardProps) {
  const router = useRouter();
  const { user } = useAuth();
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    // If user is not logged in, send to login
    if (!user) {
      router.push("/auth/sign-in");
      return;
    }
    // If user is logged in but doesn't have required role, do not redirect here.
    // We render the AccessDenied UI from this component instead so the route stays at the same URL.
    if (roles?.length && !roles.includes(user.role_name)) {
      // instead of redirecting to /403, render the AccessDenied component inline
      setUnauthorized(true);
    } else {
      setUnauthorized(false);
    }
  }, [user, roles, router]);

  // While user is loading, render nothing
  if (!user) return null;

  // If user is authenticated but lacks the required role, show AccessDenied UI
  if (roles?.length && unauthorized) return <AccessDenied />;

  return <>{children}</>;
}
