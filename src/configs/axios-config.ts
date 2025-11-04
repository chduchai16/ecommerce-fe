// lib/axios.ts
import axios from "axios";
import { notificationService } from "../library/services/notification-service";
import { apiBaseUrl } from "@/library/consts/app_constants";

const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor (gắn token)
api.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor (unwrap data + handle error)
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    let errorMsg =
      error.response?.data?.message ||
      error.response?.data?.error ||
      "Có lỗi xảy ra, vui lòng thử lại";

    if (Array.isArray(error.response?.data?.errors)) {
      errorMsg = error.response.data.errors[0].msg || errorMsg;
    }

    // Hiển thị popup message thông qua service
    notificationService.error(errorMsg, 3); // 3 giây

    return Promise.reject(error.response?.data || error);
  }
);

export default api;
