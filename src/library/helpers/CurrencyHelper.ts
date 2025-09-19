/**
 * Currency Helper - Tiện ích định dạng tiền tệ và phần trăm
 */

export class CurrencyHelper {
  
  // Định dạng số thành tiền tệ Việt Nam (VNĐ)
  static formatVND(amount: number, options?: {
    showDecimals?: boolean
    notation?: 'standard' | 'compact' | 'scientific' | 'engineering'
  }): string {
    const { showDecimals = false, notation = 'standard' } = options || {}
    
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: showDecimals ? 2 : 0,
      maximumFractionDigits: showDecimals ? 2 : 0,
      notation
    }).format(amount)
  }

  // Định dạng tiền tệ dạng rút gọn (ví dụ: 1.2M, 500K)
  static formatCompactVND(amount: number): string {
    return CurrencyHelper.formatVND(amount, { notation: 'compact' })
  }

  // Định dạng số thành phần trăm
  static formatPercentage(value: number, decimals: number = 0): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'percent',
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value)
  }

  // Tính phần trăm giảm giá
  static calculateDiscountPercentage(originalPrice: number, currentPrice: number): number {
    if (originalPrice <= 0) return 0
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100)
  }

  // Định dạng giảm giá thành chuỗi phần trăm
  static formatDiscount(originalPrice: number, currentPrice: number): string {
    const discount = CurrencyHelper.calculateDiscountPercentage(originalPrice, currentPrice)
    return `${discount}%`
  }

  // Định dạng phần trăm giảm giá thành chuỗi
  static formatDiscountPercent(discountPercent: number): string {
    return `-${discountPercent}%`
  }

  // Kiểm tra xem giá có được giảm không
  static hasDiscount(originalPrice: number, currentPrice: number): boolean {
    return originalPrice > currentPrice && originalPrice > 0
  }

  // Định dạng số với dấu phân cách hàng nghìn
  static formatNumber(num: number): string {
    return new Intl.NumberFormat('vi-VN').format(num)
  }

  // Định dạng khoảng giá
  static formatPriceRange(minPrice: number, maxPrice: number): string {
    const min = CurrencyHelper.formatCompactVND(minPrice)
    const max = CurrencyHelper.formatCompactVND(maxPrice)
    return `${min} - ${max}`
  }
}