import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";

type RoleGuardProps = PropsWithChildren<{
  roles?: string[];
}>;

export default function RoleGuard({ children, roles }: RoleGuardProps) {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    if (roles?.length && !roles.includes(user.role_name)) {
      router.push("/403");
    }
  }, [user, roles, router]);

  if (!user) return null;
  
  if (roles?.length && !roles.includes(user.role_name)) return null;

  return <>{children}</>;
}
