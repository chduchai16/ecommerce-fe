'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './admin-sidebar.module.scss'

interface MenuItem {
  id: string
  label: string
  icon: string
  path: string
  children?: MenuItem[]
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: '📊',
    path: '/admin'
  },
  {
    id: 'products',
    label: 'Products',
    icon: '📦',
    path: '/admin/products'
  },
  {
    id: 'orders',
    label: 'Orders',
    icon: '🛒',
    path: '/admin/orders'
  },
  {
    id: 'users',
    label: 'Users',
    icon: '👥',
    path: '/admin/users'
  },
  {
    id: 'categories',
    label: 'Categories',
    icon: '📁',
    path: '/admin/categories'
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: '📈',
    path: '/admin/reports'
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: '⚙️',
    path: '/admin/settings'
  }
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  const isActive = (path: string) => {
    if (path === '/admin') {
      return pathname === path
    }
    return pathname.startsWith(path)
  }

  return (
    <aside className={`${styles.adminSidebar} ${collapsed ? styles.collapsed : ''}`}>
      <div className={styles.toggleButton}>
        <button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? '→' : '←'}
        </button>
      </div>

      <nav className={styles.menu}>
        {menuItems.map((item) => (
          <Link
            key={item.id}
            href={item.path}
            className={`${styles.menuItem} ${isActive(item.path) ? styles.active : ''}`}
          >
            <span className={styles.icon}>{item.icon}</span>
            {!collapsed && <span className={styles.label}>{item.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
