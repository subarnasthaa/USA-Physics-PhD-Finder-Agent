'use client'

import { useState, useEffect } from 'react'
import {
  GraduationCap,
  Award,
  Globe,
  Languages,
  ArrowRight,
  MapPin,
  BarChart3,
  Bell,
  BookOpen,
  Star,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Stats {
  totalUniversities: number
  totalCASInstitutes: number
  cscDesignatedCount: number
  englishProgramsCount: number
  watchlistedCount: number
  topFields: { field: string; count: number }[]
  topCities: { city: string; count: number }[]
}

interface Alert {
  id: string
  name: string
  city: string
  type: string
  deadline: string
  daysRemaining: number | null
  isWatchlisted: boolean
  fields: string
}

interface DashboardTabProps {
  onNavigate: (tab: string) => void
  watchlistedIdsParam: string
}

export default function DashboardTab({ onNavigate, watchlistedIdsParam }: DashboardTabProps) {
  const [stats, setStats] = useState<Stats | null>(null)
  const [recentAlerts, setRecentAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, alertsRes] = await Promise.all([
          fetch(watchlistedIdsParam ? `/api/stats?watchlistedIds=${watchlistedIdsParam}` : '/api/stats'),
          fetch(watchlistedIdsParam ? `/api/alerts?watchlistedIds=${watchlistedIdsParam}` : '/api/alerts'),
        ])
        if (statsRes.ok) {
          const statsData = await statsRes.json()
          setStats(statsData)
        }
        if (alertsRes.ok) {
          const alertsData = await alertsRes.json()
          setRecentAlerts(alertsData.slice(0, 5))
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="space-y-6 p-4 md:p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="h-72 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
          <div className="h-72 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />
        </div>
      </div>
    )
  }

  const statCards = [
    {
      label: 'Total Universities',
      value: stats?.totalUniversities ?? 34,
      icon: GraduationCap,
      color: 'emerald',
      bgClass: 'bg-emerald-50 dark:bg-emerald-950/30',
      iconBgClass: 'bg-emerald-100 dark:bg-emerald-900/50',
      iconClass: 'text-emerald-600 dark:text-emerald-400',
      valueClass: 'text-emerald-700 dark:text-emerald-300',
    },
    {
      label: 'CAS Institutes',
      value: stats?.totalCASInstitutes ?? 14,
      icon: Award,
      color: 'red',
      bgClass: 'bg-red-50 dark:bg-red-950/30',
      iconBgClass: 'bg-red-100 dark:bg-red-900/50',
      iconClass: 'text-red-600 dark:text-red-400',
      valueClass: 'text-red-700 dark:text-red-300',
    },
    {
      label: 'CSC Designated',
      value: stats?.cscDesignatedCount ?? 48,
      icon: Globe,
      color: 'emerald',
      bgClass: 'bg-emerald-50 dark:bg-emerald-950/30',
      iconBgClass: 'bg-emerald-100 dark:bg-emerald-900/50',
      iconClass: 'text-emerald-600 dark:text-emerald-400',
      valueClass: 'text-emerald-700 dark:text-emerald-300',
    },
    {
      label: 'English Programs',
      value: stats?.englishProgramsCount ?? 0,
      icon: Languages,
      color: 'sky',
      bgClass: 'bg-sky-50 dark:bg-sky-950/30',
      iconBgClass: 'bg-sky-100 dark:bg-sky-900/50',
      iconClass: 'text-sky-600 dark:text-sky-400',
      valueClass: 'text-sky-700 dark:text-sky-300',
    },
  ]

  const maxFieldCount = stats?.topFields?.[0]?.count ?? 1

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 dark:from-emerald-700 dark:to-emerald-800 rounded-xl p-4 md:p-6 text-white">
        <h2 className="text-xl md:text-2xl font-bold mb-1">
          Namaste! 🙏 Welcome to China Physics PhD Finder
        </h2>
        <p className="text-emerald-100 text-sm md:text-base">
          Your comprehensive guide to finding PhD programs in China. Explore universities, CAS institutes, CSC scholarships, and get AI-powered assistance for your application journey.
        </p>
        <div className="flex flex-wrap gap-2 mt-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onNavigate('universities')}
            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
          >
            Browse Universities
            <ArrowRight className="size-3.5 ml-1" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onNavigate('csc-guide')}
            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
          >
            CSC Scholarship Guide
            <ArrowRight className="size-3.5 ml-1" />
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <Card key={card.label} className={`${card.bgClass} border-0`}>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className={`size-10 rounded-lg ${card.iconBgClass} flex items-center justify-center`}>
                    <Icon className={`size-5 ${card.iconClass}`} />
                  </div>
                  <div>
                    <div className={`text-2xl font-bold ${card.valueClass}`}>{card.value}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{card.label}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts & Lists */}
      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        {/* Top Research Fields */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <BarChart3 className="size-4 text-emerald-600" />
              Top Research Fields
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {(stats?.topFields ?? []).slice(0, 10).map((item) => (
              <div key={item.field} className="flex items-center gap-2">
                <div className="w-28 md:w-36 text-xs text-gray-700 dark:text-gray-300 truncate shrink-0">
                  {item.field}
                </div>
                <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full h-5 overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 dark:bg-emerald-600 rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(8, (item.count / maxFieldCount) * 100)}%` }}
                  />
                </div>
                <div className="text-xs font-semibold text-gray-700 dark:text-gray-300 w-6 text-right">
                  {item.count}
                </div>
              </div>
            ))}
            {(!stats?.topFields || stats.topFields.length === 0) && (
              <p className="text-sm text-gray-500">No data available</p>
            )}
          </CardContent>
        </Card>

        {/* Top Cities */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <MapPin className="size-4 text-red-600" />
              Top Cities for Physics PhD
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {(stats?.topCities ?? []).map((item, idx) => (
                <div key={item.city} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <div className={`size-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    idx === 0 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400' :
                    idx === 1 ? 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' :
                    idx === 2 ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400' :
                    'bg-gray-50 text-gray-500 dark:bg-gray-800/50 dark:text-gray-500'
                  }`}>
                    {idx + 1}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{item.city}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{item.count} programs</div>
                  </div>
                  <div className="size-2 rounded-full bg-emerald-500" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Links & Recent Alerts */}
      <div className="grid md:grid-cols-2 gap-4 md:gap-6">
        {/* Quick Links */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-base">
              <BookOpen className="size-4 text-emerald-600" />
              Quick Links
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <button
              onClick={() => onNavigate('csc-guide')}
              className="w-full flex items-center gap-3 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 hover:bg-emerald-100 dark:hover:bg-emerald-950/40 transition-colors text-left"
            >
              <div className="size-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <Globe className="size-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white">CSC Scholarship Guide</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Complete guide for Nepali students</div>
              </div>
              <ArrowRight className="size-4 text-gray-400 ml-auto" />
            </button>
            <button
              onClick={() => onNavigate('watchlist')}
              className="w-full flex items-center gap-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-950/20 hover:bg-amber-100 dark:hover:bg-amber-950/40 transition-colors text-left"
            >
              <div className="size-10 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0">
                <Star className="size-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white">My Watchlist</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{stats?.watchlistedCount ?? 0} universities saved</div>
              </div>
              <ArrowRight className="size-4 text-gray-400 ml-auto" />
            </button>
            <button
              onClick={() => onNavigate('agent')}
              className="w-full flex items-center gap-3 p-3 rounded-lg bg-purple-50 dark:bg-purple-950/20 hover:bg-purple-100 dark:hover:bg-purple-950/40 transition-colors text-left"
            >
              <div className="size-10 rounded-lg bg-purple-600 text-white flex items-center justify-center shrink-0">
                <Award className="size-5" />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white">AI Agent</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Get personalized guidance</div>
              </div>
              <ArrowRight className="size-4 text-gray-400 ml-auto" />
            </button>
          </CardContent>
        </Card>

        {/* Recent Alerts */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-base">
                <Bell className="size-4 text-red-600" />
                Recent Deadline Alerts
              </CardTitle>
              <Button variant="ghost" size="sm" onClick={() => onNavigate('alerts')} className="text-xs text-emerald-600">
                View All
                <ArrowRight className="size-3 ml-1" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {recentAlerts.length === 0 ? (
              <p className="text-sm text-gray-500 dark:text-gray-400 py-4 text-center">No upcoming deadline alerts</p>
            ) : (
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <div className={`size-2 rounded-full shrink-0 ${
                      alert.daysRemaining === null ? 'bg-gray-400' :
                      alert.daysRemaining < 30 ? 'bg-red-500' :
                      alert.daysRemaining < 60 ? 'bg-amber-500' :
                      'bg-emerald-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {alert.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {alert.deadline}
                      </div>
                    </div>
                    {alert.daysRemaining !== null && (
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full shrink-0 ${
                        alert.daysRemaining < 30 ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                        alert.daysRemaining < 60 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' :
                        'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                      }`}>
                        {alert.daysRemaining}d
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
