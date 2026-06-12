import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const watchlist = await db.watchlistItem.findMany({
      include: {
        university: true,
      },
      orderBy: { addedAt: 'desc' },
    })

    return NextResponse.json(watchlist)
  } catch (error) {
    console.error('Error fetching watchlist:', error)
    return NextResponse.json(
      { error: 'Failed to fetch watchlist' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { universityId, fieldName } = body

    if (!universityId) {
      return NextResponse.json(
        { error: 'universityId is required' },
        { status: 400 }
      )
    }

    // Check if university exists
    const university = await db.university.findUnique({
      where: { id: universityId },
    })
    if (!university) {
      return NextResponse.json(
        { error: 'University not found' },
        { status: 404 }
      )
    }

    // Check if already in watchlist
    const existing = await db.watchlistItem.findFirst({
      where: { universityId },
    })
    if (existing) {
      return NextResponse.json(
        { error: 'University already in watchlist', item: existing },
        { status: 409 }
      )
    }

    // Add to watchlist and mark university as watchlisted
    const [item] = await db.$transaction([
      db.watchlistItem.create({
        data: {
          universityId,
          fieldName: fieldName || null,
        },
      }),
      db.university.update({
        where: { id: universityId },
        data: { watchlisted: true },
      }),
    ])

    return NextResponse.json(item, { status: 201 })
  } catch (error) {
    console.error('Error adding to watchlist:', error)
    return NextResponse.json(
      { error: 'Failed to add to watchlist' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json()
    const { universityId } = body

    if (!universityId) {
      return NextResponse.json(
        { error: 'universityId is required' },
        { status: 400 }
      )
    }

    const item = await db.watchlistItem.findFirst({
      where: { universityId },
    })

    if (!item) {
      return NextResponse.json(
        { error: 'Item not found in watchlist' },
        { status: 404 }
      )
    }

    // Remove from watchlist and update university
    await db.$transaction([
      db.watchlistItem.delete({
        where: { id: item.id },
      }),
      db.university.update({
        where: { id: universityId },
        data: { watchlisted: false },
      }),
    ])

    return NextResponse.json({ message: 'Removed from watchlist' })
  } catch (error) {
    console.error('Error removing from watchlist:', error)
    return NextResponse.json(
      { error: 'Failed to remove from watchlist' },
      { status: 500 }
    )
  }
}
