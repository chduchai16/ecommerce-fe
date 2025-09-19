'use client'

import { Layout, Row, Col, Space, Typography, Input, Button, Divider } from 'antd'
import { 
  FacebookOutlined, 
  TwitterOutlined, 
  InstagramOutlined, 
  YoutubeOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  SendOutlined
} from '@ant-design/icons'
import Link from 'next/link'
import styles from './Footer.module.scss'

const { Footer: AntFooter } = Layout
const { Title, Text, Paragraph } = Typography

export default function Footer() {
  return (
    <AntFooter className={styles.footer}>
      <div className={styles.footerContainer}>
        
        {/* Main Footer Content */}
        <Row gutter={[32, 32]} className={styles.mainFooter}>
          
          {/* Company Info */}
          <Col xs={24} sm={12} md={6}>
            <div className={styles.footerSection}>
              <Title level={4} className={styles.sectionTitle}>
                🛒 EcomStore
              </Title>
              <Paragraph className={styles.companyDesc}>
                Nền tảng thương mại điện tử hàng đầu Việt Nam, 
                mang đến trải nghiệm mua sắm tuyệt vời với hàng triệu sản phẩm chất lượng.
              </Paragraph>
              
              {/* Social Media */}
              <div className={styles.socialMedia}>
                <Title level={5} className={styles.socialTitle}>
                  Kết nối với chúng tôi
                </Title>
                <Space size="large">
                  <Link href="https://facebook.com" className={styles.socialLink}>
                    <FacebookOutlined />
                  </Link>
                  <Link href="https://twitter.com" className={styles.socialLink}>
                    <TwitterOutlined />
                  </Link>
                  <Link href="https://instagram.com" className={styles.socialLink}>
                    <InstagramOutlined />
                  </Link>
                  <Link href="https://youtube.com" className={styles.socialLink}>
                    <YoutubeOutlined />
                  </Link>
                </Space>
              </div>
            </div>
          </Col>

          {/* Customer Service */}
          <Col xs={24} sm={12} md={6}>
            <div className={styles.footerSection}>
              <Title level={4} className={styles.sectionTitle}>
                Hỗ trợ khách hàng
              </Title>
              <ul className={styles.linkList}>
                <li><Link href="/customer/help">Trung tâm trợ giúp</Link></li>
                <li><Link href="/customer/shipping">Hướng dẫn mua hàng</Link></li>
                <li><Link href="/customer/payment">Hướng dẫn thanh toán</Link></li>
                <li><Link href="/customer/returns">Chính sách đổi trả</Link></li>
                <li><Link href="/customer/warranty">Chính sách bảo hành</Link></li>
                <li><Link href="/customer/complaints">Góp ý khiếu nại</Link></li>
              </ul>
            </div>
          </Col>

          {/* About */}
          <Col xs={24} sm={12} md={6}>
            <div className={styles.footerSection}>
              <Title level={4} className={styles.sectionTitle}>
                Về EcomStore
              </Title>
              <ul className={styles.linkList}>
                <li><Link href="/about">Giới thiệu về chúng tôi</Link></li>
                <li><Link href="/careers">Tuyển dụng</Link></li>
                <li><Link href="/news">Tin tức</Link></li>
                <li><Link href="/investor">Nhà đầu tư</Link></li>
                <li><Link href="/sustainability">Phát triển bền vững</Link></li>
                <li><Link href="/seller/register">Bán hàng cùng chúng tôi</Link></li>
              </ul>
            </div>
          </Col>

          {/* Newsletter & Contact */}
          <Col xs={24} sm={12} md={6}>
            <div className={styles.footerSection}>
              <Title level={4} className={styles.sectionTitle}>
                Đăng ký nhận tin
              </Title>
              <Paragraph className={styles.newsletterDesc}>
                Nhận thông tin khuyến mãi và sản phẩm mới nhất
              </Paragraph>
              
              <div className={styles.newsletter}>
                <Input.Group compact>
                  <Input 
                    placeholder="Nhập email của bạn"
                    className={styles.emailInput}
                  />
                  <Button 
                    type="primary" 
                    icon={<SendOutlined />}
                    className={styles.subscribeBtn}
                  >
                    Đăng ký
                  </Button>
                </Input.Group>
              </div>

              {/* Contact Info */}
              <div className={styles.contactInfo}>
                <Title level={5} className={styles.contactTitle}>
                  Liên hệ
                </Title>
                <Space direction="vertical" size="small">
                  <Text className={styles.contactItem}>
                    <PhoneOutlined className={styles.contactIcon} />
                    Hotline: 1900-xxxx
                  </Text>
                  <Text className={styles.contactItem}>
                    <MailOutlined className={styles.contactIcon} />
                    support@ecomstore.vn
                  </Text>
                  <Text className={styles.contactItem}>
                    <EnvironmentOutlined className={styles.contactIcon} />
                    123 Đường ABC, Quận 1, TP.HCM
                  </Text>
                </Space>
              </div>
            </div>
          </Col>
        </Row>

        <Divider className={styles.footerDivider} />

        {/* Payment & Shipping */}
        <div className={styles.paymentSection}>
          <Row gutter={[32, 16]} align="middle">
            <Col xs={24} md={12}>
              <div>
                <Title level={5} className={styles.paymentTitle}>
                  Phương thức thanh toán
                </Title>
                <div className={styles.paymentMethods}>
                  <span className={styles.paymentItem}>💳 Visa</span>
                  <span className={styles.paymentItem}>💳 Mastercard</span>
                  <span className={styles.paymentItem}>🏛️ ATM</span>
                  <span className={styles.paymentItem}>📱 Momo</span>
                  <span className={styles.paymentItem}>💰 COD</span>
                </div>
              </div>
            </Col>
            <Col xs={24} md={12}>
              <div>
                <Title level={5} className={styles.paymentTitle}>
                  Đối tác vận chuyển
                </Title>
                <div className={styles.shippingMethods}>
                  <span className={styles.shippingItem}>🚚 Giao hàng nhanh</span>
                  <span className={styles.shippingItem}>📦 Giao hàng tiết kiệm</span>
                  <span className={styles.shippingItem}>✈️ J&T Express</span>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <Divider className={styles.footerDivider} />

        {/* Bottom Footer */}
        <div className={styles.bottomFooter}>
          <Row justify="space-between" align="middle">
            <Col xs={24} md={12}>
              <Text className={styles.copyright}>
                © 2025 EcomStore. Tất cả các quyền được bảo lưu.
              </Text>
            </Col>
            <Col xs={24} md={12}>
              <div className={styles.legalLinks}>
                <Link href="/privacy" className={styles.legalLink}>
                  Chính sách bảo mật
                </Link>
                <Link href="/terms" className={styles.legalLink}>
                  Điều khoản sử dụng
                </Link>
                <Link href="/cookies" className={styles.legalLink}>
                  Chính sách Cookie
                </Link>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </AntFooter>
  )
}