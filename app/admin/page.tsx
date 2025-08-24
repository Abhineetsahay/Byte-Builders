import React from 'react'
import { requireAdmin } from '@/lib/utils'
import  AdminDashboard  from '@/components/admin/admin-dashboard'

const AdminPage = async () => {
  // This will redirect to login if not authenticated or to dashboard if not admin
  const session = await requireAdmin()

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminDashboard/>
    </div>
  )
}

export default AdminPage
