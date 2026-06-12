'use client'

import { useState } from 'react'
import {
  Star,
  MapPin,
  Globe,
  Calendar,
  FileText,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  Award,
  Languages,
  BookOpen,
  User,
  MessageSquare,
  ExternalLink,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export interface University {
  id: string
  name: string
  city: string
  province: string
  type: string
  department: string
  researchGroup: string | null
  url: string
  fields: string
  deadline: string
  englishProgram: boolean
  hskRequired: boolean
  hskLevel: string | null
  cscDesignated: boolean
  scholarshipTypes: string
  requiredDocuments: string
  notableProfessors: string
  watchlisted: boolean
  notesForNepali: string | null
  lastUpdated: string
}

interface UniversityCardProps {
  university: University
  toggleWatchlist: (id: string) => void
  isWatchlisted: (id: string) => boolean
  compact?: boolean
}

export default function UniversityCard({ university, toggleWatchlist, isWatchlisted, compact = false }: UniversityCardProps) {
  const [expanded, setExpanded] = useState(false)
  const watchlisted = isWatchlisted(university.id)

  const fields = university.fields.split(',').map((f) => f.trim()).filter(Boolean)
  const professors = university.notableProfessors
    ? university.notableProfessors.split('|').map((p) => p.trim()).filter(Boolean)
    : []
  const documents = university.requiredDocuments
    ? university.requiredDocuments.split(',').map((d) => d.trim()).filter(Boolean)
    : []
  const scholarships = university.scholarshipTypes
    ? university.scholarshipTypes.split(',').map((s) => s.trim()).filter(Boolean)
    : []

  const handleToggleWatchlist = () => {
    toggleWatchlist(university.id)
  }

  return (
    <Card className="group hover:shadow-md transition-shadow border-gray-200 dark:border-gray-800">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base font-semibold text-gray-900 dark:text-white leading-tight truncate">
              {university.name}
            </CardTitle>
            <div className="flex items-center gap-1.5 mt-1 text-sm text-gray-500 dark:text-gray-400">
              <MapPin className="size-3.5 shrink-0" />
              <span className="truncate">{university.city}, {university.province}</span>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleWatchlist}
            className={`shrink-0 size-8 ${watchlisted ? 'text-amber-500 hover:text-amber-600' : 'text-gray-300 hover:text-amber-400'}`}
            aria-label={watchlisted ? 'Remove from watchlist' : 'Add to watchlist'}
          >
            <Star className={`size-5 ${watchlisted ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Badges */}
        <div className="flex flex-wrap gap-1.5">
          <Badge variant={university.type === 'CAS Institute' ? 'default' : 'secondary'} className={
            university.type === 'CAS Institute'
              ? 'bg-red-600 hover:bg-red-700 text-white text-xs'
              : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300 text-xs'
          }>
            {university.type === 'CAS Institute' ? (
              <Award className="size-3 mr-0.5" />
            ) : (
              <GraduationCap className="size-3 mr-0.5" />
            )}
            {university.type}
          </Badge>
          {university.cscDesignated && (
            <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs">
              CSC Designated
            </Badge>
          )}
          {university.englishProgram && (
            <Badge className="bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300 text-xs">
              <Languages className="size-3 mr-0.5" />
              English Program
            </Badge>
          )}
        </div>

        {/* Department */}
        {!compact && (
          <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
            <BookOpen className="size-3.5 shrink-0" />
            <span className="truncate">{university.department}</span>
          </div>
        )}

        {/* Research Fields */}
        <div className="flex flex-wrap gap-1">
          {fields.slice(0, compact ? 3 : 5).map((field) => (
            <Badge key={field} variant="outline" className="text-xs font-normal">
              {field}
            </Badge>
          ))}
          {fields.length > (compact ? 3 : 5) && (
            <Badge variant="outline" className="text-xs font-normal text-gray-400">
              +{fields.length - (compact ? 3 : 5)} more
            </Badge>
          )}
        </div>

        {/* Deadline */}
        <div className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
          <Calendar className="size-3.5 shrink-0" />
          <span>Deadline: <span className="font-medium text-gray-800 dark:text-gray-200">{university.deadline}</span></span>
        </div>

        {/* HSK Requirement */}
        {university.hskRequired && university.hskLevel && (
          <div className="text-xs text-amber-700 dark:text-amber-400">
            HSK Required: {university.hskLevel}
          </div>
        )}

        {/* Expand/Collapse Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="w-full text-xs text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300"
        >
          {expanded ? (
            <>
              <ChevronUp className="size-3.5 mr-1" />
              Hide Details
            </>
          ) : (
            <>
              <ChevronDown className="size-3.5 mr-1" />
              View Details
            </>
          )}
        </Button>

        {/* Expanded Details */}
        {expanded && (
          <div className="space-y-4 pt-2 border-t border-gray-100 dark:border-gray-800">
            {/* URL */}
            {university.url && (
              <div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <Globe className="size-3.5" />
                  Program Website
                </div>
                <a
                  href={university.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline break-all inline-flex items-center gap-1"
                >
                  {university.url}
                  <ExternalLink className="size-3" />
                </a>
              </div>
            )}

            {/* Research Group */}
            {university.researchGroup && (
              <div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <BookOpen className="size-3.5" />
                  Research Group
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">{university.researchGroup}</p>
              </div>
            )}

            {/* Notable Professors */}
            {professors.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <User className="size-3.5" />
                  Notable Professors
                </div>
                <ul className="space-y-0.5">
                  {professors.map((prof, i) => (
                    <li key={i} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-1.5">
                      <span className="text-emerald-500 mt-0.5">•</span>
                      {prof}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Scholarship Types */}
            {scholarships.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <Award className="size-3.5" />
                  Scholarship Types
                </div>
                <div className="flex flex-wrap gap-1">
                  {scholarships.map((s) => (
                    <Badge key={s} variant="outline" className="text-xs font-normal bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border-amber-200 dark:border-amber-800">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Required Documents */}
            {documents.length > 0 && (
              <div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <FileText className="size-3.5" />
                  Required Documents
                </div>
                <ul className="space-y-0.5">
                  {documents.map((doc, i) => (
                    <li key={i} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-1.5">
                      <span className="text-emerald-500 mt-0.5">☐</span>
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Notes for Nepali Students */}
            {university.notesForNepali && (
              <div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                  <MessageSquare className="size-3.5" />
                  Notes for Nepali Students
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 bg-amber-50 dark:bg-amber-900/10 rounded-md p-2 border border-amber-100 dark:border-amber-900/30">
                  {university.notesForNepali}
                </p>
              </div>
            )}

            {/* Last Updated */}
            <div className="text-xs text-gray-400 dark:text-gray-500">
              Last updated: {new Date(university.lastUpdated).toLocaleDateString()}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
