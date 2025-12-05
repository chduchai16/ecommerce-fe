'use client'

import { useAuth } from "@/contexts/auth-context";
import { PropsWithChildren } from "react";
import { LoginPrompt } from "@/components/shared/ui";

export default function AuthGuard({ children }: PropsWithChildren) {
  const { isAuthenticated, isLoading } = useAuth();

  // Đợi load xong mới kiểm tra authentication
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <div>Đang tải...</div>
      </div>
    );
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
