export class NumberHelper {
  // Định dạng số với dấu phân cách hàng nghìn
  static formatNumber(value: number, locale: string = 'vi-VN'): string {
    return new Intl.NumberFormat(locale).format(value);
  }

  // Định dạng số dạng compact (1K, 1M, v.v.)
  static formatCompactNumber(value: number, locale: string = 'vi-VN'): string {
    return new Intl.NumberFormat(locale, {
      notation: 'compact',
      compactDisplay: 'short'
    }).format(value);
  }

  // Làm tròn số đến số chữ số thập phân chỉ định
  static roundTo(value: number, decimals: number = 2): number {
    return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
  }

  // Giới hạn số trong khoảng min và max
  static clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }

  // Kiểm tra xem số có trong khoảng không
  static inRange(value: number, min: number, max: number): boolean {
    return value >= min && value <= max;
  }

  // Tạo số ngẫu nhiên giữa min và max
  static random(min: number, max: number, isInteger: boolean = false): number {
    const random = Math.random() * (max - min) + min;
    return isInteger ? Math.floor(random) : random;
  }

  // Tính phần trăm của một giá trị
  static percentage(part: number, total: number, decimals: number = 1): number {
    if (total === 0) return 0;
    return this.roundTo((part / total) * 100, decimals);
  }

  // Tính trung bình của một mảng số
  static average(numbers: number[]): number {
    if (numbers.length === 0) return 0;
    const sum = numbers.reduce((acc, num) => acc + num, 0);
    return sum / numbers.length;
  }

  // Tìm số trung vị của một mảng số
  static median(numbers: number[]): number {
    if (numbers.length === 0) return 0;
    
    const sorted = [...numbers].sort((a, b) => a - b);
    const middle = Math.floor(sorted.length / 2);
    
    if (sorted.length % 2 === 0) {
      return (sorted[middle - 1] + sorted[middle]) / 2;
    }
    
    return sorted[middle];
  }

  // Tính tổng của một mảng số
  static sum(numbers: number[]): number {
    return numbers.reduce((acc, num) => acc + num, 0);
  }

  // Định dạng kích thước file từ bytes thành dạng dễ đọc
  static formatFileSize(bytes: number, decimals: number = 2): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return (
      this.roundTo(bytes / Math.pow(k, i), decimals) + ' ' + sizes[i]
    );
  }

  // Parse số từ chuỗi với giá trị dự phòng
  static parseNumber(value: string | number, fallback: number = 0): number {
    if (typeof value === 'number') return value;
    const parsed = parseFloat(value);
    return isNaN(parsed) ? fallback : parsed;
  }

  // Định dạng rating với ngôi sao
  static formatRating(rating: number, maxStars: number = 5): {
    fullStars: number;
    halfStars: number;
    emptyStars: number;
    percentage: number;
  } {
    const clampedRating = this.clamp(rating, 0, maxStars);
    const fullStars = Math.floor(clampedRating);
    const hasHalfStar = clampedRating % 1 >= 0.5;
    const halfStars = hasHalfStar ? 1 : 0;
    const emptyStars = maxStars - fullStars - halfStars;
    const percentage = (clampedRating / maxStars) * 100;

    return {
      fullStars,
      halfStars,
      emptyStars,
      percentage: this.roundTo(percentage, 1)
    };
  }
}