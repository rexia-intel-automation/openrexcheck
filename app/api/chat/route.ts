import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()
    
    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // URL do Gateway OpenClaw
    const gatewayUrl = process.env.OPENCLAW_GATEWAY_URL || 'http://localhost:3000'
    
    // Enviar mensagem para o Gateway
    const response = await fetch(`${gatewayUrl}/api/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: message,
        channel: 'webchat',
        session: 'openrexcheck-dashboard'
      })
    })

    if (!response.ok) {
      throw new Error(`Gateway responded with ${response.status}`)
    }

    const data = await response.json()
    
    return NextResponse.json({
      response: data.text || 'Mensagem recebida pelo Gateway',
      timestamp: new Date().toISOString(),
      gateway: gatewayUrl,
      success: true
    })

  } catch (error: any) {
    console.error('Chat API error:', error)
    
    // Fallback para desenvolvimento
    const fallbackResponses = [
      "Olá! Recebi sua mensagem, mas estou em modo de desenvolvimento.",
      "Conectando ao Gateway OpenClaw...",
      "🦖 Rex aqui! Em breve integração completa.",
      "Mensagem recebida. Gateway URL: " + (process.env.OPENCLAW_GATEWAY_URL || 'http://localhost:3000')
    ]
    
    return NextResponse.json({
      response: fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)],
      timestamp: new Date().toISOString(),
      error: error.message,
      fallback: true,
      success: false
    })
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: '/api/chat',
    description: 'Send messages to OpenClaw Gateway',
    methods: ['POST'],
    parameters: {
      message: 'string (required)'
    },
    example: {
      request: { "message": "Hello Rex!" },
      response: { 
        "response": "Hello! How can I help?", 
        "timestamp": "2024-02-05T19:30:00Z",
        "success": true 
      }
    }
  })
}