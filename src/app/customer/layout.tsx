import CustomerHeader from '@/components/customer/CustomerHeader'
import CustomerFooter from '@/components/customer/CustomerFooter'
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
