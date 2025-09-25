import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import { PropsWithChildren } from "react";
import { LoginPrompt } from "@/components/shared/ui";

export default function AuthGuard({ children }: PropsWithChildren) {
  const { isAuthenticated } = useUser();
  const router = useRouter();

  const redirectToSignIn = () => {
    router.push('/auth/sign-in');
  }

  if (!isAuthenticated) {
    return (
      <div>
        <LoginPrompt></LoginPrompt>
      </div>
    )
  }
  return <>{children}</>;
}
