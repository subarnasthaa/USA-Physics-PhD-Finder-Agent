import { NextResponse } from 'next/server'
import { universities } from '@/lib/static-data'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const university = universities.find((uni) => uni.id === id)

    if (!university) {
      return NextResponse.json(
        { error: 'University not found' },
        { status: 404 }
      )
    }

    const { searchParams } = new URL(request.url)
    const watchlistedIdsParam = searchParams.get('watchlistedIds')

    const watchlistedIdSet = new Set(
      watchlistedIdsParam
        ? watchlistedIdsParam.split(',').map((wid) => wid.trim()).filter(Boolean)
        : []
    )

    return NextResponse.json({
      ...university,
      watchlisted: watchlistedIdSet.has(university.id),
    })
  } catch (error) {
    console.error('Error fetching university:', error)
    return NextResponse.json(
      { error: 'Failed to fetch university' },
      { status: 500 }
    )
  }
}
