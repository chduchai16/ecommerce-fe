'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styles from './admin-header.module.scss'

export default function AdminHeader() {
  const router = useRouter()
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleLogout = () => {
    // Clear localStorage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
    router.push('/auth/sign-in')
  }

  return (
    <header className={styles.adminHeader}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/admin">
            <h1>Admin Dashboard</h1>
          </Link>
        </div>

        <nav className={styles.nav}>
          <div className={styles.userSection}>
            <button 
              className={styles.userButton}
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <span className={styles.userName}>Admin</span>
              <span className={styles.icon}>▼</span>
            </button>
            
            {showUserMenu && (
              <div className={styles.userMenu}>
                <Link href="/admin/profile" className={styles.menuItem}>
                  Profile
                </Link>
                <Link href="/admin/settings" className={styles.menuItem}>
                  Settings
                </Link>
                <button onClick={handleLogout} className={styles.menuItem}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
