export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div 
      className="auth-layout"
      style={{
        margin: 0,
        padding: 0,
        minHeight: '100vh',
        width: '100%'
      }}
    >
      <main 
        className="auth-main"
        style={{
          margin: 0,
          padding: 0,
          minHeight: '100vh',
          width: '100%'
        }}
      >
        {children}
      </main>
    </div>
  )
}
