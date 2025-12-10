import api from '@/configs/axios-config'
import { PageResponse } from '@/common/models/page-response'

export interface InventoryProduct {
  id: number
  name: string
  price: number
  stock_quantity: number
  total_sold: number | null
  brand: string | null
  category_name: string
  average_rating: number | null
  status: number | null
  warning_status: string | null
}

export interface InventoryStats {
  total_products: number
  total_stock: number
  warning_count: number
}

export interface InventoryHistory {
  id: number
  product_id: number
  product_name: string
  action: string
  quantity_before: number
  quantity_after: number
  quantity_change: number
  performed_by: string
  reason: string
  note: string
  performed_at: string
}

export class InventoryService {
  // Lấy danh sách kho hàng của seller
  public async getSellerInventory(
    page: number,
    limit: number,
    search?: string,
    status?: number
  ): Promise<PageResponse<InventoryProduct>> {
    const response = await api.get('/inventory/seller/my-products', {
      params: {
        page,
        limit,
        search,
        status,
      },
    })
    // response is wrapped { status, message, data: {...}, timestamp }
    // Extract data property if exists, else use response as-is
    return (response.data || response) as unknown as PageResponse<InventoryProduct>
  }

  // Lấy thống kê kho hàng
  public async getInventoryStats(): Promise<InventoryStats> {
    const response = await api.get('/inventory/seller/stats')
    return (response.data || response) as unknown as InventoryStats
  }

  // Nhập kho
  public async importStock(
    productId: number,
    quantity: number,
    note?: string
  ): Promise<InventoryProduct> {
    const response = await api.post('/inventory/import', {
      product_id: productId,
      quantity,
      note,
    })
    return response as unknown as InventoryProduct
  }

  // Xuất kho
  public async exportStock(
    productId: number,
    quantity: number,
    reason?: string
  ): Promise<InventoryProduct> {
    const response = await api.post('/inventory/export', undefined, {
      params: {
        productId,
        quantity,
        reason,
      },
    })
    return response as unknown as InventoryProduct
  }

  // Điều chỉnh tồn kho
  public async adjustStock(
    productId: number,
    newQuantity: number,
    reason?: string
  ): Promise<InventoryProduct> {
    const response = await api.put('/inventory/adjust', undefined, {
      params: {
        productId,
        newQuantity,
        reason,
      },
    })
    return response as unknown as InventoryProduct
  }

  // Lấy lịch sử kho của seller
  public async getSellerInventoryHistory(
    page: number,
    limit: number
  ): Promise<PageResponse<InventoryHistory>> {
    const response = await api.get('/inventory/seller/history', {
      params: {
        page,
        limit,
      },
    })
    return response as unknown as PageResponse<InventoryHistory>
  }

  // Lấy lịch sử của 1 sản phẩm
  public async getProductHistory(productId: number): Promise<InventoryHistory[]> {
    const response = await api.get(`/inventory/product/${productId}/history`)
    return response as unknown as InventoryHistory[]
  }

  // Kiểm tra cảnh báo tồn kho
  public async checkWarningStock(productId: number): Promise<boolean> {
    const response = await api.get(`/inventory/warning/${productId}`)
    return response as unknown as boolean
  }
}
