import { useAuth } from "@/contexts/auth-context";
import { PropsWithChildren } from "react";
import { LoginPrompt } from "@/components/shared/ui";

export default function AuthGuard({ children }: PropsWithChildren) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div>
        <LoginPrompt></LoginPrompt>
      </div>
    )
  }
  return <>{children}</>;
}
