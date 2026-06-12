'use client'

import { useState, useCallback } from 'react'
import Header from '@/components/header'
import DashboardTab from '@/components/dashboard-tab'
import UniversitiesTab from '@/components/universities-tab'
import CASInstitutesTab from '@/components/cas-institutes-tab'
import CSCGuideTab from '@/components/csc-guide-tab'
import WatchlistTab from '@/components/watchlist-tab'
import AlertsTab from '@/components/alerts-tab'
import AgentChatTab from '@/components/agent-chat-tab'

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const handleToggleWatchlist = useCallback(async (universityId: string, currentlyWatchlisted: boolean) => {
    try {
      if (currentlyWatchlisted) {
        const res = await fetch('/api/watchlist', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ universityId }),
        })
        if (!res.ok) throw new Error('Failed to remove from watchlist')
      } else {
        const res = await fetch('/api/watchlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ universityId }),
        })
        if (!res.ok) throw new Error('Failed to add to watchlist')
      }
    } catch (err) {
      console.error('Error toggling watchlist:', err)
      throw err
    }
  }, [])

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab onNavigate={setActiveTab} />
      case 'universities':
        return <UniversitiesTab onToggleWatchlist={handleToggleWatchlist} />
      case 'cas':
        return <CASInstitutesTab onNavigate={setActiveTab} />
      case 'csc-guide':
        return <CSCGuideTab />
      case 'watchlist':
        return <WatchlistTab onToggleWatchlist={handleToggleWatchlist} onNavigate={setActiveTab} />
      case 'alerts':
        return <AlertsTab onNavigate={setActiveTab} />
      case 'agent':
        return <AgentChatTab />
      default:
        return <DashboardTab onNavigate={setActiveTab} />
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-gray-950">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1">
        {renderTab()}
      </main>

      <footer className="mt-auto border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-4 text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2026 China Physics PhD Finder | Built for Nepali Students | Data updated regularly
          </p>
        </div>
      </footer>
    </div>
  )
}
