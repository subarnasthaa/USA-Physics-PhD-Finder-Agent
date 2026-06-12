import { NextResponse } from 'next/server'
import { universities } from '@/lib/static-data'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const search = searchParams.get('search')
    const type = searchParams.get('type')
    const fundedOnly = searchParams.get('fundedOnly')
    const greNotRequired = searchParams.get('greNotRequired')
    const state = searchParams.get('state')
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
          uni.state.toLowerCase().includes(searchLower) ||
          uni.fields.toLowerCase().includes(searchLower) ||
          uni.department.toLowerCase().includes(searchLower) ||
          (uni.researchGroup && uni.researchGroup.toLowerCase().includes(searchLower))
      )
    }

    if (type) {
      filtered = filtered.filter((uni) => uni.type === type)
    }

    if (fundedOnly === 'true') {
      filtered = filtered.filter((uni) => uni.fundingType === 'Full')
    }

    if (greNotRequired === 'true') {
      filtered = filtered.filter((uni) => uni.greRequired === 'Not Required' || uni.greRequired === 'Waived')
    }

    if (state) {
      const stateLower = state.toLowerCase()
      filtered = filtered.filter((uni) =>
        uni.state.toLowerCase().includes(stateLower)
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
