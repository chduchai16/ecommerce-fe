import { message } from 'antd';

class NotificationService {
    // dùng cho axios interceptor hoặc các file không phải React component
    success(content: string, duration = 3) {
        if (typeof window !== 'undefined') {
            message.success(content, duration);
        }
    }

    error(content: string, duration = 3) {
        if (typeof window !== 'undefined') {
            message.error(content, duration);
        }
    }

    warning(content: string, duration = 3) {
        if (typeof window !== 'undefined') {
            message.warning(content, duration);
        }
    }

    info(content: string, duration = 3) {
        if (typeof window !== 'undefined') {
            message.info(content, duration);
        }
    }
}

export const notificationService = new NotificationService();