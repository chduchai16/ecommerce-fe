export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="Customer-layout">
      <nav>Customer Menu</nav>
      <main>{children}</main>
    </div>
  )
}
