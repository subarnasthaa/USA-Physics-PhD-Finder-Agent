import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

interface DeadlineAlert {
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

function parseDeadlineAndCalculateDays(deadlineStr: string): number | null {
  if (!deadlineStr || deadlineStr.toLowerCase() === 'rolling' || deadlineStr.toLowerCase() === 'varies' || deadlineStr.toLowerCase() === 'tbd') {
    return null
  }

  try {
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth()
    const currentDay = new Date().getDate()
    const now = new Date(currentYear, currentMonth, currentDay)

    // Try parsing common formats
    // Format: "MM/DD/YYYY" or "M/D/YYYY"
    const slashMatch = deadlineStr.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
    if (slashMatch) {
      const [, month, day, year] = slashMatch
      const deadline = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
      const diff = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      return diff
    }

    // Format: "YYYY-MM-DD"
    const isoMatch = deadlineStr.match(/^(\d{4})-(\d{2})-(\d{2})$/)
    if (isoMatch) {
      const [, year, month, day] = isoMatch
      const deadline = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
      const diff = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      return diff
    }

    // Format: "Month DD, YYYY" e.g., "March 15, 2026"
    const longMatch = deadlineStr.match(/^(\w+)\s+(\d{1,2}),?\s+(\d{4})$/)
    if (longMatch) {
      const deadline = new Date(deadlineStr)
      if (!isNaN(deadline.getTime())) {
        const diff = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        return diff
      }
    }

    // Format: "MM-DD" or "M-D" (assume current or next year)
    const shortMatch = deadlineStr.match(/^(\d{1,2})-(\d{1,2})$/)
    if (shortMatch) {
      const [, month, day] = shortMatch
      let year = currentYear
      let deadline = new Date(year, parseInt(month) - 1, parseInt(day))
      // If the deadline has already passed this year, use next year
      if (deadline < now) {
        year += 1
        deadline = new Date(year, parseInt(month) - 1, parseInt(day))
      }
      const diff = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      return diff
    }

    // Format: "Month DD" (e.g., "March 15")
    const monthDayMatch = deadlineStr.match(/^(\w+)\s+(\d{1,2})$/)
    if (monthDayMatch) {
      const deadline = new Date(`${deadlineStr}, ${currentYear}`)
      if (!isNaN(deadline.getTime())) {
        if (deadline < now) {
          const nextYear = new Date(`${deadlineStr}, ${currentYear + 1}`)
          const diff = Math.ceil((nextYear.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
          return diff
        }
        const diff = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        return diff
      }
    }

    return null
  } catch {
    return null
  }
}

export async function GET() {
  try {
    const universities = await db.university.findMany({
      include: {
        watchlistItems: true,
      },
    })

    const alerts: DeadlineAlert[] = []

    for (const uni of universities) {
      const daysRemaining = parseDeadlineAndCalculateDays(uni.deadline)

      // Include universities with upcoming deadlines or watchlisted
      if (uni.watchlisted || (daysRemaining !== null && daysRemaining >= -30)) {
        alerts.push({
          id: uni.id,
          name: uni.name,
          city: uni.city,
          type: uni.type,
          deadline: uni.deadline,
          daysRemaining,
          isWatchlisted: uni.watchlisted,
          fields: uni.fields,
          cscDesignated: uni.cscDesignated,
          englishProgram: uni.englishProgram,
          scholarshipTypes: uni.scholarshipTypes,
        })
      }
    }

    // Sort: watchlisted first, then by daysRemaining (soonest first, nulls last)
    alerts.sort((a, b) => {
      if (a.isWatchlisted !== b.isWatchlisted) {
        return a.isWatchlisted ? -1 : 1
      }
      if (a.daysRemaining === null && b.daysRemaining === null) return 0
      if (a.daysRemaining === null) return 1
      if (b.daysRemaining === null) return -1
      return a.daysRemaining - b.daysRemaining
    })

    return NextResponse.json(alerts)
  } catch (error) {
    console.error('Error fetching alerts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch deadline alerts' },
      { status: 500 }
    )
  }
}
