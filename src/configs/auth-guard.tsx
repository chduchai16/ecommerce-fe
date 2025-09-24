import { useUser } from "@/contexts/UserContext";
import { PropsWithChildren } from "react";

export default function AuthGuard({ children }: PropsWithChildren) {
  const { isAuthenticated } = useUser();
  if (!isAuthenticated) return null;
  return <>{children}</>;
}
