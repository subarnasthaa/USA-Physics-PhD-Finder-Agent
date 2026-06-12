import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const university = await db.university.findUnique({
      where: { id },
      include: {
        watchlistItems: true,
      },
    })

    if (!university) {
      return NextResponse.json(
        { error: 'University not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(university)
  } catch (error) {
    console.error('Error fetching university:', error)
    return NextResponse.json(
      { error: 'Failed to fetch university' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const existing = await db.university.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { error: 'University not found' },
        { status: 404 }
      )
    }

    const university = await db.university.update({
      where: { id },
      data: {
        ...(body.name !== undefined && { name: body.name }),
        ...(body.city !== undefined && { city: body.city }),
        ...(body.province !== undefined && { province: body.province }),
        ...(body.type !== undefined && { type: body.type }),
        ...(body.department !== undefined && { department: body.department }),
        ...(body.researchGroup !== undefined && { researchGroup: body.researchGroup }),
        ...(body.url !== undefined && { url: body.url }),
        ...(body.fields !== undefined && { fields: body.fields }),
        ...(body.deadline !== undefined && { deadline: body.deadline }),
        ...(body.englishProgram !== undefined && { englishProgram: body.englishProgram }),
        ...(body.hskRequired !== undefined && { hskRequired: body.hskRequired }),
        ...(body.hskLevel !== undefined && { hskLevel: body.hskLevel }),
        ...(body.cscDesignated !== undefined && { cscDesignated: body.cscDesignated }),
        ...(body.scholarshipTypes !== undefined && { scholarshipTypes: body.scholarshipTypes }),
        ...(body.requiredDocuments !== undefined && { requiredDocuments: body.requiredDocuments }),
        ...(body.notableProfessors !== undefined && { notableProfessors: body.notableProfessors }),
        ...(body.watchlisted !== undefined && { watchlisted: body.watchlisted }),
        ...(body.notesForNepali !== undefined && { notesForNepali: body.notesForNepali }),
      },
    })

    return NextResponse.json(university)
  } catch (error) {
    console.error('Error updating university:', error)
    return NextResponse.json(
      { error: 'Failed to update university' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const existing = await db.university.findUnique({ where: { id } })
    if (!existing) {
      return NextResponse.json(
        { error: 'University not found' },
        { status: 404 }
      )
    }

    await db.university.delete({ where: { id } })

    return NextResponse.json({ message: 'University deleted successfully' })
  } catch (error) {
    console.error('Error deleting university:', error)
    return NextResponse.json(
      { error: 'Failed to delete university' },
      { status: 500 }
    )
  }
}
