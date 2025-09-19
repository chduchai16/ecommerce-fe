import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
  token: {
    // Token cơ bản
    colorPrimary: '#1677ff',
    borderRadius: 6,
    
    // Token bí danh
    colorBgContainer: '#ffffff',
  },
  components: {
    Button: {
      colorPrimary: '#1677ff',
      algorithm: true, // Kích hoạt thuật toán
    },
    Input: {
      colorPrimary: '#1677ff',
    },
  },
};

export default theme;