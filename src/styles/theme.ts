import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
  token: {
    // Seed Token
    colorPrimary: '#1677ff',
    borderRadius: 6,
    
    // Alias Token
    colorBgContainer: '#ffffff',
  },
  components: {
    Button: {
      colorPrimary: '#1677ff',
      algorithm: true, // Enable algorithm
    },
    Input: {
      colorPrimary: '#1677ff',
    },
  },
};

export default theme;