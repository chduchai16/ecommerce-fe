export class WishlistService {
    private storageKey = 'wishlist'

    /** đọc danh sách yêu thích */
    getAll(): number[] {
        try {
            const raw = localStorage.getItem(this.storageKey)
            if (!raw) return []
            const parsed = JSON.parse(raw)
            if (Array.isArray(parsed)) return parsed.map((v) => Number(v))
            return []
        } catch (_e) {
            console.error('Failed to read wishlist from localStorage', _e)
            return []
        }
    }

    /** Ghi đè danh sách yêu thích vào bộ nhớ và phát sự kiện cập nhật */
    setWishlist(wishlist: number[]) {
        try {
            const toSave = Array.from(new Set(wishlist.map((v) => Number(v))))
            localStorage.setItem(this.storageKey, JSON.stringify(toSave))
            // Phát sự kiện toàn cục để các phần khác của ứng dụng có thể phản ứng (biểu tượng trên tiêu đề, trang danh sách yêu thích)
            try {
                window.dispatchEvent(new CustomEvent('wishlist:update', { detail: toSave }))
            } catch {

            }
            return toSave
        } catch {
            console.error('Failed to save wishlist to localStorage')
            return wishlist
        }
    }

    /**
     * Thêm một id vào danh sách yêu thích.
     */
    add(productId: number): number | null {
        const ids = this.getAll()
        if (ids.includes(productId)) return null
        ids.push(productId)
        this.setWishlist(ids)
        return productId
    }

    /**
     * Loại bỏ một id khỏi danh sách yêu thích.
     */
    remove(productId: number): number | null {
        const ids = this.getAll()
        if (!ids.includes(productId)) return null
        const filtered = ids.filter((id) => id !== productId)
        this.setWishlist(filtered)
        return productId
    }

    /** Xóa toàn bộ danh sách yêu thích */
    clear() {
        try {
            localStorage.removeItem(this.storageKey)
            try {
                window.dispatchEvent(new CustomEvent('wishlist:update', { detail: [] }))
            } catch { }
        } catch {
            console.error('Failed to clear wishlist')
        }
    }
}

const wishlistService = new WishlistService()
export default wishlistService
