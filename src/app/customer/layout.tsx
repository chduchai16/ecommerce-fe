import CustomerHeader from '@/components/customer/CustomerHeader'
import CustomerFooter from '@/components/customer/CustomerFooter'

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="customer-layout">
      <CustomerHeader />
      <main>{children}</main>
      <CustomerFooter />
    </div>
  )
}
