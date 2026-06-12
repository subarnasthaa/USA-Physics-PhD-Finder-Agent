import { NextResponse } from 'next/server'
import { universities } from '@/lib/static-data'

interface FieldCount {
  field: string
  count: number
}

interface StateCount {
  state: string
  count: number
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const watchlistedIdsParam = searchParams.get('watchlistedIds')

    const watchlistedIdSet = new Set(
      watchlistedIdsParam
        ? watchlistedIdsParam.split(',').map((id) => id.trim()).filter(Boolean)
        : []
    )

    // Basic counts
    const totalUniversities = universities.filter((uni) => uni.type === 'University').length
    const totalNationalLabs = universities.filter((uni) => uni.type === 'National Lab').length
    const fullyFundedCount = universities.filter((uni) => uni.fundingType === 'Full').length
    const greNotRequiredCount = universities.filter((uni) => uni.greRequired === 'Not Required' || uni.greRequired === 'Waived').length
    const watchlistedCount = universities.filter((uni) => watchlistedIdSet.has(uni.id)).length

    // Calculate field frequency
    const fieldMap = new Map<string, number>()
    for (const uni of universities) {
      if (uni.fields) {
        const fields = uni.fields.split(',').map((f) => f.trim()).filter(Boolean)
        for (const field of fields) {
          fieldMap.set(field, (fieldMap.get(field) || 0) + 1)
        }
      }
    }

    const topFields: FieldCount[] = Array.from(fieldMap.entries())
      .map(([field, count]) => ({ field, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15)

    // Calculate state frequency
    const stateMap = new Map<string, number>()
    for (const uni of universities) {
      if (uni.state) {
        stateMap.set(uni.state, (stateMap.get(uni.state) || 0) + 1)
      }
    }

    const topStates: StateCount[] = Array.from(stateMap.entries())
      .map(([state, count]) => ({ state, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    return NextResponse.json({
      totalUniversities,
      totalNationalLabs,
      fullyFundedCount,
      greNotRequiredCount,
      watchlistedCount,
      topFields,
      topStates,
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}
