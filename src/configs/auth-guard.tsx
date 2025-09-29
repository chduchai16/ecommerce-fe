import { useUser } from "@/contexts/UserContext";
import { PropsWithChildren } from "react";
import { LoginPrompt } from "@/components/shared/ui";

export default function AuthGuard({ children }: PropsWithChildren) {
  const { isAuthenticated } = useUser();

  if (!isAuthenticated) {
    return (
      <div>
        <LoginPrompt></LoginPrompt>
      </div>
    )
  }
  return <>{children}</>;
}
