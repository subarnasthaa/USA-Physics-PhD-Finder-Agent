'use client'

import { useState, useEffect, useCallback } from 'react'
import { Search, Filter, Star, X, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import UniversityCard from '@/components/university-card'

interface UniversitiesTabProps {
  watchlistedIdsParam: string
  toggleWatchlist: (id: string) => void
  isWatchlisted: (id: string) => boolean
  typeFilter?: string
}

export default function UniversitiesTab({ watchlistedIdsParam, toggleWatchlist, isWatchlisted, typeFilter }: UniversitiesTabProps) {
  const [universities, setUniversities] = useState<Record<string, unknown>[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [fundedOnly, setFundedOnly] = useState(false)
  const [greNotRequired, setGreNotRequired] = useState(false)
  const [watchlistedOnly, setWatchlistedOnly] = useState(false)
  const [stateFilter, setStateFilter] = useState('all')
  const [fieldFilter, setFieldFilter] = useState('all')
  const [visibleCount, setVisibleCount] = useState(12)
  const [states, setStates] = useState<string[]>([])
  const [fields, setFields] = useState<string[]>([])

  const fetchUniversities = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (search) params.set('search', search)
      if (typeFilter) params.set('type', typeFilter)
      if (fundedOnly) params.set('fundedOnly', 'true')
      if (greNotRequired) params.set('greNotRequired', 'true')
      if (watchlistedOnly) params.set('watchlisted', 'true')
      if (stateFilter && stateFilter !== 'all') params.set('state', stateFilter)
      if (fieldFilter && fieldFilter !== 'all') params.set('field', fieldFilter)
      if (watchlistedIdsParam) params.set('watchlistedIds', watchlistedIdsParam)

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
  }, [search, typeFilter, fundedOnly, greNotRequired, watchlistedOnly, stateFilter, fieldFilter, watchlistedIdsParam])

  // Fetch filter options once
  useEffect(() => {
    async function fetchFilters() {
      try {
        const res = await fetch('/api/universities')
        if (res.ok) {
          const data: Record<string, unknown>[] = await res.json()
          const stateSet = new Set<string>()
          const fieldSet = new Set<string>()
          for (const uni of data) {
            if (uni.state && typeof uni.state === 'string') stateSet.add(uni.state)
            if (uni.fields && typeof uni.fields === 'string') {
              uni.fields.split(',').map((f) => f.trim()).filter(Boolean).forEach((f) => fieldSet.add(f))
            }
          }
          setStates(Array.from(stateSet).sort())
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
  }, [search, typeFilter, fundedOnly, greNotRequired, watchlistedOnly, stateFilter, fieldFilter])

  const handleToggleWatchlist = (id: string) => {
    toggleWatchlist(id)
  }

  const hasActiveFilters = fundedOnly || greNotRequired || watchlistedOnly || stateFilter !== 'all' || fieldFilter !== 'all' || search !== ''

  const clearFilters = () => {
    setSearch('')
    setFundedOnly(false)
    setGreNotRequired(false)
    setWatchlistedOnly(false)
    setStateFilter('all')
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
          placeholder="Search universities, states, fields, departments..."
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
            <Switch checked={fundedOnly} onCheckedChange={setFundedOnly} />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Fully Funded</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <Switch checked={greNotRequired} onCheckedChange={setGreNotRequired} />
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">GRE Not Required</span>
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
          <Select value={stateFilter} onValueChange={setStateFilter}>
            <SelectTrigger className="w-[130px] h-8 text-xs">
              <SelectValue placeholder="All States" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              {states.map((state) => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
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
              universities
            </>
          )}
        </p>
      </div>

      {/* University Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="size-8 text-blue-600 animate-spin" />
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
              key={uni.id as string}
              university={uni as Parameters<typeof UniversityCard>[0]['university']}
              toggleWatchlist={handleToggleWatchlist}
              isWatchlisted={isWatchlisted}
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
            className="text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800"
          >
            Load More ({universities.length - visibleCount} remaining)
          </Button>
        </div>
      )}
    </div>
  )
}
