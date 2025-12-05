import styles from './admin-footer.module.scss'

export default function AdminFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.adminFooter}>
      <div className={styles.container}>
        <p className={styles.copyright}>
          © {currentYear} E-Commerce Admin. All rights reserved.
        </p>
        <div className={styles.links}>
          <a href="/admin/help" className={styles.link}>Help</a>
          <a href="/admin/docs" className={styles.link}>Documentation</a>
          <a href="/admin/support" className={styles.link}>Support</a>
        </div>
      </div>
    </footer>
  )
}
