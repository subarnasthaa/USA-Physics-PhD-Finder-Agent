'use client'

import { useState, useEffect, useCallback } from 'react'
import { Star, Trash2, MapPin, Calendar, Award, Loader2, BookOpen } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface University {
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

interface WatchlistTabProps {
  watchlistedIds: string[]
  toggleWatchlist: (id: string) => void
  onNavigate: (tab: string) => void
  watchlistedIdsParam: string
}

export default function WatchlistTab({ watchlistedIds, toggleWatchlist, onNavigate, watchlistedIdsParam }: WatchlistTabProps) {
  const [universities, setUniversities] = useState<University[]>([])
  const [loading, setLoading] = useState(true)
  const [fieldFilter, setFieldFilter] = useState('all')
  const [fields, setFields] = useState<string[]>([])

  const fetchWatchlistedUniversities = useCallback(async () => {
    if (watchlistedIds.length === 0) {
      setUniversities([])
      setFields([])
      setLoading(false)
      return
    }
    setLoading(true)
    try {
      const params = new URLSearchParams()
      params.set('watchlistedIds', watchlistedIdsParam)
      const res = await fetch(`/api/universities?${params.toString()}`)
      if (res.ok) {
        const data: University[] = await res.json()
        // Filter to only watchlisted ones (in case API returns extras)
        const watchlistedSet = new Set(watchlistedIds)
        const filtered = data.filter((u) => watchlistedSet.has(u.id))
        setUniversities(filtered)
        // Extract fields
        const fieldSet = new Set<string>()
        for (const uni of filtered) {
          uni.fields.split(',').map((f) => f.trim()).filter(Boolean).forEach((f) => fieldSet.add(f))
        }
        setFields(Array.from(fieldSet).sort())
      }
    } catch (err) {
      console.error('Error fetching watchlisted universities:', err)
    } finally {
      setLoading(false)
    }
  }, [watchlistedIds.length, watchlistedIdsParam])

  useEffect(() => {
    fetchWatchlistedUniversities()
  }, [fetchWatchlistedUniversities])

  const handleRemove = (universityId: string) => {
    toggleWatchlist(universityId)
  }

  const filteredUniversities = fieldFilter === 'all'
    ? universities
    : universities.filter((uni) => uni.fields.includes(fieldFilter))

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
      <div>
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <Star className="size-5 text-amber-500" />
          My Watchlist
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {universities.length} {universities.length === 1 ? 'university' : 'universities'} saved
        </p>
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
      {filteredUniversities.length === 0 ? (
        <div className="text-center py-12">
          <Star className="size-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">No universities in watchlist</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            {universities.length === 0
              ? 'Start adding universities to your watchlist to track their deadlines and details.'
              : 'No universities match the selected field filter.'}
          </p>
          {universities.length === 0 && (
            <Button onClick={() => onNavigate('universities')} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Browse Universities
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredUniversities.map((uni) => {
            const fieldsArr = uni.fields.split(',').map((f) => f.trim()).filter(Boolean)
            const scholarships = uni.scholarshipTypes ? uni.scholarshipTypes.split(',').map((s) => s.trim()).filter(Boolean) : []

            return (
              <Card key={uni.id} className="hover:shadow-md transition-shadow border-gray-200 dark:border-gray-800">
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
