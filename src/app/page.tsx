'use client'

import { useEffect, useState } from 'react'
import Map from '@/components/Map'
import TeamFilter from '@/components/TeamFilter'
import TeamStats from '@/components/TeamStats'
import TeamComparison from '@/components/TeamComparison'
import { Loading } from '@/components/ui/loading'
import { Toast, useToast } from '@/components/ui/toast'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const { toast, showToast, hideToast } = useToast()

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <main className="min-h-screen p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          <Loading />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">IPL Insights Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <TeamFilter />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="">
              <Map />
            </div>
            <div className="mt-4 md:mt-8">
              <TeamComparison />
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 order-3">
            <div className="sticky top-4">
              <TeamStats />
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}
    </main>
  )
}
