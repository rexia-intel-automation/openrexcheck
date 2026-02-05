# OpenRexCheck 🦖

Dashboard de monitoramento e integração OpenClaw + Vercel + GitHub

## ✨ Funcionalidades

- **💬 Chat em tempo real** com o assistente Rex via OpenClaw Gateway
- **📊 Dashboard de métricas** (uptime, CPU, memória, requests, etc.)
- **🐙 Integração GitHub** (PRs, workflows, repositórios)
- **🚀 Deploy automático** na Vercel
- **🔧 CI/CD pipeline** com GitHub Actions
- **📈 Analytics** em tempo real

## 🚀 Deploy Rápido

### Opção 1: Vercel (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Frexia-intel-automation%2Fopenrexcheck&env=OPENCLAW_GATEWAY_URL&project-name=openrexcheck&repository-name=openrexcheck)

```bash
# Clone o repositório
git clone https://github.com/rexia-intel-automation/openrexcheck
cd openrexcheck

# Instale dependências
npm install

# Configure variáveis de ambiente
echo "OPENCLAW_GATEWAY_URL=http://localhost:3000" > .env.local

# Execute localmente
npm run dev

# Ou faça deploy na Vercel
npm run deploy
```

### Opção 2: Docker

```bash
docker build -t openrexcheck .
docker run -p 3000:3000 openrexcheck
```

## 🔧 Configuração

### Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `OPENCLAW_GATEWAY_URL` | URL do Gateway OpenClaw | `http://localhost:3000` |
| `NEXT_PUBLIC_OPENCLAW_GATEWAY_URL` | URL pública (para frontend) | `https://gateway.seu-dominio.com` |

### Integração com OpenClaw

1. **Configure seu Gateway OpenClaw:**
```yaml
# config.yaml
webchat:
  enabled: true
  port: 3000

api:
  enabled: true
  cors:
    origins: ["https://seu-app.vercel.app"]
```

2. **Adicione o token de acesso:**
```bash
# No deploy da Vercel
OPENCLAW_GATEWAY_URL=https://seu-gateway.com
```

## 📁 Estrutura do Projeto

```
openrexcheck/
├── app/                    # Next.js 14 App Router
│   ├── page.tsx           # Página principal com tabs
│   ├── layout.tsx         # Layout root
│   ├── globals.css        # Estilos globais
│   └── api/              # API routes
│       ├── chat/route.js  # Endpoint de chat
│       └── health/route.js # Health check
├── components/            # Componentes React
│   ├── ChatInterface.tsx  # Interface de chat
│   ├── MetricsDashboard.tsx # Dashboard de métricas
│   ├── GitHubIntegration.tsx # Integração GitHub
│   └── RealtimeChart.tsx  # Gráficos em tempo real
├── public/               # Assets estáticos
└── .github/workflows/    # GitHub Actions
```

## 🔗 API Routes

### `/api/chat` - Enviar mensagem para o Rex
```javascript
POST /api/chat
{
  "message": "Olá Rex!"
}

Response:
{
  "response": "Olá! Como posso ajudar?",
  "timestamp": "2024-02-05T19:30:00Z"
}
```

### `/api/health` - Health check do Gateway
```javascript
GET /api/health

Response:
{
  "status": "connected",
  "gateway": "http://localhost:3000",
  "timestamp": "2024-02-05T19:30:00Z"
}
```

## 🐙 GitHub Actions

O projeto inclui workflows para:

1. **CI/CD Pipeline** - Testes, build e deploy automático
2. **Code Review** - Análise automática com OpenClaw
3. **Security Scanning** - Verificação de vulnerabilidades
4. **Performance Monitoring** - Métricas pós-deploy

```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci && npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

## 📊 Monitoramento

### Métricas coletadas:
- ✅ **Uptime** do Gateway OpenClaw
- ✅ **CPU/Memory usage** do servidor
- ✅ **Requests por minuto**
- ✅ **Status de deploys** na Vercel
- ✅ **Pull Requests** no GitHub
- ✅ **Workflow runs** do CI/CD

### Alertas configuráveis:
- Gateway offline
- CPU acima de 80%
- Deploy falhou
- PR aberto sem review

## 🔐 Segurança

- 🔒 Tokens armazenados como secrets no Vercel/GitHub
- 🔐 CORS configurado para domínios específicos
- 🔐 WebSocket com reconexão automática
- 🔐 Rate limiting nos endpoints da API

## 🛠️ Desenvolvimento

```bash
# Ambiente de desenvolvimento
npm run dev          # Inicia em localhost:3000

# Build para produção
npm run build        # Cria build otimizado
npm start            # Inicia servidor de produção

# Linting e formatação
npm run lint         # ESLint
npm run format       # Prettier (se configurado)

# Testes
npm test             # Executa testes (a configurar)
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`)
3. Commit suas mudanças (`git commit -m 'Add nova funcionalidade'`)
4. Push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📞 Suporte

- **Issues:** [GitHub Issues](https://github.com/rexia-intel-automation/openrexcheck/issues)
- **Documentação:** [docs.openclaw.ai](https://docs.openclaw.ai)
- **Comunidade:** [Discord OpenClaw](https://discord.com/invite/clawd)

## 📄 Licença

MIT © RexIA Intel Automation

---

Feito com 🦖 por [RexIA](https://rexia.com.br) | [OpenClaw](https://openclaw.ai)