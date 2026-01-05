# 🚀 Guia de Integração - AI Conversation Module

## ✅ Checklist de Integração

### 1. MCP Server (Tools Provider)

```bash
cd /home/flores/Private/work/agiliza-previ/project/agiliza-previ-mcp-server

# Instalar dependências
npm install

# Configurar .env
cp .env.example .env
nano .env
```

**Ajustar no .env do MCP:**
```env
PORT=3001
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=sua_senha_mysql
MYSQL_DATABASE=agiliza_previ
```

**Iniciar MCP Server:**
```bash
npm run dev
# Roda em http://localhost:3001
```

**Testar:**
```bash
curl http://localhost:3001/health
# Deve retornar: {"status":"healthy",...}
```

---

### 2. NestJS Backend (Orquestrador)

#### 2.1. Adicionar MCP_SERVER_URL no .env

```bash
cd /home/flores/Private/work/agiliza-previ/project/agiliza-previ-back

nano .env
```

Adicionar:
```env
# MCP Server URL
MCP_SERVER_URL=http://localhost:3001
```

#### 2.2. Registrar AiConversationModule no AppModule

Editar `src/app.module.ts`:

```typescript
import { Module } from '@nestjs/common';
// ... outros imports

import { AiConversationModule } from '@module/generic/ai-conversation/ai-conversation.module';

@Module({
  imports: [
    // ... outros módulos existentes
    
    // Adicionar no final
    AiConversationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

#### 2.3. Instalar dependência do HttpModule (se necessário)

```bash
npm install @nestjs/axios axios
```

#### 2.4. Iniciar o servidor

```bash
npm run start:dev
```

**Verificar logs:**
- Deve aparecer os novos endpoints:
  ```
  Mapped {/customer/ai-conversation, POST} route
  Mapped {/customer/ai-conversation/:conversationId/message, POST} route
  Mapped {/customer/ai-conversation/:conversationId/messages, GET} route
  ```

---

### 3. Testar Integração

#### 3.1. Criar um token JWT válido

Use um endpoint de login existente para obter um token:

```bash
# Exemplo (ajustar para seu endpoint)
TOKEN=$(curl -X POST http://localhost:3000/customer/account/sign-in \
  -H "Content-Type: application/json" \
  -d '{"email":"seu@email.com","password":"senha"}' \
  | jq -r '.accessToken')
```

#### 3.2. Criar conversa

```bash
curl -X POST http://localhost:3000/customer/ai-conversation \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"initialMessage": "Olá! Quantos usuários temos cadastrados?"}' \
  | jq '.'
```

**Resposta esperada:**
```json
{
  "conversationId": "uuid-aqui",
  "response": "Vou consultar... Existem X usuários cadastrados...",
  "createdAt": 1704380400000
}
```

#### 3.3. Enviar mensagem

```bash
CONVERSATION_ID="uuid-da-resposta-anterior"

curl -X POST http://localhost:3000/customer/ai-conversation/$CONVERSATION_ID/message \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"message": "E quantos planos de pagamento temos ativos?"}' \
  | jq '.'
```

**Resposta esperada:**
```json
{
  "response": "Existem Y planos de pagamento ativos...",
  "timestamp": 1704380500000,
  "metadata": {
    "queryExecuted": "SELECT COUNT(*) FROM payment_plan WHERE deleted_at IS NULL",
    "resultsCount": 1,
    "executionTime": 25
  }
}
```

#### 3.4. Listar mensagens

```bash
curl -X GET "http://localhost:3000/customer/ai-conversation/$CONVERSATION_ID/messages?limit=10" \
  -H "Authorization: Bearer $TOKEN" \
  | jq '.'
```

**Resposta esperada:**
```json
{
  "conversationId": "uuid",
  "messages": [
    {
      "id": "msg-uuid-1",
      "role": "user",
      "content": "Olá! Quantos usuários temos cadastrados?",
      "timestamp": 1704380400000
    },
    {
      "id": "msg-uuid-2",
      "role": "assistant",
      "content": "Existem X usuários cadastrados...",
      "timestamp": 1704380405000,
      "metadata": {...}
    },
    ...
  ],
  "totalMessages": 4
}
```

---

## 🎨 Customizações

### Adicionar Novas Tabelas ao MCP

Editar `agiliza-previ-mcp-server/src/services/database-query.service.ts`:

```typescript
const ALLOWED_TABLES = [
  'user',
  'organization',
  'payment_plan',
  // Adicionar aqui
  'sua_nova_tabela',
];
```

### Ajustar Prompt do Sistema

Editar `agiliza-previ-back/src/module/generic/ai-conversation/service/ai-conversation.service.ts`:

Método `generateAiResponse()`, ajustar `systemPrompt`:

```typescript
const systemPrompt = `Você é um assistente especializado...
[Personalizar aqui]
`;
```

### Ajustar TTL das Conversas

Editar `agiliza-previ-back/src/module/generic/ai-conversation/repository/conversation-cache.repository.ts`:

```typescript
const CONVERSATION_TTL_SECONDS = 86400; // 24 horas (ajustar)
const MAX_MESSAGES_PER_CONVERSATION = 100; // (ajustar)
```

---

## 🔧 Troubleshooting

### Erro: "Cannot connect to MCP Server"

**Verificar:**
```bash
# MCP Server está rodando?
curl http://localhost:3001/health

# Porta correta no .env do NestJS?
cat .env | grep MCP_SERVER_URL
```

**Solução:**
- Iniciar MCP Server: `cd agiliza-previ-mcp-server && npm run dev`
- Ajustar URL no .env: `MCP_SERVER_URL=http://localhost:3001`

---

### Erro: "Conversa não encontrada"

**Causa:** Conversa expirou no Redis (TTL de 24h)

**Solução:** Criar nova conversa

---

### Erro: "Query não permitida"

**Causa:** Query está tentando acessar tabela não permitida ou usar operação não permitida

**Verificar no MCP:**
```bash
curl -X POST http://localhost:3001/tools/query/validate \
  -H "Content-Type: application/json" \
  -d '{"query": "SELECT * FROM sua_tabela"}'
```

**Solução:** Adicionar tabela à whitelist no MCP

---

### Erro: "Acesso negado a esta conversa"

**Causa:** Tentando acessar conversa de outra organização/conta

**Solução:** Usar token correto da conta que criou a conversa

---

## 📊 Monitoramento

### Logs Importantes

**MCP Server:**
```
✅ MySQL connection successful
✅ Redis connection successful
✅ Servidor rodando na porta 3001
```

**NestJS:**
```
[RouterExplorer] Mapped {/customer/ai-conversation, POST} route
[RouterExplorer] Mapped {/customer/ai-conversation/:conversationId/message, POST} route
[RouterExplorer] Mapped {/customer/ai-conversation/:conversationId/messages, GET} route
```

### Health Checks

```bash
# MCP Server
curl http://localhost:3001/health

# NestJS
curl http://localhost:3000/health  # (se tiver)
```

---

## 🎉 Pronto!

Sua integração está completa! Agora você pode:

1. ✅ Criar conversas com IA
2. ✅ Fazer perguntas sobre seus dados
3. ✅ IA executa queries SQL automaticamente
4. ✅ Histórico persistente no Redis
5. ✅ Tudo autenticado e seguro

### Próximos Passos

1. Integrar no frontend (usar exemplos do MCP)
2. Adicionar mais tabelas conforme necessário
3. Customizar prompts da IA
4. Implementar analytics/logs

---

**Documentação completa em:** `ARCHITECTURE.md`
