import { NextResponse } from 'next/server'
import { universities } from '@/lib/static-data'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const search = searchParams.get('search')
    const type = searchParams.get('type')
    const cscOnly = searchParams.get('cscOnly')
    const englishOnly = searchParams.get('englishOnly')
    const city = searchParams.get('city')
    const field = searchParams.get('field')
    const watchlistedIdsParam = searchParams.get('watchlistedIds')

    const watchlistedIdSet = new Set(
      watchlistedIdsParam
        ? watchlistedIdsParam.split(',').map((id) => id.trim()).filter(Boolean)
        : []
    )

    let filtered = [...universities]

    if (search) {
      const searchLower = search.toLowerCase()
      filtered = filtered.filter(
        (uni) =>
          uni.name.toLowerCase().includes(searchLower) ||
          uni.city.toLowerCase().includes(searchLower) ||
          uni.fields.toLowerCase().includes(searchLower) ||
          uni.department.toLowerCase().includes(searchLower) ||
          (uni.researchGroup && uni.researchGroup.toLowerCase().includes(searchLower))
      )
    }

    if (type) {
      filtered = filtered.filter((uni) => uni.type === type)
    }

    if (cscOnly === 'true') {
      filtered = filtered.filter((uni) => uni.cscDesignated === true)
    }

    if (englishOnly === 'true') {
      filtered = filtered.filter((uni) => uni.englishProgram === true)
    }

    if (city) {
      const cityLower = city.toLowerCase()
      filtered = filtered.filter((uni) =>
        uni.city.toLowerCase().includes(cityLower)
      )
    }

    if (field) {
      const fieldLower = field.toLowerCase()
      filtered = filtered.filter((uni) =>
        uni.fields.toLowerCase().includes(fieldLower)
      )
    }

    // Sort by name ascending
    filtered.sort((a, b) => a.name.localeCompare(b.name))

    // Add watchlisted field dynamically
    const result = filtered.map((uni) => ({
      ...uni,
      watchlisted: watchlistedIdSet.has(uni.id),
    }))

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching universities:', error)
    return NextResponse.json(
      { error: 'Failed to fetch universities' },
      { status: 500 }
    )
  }
}
