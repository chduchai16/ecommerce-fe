'use client';

import React, { useState } from 'react';
import { List, Card, Typography, Tag, Button, Space, Avatar, Divider, Badge, Empty } from 'antd';
import {
    BellOutlined,
    CheckOutlined,
    DeleteOutlined,
    ShoppingOutlined,
    GiftOutlined,
    TruckOutlined,
    StarOutlined
} from '@ant-design/icons';
import { mockNotifications, type Notification as NotificationData } from '@/data/mockUserData';
import styles from './NotificationList.module.scss';

const { Title, Text, Paragraph } = Typography;

export default function NotificationList() {
    const [notifications, setNotifications] = useState<NotificationData[]>(mockNotifications);

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'order':
                return <ShoppingOutlined className={styles.orderIcon} />;
            case 'shipping':
                return <TruckOutlined className={styles.shippingIcon} />;
            case 'promotion':
                return <GiftOutlined className={styles.promotionIcon} />;
            case 'review':
                return <StarOutlined className={styles.reviewIcon} />;
            default:
                return <BellOutlined className={styles.generalIcon} />;
        }
    };

    const getNotificationColor = (type: string) => {
        switch (type) {
            case 'order':
                return 'blue';
            case 'shipping':
                return 'orange';
            case 'promotion':
                return 'red';
            case 'review':
                return 'gold';
            default:
                return 'default';
        }
    };

    const markAsRead = (id: string) => {
        setNotifications(notifications.map(notif =>
            notif.id === id ? { ...notif, isRead: true } : notif
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(notif => ({ ...notif, isRead: true })));
    };

    const deleteNotification = (id: string) => {
        setNotifications(notifications.filter(notif => notif.id !== id));
    };

    const deleteAllRead = () => {
        setNotifications(notifications.filter(notif => !notif.isRead));
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) {
            return `${diffMins} phút trước`;
        } else if (diffHours < 24) {
            return `${diffHours} giờ trước`;
        } else {
            return `${diffDays} ngày trước`;
        }
    };

    const unreadCount = notifications.filter(n => !n.isRead).length;

    return (
        <div className={styles.notificationContainer}>
            <Card className={styles.notificationCard}>
                <div className={styles.header}>
                    <Space align="center">
                        <BellOutlined className={styles.headerIcon} />
                        <Title level={3} className={styles.headerTitle}>
                            Thông báo
                        </Title>
                        {unreadCount > 0 && (
                            <Badge count={unreadCount} className={styles.unreadBadge} />
                        )}
                    </Space>

                    <Space>
                        {unreadCount > 0 && (
                            <Button
                                type="text"
                                icon={<CheckOutlined />}
                                onClick={markAllAsRead}
                                className={styles.actionBtn}
                            >
                                Đánh dấu tất cả đã đọc
                            </Button>
                        )}
                        <Button
                            type="text"
                            icon={<DeleteOutlined />}
                            onClick={deleteAllRead}
                            className={styles.actionBtn}
                            disabled={notifications.filter(n => n.isRead).length === 0}
                        >
                            Xóa đã đọc
                        </Button>
                    </Space>
                </div>

                <Divider />

                {notifications.length === 0 
                ? (
                    <Empty
                        description="Không có thông báo nào"
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                ) 
                : (
                    <List
                        dataSource={notifications}
                        renderItem={(notification) => (
                            <List.Item
                                className={`${styles.notificationItem} ${!notification.isRead ? styles.unread : ''}`}
                                actions={[
                                    !notification.isRead && (
                                        <Button
                                            type="text"
                                            size="small"
                                            icon={<CheckOutlined />}
                                            onClick={() => markAsRead(notification.id)}
                                            className={styles.markReadBtn}
                                        >
                                            Đánh dấu đã đọc
                                        </Button>
                                    ),
                                    <Button
                                        type="text"
                                        size="small"
                                        icon={<DeleteOutlined />}
                                        onClick={() => deleteNotification(notification.id)}
                                        className={styles.deleteBtn}
                                    >
                                        Xóa
                                    </Button>
                                ].filter(Boolean)}
                            >
                                <List.Item.Meta
                                    avatar={
                                        <Avatar
                                            icon={getNotificationIcon(notification.type)}
                                            className={styles.notificationAvatar}
                                        />
                                    }
                                    title={
                                        <div className={styles.notificationHeader}>
                                            <Space>
                                                <Text strong className={styles.notificationTitle}>
                                                    {notification.title}
                                                </Text>
                                                <Tag color={getNotificationColor(notification.type)} className={styles.typeTag}>
                                                    {notification.type === 'order' && 'Đơn hàng'}
                                                    {notification.type === 'shipping' && 'Vận chuyển'}
                                                    {notification.type === 'promotion' && 'Khuyến mãi'}
                                                    {notification.type === 'review' && 'Đánh giá'}
                                                    {notification.type === 'general' && 'Thông báo'}
                                                </Tag>
                                                {!notification.isRead && (
                                                    <div className={styles.unreadDot} />
                                                )}
                                            </Space>
                                            <Text type="secondary" className={styles.timeText}>
                                                {formatTime(notification.createdAt)}
                                            </Text>
                                        </div>
                                    }
                                    description={
                                        <div className={styles.notificationContent}>
                                            <Paragraph className={styles.notificationMessage}>
                                                {notification.message}
                                            </Paragraph>
                                            {notification.actionUrl && (
                                                <Button
                                                    type="link"
                                                    size="small"
                                                    className={styles.actionLink}
                                                >
                                                    Xem chi tiết →
                                                </Button>
                                            )}
                                        </div>
                                    }
                                />
                            </List.Item>
                        )}
                    />
                )}
            </Card>
        </div>
    );
}