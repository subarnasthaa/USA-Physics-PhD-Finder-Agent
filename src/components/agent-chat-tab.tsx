'use client'

import { useState, useRef, useEffect } from 'react'
import {
  Send,
  Bot,
  User,
  Loader2,
  Sparkles,
  BookOpen,
  Award,
  Globe,
  FileText,
  HelpCircle,
} from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const suggestedPrompts = [
  {
    label: 'Best universities for astrophysics',
    icon: BookOpen,
    prompt: 'What are the best US universities for astrophysics PhD?',
  },
  {
    label: 'How to get funding',
    icon: Award,
    prompt: 'How can Nepali students get funding for a US PhD in physics?',
  },
  {
    label: 'GRE requirements',
    icon: FileText,
    prompt: 'Do I need GRE for US physics PhD programs?',
  },
  {
    label: 'About national labs',
    icon: Globe,
    prompt: 'Tell me about national lab opportunities for physics research',
  },
  {
    label: 'Application timeline',
    icon: HelpCircle,
    prompt: 'What is the application timeline for Fall 2026 admission?',
  },
]

interface AgentChatTabProps {
  watchlistedIds: string[]
  watchlistedIdsParam: string
}

export default function AgentChatTab({ watchlistedIds, watchlistedIdsParam }: AgentChatTabProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Generate session ID once
  useEffect(() => {
    setSessionId(`session-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`)
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: text.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          sessionId,
          watchlistedIds,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      })

      if (res.ok) {
        const data = await res.json()
        const assistantMessage: Message = {
          id: `msg-${Date.now()}-response`,
          role: 'assistant',
          content: data.response || 'I apologize, I could not generate a response. Please try again.',
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, assistantMessage])
      } else {
        const errorMessage: Message = {
          id: `msg-${Date.now()}-error`,
          role: 'assistant',
          content: 'Sorry, there was an error processing your request. Please try again.',
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, errorMessage])
      }
    } catch {
      const errorMessage: Message = {
        id: `msg-${Date.now()}-error`,
        role: 'assistant',
        content: 'Network error. Please check your connection and try again.',
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleSuggestedPrompt = (prompt: string) => {
    sendMessage(prompt)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-120px)]">
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
        {/* Welcome Message */}
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center py-8">
            <div className="size-16 rounded-2xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
              <Bot className="size-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              USA Physics PhD Finder Agent
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md mb-6">
              I can help you find the best PhD programs in the USA, explain fellowship options, and guide you through the application process.
            </p>

            {/* Suggested Prompts */}
            <div className="grid sm:grid-cols-2 gap-2 w-full max-w-lg">
              {suggestedPrompts.map((suggestion) => {
                const Icon = suggestion.icon
                return (
                  <button
                    key={suggestion.label}
                    onClick={() => handleSuggestedPrompt(suggestion.prompt)}
                    disabled={loading}
                    className="flex items-center gap-2 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors text-left disabled:opacity-50"
                  >
                    <Icon className="size-4 text-blue-600 shrink-0" />
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">{suggestion.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <div className="size-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                <Bot className="size-4 text-blue-600 dark:text-blue-400" />
              </div>
            )}
            <div
              className={`max-w-[80%] sm:max-w-[70%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-blue-700 text-white rounded-br-md'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-md'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
              <div className={`text-xs mt-1 ${message.role === 'user' ? 'text-blue-200' : 'text-gray-400 dark:text-gray-500'}`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            {message.role === 'user' && (
              <div className="size-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0">
                <User className="size-4 text-gray-600 dark:text-gray-400" />
              </div>
            )}
          </div>
        ))}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex gap-3 justify-start">
            <div className="size-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
              <Bot className="size-4 text-blue-600 dark:text-blue-400" />
            </div>
            <Card className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-md">
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Loader2 className="size-4 text-blue-600 animate-spin" />
                  <Sparkles className="size-4 text-blue-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Thinking...</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts (show when there are messages too) */}
      {messages.length > 0 && messages.length < 3 && !loading && (
        <div className="px-4 md:px-6 pb-2">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {suggestedPrompts.slice(0, 3).map((suggestion) => (
              <button
                key={suggestion.label}
                onClick={() => handleSuggestedPrompt(suggestion.prompt)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-colors whitespace-nowrap text-xs text-gray-600 dark:text-gray-400"
              >
                <Sparkles className="size-3 text-blue-500" />
                {suggestion.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 md:px-6">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about PhD programs, fellowships, application process..."
            disabled={loading}
            className="flex-1 h-10 px-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
          />
          <Button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-blue-700 hover:bg-blue-800 text-white h-10 px-4"
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Send className="size-4" />
            )}
          </Button>
        </form>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 text-center">
          AI Agent can make mistakes. Verify important information with official sources.
        </p>
      </div>
    </div>
  )
}
