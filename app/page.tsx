'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import ChatInterface from '@/components/ChatInterface'
import MetricsDashboard from '@/components/MetricsDashboard'
import GitHubIntegration from '@/components/GitHubIntegration'

const RealtimeChart = dynamic(() => import('@/components/RealtimeChart'), { ssr: false })

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    // Verificar conexão com Gateway
    const checkConnection = async () => {
      try {
        const res = await fetch('/api/health')
        if (res.ok) {
          setConnected(true)
        }
      } catch (error) {
        setConnected(false)
      }
    }
    
    checkConnection()
    const interval = setInterval(checkConnection, 30000)
    
    return () => clearInterval(interval)
  }, [])

  const tabs = [
    { id: 'dashboard', label: '📊 Dashboard', component: <MetricsDashboard /> },
    { id: 'chat', label: '💬 Chat com Rex', component: <ChatInterface /> },
    { id: 'github', label: '🐙 GitHub', component: <GitHubIntegration /> },
    { id: 'analytics', label: '📈 Analytics', component: <RealtimeChart /> },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-rex-primary to-rex-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">🦖</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold gradient-text">OpenRexCheck</h1>
                <p className="text-sm text-gray-600">Monitoramento OpenClaw + Vercel</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className={`flex items-center ${connected ? 'text-green-600' : 'text-red-600'}`}>
                <div className={`w-3 h-3 rounded-full mr-2 ${connected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                <span className="text-sm font-medium">
                  {connected ? 'Conectado ao Gateway' : 'Desconectado'}
                </span>
              </div>
              
              <a
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition"
              >
                🚀 Deploy na Vercel
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs Navigation */}
      <div className="container mx-auto px-4 py-2">
        <div className="flex space-x-1 bg-white rounded-xl p-1 shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-rex-primary to-rex-secondary text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          {tabs.find(tab => tab.id === activeTab)?.component}
        </div>
        
        {/* Status Bar */}
        <div className="mt-6 p-4 bg-gradient-to-r from-rex-primary/10 to-rex-secondary/10 rounded-xl border border-rex-primary/20">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              <span className="font-medium">Gateway URL:</span> {process.env.NEXT_PUBLIC_OPENCLAW_GATEWAY_URL || 'http://localhost:3000'}
            </div>
            <div className="flex space-x-4">
              <button className="text-sm text-rex-primary hover:text-rex-secondary font-medium">
                📋 Copiar Config
              </button>
              <button className="text-sm text-rex-primary hover:text-rex-secondary font-medium">
                🔄 Atualizar Dados
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center text-gray-600 text-sm">
          <p>
            🦖 OpenRexCheck - Caso de estudo de integração OpenClaw + Vercel + GitHub
          </p>
          <p className="mt-2">
            <a 
              href="https://github.com/rexia-intel-automation/openrexcheck" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-rex-primary hover:text-rex-secondary font-medium"
            >
              🔗 Repositório GitHub
            </a>
            {' • '}
            <a 
              href="https://docs.openclaw.ai" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-rex-primary hover:text-rex-secondary font-medium"
            >
              📚 Documentação OpenClaw
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}