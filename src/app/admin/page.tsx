import { mockDashboardStats, formatCurrency, formatDate } from '@/library/mocks/admin-mock-data'
import styles from './page.module.css'

export default function AdminPage() {
  const stats = mockDashboardStats

  return (
    <div>
      <div className={styles.header}>
        <h1>Dashboard</h1>
        <p>Chào mừng đến với trang quản trị hệ thống</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📦</div>
          <div className={styles.statInfo}>
            <h3>Sản phẩm</h3>
            <p className={styles.statNumber}>{stats.totalProducts}</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>🛒</div>
          <div className={styles.statInfo}>
            <h3>Đơn hàng</h3>
            <p className={styles.statNumber}>{stats.totalOrders}</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>👥</div>
          <div className={styles.statInfo}>
            <h3>Người dùng</h3>
            <p className={styles.statNumber}>{stats.totalUsers}</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>📊</div>
          <div className={styles.statInfo}>
            <h3>Doanh thu</h3>
            <p className={styles.statNumber}>{formatCurrency(stats.totalRevenue)}</p>
          </div>
        </div>
      </div>

      <div className={styles.quickActions}>
        <h2>Thao tác nhanh</h2>
        <div className={styles.actionsGrid}>
          <a href="/admin/products" className={styles.actionCard}>
            <span className={styles.actionIcon}>📦</span>
            <span>Quản lý sản phẩm</span>
          </a>
          <a href="/admin/orders" className={styles.actionCard}>
            <span className={styles.actionIcon}>🛒</span>
            <span>Quản lý đơn hàng</span>
          </a>
          <a href="/admin/users" className={styles.actionCard}>
            <span className={styles.actionIcon}>👥</span>
            <span>Quản lý người dùng</span>
          </a>
          <a href="/admin/categories" className={styles.actionCard}>
            <span className={styles.actionIcon}>📁</span>
            <span>Quản lý danh mục</span>
          </a>
        </div>
      </div>

      <div className={styles.recentOrders}>
        <h2>Đơn hàng gần đây</h2>
        <div className={styles.ordersTable}>
          <table>
            <thead>
              <tr>
                <th>Mã ĐH</th>
                <th>Khách hàng</th>
                <th>Số tiền</th>
                <th>Trạng thái</th>
                <th>Thời gian</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.customerName}</td>
                  <td>{formatCurrency(order.totalAmount)}</td>
                  <td>
                    <span className={styles.status} style={{ background: getStatusColor(order.status) }}>
                      {order.statusText}
                    </span>
                  </td>
                  <td>{formatDate(order.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function getStatusColor(status: number): string {
  switch (status) {
    case 0: return '#faad14'
    case 1: return '#1890ff'
    case 2: return '#52c41a'
    case 3: return '#52c41a'
    case 4: return '#ff4d4f'
    default: return '#d9d9d9'
  }
}