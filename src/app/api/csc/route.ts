import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    const where: Record<string, string | boolean | object> = {}
    if (category) {
      where.category = category
    }

    const cscInfo = await db.cSCInfo.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(cscInfo)
  } catch (error) {
    console.error('Error fetching CSC info:', error)
    return NextResponse.json(
      { error: 'Failed to fetch CSC info' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { id, title, category, content } = body

    if (!title || !category || !content) {
      return NextResponse.json(
        { error: 'title, category, and content are required' },
        { status: 400 }
      )
    }

    let result

    if (id) {
      // Update existing
      result = await db.cSCInfo.update({
        where: { id },
        data: { title, category, content },
      })
    } else {
      // Create new
      result = await db.cSCInfo.create({
        data: { title, category, content },
      })
    }

    return NextResponse.json(result, { status: id ? 200 : 201 })
  } catch (error) {
    console.error('Error creating/updating CSC info:', error)
    return NextResponse.json(
      { error: 'Failed to create/update CSC info' },
      { status: 500 }
    )
  }
}
