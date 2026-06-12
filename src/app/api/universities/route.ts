import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    const search = searchParams.get('search')
    const type = searchParams.get('type')
    const cscOnly = searchParams.get('cscOnly')
    const englishOnly = searchParams.get('englishOnly')
    const city = searchParams.get('city')
    const field = searchParams.get('field')
    const watchlisted = searchParams.get('watchlisted')

    const where = {} as Record<string, unknown>

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { city: { contains: search } },
        { fields: { contains: search } },
        { department: { contains: search } },
        { researchGroup: { contains: search } },
      ]
    }

    if (type) {
      where.type = type
    }

    if (cscOnly === 'true') {
      where.cscDesignated = true
    }

    if (englishOnly === 'true') {
      where.englishProgram = true
    }

    if (city) {
      where.city = { contains: city }
    }

    if (field) {
      where.fields = { contains: field }
    }

    if (watchlisted === 'true') {
      where.watchlisted = true
    }

    const universities = await db.university.findMany({
      where,
      orderBy: { name: 'asc' },
      include: {
        watchlistItems: true,
      },
    })

    return NextResponse.json(universities)
  } catch (error) {
    console.error('Error fetching universities:', error)
    return NextResponse.json(
      { error: 'Failed to fetch universities' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const university = await db.university.create({
      data: {
        name: body.name,
        city: body.city,
        province: body.province,
        type: body.type,
        department: body.department,
        researchGroup: body.researchGroup,
        url: body.url,
        fields: body.fields,
        deadline: body.deadline,
        englishProgram: body.englishProgram ?? false,
        hskRequired: body.hskRequired ?? false,
        hskLevel: body.hskLevel,
        cscDesignated: body.cscDesignated ?? false,
        scholarshipTypes: body.scholarshipTypes,
        requiredDocuments: body.requiredDocuments,
        notableProfessors: body.notableProfessors,
        watchlisted: body.watchlisted ?? false,
        notesForNepali: body.notesForNepali,
      },
    })

    return NextResponse.json(university, { status: 201 })
  } catch (error) {
    console.error('Error creating university:', error)
    return NextResponse.json(
      { error: 'Failed to create university' },
      { status: 500 }
    )
  }
}
