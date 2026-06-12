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

// Build university data context for the AI
function buildUniversityContext(): string {
  const summary = universities.slice(0, 30).map((u) =>
    `${u.name} (${u.city}, ${u.state}) | Fields: ${u.fields} | Deadline: ${u.deadline} | Funding: ${u.fundingType} | GRE: ${u.greRequired} | Stipend: $${u.annualStipend?.toLocaleString() || 'N/A'}/yr | TOEFL: ${u.toeflMin || 'N/A'} | IELTS: ${u.ieltsMin || 'N/A'}`
  ).join('\n')
  return summary
}

// Call Google Gemini API
async function callGemini(apiKey: string, messages: Array<{ role: string; content: string }>) {
  // Convert messages to Gemini format
  const contents = messages.map((msg) => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }],
  }))

  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        },
      }),
    }
  )

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`Gemini API error: ${res.status} - ${err}`)
  }

  const data = await res.json()
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response from Gemini.'
}

// Call OpenAI-compatible API (OpenAI, Groq, Together, etc.)
async function callOpenAI(
  apiKey: string,
  messages: Array<{ role: string; content: string }>,
  baseUrl: string = 'https://api.openai.com/v1',
  model: string = 'gpt-4o-mini'
) {
  const res = await fetch(`${baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages: messages.map((m) => ({ role: m.role, content: m.content })),
      temperature: 0.7,
      max_tokens: 2048,
    }),
  })

  if (!res.ok) {
    const err = await res.text()
    throw new Error(`OpenAI API error: ${res.status} - ${err}`)
  }

  const data = await res.json()
  return data?.choices?.[0]?.message?.content || 'No response from AI.'
}

// Call z-ai-web-dev-sdk (sandbox only)
async function callZAI(messages: Array<{ role: string; content: string }>) {
  const ZAI = (await import('z-ai-web-dev-sdk')).default
  const zai = await ZAI.create()
  const completion = await zai.chat.completions.create({
    messages,
    thinking: { type: 'disabled' },
  })
  return completion?.choices?.[0]?.message?.content || 'I could not generate a response.'
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { message, history, watchlistedIds, apiKey, provider, model, baseUrl } = body

    if (!message) {
      return NextResponse.json({ error: 'message is required' }, { status: 400 })
    }

    // Build messages array
    const messages: Array<{ role: string; content: string }> = [
      { role: 'assistant', content: SYSTEM_PROMPT },
    ]

    // Add university data context
    const uniContext = buildUniversityContext()
    messages.push({
      role: 'assistant',
      content: `Here is a database of US Physics PhD programs for reference:\n${uniContext}\n\nUse this data to provide accurate, specific answers. If asked about a university not in this list, use your general knowledge.`,
    })

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

    // Add conversation history
    if (history && Array.isArray(history)) {
      for (const msg of history) {
        if (msg.role === 'user' || msg.role === 'assistant') {
          messages.push({ role: msg.role, content: msg.content })
        }
      }
    }

    // Add current user message
    messages.push({ role: 'user', content: message })

    let assistantMessage: string

    // Determine which AI provider to use
    if (apiKey && provider === 'gemini') {
      assistantMessage = await callGemini(apiKey, messages)
    } else if (apiKey && provider === 'openai') {
      assistantMessage = await callOpenAI(apiKey, messages, baseUrl || 'https://api.openai.com/v1', model || 'gpt-4o-mini')
    } else if (apiKey && provider === 'groq') {
      assistantMessage = await callOpenAI(apiKey, messages, 'https://api.groq.com/openai/v1', model || 'llama-3.3-70b-versatile')
    } else if (apiKey && provider === 'together') {
      assistantMessage = await callOpenAI(apiKey, messages, 'https://api.together.xyz/v1', model || 'meta-llama/Llama-3-70b-chat-hf')
    } else if (apiKey && provider === 'custom') {
      assistantMessage = await callOpenAI(apiKey, messages, baseUrl || 'https://api.openai.com/v1', model || 'gpt-4o-mini')
    } else {
      // Fallback to z-ai-web-dev-sdk (sandbox only)
      try {
        assistantMessage = await callZAI(messages)
      } catch {
        return NextResponse.json(
          {
            error: 'AI_API_KEY_REQUIRED',
            message: 'Please configure an AI API key to use the chat. Go to Settings in the AI Agent tab and add your API key.',
          },
          { status: 400 }
        )
      }
    }

    return NextResponse.json({ response: assistantMessage })
  } catch (error) {
    console.error('Error in agent chat:', error)
    const errorMessage = error instanceof Error ? error.message : 'Failed to process agent request'
    return NextResponse.json({ error: errorMessage }, { status: 500 })
  }
}
