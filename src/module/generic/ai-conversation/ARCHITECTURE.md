# 🏗️ Arquitetura AI Conversation - Agiliza Previ

## 📐 Visão Geral da Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                    Frontend (React/Next.js)                      │
│                    agiliza-previ-web                            │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            │ HTTP REST API
                            │ (Endpoints autenticados)
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│           ORQUESTRADOR: agiliza-previ-back (NestJS)             │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  AI Conversation Module                                    │ │
│  │                                                             │ │
│  │  ┌──────────────────────────────────────────────────────┐ │ │
│  │  │  AiConversationController                            │ │ │
│  │  │  - POST /customer/ai-conversation                    │ │ │
│  │  │  - POST /customer/ai-conversation/:id/message        │ │ │
│  │  │  - GET  /customer/ai-conversation/:id/messages       │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │                           ↓                                 │ │
│  │  ┌──────────────────────────────────────────────────────┐ │ │
│  │  │  AiConversationService                               │ │ │
│  │  │  - createConversation()                              │ │ │
│  │  │  - sendMessage()                                     │ │ │
│  │  │  - getMessages()                                     │ │ │
│  │  │  - generateAiResponse() [ORQUESTRAÇÃO]              │ │ │
│  │  └──────────────────────────────────────────────────────┘ │ │
│  │                ↓                      ↓                     │ │
│  │  ┌──────────────────┐    ┌──────────────────────────────┐ │ │
│  │  │ ConversationCache│    │  GenerativeIaGateway         │ │ │
│  │  │ Repository       │    │  (Gemini)                    │ │ │
│  │  │ (Redis)          │    └──────────────────────────────┘ │ │
│  │  └──────────────────┘                                      │ │
│  │                           ↓                                 │ │
│  │                  ┌──────────────────┐                      │ │
│  │                  │  McpToolsService │                      │ │
│  │                  │  - executeQuery()│                      │ │
│  │                  │  - getSchema()   │                      │
│  │                  │  - getStats()    │                      │
│  │                  └──────────────────┘                      │ │
│  └────────────────────────┬────────────────────────────────────┘ │
│                           │                                      │
│         ┌─────────────────┼──────────────────┐                 │
│         │                 │                  │                  │
│    ┌────▼────┐      ┌────▼────┐      ┌─────▼─────┐           │
│    │  MySQL  │      │  Redis  │      │  Gemini   │           │
│    │ (Direto)│      │ (Direto)│      │   API     │           │
│    └─────────┘      └─────────┘      └───────────┘           │
└───────────────────────────┬─────────────────────────────────────┘
                            │
                            │ HTTP (Tools API)
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│        TOOLS PROVIDER: agiliza-previ-mcp-server (Express)       │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  Tools Routes (Apenas provedor de ferramentas)            │ │
│  │                                                             │ │
│  │  POST /tools/query/execute    - Executa SQL seguro        │ │
│  │  POST /tools/query/validate   - Valida SQL                │ │
│  │  GET  /tools/schema          - Retorna schema DB          │ │
│  │  GET  /tools/stats           - Retorna estatísticas       │ │
│  │  GET  /health                - Health check               │ │
│  └────────────────────────────────────────────────────────────┘ │
│                           ↓                                      │
│                  ┌──────────────────┐                           │
│                  │ DatabaseQuery    │                           │
│                  │ Service          │                           │
│                  │ - Whitelist      │                           │
│                  │ - Validação      │                           │
│                  │ - Execução       │                           │
│                  └──────────────────┘                           │
│                           ↓                                      │
│                      ┌────────┐                                 │
│                      │  MySQL │                                 │
│                      └────────┘                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Separação de Responsabilidades

### 🟦 agiliza-previ-back (NestJS) - **ORQUESTRADOR**

**Responsabilidades:**
- ✅ Autenticação e autorização
- ✅ Gerenciamento de sessões
- ✅ Armazenamento de conversas (Redis)
- ✅ Orquestração da IA (Gemini)
- ✅ Controle de acesso (organização/conta)
- ✅ Endpoints REST para o frontend
- ✅ Logging e auditoria
- ✅ Rate limiting por usuário
- ✅ Contexto de negócio

**Módulos:**
```
src/module/generic/ai-conversation/
├── ai-conversation.module.ts
├── controller/
│   ├── ai-conversation.controller.ts
│   └── dto/
│       ├── create-conversation.dto.ts
│       ├── send-message.dto.ts
│       ├── conversation-response.dto.ts
│       ├── message-response.dto.ts
│       └── messages-list-response.dto.ts
├── service/
│   ├── ai-conversation.service.ts       # ORQUESTRADOR PRINCIPAL
│   └── mcp-tools.service.ts             # Cliente HTTP para MCP
└── repository/
    └── conversation-cache.repository.ts  # Redis
```

### 🟩 agiliza-previ-mcp-server (Express) - **TOOLS PROVIDER**

**Responsabilidades:**
- ✅ Execução segura de queries SQL
- ✅ Validação de queries
- ✅ Whitelist de tabelas
- ✅ Whitelist de operações
- ✅ Retorno de schema do banco
- ✅ Estatísticas do banco
- ✅ **NÃO gerencia conversas**
- ✅ **NÃO chama Gemini diretamente**
- ✅ **Apenas provê ferramentas**

**Endpoints:**
```
GET  /health                    - Status
POST /tools/query/execute       - Executa SQL
POST /tools/query/validate      - Valida SQL
GET  /tools/schema             - Schema
GET  /tools/stats              - Estatísticas
```

---

## 🔄 Fluxo de Execução

### 1. Criar Conversa

```
Frontend
  │
  └─> POST /customer/ai-conversation
      Body: { initialMessage?: string }
      Headers: { Authorization: Bearer <token> }
        │
        └─> NestJS: AiConversationController.createConversation()
              │
              ├─> Extrai organizationId + accountId do token
              │
              └─> AiConversationService.createConversation()
                    │
                    ├─> ConversationCacheRepository.createConversation()
                    │   └─> Redis: Salva conversa com TTL
                    │
                    └─> (Se initialMessage)
                        └─> AiConversationService.sendMessage()
                            └─> [Fluxo de enviar mensagem]
```

### 2. Enviar Mensagem (Com IA + Tools)

```
Frontend
  │
  └─> POST /customer/ai-conversation/:id/message
      Body: { message: "Quantos usuários temos?" }
      Headers: { Authorization: Bearer <token> }
        │
        └─> NestJS: AiConversationController.sendMessage()
              │
              ├─> Valida: conversa existe + pertence ao usuário
              │
              └─> AiConversationService.sendMessage()
                    │
                    ├─> (1) Adiciona mensagem do usuário no Redis
                    │
                    ├─> (2) Busca histórico (últimas 10 mensagens)
                    │
                    └─> (3) generateAiResponse()
                          │
                          ├─> McpToolsService.getDatabaseSchema()
                          │   └─> HTTP GET: mcp-server/tools/schema
                          │
                          ├─> McpToolsService.getDatabaseStats()
                          │   └─> HTTP GET: mcp-server/tools/stats
                          │
                          ├─> Monta prompt do sistema com schema + stats
                          │
                          ├─> GenerativeIaGateway.generateContent()
                          │   └─> Gemini API
                          │       Retorna: "Vou consultar... [SQL_QUERY]SELECT COUNT(*) FROM user[/SQL_QUERY]"
                          │
                          ├─> Detecta tag [SQL_QUERY]
                          │
                          ├─> McpToolsService.executeQuery(sql)
                          │   └─> HTTP POST: mcp-server/tools/query/execute
                          │       │
                          │       └─> MCP Server
                          │           ├─> Valida query (whitelist)
                          │           ├─> Executa no MySQL
                          │           └─> Retorna resultados
                          │
                          ├─> Envia resultados de volta para Gemini
                          │   └─> GenerativeIaGateway.generateContent()
                          │       Retorna: "Existem 150 usuários cadastrados..."
                          │
                          └─> (4) Salva resposta da IA no Redis
                                └─> Retorna para frontend
```

### 3. Listar Mensagens

```
Frontend
  │
  └─> GET /customer/ai-conversation/:id/messages?limit=50
      Headers: { Authorization: Bearer <token> }
        │
        └─> NestJS: AiConversationController.getMessages()
              │
              ├─> Valida: conversa existe + pertence ao usuário
              │
              └─> ConversationCacheRepository.getMessages()
                    └─> Redis: LRANGE messages:conversationId
                        └─> Retorna array de mensagens
```

---

## 🔐 Segurança

### Camadas de Segurança no NestJS

1. **Autenticação JWT**
   - CustomerAccountAuthGuard valida token
   - Extrai organizationId e accountId

2. **Autorização por Conversa**
   - Valida se conversa pertence à org/conta
   - Impede acesso a conversas de outros

3. **Rate Limiting**
   - Por usuário/organização
   - Limite configurável

### Camadas de Segurança no MCP Server

1. **Whitelist de Tabelas**
   ```typescript
   const ALLOWED_TABLES = [
     'user',
     'organization',
     'payment_plan',
     // ...
   ];
   ```

2. **Whitelist de Operações**
   ```typescript
   const ALLOWED_OPERATIONS = [
     'SELECT',
     'SHOW',
     'DESCRIBE',
     'EXPLAIN',
   ];
   ```

3. **Validação de Queries**
   - Bloqueia: INSERT, UPDATE, DELETE, DROP, etc.
   - Valida tabelas acessadas
   - Sanitização automática

4. **Rate Limiting Global**
   - 100 requisições por 15 min (configurável)

---

## ⚙️ Configuração

### NestJS (.env)

```env
# MCP Server URL
MCP_SERVER_URL=http://localhost:3001

# Redis (já configurado)
REDIS_HOST=localhost
REDIS_PORT=6379

# MySQL (já configurado)
# ...

# Gemini (já configurado)
GEMINI_API_KEY=...
```

### MCP Server (.env)

```env
# Server
PORT=3001

# MySQL (mesmas credenciais do NestJS)
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=...
MYSQL_DATABASE=agiliza_previ

# Redis (opcional, pode remover se não usar)
REDIS_HOST=localhost
REDIS_PORT=6379

# Gemini (pode remover, não usa mais diretamente)
# GEMINI_API_KEY=...
```

---

## 📊 Endpoints Criados

### Frontend → NestJS

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/customer/ai-conversation` | Cria conversa |
| POST | `/customer/ai-conversation/:id/message` | Envia mensagem |
| GET | `/customer/ai-conversation/:id/messages` | Lista mensagens |

### NestJS → MCP Server (Interno)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| POST | `/tools/query/execute` | Executa SQL |
| POST | `/tools/query/validate` | Valida SQL |
| GET | `/tools/schema` | Retorna schema |
| GET | `/tools/stats` | Retorna stats |
| GET | `/health` | Health check |

---

## 🎨 Exemplo de Uso

### Frontend (React/Next.js)

```typescript
// Criar conversa
const createConversation = async (initialMessage?: string) => {
  const response = await fetch('/customer/ai-conversation', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ initialMessage }),
  });
  
  return response.json();
  // { conversationId, response?, createdAt }
};

// Enviar mensagem
const sendMessage = async (conversationId: string, message: string) => {
  const response = await fetch(`/customer/ai-conversation/${conversationId}/message`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ message }),
  });
  
  return response.json();
  // { response, timestamp, metadata? }
};

// Listar mensagens
const getMessages = async (conversationId: string) => {
  const response = await fetch(`/customer/ai-conversation/${conversationId}/messages`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  
  return response.json();
  // { conversationId, messages[], totalMessages }
};
```

---

## 🚀 Deploy

### 1. MCP Server (muda de porta se necessário)

```bash
cd agiliza-previ-mcp-server
npm install
npm run build
npm start
# Roda na porta 3001
```

### 2. NestJS (adicionar módulo)

No `app.module.ts`:

```typescript
import { AiConversationModule } from '@module/generic/ai-conversation/ai-conversation.module';

@Module({
  imports: [
    // ... outros módulos
    AiConversationModule,
  ],
})
export class AppModule {}
```

---

## ✅ Vantagens desta Arquitetura

1. **Separação de Responsabilidades**
   - NestJS: Orquestração + Negócio
   - MCP: Tools + Segurança SQL

2. **Segurança Reforçada**
   - Autenticação no NestJS
   - Validação SQL no MCP
   - Dupla camada de proteção

3. **Escalabilidade**
   - MCP pode ser escalado independentemente
   - Redis para cache distribuído
   - Stateless

4. **Manutenibilidade**
   - Código organizado
   - Responsabilidades claras
   - Fácil testar

5. **Flexibilidade**
   - Fácil adicionar novos tools
   - Fácil mudar provider de IA
   - Fácil adicionar validações

---

**Arquitetura criada com ❤️ para Agiliza Previ**
