import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const gatewayUrl = process.env.OPENCLAW_GATEWAY_URL || 'http://localhost:3000'
    
    // Verificar se o Gateway está online
    let gatewayStatus = 'unknown'
    let gatewayResponseTime = null
    
    try {
      const startTime = Date.now()
      const response = await fetch(`${gatewayUrl}/api/health`, {
        signal: AbortSignal.timeout(5000)
      })
      const responseTime = Date.now() - startTime
      
      gatewayResponseTime = responseTime
      gatewayStatus = response.ok ? 'connected' : 'error'
    } catch (error) {
      gatewayStatus = 'disconnected'
    }

    // Status da aplicação
    const appStatus = {
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      node: process.version,
      environment: process.env.NODE_ENV || 'development'
    }

    // Status do sistema
    const systemStatus = {
      timestamp: new Date().toISOString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      platform: process.platform,
      arch: process.arch
    }

    // Status geral
    const overallStatus = gatewayStatus === 'connected' ? 'healthy' : 
                         gatewayStatus === 'disconnected' ? 'degraded' : 'unhealthy'

    return NextResponse.json({
      status: overallStatus,
      gateway: {
        url: gatewayUrl,
        status: gatewayStatus,
        responseTime: gatewayResponseTime,
        connected: gatewayStatus === 'connected'
      },
      application: appStatus,
      system: systemStatus,
      services: {
        api: 'running',
        database: 'not-configured', // Em produção seria verificado
        cache: 'not-configured',
        websocket: gatewayStatus === 'connected' ? 'available' : 'unavailable'
      },
      checks: {
        gateway: gatewayStatus === 'connected',
        api: true,
        memory: appStatus.memory.heapUsed / appStatus.memory.heapTotal < 0.8,
        uptime: appStatus.uptime > 0
      },
      version: {
        app: '1.0.0',
        next: process.env.npm_package_dependencies_next || '14.2.13',
        node: appStatus.node
      }
    })

  } catch (error: any) {
    console.error('Health check error:', error)
    
    return NextResponse.json({
      status: 'error',
      error: error.message,
      timestamp: new Date().toISOString(),
      fallback: true
    }, { status: 500 })
  }
}

// Health check simples para load balancers
export async function HEAD() {
  return new NextResponse(null, { status: 200 })
}