import { NextResponse } from 'next/server'
import { fundingInfo } from '@/lib/static-data'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    let filtered = [...fundingInfo]

    if (category) {
      filtered = filtered.filter((item) => item.category === category)
    }

    return NextResponse.json(filtered)
  } catch (error) {
    console.error('Error fetching funding info:', error)
    return NextResponse.json(
      { error: 'Failed to fetch funding info' },
      { status: 500 }
    )
  }
}
