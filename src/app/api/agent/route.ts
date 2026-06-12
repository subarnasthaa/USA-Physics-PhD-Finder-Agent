import { NextResponse } from 'next/server'
import { universities } from '@/lib/static-data'

const SYSTEM_PROMPT = `You are the USA Physics PhD Finder Agent, specialized in helping Nepali MSc Physics students from Tribhuvan University find and apply to Physics PhD programs in the United States. You have extensive knowledge of:

1. All US universities offering Physics PhD programs (60+ universities)
2. All US National Laboratories with physics research (12+ labs)
3. NSF, Fulbright, and university-specific fellowships and funding
4. GRE/TOEFL/IELTS requirements and waivers (many schools post-COVID)
5. RA/TA positions and funding packages ($25,000-$45,000/year)
6. Application deadlines and requirements (mostly Dec-Jan for Fall admission)
7. F-1 and J-1 visa processes for Nepali students
8. Research fields: Astrophysics, Condensed Matter, Quantum Mechanics, Particle Physics, Biophysics, AMO Physics, Geophysics, Optics, Nuclear Physics, Computational Physics

Help students by:
- Recommending universities based on their research interests and profile
- Explaining the US PhD application process and timeline
- Clarifying GRE requirements and waivers (many schools are GRE-optional post-COVID)
- Providing funding and stipend information for different locations
- Suggesting required documents and application strategies
- Offering tips specific to Nepali applicants
- Explaining visa options (F-1, J-1) and requirements
- Comparing universities and research programs
- Advising on contacting professors before applying

Always be encouraging, detailed, and specific. When possible, mention actual professors and research groups. Provide URLs when available. Be realistic about admission chances and funding.`

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { message, history, watchlistedIds } = body

    if (!message) {
      return NextResponse.json(
        { error: 'message is required' },
        { status: 400 }
      )
    }

    // Build messages array
    const messages: Array<{ role: 'assistant' | 'user'; content: string }> = [
      { role: 'assistant', content: SYSTEM_PROMPT },
    ]

    // Add watchlist context if provided
    if (watchlistedIds && Array.isArray(watchlistedIds) && watchlistedIds.length > 0) {
      const watchlisted = universities.filter((uni) => watchlistedIds.includes(uni.id)).slice(0, 10)

      if (watchlisted.length > 0) {
        const watchlistContext = watchlisted
          .map((u) => `${u.name} (${u.city}, ${u.state}) - Fields: ${u.fields} - Deadline: ${u.deadline} - Funding: ${u.fundingType} - GRE: ${u.greRequired} - Stipend: $${u.annualStipend?.toLocaleString() || 'N/A'}/yr`)
          .join('\n')
        messages.push({
          role: 'assistant',
          content: `The student has these universities in their watchlist:\n${watchlistContext}`,
        })
      }
    }

    // Add conversation history from client
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        if (msg.role === 'user' || msg.role === 'assistant') {
          messages.push({
            role: msg.role,
            content: msg.content,
          })
        }
      }
    }

    // Add current user message
    messages.push({ role: 'user', content: message })

    // Call AI using z-ai-web-dev-sdk
    const ZAI = (await import('z-ai-web-dev-sdk')).default
    const zai = await ZAI.create()
    const completion = await zai.chat.completions.create({
      messages,
      thinking: { type: 'disabled' },
    })

    const assistantMessage =
      completion?.choices?.[0]?.message?.content ||
      'I apologize, I could not generate a response. Please try again.'

    return NextResponse.json({
      response: assistantMessage,
    })
  } catch (error) {
    console.error('Error in agent chat:', error)
    return NextResponse.json(
      { error: 'Failed to process agent request' },
      { status: 500 }
    )
  }
}
