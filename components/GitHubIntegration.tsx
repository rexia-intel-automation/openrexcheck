'use client'

import { useState, useEffect } from 'react'
import { GitBranch, GitPullRequest, Issue, Star, Code, History } from 'lucide-react'

interface GitHubRepo {
  name: string
  description: string
  stars: number
  forks: number
  open_issues: number
  last_updated: string
}

interface PR {
  id: number
  title: string
  author: string
  state: string
  created_at: string
  url: string
}

interface WorkflowRun {
  id: number
  name: string
  status: string
  conclusion: string
  created_at: string
}

export default function GitHubIntegration() {
  const [repos, setRepos] = useState<GitHubRepo[]>([
    { name: 'openrexcheck', description: 'Dashboard de monitoramento OpenClaw', stars: 0, forks: 0, open_issues: 0, last_updated: '2024-02-05' },
    { name: 'openclaw', description: 'OpenClaw - Assistente IA', stars: 125, forks: 34, open_issues: 12, last_updated: '2024-02-04' },
    { name: 'rexia-intel-automation', description: 'Automation scripts', stars: 42, forks: 8, open_issues: 3, last_updated: '2024-02-03' },
  ])

  const [prs, setPrs] = useState<PR[]>([
    { id: 42, title: 'Add GitHub integration', author: 'rex', state: 'open', created_at: '2024-02-05', url: '#' },
    { id: 41, title: 'Fix deployment pipeline', author: 'dev', state: 'merged', created_at: '2024-02-04', url: '#' },
    { id: 40, title: 'Update dependencies', author: 'bot', state: 'closed', created_at: '2024-02-03', url: '#' },
  ])

  const [workflows, setWorkflows] = useState<WorkflowRun[]>([
    { id: 123, name: 'CI/CD Pipeline', status: 'completed', conclusion: 'success', created_at: '2024-02-05T18:30:00Z' },
    { id: 122, name: 'Deploy Preview', status: 'completed', conclusion: 'failure', created_at: '2024-02-05T16:45:00Z' },
    { id: 121, name: 'Tests', status: 'completed', conclusion: 'success', created_at: '2024-02-05T15:20:00Z' },
  ])

  const [selectedRepo, setSelectedRepo] = useState<string>('openrexcheck')

  const fetchGitHubData = async () => {
    // Em produção, isso buscaria dados reais da API do GitHub
    // Simulação por enquanto
    console.log('Fetching GitHub data for:', selectedRepo)
  }

  useEffect(() => {
    fetchGitHubData()
  }, [selectedRepo])

  const getStatusColor = (status: string, conclusion?: string) => {
    if (status === 'completed') {
      return conclusion === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    }
    if (status === 'in_progress') return 'bg-blue-100 text-blue-800'
    return 'bg-gray-100 text-gray-800'
  }

  const getPRStateColor = (state: string) => {
    switch (state) {
      case 'open': return 'bg-green-100 text-green-800'
      case 'merged': return 'bg-purple-100 text-purple-800'
      case 'closed': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    }) + ' ' + formatDate(dateString)
  }

  return (
    <div className="space-y-6">
      {/* Repo Selector */}
      <div className="flex flex-wrap gap-2">
        {repos.map((repo) => (
          <button
            key={repo.name}
            onClick={() => setSelectedRepo(repo.name)}
            className={`px-4 py-2 rounded-lg border transition-all ${
              selectedRepo === repo.name
                ? 'bg-gradient-to-r from-rex-primary to-rex-secondary text-white border-transparent'
                : 'bg-white border-gray-200 text-gray-700 hover:border-rex-primary'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Code className="w-4 h-4" />
              <span className="font-medium">{repo.name}</span>
            </div>
          </button>
        ))}
        <button className="px-4 py-2 rounded-lg border border-dashed border-gray-300 text-gray-500 hover:border-rex-primary hover:text-rex-primary transition">
          + Adicionar Repo
        </button>
      </div>

      {/* Selected Repo Info */}
      <div className="bg-gradient-to-r from-rex-primary/5 to-rex-secondary/5 border border-rex-primary/20 rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {repos.find(r => r.name === selectedRepo)?.name}
            </h3>
            <p className="text-gray-600 mb-4">
              {repos.find(r => r.name === selectedRepo)?.description}
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-gray-700 font-medium">
                  {repos.find(r => r.name === selectedRepo)?.stars}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <GitBranch className="w-4 h-4 text-green-500" />
                <span className="text-gray-700 font-medium">
                  {repos.find(r => r.name === selectedRepo)?.forks}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <Issue className="w-4 h-4 text-red-500" />
                <span className="text-gray-700 font-medium">
                  {repos.find(r => r.name === selectedRepo)?.open_issues}
                </span>
              </div>
              <div className="flex items-center space-x-1">
                <History className="w-4 h-4 text-blue-500" />
                <span className="text-gray-700 text-sm">
                  Atualizado em {formatDate(repos.find(r => r.name === selectedRepo)?.last_updated || '')}
                </span>
              </div>
            </div>
          </div>
          <button className="bg-gradient-to-r from-rex-primary to-rex-secondary text-white px-4 py-2 rounded-lg hover:opacity-90 transition">
            🔄 Sync com GitHub
          </button>
        </div>
      </div>

      {/* PRs and Workflows Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pull Requests */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <GitPullRequest className="w-5 h-5 mr-2" />
              Pull Requests
            </h3>
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
              {prs.length} PRs
            </span>
          </div>
          
          <div className="space-y-3">
            {prs.map((pr) => (
              <a
                key={pr.id}
                href={pr.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">#{pr.id}: {pr.title}</h4>
                    <p className="text-sm text-gray-600">
                      Por {pr.author} • {formatDate(pr.created_at)}
                    </p>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getPRStateColor(pr.state)}`}>
                    {pr.state}
                  </span>
                </div>
              </a>
            ))}
          </div>
          
          <button className="w-full mt-4 py-2 text-center text-rex-primary hover:text-rex-secondary font-medium">
            Ver todos os PRs →
          </button>
        </div>

        {/* Workflow Runs */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <History className="w-5 h-5 mr-2" />
              Workflow Runs
            </h3>
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
              {workflows.length} runs
            </span>
          </div>
          
          <div className="space-y-3">
            {workflows.map((run) => (
              <div
                key={run.id}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-800">{run.name}</h4>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(run.status, run.conclusion)}`}>
                    {run.status === 'completed' ? run.conclusion : run.status}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>ID: #{run.id}</span>
                    <span>{formatDateTime(run.created_at)}</span>
                  </div>
                </div>
                
                <div className="mt-3">
                  <div className="flex space-x-1">
                    {run.conclusion === 'success' ? (
                      <>
                        <div className="h-1 flex-1 bg-green-500 rounded"></div>
                        <div className="h-1 flex-1 bg-green-500 rounded"></div>
                        <div className="h-1 flex-1 bg-green-500 rounded"></div>
                      </>
                    ) : (
                      <>
                        <div className="h-1 flex-1 bg-green-500 rounded"></div>
                        <div className="h-1 flex-1 bg-green-500 rounded"></div>
                        <div className="h-1 flex-1 bg-red-500 rounded"></div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 py-2 text-center text-rex-primary hover:text-rex-secondary font-medium">
            Ver histórico completo →
          </button>
        </div>
      </div>

      {/* GitHub Actions */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">⚡ GitHub Actions Configuradas</h3>
        
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Code className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">CI/CD Pipeline</h4>
                  <p className="text-sm text-gray-600">.github/workflows/ci.yml</p>
                </div>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                Ativo
              </span>
            </div>
            <p className="text-gray-700 text-sm">
              Testes automatizados, build e deploy na Vercel em cada push.
            </p>
          </div>
          
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <GitPullRequest className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Code Review</h4>
                  <p className="text-sm text-gray-600">.github/workflows/review.yml</p>
                </div>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                Ativo
              </span>
            </div>
            <p className="text-gray-700 text-sm">
              Análise automática de código com OpenClaw em cada PR.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}