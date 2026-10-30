import AdminSidebar from '@/components/(admin)/admin/AdminSidebar'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-white">
      <AdminSidebar />

      <main className="min-w-0 flex-1 overflow-y-auto bg-gray-50">
        {children}
      </main>
    </div>
  )
}

export default Layout
