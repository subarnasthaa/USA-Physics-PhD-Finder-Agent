'use client'

import { useState, useEffect, useCallback } from 'react'
import { Search, Filter, Star, X, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import UniversityCard, { type University } from '@/components/university-card'

interface UniversitiesTabProps {
  onToggleWatchlist: (id: string, currentlyWatchlisted: boolean) => Promise<void>
  typeFilter?: string
}

export default function UniversitiesTab({ onToggleWatchlist, typeFilter }: UniversitiesTabProps) {
  const [universities, setUniversities] = useState<University[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [cscOnly, setCscOnly] = useState(false)
  const [englishOnly, setEnglishOnly] = useState(false)
  const [watchlistedOnly, setWatchlistedOnly] = useState(false)
  const [cityFilter, setCityFilter] = useState('all')
  const [fieldFilter, setFieldFilter] = useState('all')
  const [visibleCount, setVisibleCount] = useState(12)
  const [cities, setCities] = useState<string[]>([])
  const [fields, setFields] = useState<string[]>([])

  const fetchUniversities = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      if (typeFilter) params.set('type', typeFilter)
      if (cscOnly) params.set('cscOnly', 'true')
      if (englishOnly) params.set('englishOnly', 'true')
      if (watchlistedOnly) params.set('watchlisted', 'true')
      if (cityFilter && cityFilter !== 'all') params.set('city', cityFilter)
      if (fieldFilter && fieldFilter !== 'all') params.set('field', fieldFilter)

      const res = await fetch(`/api/universities?${params.toString()}`)
      if (res.ok) {
        const data = await res.json()
        setUniversities(data)
      }
    } catch (err) {
      console.error('Error fetching universities:', err)
    } finally {
      setLoading(false)
    }
  }, [search, typeFilter, cscOnly, englishOnly, watchlistedOnly, cityFilter, fieldFilter])

  // Fetch filter options once
  useEffect(() => {
    async function fetchFilters() {
      try {
        const res = await fetch('/api/universities')
        if (res.ok) {
          const data: University[] = await res.json()
          const citySet = new Set<string>()
          const fieldSet = new Set<string>()
          for (const uni of data) {
            citySet.add(uni.city)
            uni.fields.split(',').map((f) => f.trim()).filter(Boolean).forEach((f) => fieldSet.add(f))
          }
          setCities(Array.from(citySet).sort())
          setFields(Array.from(fieldSet).sort())
        }
      } catch (err) {
        console.error('Error fetching filters:', err)
      }
    }
    fetchFilters()
  }, [])

  useEffect(() => {
    fetchUniversities()
  }, [fetchUniversities])

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(12)
  }, [search, typeFilter, cscOnly, englishOnly, watchlistedOnly, cityFilter, fieldFilter])

  const handleToggleWatchlist = async (id: string, currentlyWatchlisted: boolean) => {
    try {
      await onToggleWatchlist(id, currentlyWatchlisted)
      // Update local state
      setUniversities((prev) =>
        prev.map((u) => (u.id === id ? { ...u, watchlisted: !currentlyWatchlisted } : u))
      )
    } catch (err) {
      console.error('Error toggling watchlist:', err)
    }
  }

  const hasActiveFilters = cscOnly || englishOnly || watchlistedOnly || cityFilter !== 'all' || fieldFilter !== 'all' || search !== ''

  const clearFilters = () => {
    setSearch('')
    setCscOnly(false)
    setEnglishOnly(false)
    setWatchlistedOnly(false)
    setCityFilter('all')
    setFieldFilter('all')
  }

  const visibleUniversities = universities.slice(0, visibleCount)

  return (
    <div className="space-y-4 p-4 md:p-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search universities, cities, fields, departments..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 h-10"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="size-4" />
          </button>
        )}
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
          <Filter className="size-3.5" />
          <span className="hidden sm:inline">Filters:</span>
        </div>

        {/* Toggle Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <Switch checked={cscOnly} onCheckedChange={setCscOnly} />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">CSC Only</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <Switch checked={englishOnly} onCheckedChange={setEnglishOnly} />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">English Only</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <Switch checked={watchlistedOnly} onCheckedChange={setWatchlistedOnly} />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              <Star className="size-3 inline-block text-amber-500" /> Watchlisted
            </span>
          </label>
        </div>

        {/* Dropdown Filters */}
        <div className="flex gap-2 flex-wrap">
          <Select value={cityFilter} onValueChange={setCityFilter}>
            <SelectTrigger className="w-[130px] h-8 text-xs">
              <SelectValue placeholder="All Cities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>

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

        {/* Clear Filters */}
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs text-red-600 hover:text-red-700">
            <X className="size-3 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {loading ? (
            'Loading...'
          ) : (
            <>
              Showing <span className="font-semibold text-gray-900 dark:text-white">{visibleUniversities.length}</span> of{' '}
              <span className="font-semibold text-gray-900 dark:text-white">{universities.length}</span>{' '}
              {typeFilter === 'CAS Institute' ? 'institutes' : 'universities'}
            </>
          )}
        </p>
      </div>

      {/* University Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="size-8 text-emerald-600 animate-spin" />
          <span className="ml-3 text-gray-600 dark:text-gray-400">Loading universities...</span>
        </div>
      ) : universities.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-3">🔍</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">No results found</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
          <Button variant="outline" size="sm" onClick={clearFilters} className="mt-3">
            Clear All Filters
          </Button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visibleUniversities.map((uni) => (
            <UniversityCard
              key={uni.id}
              university={uni}
              onToggleWatchlist={handleToggleWatchlist}
            />
          ))}
        </div>
      )}

      {/* Load More */}
      {visibleCount < universities.length && (
        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            onClick={() => setVisibleCount((prev) => prev + 12)}
            className="text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
          >
            Load More ({universities.length - visibleCount} remaining)
          </Button>
        </div>
      )}
    </div>
  )
}
