import { CustomerLayout } from '@/components/shared/layout'

export default function ProductsPage() {
  return (
    <CustomerLayout>
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>🛍️ Trang sản phẩm</h1>
        <p>Đây là demo trang sản phẩm với Header và Footer hoàn chỉnh</p>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '20px',
          marginTop: '40px',
          maxWidth: '1200px',
          margin: '40px auto'
        }}>
          {Array.from({length: 8}).map((_, i) => (
            <div key={i} style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              padding: '20px',
              background: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}>
              <div style={{ height: '200px', background: '#f0f0f0', borderRadius: '4px', marginBottom: '10px' }}></div>
              <h3>Sản phẩm {i + 1}</h3>
              <p style={{ color: '#1890ff', fontSize: '18px', fontWeight: 'bold' }}>
                {(Math.random() * 1000000 + 100000).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}đ
              </p>
            </div>
          ))}
        </div>
      </div>
    </CustomerLayout>
  )
}