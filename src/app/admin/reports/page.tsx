'use client'

import { useState } from 'react'
import { Card, Row, Col, DatePicker, Select, Button, Statistic, Table, Space, Tabs } from 'antd'
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  FileTextOutlined,
  DownloadOutlined,
  ReloadOutlined
} from '@ant-design/icons'
import type { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'
import styles from './page.module.scss'

// Đăng ký các thành phần Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const { RangePicker } = DatePicker

interface ReportData {
  key: string
  period: string
  revenue: number
  orders: number
  customers: number
  avgOrderValue: number
}

export default function AdminReportsPage() {
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs().subtract(30, 'days'),
    dayjs()
  ])
  const [reportType, setReportType] = useState('revenue')

  // Mock data - thay bằng API call thực tế
  const revenueData: ReportData[] = [
    { key: '1', period: 'Tuần 1', revenue: 45000000, orders: 120, customers: 95, avgOrderValue: 375000 },
    { key: '2', period: 'Tuần 2', revenue: 52000000, orders: 145, customers: 110, avgOrderValue: 358621 },
    { key: '3', period: 'Tuần 3', revenue: 48000000, orders: 132, customers: 102, avgOrderValue: 363636 },
    { key: '4', period: 'Tuần 4', revenue: 61000000, orders: 168, customers: 128, avgOrderValue: 363095 },
  ]

  const topProducts = [
    { key: '1', name: 'iPhone 15 Pro Max', sold: 85, revenue: 255000000 },
    { key: '2', name: 'Samsung Galaxy S24', sold: 72, revenue: 144000000 },
    { key: '3', name: 'MacBook Air M2', sold: 45, revenue: 112500000 },
    { key: '4', name: 'AirPods Pro 2', sold: 120, revenue: 72000000 },
    { key: '5', name: 'iPad Air', sold: 56, revenue: 67200000 },
  ]

  const revenueColumns: ColumnsType<ReportData> = [
    { title: 'Kỳ', dataIndex: 'period', key: 'period' },
    {
      title: 'Doanh thu',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (value) => `${value.toLocaleString('vi-VN')} ₫`,
      sorter: (a, b) => a.revenue - b.revenue,
    },
    {
      title: 'Đơn hàng',
      dataIndex: 'orders',
      key: 'orders',
      sorter: (a, b) => a.orders - b.orders,
    },
    {
      title: 'Khách hàng',
      dataIndex: 'customers',
      key: 'customers',
      sorter: (a, b) => a.customers - b.customers,
    },
    {
      title: 'Giá trị TB',
      dataIndex: 'avgOrderValue',
      key: 'avgOrderValue',
      render: (value) => `${value.toLocaleString('vi-VN')} ₫`,
    },
  ]

  const productColumns = [
    { title: 'Sản phẩm', dataIndex: 'name', key: 'name' },
    {
      title: 'Đã bán',
      dataIndex: 'sold',
      key: 'sold',
      sorter: (a: any, b: any) => a.sold - b.sold,
    },
    {
      title: 'Doanh thu',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (value: number) => `${value.toLocaleString('vi-VN')} ₫`,
      sorter: (a: any, b: any) => a.revenue - b.revenue,
    },
  ]

  const handleExport = () => {
    // Logic xuất báo cáo
    console.log('Xuất báo cáo', reportType, dateRange)
  }

  const tabItems = [
    {
      key: 'overview',
      label: 'Tổng quan',
      children: (
        <div>
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Tổng doanh thu"
                  value={206000000}
                  precision={0}
                  valueStyle={{ color: '#3f8600' }}
                  prefix={<DollarOutlined />}
                  suffix="₫"
                />
                <div style={{ marginTop: 8, fontSize: 12, color: '#52c41a' }}>
                  <ArrowUpOutlined /> 15.3% so với tháng trước
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Tổng đơn hàng"
                  value={565}
                  valueStyle={{ color: '#1890ff' }}
                  prefix={<ShoppingCartOutlined />}
                />
                <div style={{ marginTop: 8, fontSize: 12, color: '#1890ff' }}>
                  <ArrowUpOutlined /> 8.2% so với tháng trước
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Khách hàng mới"
                  value={435}
                  valueStyle={{ color: '#722ed1' }}
                  prefix={<UserOutlined />}
                />
                <div style={{ marginTop: 8, fontSize: 12, color: '#52c41a' }}>
                  <ArrowUpOutlined /> 12.5% so với tháng trước
                </div>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={6}>
              <Card>
                <Statistic
                  title="Giá trị đơn TB"
                  value={364779}
                  precision={0}
                  valueStyle={{ color: '#fa8c16' }}
                  suffix="₫"
                />
                <div style={{ marginTop: 8, fontSize: 12, color: '#ff4d4f' }}>
                  <ArrowDownOutlined /> 2.1% so với tháng trước
                </div>
              </Card>
            </Col>
          </Row>

          <Card title="Biểu đồ doanh thu" style={{ marginBottom: 24 }}>
            <div style={{ height: 350, padding: '16px' }}>
              <Line
                data={{
                  labels: revenueData.map(d => d.period),
                  datasets: [
                    {
                      label: 'Doanh thu (₫)',
                      data: revenueData.map(d => d.revenue),
                      borderColor: 'rgb(75, 192, 192)',
                      backgroundColor: 'rgba(75, 192, 192, 0.1)',
                      tension: 0.4,
                      fill: true,
                    },
                    {
                      label: 'Đơn hàng',
                      data: revenueData.map(d => d.orders * 300000),
                      borderColor: 'rgb(255, 99, 132)',
                      backgroundColor: 'rgba(255, 99, 132, 0.1)',
                      tension: 0.4,
                      fill: true,
                      yAxisID: 'y1',
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                    },
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          let label = context.dataset.label || '';
                          if (label) {
                            label += ': ';
                          }
                          if (context.parsed.y !== null) {
                            label += context.parsed.y.toLocaleString('vi-VN') + ' ₫';
                          }
                          return label;
                        }
                      }
                    }
                  },
                  scales: {
                    y: {
                      type: 'linear' as const,
                      display: true,
                      position: 'left' as const,
                      ticks: {
                        callback: function (value) {
                          return (value as number).toLocaleString('vi-VN') + ' ₫';
                        }
                      }
                    },
                    y1: {
                      type: 'linear' as const,
                      display: true,
                      position: 'right' as const,
                      grid: {
                        drawOnChartArea: false,
                      },
                    },
                  }
                }}
              />
            </div>
          </Card>

          <Card title="Chi tiết theo kỳ">
            <Table
              columns={revenueColumns}
              dataSource={revenueData}
              pagination={false}
              size="small"
            />
          </Card>
        </div>
      ),
    },
    {
      key: 'products',
      label: 'Sản phẩm bán chạy',
      children: (
        <div>
          <Card title="Biểu đồ sản phẩm bán chạy" style={{ marginBottom: 24 }}>
            <div style={{ height: 350, padding: '16px' }}>
              <Bar
                data={{
                  labels: topProducts.map(p => p.name),
                  datasets: [
                    {
                      label: 'Số lượng bán',
                      data: topProducts.map(p => p.sold),
                      backgroundColor: 'rgba(54, 162, 235, 0.6)',
                      borderColor: 'rgba(54, 162, 235, 1)',
                      borderWidth: 1,
                    }
                  ]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          return 'Đã bán: ' + context.parsed.y + ' sản phẩm';
                        }
                      }
                    }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                    }
                  }
                }}
              />
            </div>
          </Card>
          <Card title="Top 5 sản phẩm bán chạy nhất">
            <Table
              columns={productColumns}
              dataSource={topProducts}
              pagination={false}
            />
          </Card>
        </div>
      ),
    },
    {
      key: 'customers',
      label: 'Khách hàng',
      children: (
        <div>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card title="Khách hàng mới">
                <Statistic value={435} suffix="người" />
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Khách hàng quay lại">
                <Statistic value={182} suffix="người" valueStyle={{ color: '#3f8600' }} />
              </Card>
            </Col>
          </Row>
          <Card title="Phân tích khách hàng" style={{ marginTop: 16 }}>
            <Row gutter={16}>
              <Col span={12}>
                <div style={{ height: 300, padding: '16px' }}>
                  <Doughnut
                    data={{
                      labels: ['Khách hàng mới', 'Khách quay lại'],
                      datasets: [
                        {
                          label: 'Số lượng',
                          data: [435, 182],
                          backgroundColor: [
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                          ],
                          borderColor: [
                            'rgba(54, 162, 235, 1)',
                            'rgba(75, 192, 192, 1)',
                          ],
                          borderWidth: 1,
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'bottom' as const,
                        },
                        tooltip: {
                          callbacks: {
                            label: function (context) {
                              const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                              const percentage = ((context.parsed / total) * 100).toFixed(1);
                              return context.label + ': ' + context.parsed + ' (' + percentage + '%)';
                            }
                          }
                        }
                      }
                    }}
                  />
                </div>
              </Col>
              <Col span={12}>
                <div style={{ height: 300, padding: '16px' }}>
                  <Bar
                    data={{
                      labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6'],
                      datasets: [
                        {
                          label: 'Khách hàng mới',
                          data: [65, 78, 90, 102, 115, 435],
                          backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        },
                        {
                          label: 'Khách quay lại',
                          data: [28, 35, 42, 58, 72, 182],
                          backgroundColor: 'rgba(75, 192, 192, 0.6)',
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'bottom' as const,
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                        }
                      }
                    }}
                  />
                </div>
              </Col>
            </Row>
          </Card>
        </div>
      ),
    },
  ]

  return (
    <div className={styles.reportsContainer}>
      <div className={styles.header}>
        <div>
          <h1>Báo cáo & Thống kê</h1>
          <p>Phân tích doanh thu và hiệu suất kinh doanh</p>
        </div>
        <Space>
          <RangePicker
            value={dateRange}
            onChange={(dates) => dates && setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs])}
            format="DD/MM/YYYY"
          />
          <Select
            value={reportType}
            onChange={setReportType}
            style={{ width: 150 }}
            options={[
              { value: 'revenue', label: 'Doanh thu' },
              { value: 'orders', label: 'Đơn hàng' },
              { value: 'products', label: 'Sản phẩm' },
              { value: 'customers', label: 'Khách hàng' },
            ]}
          />
          <Button icon={<ReloadOutlined />}>Làm mới</Button>
          <Button type="primary" icon={<DownloadOutlined />} onClick={handleExport}>
            Xuất báo cáo
          </Button>
        </Space>
      </div>

      <div className={styles.content}>
        <Tabs items={tabItems} />
      </div>
    </div>
  )
}
