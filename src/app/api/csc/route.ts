import { NextResponse } from 'next/server'
import { cscInfo } from '@/lib/static-data'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    let filtered = [...cscInfo]

    if (category) {
      filtered = filtered.filter((item) => item.category === category)
    }

    return NextResponse.json(filtered)
  } catch (error) {
    console.error('Error fetching CSC info:', error)
    return NextResponse.json(
      { error: 'Failed to fetch CSC info' },
      { status: 500 }
    )
  }
}
