'use client'

import { useState, useEffect } from 'react'
import {
  Bell,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Star,
  MapPin,
  Calendar,
  Loader2,
  BellRing,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface Alert {
  id: string
  name: string
  city: string
  type: string
  deadline: string
  daysRemaining: number | null
  isWatchlisted: boolean
  fields: string
  cscDesignated: boolean
  englishProgram: boolean
  scholarshipTypes: string
}

interface AlertsTabProps {
  onNavigate: (tab: string) => void
}

export default function AlertsTab({ onNavigate }: AlertsTabProps) {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [notifyIds, setNotifyIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    async function fetchAlerts() {
      try {
        const res = await fetch('/api/alerts')
        if (res.ok) {
          const data = await res.json()
          setAlerts(data)
        }
      } catch (err) {
        console.error('Error fetching alerts:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchAlerts()
  }, [])

  const toggleNotify = (id: string) => {
    setNotifyIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const filteredAlerts = filter === 'all'
    ? alerts
    : filter === 'urgent'
      ? alerts.filter((a) => a.daysRemaining !== null && a.daysRemaining < 30)
      : filter === 'watchlisted'
        ? alerts.filter((a) => a.isWatchlisted)
        : filter === 'upcoming'
          ? alerts.filter((a) => a.daysRemaining !== null && a.daysRemaining >= 30 && a.daysRemaining < 60)
          : alerts

  const urgentCount = alerts.filter((a) => a.daysRemaining !== null && a.daysRemaining < 30).length
  const upcomingCount = alerts.filter((a) => a.daysRemaining !== null && a.daysRemaining >= 30 && a.daysRemaining < 60).length
  const watchlistedAlertCount = alerts.filter((a) => a.isWatchlisted).length

  const getAlertColor = (daysRemaining: number | null) => {
    if (daysRemaining === null) return 'gray'
    if (daysRemaining < 30) return 'red'
    if (daysRemaining < 60) return 'amber'
    return 'emerald'
  }

  const getAlertIcon = (daysRemaining: number | null) => {
    if (daysRemaining === null) return Clock
    if (daysRemaining < 30) return AlertTriangle
    if (daysRemaining < 60) return Bell
    return CheckCircle2
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="size-8 text-emerald-600 animate-spin" />
        <span className="ml-3 text-gray-600 dark:text-gray-400">Loading alerts...</span>
      </div>
    )
  }

  return (
    <div className="space-y-4 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Bell className="size-5 text-red-600" />
            Deadline Alerts
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track application deadlines for your target universities
          </p>
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[160px] h-8 text-xs">
            <SelectValue placeholder="All Alerts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Alerts ({alerts.length})</SelectItem>
            <SelectItem value="urgent">Urgent (&lt;30 days) ({urgentCount})</SelectItem>
            <SelectItem value="upcoming">Upcoming (30-60 days) ({upcomingCount})</SelectItem>
            <SelectItem value="watchlisted">Watchlisted ({watchlistedAlertCount})</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
          <CardContent className="p-3 text-center">
            <div className="text-2xl font-bold text-red-700 dark:text-red-400">{urgentCount}</div>
            <div className="text-xs text-red-600 dark:text-red-500">Urgent (&lt;30d)</div>
          </CardContent>
        </Card>
        <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
          <CardContent className="p-3 text-center">
            <div className="text-2xl font-bold text-amber-700 dark:text-amber-400">{upcomingCount}</div>
            <div className="text-xs text-amber-600 dark:text-amber-500">Upcoming (30-60d)</div>
          </CardContent>
        </Card>
        <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800">
          <CardContent className="p-3 text-center">
            <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">
              {alerts.filter((a) => a.daysRemaining !== null && a.daysRemaining >= 60).length}
            </div>
            <div className="text-xs text-emerald-600 dark:text-emerald-500">Safe (&gt;60d)</div>
          </CardContent>
        </Card>
      </div>

      {/* Alert List */}
      {filteredAlerts.length === 0 ? (
        <div className="text-center py-12">
          <BellRing className="size-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">No alerts found</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {filter === 'all'
              ? 'No deadline alerts at this time. Add universities to your watchlist to get alerts.'
              : 'No alerts match the selected filter.'}
          </p>
          <Button variant="outline" size="sm" onClick={() => onNavigate('universities')} className="mt-3">
            Browse Universities
          </Button>
        </div>
      ) : (
        <div className="space-y-2 max-h-[calc(100vh-350px)] overflow-y-auto">
          {filteredAlerts.map((alert) => {
            const color = getAlertColor(alert.daysRemaining)
            const Icon = getAlertIcon(alert.daysRemaining)
            const isNotified = notifyIds.has(alert.id)

            const colorClasses = {
              red: {
                border: 'border-l-red-500',
                bg: 'bg-red-50 dark:bg-red-950/20',
                icon: 'text-red-500',
                badge: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
              },
              amber: {
                border: 'border-l-amber-500',
                bg: 'bg-amber-50 dark:bg-amber-950/20',
                icon: 'text-amber-500',
                badge: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
              },
              emerald: {
                border: 'border-l-emerald-500',
                bg: 'bg-emerald-50 dark:bg-emerald-950/20',
                icon: 'text-emerald-500',
                badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
              },
              gray: {
                border: 'border-l-gray-400',
                bg: 'bg-gray-50 dark:bg-gray-900/20',
                icon: 'text-gray-400',
                badge: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
              },
            }[color]

            return (
              <Card
                key={alert.id}
                className={`border-l-4 ${colorClasses.border} hover:shadow-sm transition-shadow`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Icon className={`size-5 ${colorClasses.icon} shrink-0 mt-0.5`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {alert.name}
                        </h3>
                        {alert.isWatchlisted && (
                          <Star className="size-3.5 text-amber-500 fill-current shrink-0" />
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                        <MapPin className="size-3" />
                        <span>{alert.city}</span>
                        <span>·</span>
                        <Badge variant="outline" className="text-xs py-0 px-1">
                          {alert.type}
                        </Badge>
                        {alert.cscDesignated && (
                          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 text-xs py-0 px-1">
                            CSC
                          </Badge>
                        )}
                        {alert.englishProgram && (
                          <Badge className="bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400 text-xs py-0 px-1">
                            English
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-2 flex-wrap">
                        <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
                          <Calendar className="size-3" />
                          <span>{alert.deadline}</span>
                        </div>
                        {alert.daysRemaining !== null ? (
                          <Badge className={`${colorClasses.badge} text-xs`}>
                            {alert.daysRemaining < 0
                              ? `${Math.abs(alert.daysRemaining)} days past`
                              : `${alert.daysRemaining} days remaining`}
                          </Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 text-xs">
                            Rolling/TBD
                          </Badge>
                        )}
                      </div>

                      {/* Fields */}
                      <div className="flex flex-wrap gap-1 mt-2">
                        {alert.fields.split(',').slice(0, 4).map((f) => (
                          <Badge key={f.trim()} variant="outline" className="text-xs font-normal py-0">
                            {f.trim()}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Notify Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleNotify(alert.id)}
                      className={`shrink-0 text-xs ${isNotified ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30' : 'text-gray-400'}`}
                    >
                      <BellRing className="size-3.5 mr-1" />
                      {isNotified ? 'On' : 'Notify'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
