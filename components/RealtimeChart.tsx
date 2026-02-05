'use client'

import { useState, useEffect } from 'react'
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, AreaChart, Area, BarChart, Bar 
} from 'recharts'

interface ChartData {
  timestamp: string
  requests: number
  responseTime: number
  cpu: number
  memory: number
  errors: number
}

export default function RealtimeChart() {
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [chartType, setChartType] = useState<'line' | 'area' | 'bar'>('line')
  const [timeRange, setTimeRange] = useState<'1h' | '6h' | '24h'>('1h')

  useEffect(() => {
    // Gerar dados iniciais
    const initialData: ChartData[] = []
    const now = new Date()
    
    for (let i = 59; i >= 0; i--) {
      const time = new Date(now.getTime() - i * 60000)
      initialData.push({
        timestamp: time.toLocaleTimeString('pt-BR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        requests: Math.floor(Math.random() * 200) + 50,
        responseTime: Math.floor(Math.random() * 100) + 20,
        cpu: Math.floor(Math.random() * 30) + 20,
        memory: Math.floor(Math.random() * 40) + 30,
        errors: Math.floor(Math.random() * 5)
      })
    }
    
    setChartData(initialData)

    // Simular atualização em tempo real
    const interval = setInterval(() => {
      setChartData(prev => {
        const newData = [...prev.slice(1)]
        const lastTime = new Date(now.getTime())
        lastTime.setMinutes(lastTime.getMinutes() + newData.length)
        
        newData.push({
          timestamp: lastTime.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          requests: Math.floor(Math.random() * 200) + 50,
          responseTime: Math.floor(Math.random() * 100) + 20,
          cpu: Math.floor(Math.random() * 30) + 20,
          memory: Math.floor(Math.random() * 40) + 30,
          errors: Math.floor(Math.random() * 5)
        })
        
        return newData
      })
    }, 10000)

    return () => clearInterval(interval)
  }, [timeRange])

  const renderChart = () => {
    const commonProps = {
      data: chartData,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    }

    switch (chartType) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="timestamp" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #ddd',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="requests" 
              name="Requests/min" 
              stroke="#667eea" 
              fill="#667eea" 
              fillOpacity={0.3}
            />
            <Area 
              type="monotone" 
              dataKey="responseTime" 
              name="Response Time (ms)" 
              stroke="#764ba2" 
              fill="#764ba2" 
              fillOpacity={0.3}
            />
          </AreaChart>
        )
      
      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="timestamp" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip />
            <Legend />
            <Bar dataKey="requests" name="Requests/min" fill="#667eea" />
            <Bar dataKey="errors" name="Errors" fill="#f56565" />
          </BarChart>
        )
      
      default: // line
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="timestamp" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white', 
                border: '1px solid #ddd',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="requests" 
              name="Requests/min" 
              stroke="#667eea" 
              strokeWidth={2}
              dot={{ r: 2 }}
              activeDot={{ r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="responseTime" 
              name="Response Time (ms)" 
              stroke="#764ba2" 
              strokeWidth={2}
              dot={{ r: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="cpu" 
              name="CPU %" 
              stroke="#f56565" 
              strokeWidth={2}
              dot={{ r: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="memory" 
              name="Memory %" 
              stroke="#48bb78" 
              strokeWidth={2}
              dot={{ r: 2 }}
            />
          </LineChart>
        )
    }
  }

  const getTimeRangeLabel = (range: string) => {
    switch (range) {
      case '1h': return 'Última hora'
      case '6h': return 'Últimas 6 horas'
      case '24h': return 'Últimas 24 horas'
      default: return 'Última hora'
    }
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">📈 Métricas em Tempo Real</h3>
          <p className="text-gray-600 text-sm">
            {getTimeRangeLabel(timeRange)} • Atualizado a cada 10s
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <span className="text-gray-700 text-sm">Tipo:</span>
            <div className="flex bg-gray-100 rounded-lg p-1">
              {(['line', 'area', 'bar'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setChartType(type)}
                  className={`px-3 py-1 rounded text-sm font-medium transition ${
                    chartType === type
                      ? 'bg-white shadow text-rex-primary'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {type === 'line' ? 'Linha' : type === 'area' ? 'Área' : 'Barras'}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-gray-700 text-sm">Período:</span>
            <div className="flex bg-gray-100 rounded-lg p-1">
              {(['1h', '6h', '24h'] as const).map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1 rounded text-sm font-medium transition ${
                    timeRange === range
                      ? 'bg-white shadow text-rex-primary'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 text-sm">Requests/min</span>
            <div className="w-2 h-2 bg-rex-primary rounded-full"></div>
          </div>
          <div className="text-2xl font-bold text-gray-800 mt-2">
            {chartData.length > 0 
              ? Math.round(chartData[chartData.length - 1].requests)
              : 0}
          </div>
          <div className="text-xs text-green-600 mt-1">
            +{chartData.length > 1 
              ? Math.round(((chartData[chartData.length - 1].requests - chartData[0].requests) / chartData[0].requests) * 100)
              : 0}%
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 text-sm">Response Time</span>
            <div className="w-2 h-2 bg-rex-secondary rounded-full"></div>
          </div>
          <div className="text-2xl font-bold text-gray-800 mt-2">
            {chartData.length > 0 
              ? Math.round(chartData[chartData.length - 1].responseTime)
              : 0}ms
          </div>
          <div className="text-xs text-yellow-600 mt-1">
            {chartData.length > 1 
              ? Math.round(chartData[chartData.length - 1].responseTime - chartData[0].responseTime)
              : 0}ms
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 text-sm">CPU Usage</span>
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          </div>
          <div className="text-2xl font-bold text-gray-800 mt-2">
            {chartData.length > 0 
              ? Math.round(chartData[chartData.length - 1].cpu)
              : 0}%
          </div>
          <div className="text-xs text-gray-600 mt-1">
            Avg: {chartData.length > 0 
              ? Math.round(chartData.reduce((sum, d) => sum + d.cpu, 0) / chartData.length)
              : 0}%
          </div>
        </div>
        
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-600 text-sm">Error Rate</span>
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
          </div>
          <div className="text-2xl font-bold text-gray-800 mt-2">
            {chartData.length > 0 
              ? chartData[chartData.length - 1].errors
              : 0}
          </div>
          <div className="text-xs text-gray-600 mt-1">
            Total: {chartData.reduce((sum, d) => sum + d.errors, 0)} errors
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-gradient-to-r from-rex-primary/5 to-rex-secondary/5 border border-rex-primary/20 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-rex-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-rex-primary">ℹ️</span>
          </div>
          <div>
            <h4 className="font-medium text-gray-800">Sobre os dados</h4>
            <p className="text-gray-600 text-sm mt-1">
              Os dados são simulados para demonstração. Em produção, conectaríamos ao 
              OpenClaw Gateway para métricas reais. A atualização ocorre a cada 10 segundos.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}