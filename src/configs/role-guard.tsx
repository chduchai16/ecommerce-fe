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
    if (!user) {
      router.push("/auth/sign-in");
      return;
    }
    if (roles?.length && !roles.includes(user.role_name)) {
      setUnauthorized(true);
    } else {
      setUnauthorized(false);
    }
  }, [user, roles, router]);

  if (!user) return null;
  if (roles?.length && unauthorized) return <AccessDenied />;

  return <>{children}</>;
}
