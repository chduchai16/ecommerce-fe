'use client'

import React, { useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import {
  ShoppingOutlined,
  ShoppingCartOutlined,
  InboxOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Layout, Menu, theme, Breadcrumb } from 'antd'

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

export default function SellerLayout({
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
    getItem('Sản phẩm của tôi', '/seller/products', <ShoppingOutlined />, () => router.push('/seller/products')),
    getItem('Đơn hàng', '/seller/orders', <ShoppingCartOutlined />, () => router.push('/seller/orders')),
    getItem('Kho hàng', '/seller/inventory', <InboxOutlined />, () => router.push('/seller/inventory')),
  ]

  const getSelectedKey = () => {
    const match = menuItems.find(item => pathname.startsWith(item?.key as string))
    return match ? [match.key as string] : []
  }

  return (
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
          {collapsed ? '🏪' : 'Seller Center'}
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
            Quản lý gian hàng
          </div>
          <div>
            Seller
          </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb 
            style={{ margin: '16px 0' }}
            items={[
              { title: 'Seller' },
              { title: pathname.split('/').pop() || 'Dashboard' }
            ]}
          />
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
          Seller Center ©{new Date().getFullYear()} Your Store
        </Footer>
      </Layout>
    </Layout>
  )
}
