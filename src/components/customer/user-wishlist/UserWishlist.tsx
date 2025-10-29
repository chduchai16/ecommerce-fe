'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
import {
    Card, Row, Col, Typography, Button, Modal, Input, Rate, Empty, message, Image,
} from 'antd';
import {
    HeartOutlined, HeartFilled, DeleteOutlined, ShoppingCartOutlined,
    ArrowLeftOutlined,
} from '@ant-design/icons';
import styles from './UserWishlist.module.scss';
import Link from 'next/link';
import { Product } from '@/library/models/product/product';
import { WishlistService } from '@/library/services/wishlist-service';
import { ProductService } from '@/library/services/product-service';
import { CartService } from '@/library/services/cart-service';

const { Title, Text } = Typography;
const { Search } = Input;

export default function UserWishlist() {
    const [wishlist, setWishlist] = useState<Product[]>([]);
    const [searchText, setSearchText] = useState('');
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);

    const wishlistService = useMemo(() => new WishlistService(), []);
    const productService = useMemo(() => new ProductService(), []);
    const cartService = useMemo(() => new CartService(), []);

    // Hàm fetch product theo id
    const fetchWishlistProducts = useCallback(async () => {
        const ids = wishlistService.getAll();
        if (ids.length === 0) {
            setWishlist([]);
            return;
        }
        try {
            setLoading(true);
            const res = await productService.getProductsByIds(ids);
            setWishlist(res);
        } catch (err) {
            console.error('Failed to fetch wishlist products', err);
            message.error('Không tải được danh sách sản phẩm yêu thích');
        } finally {
            setLoading(false);
        }
    }, [productService, wishlistService]);

    // Lần đầu load và lắng nghe sự kiện update
    useEffect(() => {
        fetchWishlistProducts();

        const handler = () => {
            fetchWishlistProducts();
        };
        window.addEventListener('wishlist:update', handler);
        return () => window.removeEventListener('wishlist:update', handler);
    }, [fetchWishlistProducts]);

    // Lọc sản phẩm theo tên
    const filteredWishlist = wishlist.filter((p) =>
        p.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleRemoveFromWishlist = (productId: number) => {
        const removed = wishlistService.remove(productId);
        if (removed) {
            message.success('Đã xóa khỏi yêu thích');
        } else {
            message.info('Sản phẩm không có trong yêu thích');
        }
    };

    const handleClearWishlist = () => {
        wishlistService.clear();
    };

    const handleAddToCart = (product: Product) => {
        cartService.addItem(product);
    };

    const formatPrice = (price: number) =>
        new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);

    return (
        <div className={styles.userWishlist}>
            <div className={styles.container}>
                <div className={styles.contentWrapper}>
                    <div className={styles.header}>
                        <Link href="/customer/products">
                            <Button icon={<ArrowLeftOutlined />} type="text">
                                Tiếp tục mua sắm
                            </Button>
                        </Link>
                        {wishlist.length > 0 && (
                            <Button onClick={handleClearWishlist} type="text" className={styles.clearBtn}>
                                Xóa tất cả
                            </Button>
                        )}
                    </div>
                </div>

                <Search
                    placeholder="Tìm kiếm sản phẩm yêu thích..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className={styles.searchInput}
                    size="large"
                    allowClear
                />

                <div className={styles.contentWrapper}>
                    {loading ? (
                        <Text>Đang tải...</Text>
                    ) : wishlist.length === 0 ? (
                        <div className={styles.emptyWishlist}>
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                description={
                                    <div>
                                        <Text>Danh sách yêu thích của bạn đang trống</Text>
                                        <br />
                                        <Text type="secondary">Hãy thêm những sản phẩm bạn yêu thích để dễ dàng theo dõi</Text>
                                    </div>
                                }
                            >
                                <Link href="/customer/products">
                                    <Button type="primary" icon={<HeartOutlined />}>
                                        Khám phá sản phẩm
                                    </Button>
                                </Link>
                            </Empty>
                        </div>
                    ) : filteredWishlist.length === 0 ? (
                        <div className={styles.emptyWishlist}>
                            <Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                                description={
                                    <div>
                                        <Text>Không tìm thấy sản phẩm nào</Text>
                                        <br />
                                        <Text type="secondary">Thử tìm kiếm với từ khóa khác</Text>
                                    </div>
                                }
                            >
                                <Button type="default" onClick={() => setSearchText('')}>
                                    Xóa bộ lọc
                                </Button>
                            </Empty>
                        </div>
                    ) : (
                        <Row gutter={[16, 16]} className={styles.productGrid}>
                            {filteredWishlist.map((product) => (
                                <Col
                                    key={product.id}
                                    xs={24}
                                    sm={12}
                                    md={8}
                                    xl={6}
                                >
                                    <Card
                                        hoverable
                                        className={styles.productCard}
                                        cover={
                                            <div className={styles.productImage}>
                                                <Image
                                                    src={product.product_images?.[0]?.name || product.thumbnail || '/placeholder-product.jpg'}
                                                    alt={product.name}
                                                    preview={{
                                                        mask: 'Xem ảnh'
                                                    }}
                                                    fallback="/placeholder-product.jpg"
                                                />
                                            </div>
                                        }
                                    >
                                        <div className={styles.productInfo}>
                                            <Title level={5}>
                                                {product.name}
                                            </Title>

                                            <div className={styles.productRating}>
                                                <Rate disabled defaultValue={product.average_rating ?? 0} className={styles.rating} />
                                                <Text type="secondary" className={styles.reviewCount}>
                                                    ({product.review_count} đánh giá)
                                                </Text>
                                            </div>

                                            <div className={styles.productPrice}>
                                                <Text className={styles.currentPrice}>
                                                    {formatPrice(product.price)}
                                                </Text>
                                                {product.original_price && (
                                                    <Text delete type="secondary" className={styles.originalPrice}>
                                                        {formatPrice(product.original_price)}
                                                    </Text>
                                                )}
                                            </div>

                                            <div className={styles.productActions}>
                                                <Button
                                                    type="primary"
                                                    icon={<ShoppingCartOutlined />}
                                                    onClick={() => handleAddToCart(product)}
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
                            ))}
                        </Row>
                    )}
                </div>

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
                                    <Image
                                        src={selectedProduct.product_images?.[0]?.name || selectedProduct.thumbnail || '/placeholder-product.jpg'}
                                        alt={selectedProduct.name}
                                        className={styles.modalImage}
                                        fallback="/placeholder-product.jpg"
                                    />
                                </Col>
                                <Col span={12}>
                                    <div className={styles.modalInfo}>
                                        <Title level={3}>{selectedProduct.name}</Title>

                                        <div className={styles.modalRating}>
                                            <Rate disabled defaultValue={selectedProduct.average_rating ?? 0} />
                                            <Text type="secondary">
                                                ({selectedProduct.review_count} đánh giá)
                                            </Text>
                                        </div>

                                        <div className={styles.modalPrice}>
                                            <Text className={styles.modalCurrentPrice}>
                                                {formatPrice(selectedProduct.price)}
                                            </Text>
                                            {selectedProduct.original_price && (
                                                <Text delete type="secondary" className={styles.modalOriginalPrice}>
                                                    {formatPrice(selectedProduct.original_price)}
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
                                                onClick={() => handleAddToCart(selectedProduct)}
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
    );
}
