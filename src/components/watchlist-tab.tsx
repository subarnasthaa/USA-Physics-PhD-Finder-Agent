'use client'

import { useState, useEffect, useCallback } from 'react'
import { Star, Trash2, RefreshCw, MapPin, Calendar, Award, Loader2, BookOpen } from 'lucide-react'
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

interface WatchlistItem {
  id: string
  universityId: string
  fieldName: string | null
  addedAt: string
  university: {
    id: string
    name: string
    city: string
    province: string
    type: string
    department: string
    fields: string
    deadline: string
    englishProgram: boolean
    cscDesignated: boolean
    scholarshipTypes: string
    url: string
    notableProfessors: string
    notesForNepali: string | null
  }
}

interface WatchlistTabProps {
  onToggleWatchlist: (id: string, currentlyWatchlisted: boolean) => Promise<void>
  onNavigate: (tab: string) => void
}

export default function WatchlistTab({ onToggleWatchlist, onNavigate }: WatchlistTabProps) {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([])
  const [loading, setLoading] = useState(true)
  const [fieldFilter, setFieldFilter] = useState('all')
  const [lastSync, setLastSync] = useState<Date>(new Date())
  const [syncing, setSyncing] = useState(false)
  const [fields, setFields] = useState<string[]>([])

  const fetchWatchlist = useCallback(async () => {
    try {
      const res = await fetch('/api/watchlist')
      if (res.ok) {
        const data = await res.json()
        setWatchlist(data)
        // Extract fields
        const fieldSet = new Set<string>()
        for (const item of data) {
          item.university.fields.split(',').map((f: string) => f.trim()).filter(Boolean).forEach((f: string) => fieldSet.add(f))
        }
        setFields(Array.from(fieldSet).sort())
      }
    } catch (err) {
      console.error('Error fetching watchlist:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchWatchlist()
  }, [fetchWatchlist])

  const handleRemove = async (universityId: string) => {
    try {
      await onToggleWatchlist(universityId, true)
      setWatchlist((prev) => prev.filter((item) => item.universityId !== universityId))
    } catch (err) {
      console.error('Error removing from watchlist:', err)
    }
  }

  const handleSync = async () => {
    setSyncing(true)
    try {
      await fetchWatchlist()
      setLastSync(new Date())
    } finally {
      setSyncing(false)
    }
  }

  const filteredWatchlist = fieldFilter === 'all'
    ? watchlist
    : watchlist.filter((item) => item.university.fields.includes(fieldFilter))

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="size-8 text-emerald-600 animate-spin" />
        <span className="ml-3 text-gray-600 dark:text-gray-400">Loading watchlist...</span>
      </div>
    )
  }

  return (
    <div className="space-y-4 p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Star className="size-5 text-amber-500" />
            My Watchlist
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {watchlist.length} {watchlist.length === 1 ? 'university' : 'universities'} saved
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSync}
            disabled={syncing}
            className="text-xs"
          >
            <RefreshCw className={`size-3.5 mr-1 ${syncing ? 'animate-spin' : ''}`} />
            Sync
          </Button>
          <span className="text-xs text-gray-400 dark:text-gray-500">
            Last sync: {lastSync.toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Field Filter */}
      {fields.length > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">Filter by field:</span>
          <Select value={fieldFilter} onValueChange={setFieldFilter}>
            <SelectTrigger className="w-[160px] h-8 text-xs">
              <SelectValue placeholder="All Fields" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Fields</SelectItem>
              {fields.map((field) => (
                <SelectItem key={field} value={field}>{field}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Watchlist Items */}
      {filteredWatchlist.length === 0 ? (
        <div className="text-center py-12">
          <Star className="size-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">No universities in watchlist</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            {watchlist.length === 0
              ? 'Start adding universities to your watchlist to track their deadlines and details.'
              : 'No universities match the selected field filter.'}
          </p>
          {watchlist.length === 0 && (
            <Button onClick={() => onNavigate('universities')} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Browse Universities
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredWatchlist.map((item) => {
            const uni = item.university
            const fieldsArr = uni.fields.split(',').map((f) => f.trim()).filter(Boolean)
            const scholarships = uni.scholarshipTypes ? uni.scholarshipTypes.split(',').map((s) => s.trim()).filter(Boolean) : []

            return (
              <Card key={item.id} className="hover:shadow-md transition-shadow border-gray-200 dark:border-gray-800">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0 space-y-2">
                      {/* Name & City */}
                      <div>
                        <h3 className="text-base font-semibold text-gray-900 dark:text-white truncate">{uni.name}</h3>
                        <div className="flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                          <MapPin className="size-3.5 shrink-0" />
                          <span>{uni.city}, {uni.province}</span>
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-1.5">
                        <Badge variant={uni.type === 'CAS Institute' ? 'default' : 'secondary'} className={
                          uni.type === 'CAS Institute'
                            ? 'bg-red-600 hover:bg-red-700 text-white text-xs'
                            : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 text-xs'
                        }>
                          {uni.type}
                        </Badge>
                        {uni.cscDesignated && (
                          <Badge className="bg-emerald-600 text-white text-xs">CSC</Badge>
                        )}
                        {uni.englishProgram && (
                          <Badge className="bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300 text-xs">English</Badge>
                        )}
                      </div>

                      {/* Department */}
                      <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                        <BookOpen className="size-3.5 shrink-0" />
                        <span className="truncate">{uni.department}</span>
                      </div>

                      {/* Fields */}
                      <div className="flex flex-wrap gap-1">
                        {fieldsArr.map((field) => (
                          <Badge key={field} variant="outline" className="text-xs font-normal">{field}</Badge>
                        ))}
                      </div>

                      {/* Deadline */}
                      <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
                        <Calendar className="size-3.5 shrink-0" />
                        <span>Deadline: <span className="font-medium">{uni.deadline}</span></span>
                      </div>

                      {/* Scholarships */}
                      {scholarships.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {scholarships.map((s) => (
                            <Badge key={s} variant="outline" className="text-xs font-normal bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border-amber-200 dark:border-amber-800">
                              <Award className="size-3 mr-0.5" />
                              {s}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Added date */}
                      <div className="text-xs text-gray-400 dark:text-gray-500">
                        Added: {new Date(item.addedAt).toLocaleDateString()}
                        {item.fieldName && ` · Field: ${item.fieldName}`}
                      </div>
                    </div>

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemove(uni.id)}
                      className="shrink-0 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                      aria-label="Remove from watchlist"
                    >
                      <Trash2 className="size-4" />
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
