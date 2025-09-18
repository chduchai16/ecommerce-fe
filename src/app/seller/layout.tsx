export default function SellerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="seller-layout">
      <nav>Seller Menu</nav>
      <main>{children}</main>
    </div>
  )
}
