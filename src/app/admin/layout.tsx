'use client'

import React, { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import {
  DesktopOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  FolderOutlined,
  BarChartOutlined,
  SettingOutlined,
  HomeOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Layout, Menu, theme, Breadcrumb } from 'antd'
import AuthGuard from '@/configs/auth-guard'
import RoleGuard from '@/configs/role-guard'

const { Header, Content, Footer, Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  onClick?: () => void,
): MenuItem {
  return {
    key,
    icon,
    label,
    onClick,
  } as MenuItem
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [collapsed, setCollapsed] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  const menuItems: MenuItem[] = [
    getItem('Về trang chủ', '/customer/products', <HomeOutlined />, () => router.push('/customer/products')),
    { type: 'divider' as const },
    getItem('Dashboard', '/admin', <DesktopOutlined />, () => router.push('/admin')),
    getItem('Sản phẩm', '/admin/products', <ShoppingOutlined />, () => router.push('/admin/products')),
    getItem('Đơn hàng', '/admin/orders', <ShoppingCartOutlined />, () => router.push('/admin/orders')),
    getItem('Người dùng', '/admin/users', <UserOutlined />, () => router.push('/admin/users')),
    getItem('Danh mục', '/admin/categories', <FolderOutlined />, () => router.push('/admin/categories')),
    getItem('Báo cáo', '/admin/reports', <BarChartOutlined />, () => router.push('/admin/reports')),
    getItem('Cài đặt', '/admin/settings', <SettingOutlined />, () => router.push('/admin/settings')),
  ]

  // Get current selected key based on pathname
  const getSelectedKey = () => {
    if (pathname === '/admin') return ['/admin']
    const match = menuItems.find(item => item?.key !== '/admin' && pathname.startsWith(item?.key as string))
    return match ? [match.key as string] : ['/admin']
  }

  return (
    <AuthGuard>
      <RoleGuard roles={['admin']}>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div style={{
              height: 64,
              margin: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: collapsed ? 16 : 20,
              fontWeight: 'bold'
            }}>
              {collapsed ? 'AD' : 'Admin'}
            </div>
            <Menu
              theme="dark"
              selectedKeys={getSelectedKey()}
              mode="inline"
              items={menuItems}
            />
          </Sider>
          <Layout>
            <Header style={{
              padding: '0 24px',
              background: colorBgContainer,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ fontSize: 18, fontWeight: 500 }}>
                Hệ thống quản trị
              </div>
              <div>
                <UserOutlined style={{ fontSize: 16, marginRight: 8 }} />
                Admin
              </div>
            </Header>
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Admin</Breadcrumb.Item>
                <Breadcrumb.Item>{pathname.split('/').pop() || 'Dashboard'}</Breadcrumb.Item>
              </Breadcrumb>
              <div
                style={{
                  padding: 24,
                  minHeight: 360,
                  background: colorBgContainer,
                  borderRadius: borderRadiusLG,
                }}
              >
                {children}
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              E-Commerce Admin ©{new Date().getFullYear()} Created by Your Team
            </Footer>
          </Layout>
        </Layout>
      </RoleGuard>
    </AuthGuard>
  )
}
