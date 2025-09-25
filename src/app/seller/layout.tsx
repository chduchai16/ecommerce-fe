import AuthGuard from "@/configs/auth-guard"
import RoleGuard from "@/configs/role-guard"

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <RoleGuard roles={['seller']}>
        <div className="seller-layout">
          <main>{children}</main>
        </div>
      </RoleGuard>
    </AuthGuard>
  )
}
