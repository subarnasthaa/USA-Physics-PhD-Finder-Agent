import { NextResponse } from 'next/server'
import { universities } from '@/lib/static-data'

interface FieldCount {
  field: string
  count: number
}

interface CityCount {
  city: string
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
    const totalCASInstitutes = universities.filter((uni) => uni.type === 'CAS Institute').length
    const cscDesignatedCount = universities.filter((uni) => uni.cscDesignated).length
    const englishProgramsCount = universities.filter((uni) => uni.englishProgram).length
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

    // Calculate city frequency
    const cityMap = new Map<string, number>()
    for (const uni of universities) {
      if (uni.city) {
        cityMap.set(uni.city, (cityMap.get(uni.city) || 0) + 1)
      }
    }

    const topCities: CityCount[] = Array.from(cityMap.entries())
      .map(([city, count]) => ({ city, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    return NextResponse.json({
      totalUniversities,
      totalCASInstitutes,
      cscDesignatedCount,
      englishProgramsCount,
      watchlistedCount,
      topFields,
      topCities,
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}
