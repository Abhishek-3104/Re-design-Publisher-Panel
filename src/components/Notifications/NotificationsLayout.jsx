import React from 'react'
import { Outlet } from 'react-router'

export default function NotificationsLayout() {
  return (
     <div className="min-h-screen">
      <Outlet />
    </div>
  )
}
