'use client';

import React, { useState } from 'react';
import { Card, Row, Col, Typography, Button, List, Avatar, Tag, Modal, Input, Rate } from 'antd';
import { HeartOutlined, HeartFilled, DeleteOutlined, ShoppingCartOutlined, EyeOutlined } from '@ant-design/icons';
import { mockProducts } from '@/data/mockProducts';
import { wishlistItems } from '@/data/mockUserData';
import styles from './UserWishlist.module.scss';

const { Title, Text } = Typography;
const { Search } = Input;

export default function UserWishlist() {
  const [wishlist, setWishlist] = useState(wishlistItems);
  const [searchText, setSearchText] = useState('');
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // Lọc sản phẩm yêu thích theo tìm kiếm
  const filteredWishlist = wishlist.filter(item => {
    const product = mockProducts.find(p => p.id === item.productId);
    return product && product.name.toLowerCase().includes(searchText.toLowerCase());
  });

  // Xóa sản phẩm khỏi danh sách yêu thích
  const handleRemoveFromWishlist = (productId: string) => {
    setWishlist(wishlist.filter(item => item.productId !== productId));
  };

  // Thêm vào giỏ hàng (mock function)
  const handleAddToCart = (productId: string) => {
    console.log('Adding to cart:', productId);
    // Implement cart functionality
  };

  // Xem chi tiết sản phẩm
  const handleViewDetail = (productId: string) => {
    const product = mockProducts.find(p => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setDetailModalVisible(true);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  return (
    <div className={styles.userWishlist}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Title level={2} className={styles.pageTitle}>
            <HeartFilled className={styles.heartIcon} />
            Sản phẩm yêu thích
          </Title>
          <Text type="secondary" className={styles.itemCount}>
            {filteredWishlist.length} sản phẩm
          </Text>
        </div>

        <div className={styles.contentWrapper}>
          <Card className={styles.searchCard}>
            <Search
              placeholder="Tìm kiếm sản phẩm yêu thích..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className={styles.searchInput}
              size="large"
            />
          </Card>

          {filteredWishlist.length === 0 ? (
          <Card className={styles.emptyCard}>
            <div className={styles.emptyState}>
              <HeartOutlined className={styles.emptyIcon} />
              <Title level={4}>Chưa có sản phẩm yêu thích</Title>
              <Text type="secondary">
                Hãy thêm những sản phẩm bạn yêu thích để dễ dàng theo dõi
              </Text>
              <Button type="primary" size="large" className={styles.browseButton}>
                Khám phá sản phẩm
              </Button>
            </div>
          </Card>
        ) : (
          <Row gutter={[16, 16]} className={styles.productGrid}>
            {filteredWishlist.map(item => {
              const product = mockProducts.find(p => p.id === item.productId);
              if (!product) return null;

              return (
                <Col xs={24} sm={12} md={8} lg={6} key={item.id}>
                  <Card
                    hoverable
                    className={styles.productCard}
                    cover={
                      <div className={styles.productImage}>
                        <img
                          src={product.images?.[0] || product.imageUrl}
                          alt={product.name}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
                          }}
                        />
                        <div className={styles.imageOverlay}>
                          <Button
                            type="text"
                            icon={<EyeOutlined />}
                            className={styles.overlayButton}
                            onClick={() => handleViewDetail(product.id)}
                          />
                          <Button
                            type="text"
                            icon={<DeleteOutlined />}
                            className={styles.overlayButton}
                            onClick={() => handleRemoveFromWishlist(product.id)}
                            danger
                          />
                        </div>
                      </div>
                    }
                  >
                    <div className={styles.productInfo}>
                      <Title level={5} className={styles.productName}>
                        {product.name}
                      </Title>
                      
                      <div className={styles.productRating}>
                        <Rate disabled defaultValue={product.rating} className={styles.rating} />
                        <Text type="secondary" className={styles.reviewCount}>
                          ({product.reviewCount} đánh giá)
                        </Text>
                      </div>

                      <div className={styles.productPrice}>
                        <Text className={styles.currentPrice}>
                          {formatPrice(product.price)}
                        </Text>
                        {product.originalPrice && (
                          <Text delete type="secondary" className={styles.originalPrice}>
                            {formatPrice(product.originalPrice)}
                          </Text>
                        )}
                      </div>

                      <Text type="secondary" className={styles.addedDate}>
                        Thêm vào: {new Date(item.addedAt).toLocaleDateString('vi-VN')}
                      </Text>

                      <div className={styles.productActions}>
                        <Button
                          type="primary"
                          icon={<ShoppingCartOutlined />}
                          onClick={() => handleAddToCart(product.id)}
                          className={styles.addToCartButton}
                          block
                        >
                          Thêm vào giỏ
                        </Button>
                        <Button
                          type="text"
                          icon={<HeartFilled />}
                          onClick={() => handleRemoveFromWishlist(product.id)}
                          className={styles.removeButton}
                          danger
                        >
                          Xóa
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}

        {/* Modal chi tiết sản phẩm */}
        <Modal
          open={detailModalVisible}
          onCancel={() => setDetailModalVisible(false)}
          footer={null}
          width={800}
          className={styles.productModal}
        >
          {selectedProduct && (
            <div className={styles.modalContent}>
              <Row gutter={24}>
                <Col span={12}>
                  <img
                    src={selectedProduct.images?.[0] || selectedProduct.imageUrl}
                    alt={selectedProduct.name}
                    className={styles.modalImage}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
                    }}
                  />
                </Col>
                <Col span={12}>
                  <div className={styles.modalInfo}>
                    <Title level={3}>{selectedProduct.name}</Title>
                    
                    <div className={styles.modalRating}>
                      <Rate disabled defaultValue={selectedProduct.rating} />
                      <Text type="secondary">
                        ({selectedProduct.reviews} đánh giá)
                      </Text>
                    </div>

                    <div className={styles.modalPrice}>
                      <Text className={styles.modalCurrentPrice}>
                        {formatPrice(selectedProduct.price)}
                      </Text>
                      {selectedProduct.originalPrice && (
                        <Text delete type="secondary" className={styles.modalOriginalPrice}>
                          {formatPrice(selectedProduct.originalPrice)}
                        </Text>
                      )}
                    </div>

                    <div className={styles.modalDescription}>
                      <Title level={5}>Mô tả sản phẩm:</Title>
                      <Text>{selectedProduct.description}</Text>
                    </div>

                    <div className={styles.modalActions}>
                      <Button
                        type="primary"
                        size="large"
                        icon={<ShoppingCartOutlined />}
                        onClick={() => handleAddToCart(selectedProduct.id)}
                        block
                      >
                        Thêm vào giỏ hàng
                      </Button>
                      <Button
                        type="default"
                        size="large"
                        icon={<DeleteOutlined />}
                        onClick={() => {
                          handleRemoveFromWishlist(selectedProduct.id);
                          setDetailModalVisible(false);
                        }}
                        block
                        danger
                      >
                        Xóa khỏi yêu thích
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </Modal>
        </div>
      </div>
    </div>
  );
}