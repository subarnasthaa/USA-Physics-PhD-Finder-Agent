import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import ZAI from 'z-ai-web-dev-sdk'

const SYSTEM_PROMPT = `You are the China Physics PhD Finder Agent, specialized in helping Nepali MSc Physics students from Tribhuvan University find and apply to Physics PhD programs in China. You have extensive knowledge of:

1. All Chinese universities offering Physics PhD programs (30+ universities)
2. All CAS (Chinese Academy of Sciences) institutes with physics research (14+ institutes)
3. CSC Scholarship types (Type A and Type B) for Nepali students
4. Provincial and university-specific scholarships
5. Application deadlines and requirements
6. HSK language requirements
7. Document checklists
8. The Chinese Embassy in Nepal (Baluwatar, Kathmandu) process
9. Research fields: Condensed Matter, Particle Physics, Astrophysics, Optics, Plasma Physics, Nuclear Physics, Quantum Information, Theoretical Physics, Acoustics, Atomic & Molecular Physics

Help students by:
- Recommending universities based on their research interests
- Explaining the CSC scholarship application process
- Clarifying Type A vs Type B differences
- Providing deadline information
- Suggesting required documents
- Offering tips specific to Nepali applicants
- Explaining the CUCAS and campuschina.org portals

Always be encouraging, detailed, and specific. When possible, mention actual professors and research groups. Provide URLs when available.`

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { message, sessionId } = body

    if (!message || !sessionId) {
      return NextResponse.json(
        { error: 'message and sessionId are required' },
        { status: 400 }
      )
    }

    // Fetch conversation history for this session
    const history = await db.agentConversation.findMany({
      where: { sessionId },
      orderBy: { createdAt: 'asc' },
      take: 40,
    })

    // Build messages array - z-ai-web-dev-sdk uses 'assistant' role for system prompts
    const messages: Array<{ role: 'assistant' | 'user'; content: string }> = [
      { role: 'assistant', content: SYSTEM_PROMPT },
    ]

    // Fetch watchlisted universities to enrich context
    const watchlisted = await db.university.findMany({
      where: { watchlisted: true },
      take: 10,
    })

    if (watchlisted.length > 0) {
      const watchlistContext = watchlisted
        .map((u) => `${u.name} (${u.city}) - Fields: ${u.fields} - Deadline: ${u.deadline} - CSC: ${u.cscDesignated ? 'Yes' : 'No'} - English: ${u.englishProgram ? 'Yes' : 'No'}`)
        .join('\n')
      messages.push({
        role: 'assistant',
        content: `The student has these universities in their watchlist:\n${watchlistContext}`,
      })
    }

    // Add conversation history
    for (const msg of history) {
      messages.push({
        role: msg.role as 'user' | 'assistant',
        content: msg.content,
      })
    }

    // Add current user message
    messages.push({ role: 'user', content: message })

    // Save user message
    await db.agentConversation.create({
      data: {
        sessionId,
        role: 'user',
        content: message,
      },
    })

    // Call AI using z-ai-web-dev-sdk
    const zai = await ZAI.create()
    const completion = await zai.chat.completions.create({
      messages,
      thinking: { type: 'disabled' },
    })

    const assistantMessage =
      completion?.choices?.[0]?.message?.content ||
      'I apologize, I could not generate a response. Please try again.'

    // Save assistant response
    await db.agentConversation.create({
      data: {
        sessionId,
        role: 'assistant',
        content: assistantMessage,
      },
    })

    return NextResponse.json({
      response: assistantMessage,
      sessionId,
    })
  } catch (error) {
    console.error('Error in agent chat:', error)
    return NextResponse.json(
      { error: 'Failed to process agent request' },
      { status: 500 }
    )
  }
}
