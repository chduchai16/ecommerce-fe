import CustomerHeader from '@/components/customer/customer-header'
import CustomerFooter from '@/components/customer/customer-footer'
import styles from './layout.module.scss'

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={styles.customerLayout}>
      <CustomerHeader />
      <main className={styles.mainContent}>
        {children}
      </main>
      <CustomerFooter />
    </div>
  )
}
