// Antd Configuration to suppress React version warnings
import { ConfigProvider } from 'antd';

// Override React version detection for Antd
if (typeof window !== 'undefined') {
  // Suppress the React version warning for Antd v5
  const originalConsoleWarn = console.warn;
  console.warn = (...args) => {
    if (args[0]?.includes('[antd: compatible]')) {
      return; // Suppress Antd compatibility warnings
    }
    originalConsoleWarn.apply(console, args);
  };
}

export { ConfigProvider };