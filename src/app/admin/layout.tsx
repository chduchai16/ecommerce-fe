import AuthGuard from "@/configs/auth-guard"
import RoleGuard from "@/configs/role-guard"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthGuard>
      <RoleGuard roles={['admin']}>
        <div className="admin-layout">
          <main>{children}</main>
        </div>
      </RoleGuard>
    </AuthGuard>
  )
}
