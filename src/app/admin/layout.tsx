export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="admin-layout">
      <nav>Admin Menu</nav>
      <main>{children}</main>
    </div>
  )
}
