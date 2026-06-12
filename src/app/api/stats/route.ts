import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

interface FieldCount {
  field: string
  count: number
}

interface CityCount {
  city: string
  count: number
}

export async function GET() {
  try {
    // Basic counts
    const [
      totalUniversities,
      totalCASInstitutes,
      cscDesignatedCount,
      englishProgramsCount,
      watchlistedCount,
      allUniversities,
    ] = await Promise.all([
      db.university.count({ where: { type: 'University' } }),
      db.university.count({ where: { type: 'CAS Institute' } }),
      db.university.count({ where: { cscDesignated: true } }),
      db.university.count({ where: { englishProgram: true } }),
      db.university.count({ where: { watchlisted: true } }),
      db.university.findMany({
        select: { fields: true, city: true },
      }),
    ])

    // Calculate field frequency
    const fieldMap = new Map<string, number>()
    for (const uni of allUniversities) {
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
    for (const uni of allUniversities) {
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
