/**
 * Date Helper - Tiện ích định dạng ngày tháng và thời gian
 */

export class DateHelper {
  
  // Định dạng ngày theo format Việt Nam
  static formatDate(date: Date | string | number, options?: {
    includeTime?: boolean
    format?: 'short' | 'medium' | 'long' | 'full'
  }): string {
    const { includeTime = false, format = 'medium' } = options || {}
    const dateObj = new Date(date)
    
    if (includeTime) {
      return new Intl.DateTimeFormat('vi-VN', {
        dateStyle: format,
        timeStyle: 'short'
      }).format(dateObj)
    }
    
    return new Intl.DateTimeFormat('vi-VN', {
      dateStyle: format
    }).format(dateObj)
  }

  // Chỉ định dạng thời gian
  static formatTime(date: Date | string | number): string {
    const dateObj = new Date(date)
    return new Intl.DateTimeFormat('vi-VN', {
      timeStyle: 'short'
    }).format(dateObj)
  }

  // Lấy thời gian tương đối (ví dụ: "2 giờ trước", "trong 3 ngày")
  static getRelativeTime(date: Date | string | number, baseDate?: Date): string {
    const dateObj = new Date(date)
    const base = baseDate || new Date()
    
    const rtf = new Intl.RelativeTimeFormat('vi', { numeric: 'auto' })
    const diffInSeconds = (dateObj.getTime() - base.getTime()) / 1000
    
    const intervals = [
      { unit: 'year' as const, seconds: 31536000 },
      { unit: 'month' as const, seconds: 2628000 },
      { unit: 'day' as const, seconds: 86400 },
      { unit: 'hour' as const, seconds: 3600 },
      { unit: 'minute' as const, seconds: 60 },
      { unit: 'second' as const, seconds: 1 }
    ]
    
    for (const interval of intervals) {
      const count = Math.floor(Math.abs(diffInSeconds) / interval.seconds)
      if (count >= 1) {
        return rtf.format(diffInSeconds > 0 ? count : -count, interval.unit)
      }
    }
    
    return rtf.format(0, 'second')
  }

  // Kiểm tra xem ngày có phải hôm nay không
  static isToday(date: Date | string | number): boolean {
    const dateObj = new Date(date)
    const today = new Date()
    
    return dateObj.toDateString() === today.toDateString()
  }

  // Kiểm tra xem ngày có phải hôm qua không
  static isYesterday(date: Date | string | number): boolean {
    const dateObj = new Date(date)
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    
    return dateObj.toDateString() === yesterday.toDateString()
  }

  // Định dạng khoảng thời gian
  static formatDateRange(startDate: Date | string | number, endDate: Date | string | number): string {
    const start = DateHelper.formatDate(startDate, { format: 'short' })
    const end = DateHelper.formatDate(endDate, { format: 'short' })
    return `${start} - ${end}`
  }

  // Tính tuổi từ ngày sinh
  static getAge(birthDate: Date | string | number): number {
    const birth = new Date(birthDate)
    const today = new Date()
    
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    
    return age
  }

  // Định dạng thời lượng từ milliseconds thành dạng dễ đọc
  static formatDuration(duration: number): string {
    const seconds = Math.floor(duration / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    
    if (days > 0) return `${days} ngày`
    if (hours > 0) return `${hours} giờ`
    if (minutes > 0) return `${minutes} phút`
    return `${seconds} giây`
  }
}