'use client'

import { useState, useEffect } from 'react'
import { Activity, Cpu, Database, Cloud, Shield, Zap } from 'lucide-react'

interface Metric {
  id: string
  label: string
  value: number | string
  unit: string
  icon: React.ReactNode
  color: string
  trend: 'up' | 'down' | 'stable'
}

export default function MetricsDashboard() {
  const [metrics, setMetrics] = useState<Metric[]>([
    { id: '1', label: 'Uptime', value: '99.9', unit: '%', icon: <Activity />, color: 'text-green-500', trend: 'up' },
    { id: '2', label: 'CPU Usage', value: 42, unit: '%', icon: <Cpu />, color: 'text-blue-500', trend: 'stable' },
    { id: '3', label: 'Memory', value: 68, unit: '%', icon: <Database />, color: 'text-purple-500', trend: 'stable' },
    { id: '4', label: 'Requests/min', value: 1245, unit: '', icon: <Zap />, color: 'text-yellow-500', trend: 'up' },
    { id: '5', label: 'Deployments', value: 8, unit: '', icon: <Cloud />, color: 'text-cyan-500', trend: 'up' },
    { id: '6', label: 'Security Score', value: 94, unit: '%', icon: <Shield />, color: 'text-red-500', trend: 'up' },
  ])

  const [recentEvents, setRecentEvents] = useState([
    { id: '1', type: 'deploy', message: 'Deploy concluído na Vercel', time: '2 min ago', status: 'success' },
    { id: '2', type: 'github', message: 'PR #42 merged', time: '15 min ago', status: 'info' },
    { id: '3', type: 'alert', message: 'CPU usage above threshold', time: '1 hour ago', status: 'warning' },
    { id: '4', type: 'deploy', message: 'Preview deployment created', time: '2 hours ago', status: 'success' },
    { id: '5', type: 'github', message: 'New issue created', time: '3 hours ago', status: 'info' },
  ])

  useEffect(() => {
    // Simular atualização em tempo real
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: typeof metric.value === 'number' 
          ? metric.value + Math.floor(Math.random() * 3 - 1)
          : metric.value
      })))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '↗️'
      case 'down': return '↘️'
      case 'stable': return '→'
      default: return '→'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      case 'error': return 'bg-red-100 text-red-800'
      default: return 'bg-blue-100 text-blue-800'
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <div 
            key={metric.id} 
            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow card-hover"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-full ${metric.color.replace('text-', 'bg-')} bg-opacity-10`}>
                <div className={metric.color}>{metric.icon}</div>
              </div>
              <span className="text-sm font-medium text-gray-500">
                {getTrendIcon(metric.trend)}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{metric.label}</h3>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-900">{metric.value}</span>
              <span className="ml-2 text-gray-600">{metric.unit}</span>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${metric.color.replace('text-', 'bg-')} rounded-full`}
                  style={{ width: `${typeof metric.value === 'number' ? Math.min(metric.value, 100) : 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Events */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">📋 Eventos Recentes</h3>
          <div className="space-y-3">
            {recentEvents.map((event) => (
              <div 
                key={event.id} 
                className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(event.status).replace('bg-', 'bg-').replace('text-', '')}`}></div>
                  <div>
                    <p className="font-medium text-gray-800">{event.message}</p>
                    <p className="text-sm text-gray-500">{event.time}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(event.status)}`}>
                  {event.type}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 text-rex-primary hover:text-rex-secondary font-medium">
            Ver todos os eventos →
          </button>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-br from-rex-primary/5 to-rex-secondary/5 border border-rex-primary/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">⚡ Ações Rápidas</h3>
          <div className="grid grid-cols-2 gap-3">
            <button className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition">
              <div className="text-2xl mb-2">🚀</div>
              <p className="font-medium text-gray-800">Deploy Now</p>
            </button>
            <button className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition">
              <div className="text-2xl mb-2">📊</div>
              <p className="font-medium text-gray-800">Ver Logs</p>
            </button>
            <button className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition">
              <div className="text-2xl mb-2">🔧</div>
              <p className="font-medium text-gray-800">Configurar</p>
            </button>
            <button className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition">
              <div className="text-2xl mb-2">📁</div>
              <p className="font-medium text-gray-800">Backup</p>
            </button>
          </div>
          
          <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
            <h4 className="font-medium text-gray-800 mb-2">Status do Sistema</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Gateway:</span>
                <span className="text-green-600 font-medium">● Online</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Database:</span>
                <span className="text-green-600 font-medium">● Conectado</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">WebSocket:</span>
                <span className="text-green-600 font-medium">● Ativo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}