# read_Me_analysis

## Objetivo deste documento

Este guia explica, de forma prática e padronizada, como criar **um novo fluxo de negócio** neste backend seguindo Clean Architecture, DDD, CQRS e as convenções internas do projeto.

A proposta é servir como manual de implementação para qualquer módulo novo (customer/admin/generic), do desenho até a validação final.

---

## Visão de alto nível (como o fluxo funciona)

Um fluxo completo no projeto segue esta sequência:

1. Controller recebe a requisição HTTP.
2. DTO valida entrada e documenta contrato de API.
3. Use case orquestra regra de negócio.
4. Use case usa gateways de domínio (query/command).
5. Repositórios TypeORM implementam os gateways.
6. Escritas são executadas via transação com `commit()` obrigatório.
7. Resultado volta em DTO de resposta.

Em termos de camadas:

- **Presentation**: controller + DTOs.
- **Application**: use cases.
- **Domain**: entities, value objects, enums, errors, gateways.
- **Infrastructure**: TypeORM entities, repositories, mapeamentos.

---

## O que foi feito como referência de implementação

A estrutura aplicada para fechar um fluxo completo neste projeto segue este padrão de entregáveis:

1. Criação/ajuste de entidades de domínio e value objects.
2. Criação dos gateways query/command no domínio.
3. Criação dos use cases para operações de negócio.
4. Criação de DTOs request/response com decorators internos.
5. Exposição de endpoints no controller.
6. Criação das entidades TypeORM e relações necessárias.
7. Implementação dos repositórios TypeORM (query/command).
8. Registro de providers no `DatabaseModule`.
9. Registro de entidades/repos no índice TypeORM.
10. Integrações adicionais (seeds, créditos, prompts, etc., quando aplicável).
11. Build e validação final.

Esse é o mesmo roteiro que deve ser repetido para qualquer novo fluxo.

---

## Passo a passo oficial para criar um novo fluxo

## 1) Definir o domínio

Crie no módulo alvo:

- entidade principal;
- interface de props da entidade;
- value object de ID;
- enums específicos de domínio;
- erros de domínio.

### Regras obrigatórias

- Toda classe deve ter `_type`.
- Entidade deve estender `BaseEntity<IdType>`.
- Props interface deve estender `BaseEntityPropsInterface<IdType>`.
- Não usar dependência de infraestrutura no domínio.
- IDs devem ser value objects.

---

## 2) Definir gateways (CQRS)

No domínio, separar leitura e escrita:

- `...query.repository.gateway.ts`
- `...command.repository.gateway.ts`

### Regras obrigatórias

- Gateway é `abstract class`.
- Query retorna dados de leitura.
- Command retorna `TransactionType` para escrita.
- Sem tipos de ORM nas assinaturas de domínio.

---

## 3) Criar DTOs de entrada e saída

Estrutura:

- `dto/request/*`
- `dto/response/*`

### Regras obrigatórias

- DTO request: `@RequestDto()` + decorators request.
- DTO response: `@ResponseDto()` + decorators response.
- DTOs devem estender `BaseBuildableDtoObject`.
- Respostas de update devem retornar ID (não booleano `success`).
- Campos opcionais no DTO: usar `?:` (evitar `| null` no contrato).
- Value object em request deve usar `@RequestDtoValueObjectProperty`.

---

## 4) Implementar use cases

Cada caso de uso em arquivo próprio:

- `create-*.use-case.ts`
- `get-*.use-case.ts`
- `update-*.use-case.ts`
- `delete-*.use-case.ts`

### Regras obrigatórias

- Use case é a camada de negócio principal.
- Não colocar regra de negócio em controller/repository.
- Injetar gateways no construtor.
- Escrever método público `execute(...)` + métodos privados auxiliares.

### Regra crítica de transação

Quando houver escrita:

1. `const transaction = await baseTransactionRepositoryGateway.execute(...)`
2. `await transaction.commit()`

Sem commit, nada persiste no banco.

---

## 5) Implementar controller

No módulo alvo, criar controller com `BuildEndpointSpecification` para cada endpoint.

### Regras obrigatórias

- Controller só lida com HTTP.
- Validação por DTO e pipes.
- Path params com value object devem usar `ParseValueObjectPipe`.
- Se for apenas um path param, passe direto ao use case (sem criar DTO wrapper desnecessário).
- Query params devem entrar via Request DTO e converter para input model quando necessário.

---

## 6) Criar entidades TypeORM

Na infraestrutura:

- `infra/database/implementation/typeorm/schema/entity/*.typeorm.entity.ts`

### Regras obrigatórias

- Extender `BaseTypeormEntity`.
- Colunas com nome `snake_case` e propriedade `camelCase`.
- `type: 'date'` usa `DateOnlyTransformer`.
- `type: 'timestamp'`/`'datetime'` usa `DateTransformer`.
- Dados sensíveis usam transformer de criptografia quando aplicável.
- Não colocar lógica de negócio em entidade TypeORM.

### Regra crítica de relacionamento @ManyToOne

- Em `@ManyToOne` com `@JoinColumn`, **não duplicar** FK com `@Column` separado.

### Regra crítica de relacionamento @OneToOne

- **TODA relação `@OneToOne` bidirecional deve ter `@JoinColumn` em exatamente UM dos lados**.
- O lado com `@JoinColumn` é o que terá a coluna de FK no banco.
- O outro lado NÃO deve ter `@JoinColumn`.
- Esquecer isso causa erro: `"Relation does not have join columns"`.
- Ver seção "Correções estruturais e problemas TypeORM comuns" para mais detalhes.

---

## 7) Implementar repositórios TypeORM

Criar implementações em:

- `infra/database/implementation/typeorm/repository/...`

### Regras obrigatórias

- Implementar gateways do domínio.
- Query: busca e montagem de resultado.
- Command: criação/atualização/exclusão retornando `TransactionType`.
- Sem regra de negócio de domínio aqui.

---

## 8) Configurar mapeamentos

Se houver necessidade de conversão entre ORM e domínio, configurar perfil de mapper.

### Regras obrigatórias

- Mapear campos explicitamente (sem spread).
- Se relação obrigatória faltar, lançar `IncompleteSourceDataForMappingError`.
- Não usar non-null assertion (`!`) para mascarar relação ausente.

---

## 9) Registrar dependências no DI

Atualizar:

1. `DatabaseModule` para mapear gateways → repositórios.
2. Módulo funcional (`*.module.ts`) para controllers/use cases/imports.
3. Índice TypeORM para incluir entidades e repositórios novos.

---

## 10) Integrar com recursos pagos (quando o fluxo exigir)

Se o fluxo consome crédito/IA:

1. Adicionar valor no enum de tipo de recurso pago.
2. Adicionar item no seeder de recurso pago.
3. Adicionar prompt no seeder de configuração IA.
4. Consumir recurso no use case correspondente.

### Regras obrigatórias

- Enum deve seguir padrão de nomenclatura existente no arquivo.
- Seeder de recurso e seeder de prompt devem ficar consistentes entre si.
- Fluxo de consumo de crédito deve ocorrer junto da transação de persistência.

---

## 11) Migrations

Após alterar entidades TypeORM:

1. gerar migration;
2. revisar migration;
3. executar migration.

Comandos:

```bash
yarn migration:generate src/migrations/NomeDescritivo
yarn migration:run
```

---

## 12) Validação final

Checklist mínimo antes de concluir:

1. `yarn build` sem erros.
2. `yarn lint` sem erros e sem warnings novos no escopo alterado.
2. Endpoints compilando com DTOs corretos.
3. Gateways registrados no `DatabaseModule`.
4. Entidades/repos incluídos no índice TypeORM.
5. Escritas com `commit()` explícito.
6. Sem violar regras de domínio/infra.

Comandos úteis:

```bash
yarn build
yarn lint
yarn test
```

### Verificação obrigatória de lint (`yarn lint`)

Sempre execute `yarn lint` ao finalizar qualquer alteração de fluxo, mesmo quando o build estiver passando.

Regras práticas:

1. Se o lint falhar, a tarefa não está pronta para entrega.
2. Corrija primeiro erros do escopo alterado (use case, DTO, entity, mapper, repository e controller tocados).
3. Não ignorar regra de lint com workaround rápido sem necessidade arquitetural.
4. Reexecutar `yarn lint` até retorno limpo antes do `yarn build` final.
5. Se houver problema legado fora do escopo, registrar no handoff e não misturar com refactor amplo.

Comando padrão:

```bash
yarn lint
```

Comando útil para validar arquivo específico durante implementação:

```bash
npx eslint caminho/do/arquivo.ts
```

---

## Estrutura recomendada para um novo módulo

```text
module/{contexto}/{feature}/
├── domain/
│   ├── schema/entity/
│   ├── repository/query/
│   └── repository/command/
├── use-case/
├── dto/request/
├── dto/response/
├── error/
├── {feature}.controller.ts
└── {feature}.module.ts
```

Infra:

```text
infra/database/implementation/typeorm/
├── schema/entity/
└── repository/
```

---

## Padrões críticos que mais causam erro

1. **Esquecer `commit()`** na transação.
2. **Relação `@OneToOne` sem `@JoinColumn`** em nenhum dos lados (ou em ambos).
3. **Documentos sem `originalFileName`** no response DTO de GET.
4. Criar lógica de negócio fora de use case.
5. **Duplicar FK com `@Column` junto de `@ManyToOne` ou `@OneToOne`.**

   O `@JoinColumn` já cria a coluna FK no banco. Adicionar um `@Column` separado com o mesmo nome (ex: `disability_retirement_planning_id`) causa conflito de mapeamento e é violação do padrão arquitetural.

   **Errado:**
   ```typescript
   @Column({ name: 'disability_retirement_planning_id', type: 'uuid' })
   public disabilityRetirementPlanningId: string; // ❌ duplicado

   @OneToOne(() => DisabilityRetirementPlanningTypeormEntity)
   @JoinColumn({ name: 'disability_retirement_planning_id' })
   public disabilityRetirementPlanning?: DisabilityRetirementPlanningTypeormEntity;
   ```

   **Correto:**
   ```typescript
   @OneToOne(() => DisabilityRetirementPlanningTypeormEntity)
   @JoinColumn({ name: 'disability_retirement_planning_id' })
   public disabilityRetirementPlanning?: DisabilityRetirementPlanningTypeormEntity;
   ```

   **No mapper ORM→Domain:** carregar a relação e usar `source.relation.id` (com guard `IncompleteSourceDataForMappingError`).

   **No mapper Domain→ORM:** usar `relation: { id: source.foreignKeyId } as RelationTypeormEntity`.

5. **Duplicar FK com `@Column` junto de `@ManyToOne` ou `@OneToOne`.**

   O `@JoinColumn` já cria a coluna FK no banco. Adicionar um `@Column` separado com o mesmo nome (ex: `disability_retirement_planning_id`) causa conflito de mapeamento e é violação do padrão arquitetural.

   **Errado:**
   ```typescript
   @Column({ name: 'disability_retirement_planning_id', type: 'uuid' })
   public disabilityRetirementPlanningId: string; // ❌ duplicado

   @OneToOne(() => DisabilityRetirementPlanningTypeormEntity)
   @JoinColumn({ name: 'disability_retirement_planning_id' })
   public disabilityRetirementPlanning?: DisabilityRetirementPlanningTypeormEntity;
   ```

   **Correto:**
   ```typescript
   @OneToOne(() => DisabilityRetirementPlanningTypeormEntity)
   @JoinColumn({ name: 'disability_retirement_planning_id' })
   public disabilityRetirementPlanning?: DisabilityRetirementPlanningTypeormEntity;
   ```

   **No mapper ORM→Domain:** carregar a relação e usar `source.relation.id` (com guard `IncompleteSourceDataForMappingError`).

   **No mapper Domain→ORM:** usar `relation: { id: source.foreignKeyId } as RelationTypeormEntity`.

6. **Coluna de enum com `type: 'varchar'` em vez de `type: 'simple-enum'`.**

   Todo `@Column` cujo TypeScript type é um enum **deve** usar `type: 'simple-enum'` com `enum: NomeDoEnum`. Nunca use `type: 'varchar'` ou `type: 'enum'` (nativo MySQL) para enums.

   **Errado:**
   ```typescript
   @Column({ name: 'service_type', type: 'varchar', length: 50 })
   public serviceType: ServiceTypeEnum; // ❌
   ```

   **Correto:**
   ```typescript
   @Column({ name: 'service_type', type: 'simple-enum', enum: ServiceTypeEnum })
   public serviceType: ServiceTypeEnum; // ✅
   ```

   Nullable enum:
   ```typescript
   @Column({ name: 'state', type: 'simple-enum', enum: StateCodeEnum, nullable: true })
   public state: StateCodeEnum | null; // ✅
   ```

7. DTO com tipo errado para value object.
7. Não registrar gateway no `DatabaseModule`.
8. Não incluir entidade/repo no índice TypeORM.
9. Esquecer de executar migration após gerar.

---

## Modelo de sequência para abrir uma tarefa nova

Use esta ordem para reduzir retrabalho:

1. Domain (entity + id + enum + error).
2. Gateways query/command.
3. DTOs request/response.
4. Use case(s).
5. Controller.
6. TypeORM entity.
7. Repositórios TypeORM.
8. Registros de módulo/DI.
9. Seeders (se necessário).
10. Migration.
11. Build + lint + testes.

---

## Base de prompt para novas criacoes

Use este exemplo como base para novas criacoes de fluxo, especialmente quando o fluxo envolve analise por IA e precisa de schema JSON estruturado. Ajuste apenas o necessario para o contexto especifico e mantenha o mesmo nivel de detalhe.

### Exemplo base (Teacher Retirement Planning)

```
Crie um novo fluxo completo seguindo o padrao de Retirement Planning RPPS.

Entidade principal: teacher-retirement-planning
Relacao com analysis-tool-record: obrigatoria

Entidades (exemplo):
- teacher-retirement-planning
- teacher-retirement-planning-document
- teacher-retirement-planning-period
- teacher-retirement-planning-period-item
- teacher-retirement-planning-period-item-document
- teacher-retirement-planning-remuneration
- teacher-retirement-planning-result

Resultado da analise (schema JSON para IA se Usuário pedir):
{
  timeline: [
    {
      startDate: string;
      endDate: string;
      activityType: "Atividade como professor" | "Atividade comum";
      type: string;
      location: string;
    }
  ];
  retirementRules: [
    {
      ruleName: string;
      result: boolean;
      rightDate?: string;
      estimatedRMI?: number;
      bestRMI: boolean;
      highestLawsuitValue: boolean;
      detailedRuleAnalysis: string;
    }
  ];
  finalAnalysis: string;
  teacherTime: string; // Exemplo: 29 anos e 3 meses
  commonTime: string; // Exemplo: 29 anos e 3 meses
}

Regras:
- Seguir estritamente o padrao arquitetural do projeto.
- Reutilizar implementacoes existentes sempre que possivel.
- Criar/ajustar entidades, DTOs, mappers, use cases, gateways e repositorios.
- Atualizar seeders de prompt e recursos pagos quando aplicavel.
- Documentar as alteracoes no read_Me_analysis.md.
```

### Checklist rapido para prompts de IA

- Defina o schema JSON completo com tipos e exemplos quando necessario.
- Garanta enums e valores fixos no schema (ex: activityType).
- Padronize nomes dos campos (camelCase).
- Confirme se o prompt usa o mesmo padrao de outro fluxo existente.

---

## Instrucoes completas: Teacher Retirement Planning na listagem

Esta secao documenta tudo que precisou ser garantido para a analise de aposentadoria do professor aparecer na listagem de analysis tool records e nao quebrar em runtime. Siga como referencia obrigatoria quando criar novos fluxos similares.

### 1) Garantir que o analysis_tool_record e criado

- O create use case do teacher retirement planning deve criar **tambem** um `AnalysisToolRecordEntity`.
- O `AnalysisToolRecordEntity` precisa receber `teacherRetirementPlanning` e `analysisToolClient`.
- O `type` deve ser `AnalysisToolRecordTypeEnum.TEACHER_RETIREMENT_PLANNING`.
- A criacao do analysis tool record deve estar dentro da mesma transacao e com `commit()`.

### 2) Integrar na listagem de analysis tool record (4 pontos obrigatorios)

1. **Query Result**: adicionar `teacherRetirementPlanning` em `GetAnalysisToolRecordWithRelationsQueryResult`.
2. **Use case de listagem**: incluir `teacherRetirementPlanning` na cadeia do `analysisId` (fallback `??`).
3. **TypeORM query repository**:
   - incluir `teacherRetirementPlanning` no array de `relations`.
   - incluir `teacherRetirementPlanning` no filtro `atLeastOneRelationNotNull`.
4. **Create use case**: garantir que a criacao do analysis tool record foi adicionada (passo 1).

### 3) Mapper de Query Result (obrigatorio)

Sem este mapper, a listagem cai com erro de runtime.

- Criar o AutoMapper profile:
  `GetTeacherRetirementPlanningWithRelationsQueryResultAutoMapperProfile`.
- Registrar o profile no `AutoMapperModule`.
- Mapear **explicitamente** todos os campos (sem spread).
- Arrays devem usar `mapArray` com fallback `[]`.
- `result` deve ser `null` quando ausente.

### 4) Garantir tipos corretos no mapper

- `state` no query result e `StateCodeEnum | null`.
- `state` vem do TypeORM como `string | null`.
- No mapper, converter para `StateCodeEnum | null`.

### 5) Evitar erro de mapeamento ausente

Se aparecer erro do tipo:

```
Mapping is not found for TeacherRetirementPlanningTypeormEntity and GetTeacherRetirementPlanningWithRelationsQueryResult
```

significa que o profile do item 3 nao foi criado ou nao foi registrado no `AutoMapperModule`.

### 6) Onde o erro aparece na listagem

- O erro ocorre dentro de `GetAnalysisToolRecordWithRelationsQueryResultAutoMapperProfile` quando tenta mapear `teacherRetirementPlanning`.
- A listagem depende desse mapeamento para preencher `analysisId` corretamente.

### 7) Validacoes finais para o fluxo

- Criar um teacher retirement planning e validar que:
  - existe registro em `analysis_tool_record`.
  - o endpoint de listagem retorna o item.
- Reexecutar `yarn build` depois de adicionar o mapper.
- Se o download ainda vier em JSON, executar o seeder de prompts e validar a resposta.

---

## Endpoints de download (análise completa e simplificada)

Muitos fluxos de análise possuem **funcionalidade de download** em dois formatos: **completa** e **simplificada**.

### Analise completa em JSON e versao para download

Quando a analise completa e armazenada como JSON estruturado (schema), crie um campo adicional na entidade de resultado para armazenar a versao pronta para download, usando o mesmo nome do campo completo com sufixo `_download`.

**Exemplo:**

- `teacherRetirementPlanningCompleteAnalysis` (JSON)
- `teacherRetirementPlanningCompleteAnalysisDownload` (markdown/HTML para download)

**Regras:**

- O campo `_download` deve ser `string | null`.
- A versao `_download` e gerada sob demanda no endpoint de download.
- Use o mesmo prompt do recurso pago e chame o gateway de IA com schema desativado (ex: `asJson = false`).
- O download completo nao deve consumir credito; apenas gerar e cachear.
- Persistir a versao `_download` no resultado para reuso futuro.

**Fluxo recomendado (resumo):**

1. Validar membro e buscar o resultado.
2. Se `_download` estiver `null`, gerar usando IA com schema desativado.
3. Atualizar o resultado via command repository + transacao (sem consumo de credito).
4. Converter o conteudo e retornar o arquivo.

### Quando implementar download?

- Quando o resultado da análise é gerado via IA/prompt.
- Quando você precisa exportar esse resultado em PDF ou DOCX.
- Quando há diferença entre versão completa (gratuita) e simplificada (paga com consumo de crédito).

### Padrão de implementação

#### 1. Use Cases de Download

Crie dois use cases separados:

- `download-{entity}-complete-analysis.use-case.ts` - Download da análise completa.
- `download-{entity}-simplified-analysis.use-case.ts` - Download da análise simplificada (com consumo de crédito).

**Exemplo de download completo (sem crédito)**:

```typescript
@Injectable()
export class DownloadTeacherRetirementPlanningCompleteAnalysisUseCase {
  protected readonly _type =
    DownloadTeacherRetirementPlanningCompleteAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningResultQueryRepositoryGateway)
    private readonly resultQueryRepositoryGateway: TeacherRetirementPlanningResultQueryRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    entityId: EntityId,
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    // 1. Validar membro da organização
    const organizationMember = await this.organizationMemberQueryRepositoryGateway
      .findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    // 2. Buscar resultado da análise
    const result = await this.resultQueryRepositoryGateway
      .findOneResultByEntityId(entityId);

    if (result === null || result.completeAnalysis === null) {
      throw new ResultNotFoundError();
    }

    // 3. Converter markdown para HTML
    const htmlContent = MarkdownToHtmlConverterUtil.convert(
      result.completeAnalysis,
    );

    // 4. Gerar arquivo para download
    return this.exportDocumentGateway.downloadFileAsStreamable(
      htmlContent,
      'nome-arquivo-completo',
      format,
    );
  }
}
```

**Exemplo de download simplificado (com crédito e geração sob demanda)**:

```typescript
@Injectable()
export class DownloadTeacherRetirementPlanningSimplifiedAnalysisUseCase {
  protected readonly _type =
    DownloadTeacherRetirementPlanningSimplifiedAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningResultQueryRepositoryGateway)
    private readonly resultQueryRepositoryGateway: TeacherRetirementPlanningResultQueryRepositoryGateway,
    @Inject(TeacherRetirementPlanningResultCommandRepositoryGateway)
    private readonly resultCommandRepositoryGateway: TeacherRetirementPlanningResultCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(ExportDocumentGateway)
    private readonly exportDocumentGateway: ExportDocumentGateway,
    @Inject(AnalysisProcessorGateway)
    private readonly analysisProcessorGateway: AnalysisProcessorGateway,
    @Inject(ConsumeOrganizationCreditUseCaseGateway)
    private readonly consumeOrganizationCreditUseCase: ConsumeOrganizationCreditUseCaseGateway,
    @Inject(GetPaymentPlanPaidResourcePromptUseCaseGateway)
    private readonly getPaymentPlanPaidResourcePromptUseCase: GetPaymentPlanPaidResourcePromptUseCaseGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    entityId: EntityId,
    format: ExportDocumentFormatEnum,
  ): Promise<StreamableFile> {
    // 1. Validar membro
    const organizationMember = await this.organizationMemberQueryRepositoryGateway
      .findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    // 2. Buscar prompt para análise simplificada
    const promptResponse = await this.getPaymentPlanPaidResourcePromptUseCase
      .execute(PaymentPlanPaidResourceTypeEnum.ENTITY_SIMPLIFIED_ANALYSIS);

    // 3. Preparar transação de consumo de crédito
    const consumeCreditTransaction = await this.consumeOrganizationCreditUseCase
      .execute(
        organizationSessionData.organizationId,
        PaymentPlanPaidResourceTypeEnum.ENTITY_SIMPLIFIED_ANALYSIS,
        organizationMember.id,
      );

    // 4. Buscar resultado existente
    const result = await this.resultQueryRepositoryGateway
      .findOneResultByEntityId(entityId);

    if (result === null || result.completeAnalysis === null) {
      throw new ResultNotFoundError();
    }

    let responseAi = result.simplifiedAnalysis;

    // 5. Gerar análise simplificada se não existir
    if (responseAi === null) {
      const simplifiedAnalysis = await this.analysisProcessorGateway
        .getSimplifiedAnalysis(
          promptResponse.prompt,
          [Buffer.from(result.completeAnalysis, 'utf-8')],
        );

      const updatedResult = new ResultEntity({
        id: result.id,
        completeAnalysis: result.completeAnalysis,
        simplifiedAnalysis,
      });

      const resultTransaction = this.resultCommandRepositoryGateway
        .updateResult(result.id, updatedResult);

      // 6. Executar transação (crédito + atualização)
      const transaction = await this.baseTransactionRepositoryGateway.execute([
        consumeCreditTransaction,
        resultTransaction,
      ]);

      await transaction.commit(); // ⚠️ OBRIGATÓRIO

      responseAi = simplifiedAnalysis;
    }

    if (responseAi === null) {
      throw new ResultNotFoundError();
    }

    // 7. Converter e retornar
    const htmlContent = MarkdownToHtmlConverterUtil.convert(responseAi);

    return this.exportDocumentGateway.downloadFileAsStreamable(
      htmlContent,
      'nome-arquivo-simplificado',
      format,
    );
  }
}
```

#### 2. Endpoints no Controller

Adicione dois endpoints GET com query param `format`:

```typescript
@BuildEndpointSpecification({
  summary: 'Download da análise completa',
  userLevel: [UserLevelEnum.CUSTOMER],
  http: {
    path: ':entityId/download/complete-version',
    method: RequestMethod.GET,
  },
  tag: ['seu-modulo'],
  successResponse: {
    statusCode: HttpStatus.OK,
    description: 'Análise completa baixada com sucesso.',
    type: StreamableFile,
  },
  guard: [AuthGuard, OrganizationSessionGuard],
})
public async downloadCompleteVersion(
  @GetSessionData() sessionData: SessionDataModel,
  @GetOrganizationSessionData()
  organizationSessionData: OrganizationSessionDataModel,
  @Param('entityId', new ParseValueObjectPipe(EntityId))
  entityId: EntityId,
  @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
  format: ExportDocumentFormatEnum,
): Promise<StreamableFile> {
  return this.downloadEntityCompleteAnalysisUseCase.execute(
    sessionData,
    organizationSessionData,
    entityId,
    format,
  );
}

@BuildEndpointSpecification({
  summary: 'Download da análise simplificada',
  userLevel: [UserLevelEnum.CUSTOMER],
  http: {
    path: ':entityId/download/simplified-version',
    method: RequestMethod.GET,
  },
  tag: ['seu-modulo'],
  successResponse: {
    statusCode: HttpStatus.OK,
    description: 'Análise simplificada baixada com sucesso.',
    type: StreamableFile,
  },
  guard: [AuthGuard, OrganizationSessionGuard],
})
public async downloadSimplifiedVersion(
  @GetSessionData() sessionData: SessionDataModel,
  @GetOrganizationSessionData()
  organizationSessionData: OrganizationSessionDataModel,
  @Param('entityId', new ParseValueObjectPipe(EntityId))
  entityId: EntityId,
  @Query('format', new ParseEnumPipe(ExportDocumentFormatEnum))
  format: ExportDocumentFormatEnum,
): Promise<StreamableFile> {
  return this.downloadEntitySimplifiedAnalysisUseCase.execute(
    sessionData,
    organizationSessionData,
    entityId,
    format,
  );
}
```

#### 3. Registro no Módulo

Adicione os use cases no array de providers e importe o `ExportDocumentModule`:

```typescript
@Module({
  imports: [
    DatabaseModule,
    AnalysisProcessorModule,
    ExportDocumentModule, // ✅ OBRIGATÓRIO para downloads
    OrganizationCreditModule,
    PaymentPlanModule,
  ],
  providers: [
    DownloadEntityCompleteAnalysisUseCase,
    DownloadEntitySimplifiedAnalysisUseCase,
    // ... outros use cases
  ],
})
export class YourModule {}
```

### Diferenças entre Complete e Simplified

| Aspecto                 | Complete                              | Simplified                                 |
|-------------------------|---------------------------------------|--------------------------------------------|
| **Custo**               | Gratuito                              | Consome crédito                            |
| **Geração**             | Já existe no banco                    | Gerado sob demanda se não existir          |
| **Complexidade**        | Simples (busca + exporta)             | Complexa (busca, gera, persiste, exporta)  |
| **Transação**           | Não                                   | Sim (crédito + atualização de resultado)   |
| **Prompt**              | Não usa                               | Usa prompt específico via gateway          |

### Checklist para implementar download

- [ ] Criar use case de download completo.
- [ ] Criar use case de download simplificado (com crédito).
- [ ] Adicionar endpoints no controller com query param `format`.
- [ ] Importar `ExportDocumentModule` no módulo.
- [ ] Registrar use cases no array de `providers`.
- [ ] Criar error específico caso resultado não exista (`EntityResultNotFoundError`).
- [ ] Adicionar importação de `StreamableFile` do `@nestjs/common`.
- [ ] Adicionar `ParseEnumPipe` para validar o formato (`PDF` ou `DOCX`).
- [ ] Testar ambos os endpoints via Postman/Insomnia.

---

## Critérios de pronto (Definition of Done)

Um novo fluxo só está pronto quando:

- compila (`yarn build`);
- persiste e lê dados corretamente;
- respeita arquitetura e padrões internos;
- possui contratos DTO consistentes;
- está registrado no DI;
- possui migration (quando necessário);
- endpoints estão acessíveis e documentados por especificação.

---

### Erro: Documentos sem originalFileName no GET

#### Sintoma

Ao fazer GET de uma entidade que possui documentos anexados, a resposta retorna:
- Apenas o base64 do documento
- Sem informação sobre o nome original do arquivo

Isso dificulta a experiência do usuário no frontend, que não sabe qual arquivo está baixando.

#### Causa raiz

O Response DTO e/ou o use case de GET estão retornando apenas o conteúdo do documento (base64), mas não incluem o campo `originalFileName` que contém o nome original do arquivo quando foi feito upload.

#### Solução

O `FileProcessorGateway` fornece o método `getOriginalFileName(filePath)` que extrai o nome original do arquivo a partir do caminho armazenado no banco de dados.

**Padrão correto para retornar documentos:**

1. **Criar DTO de documento separado:**

```typescript
@ResponseDto()
export class GetEntityDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public document: string; // base64 do conteúdo

  @ResponseDtoStringProperty()
  public originalFileName: string; // nome original do arquivo

  protected override readonly _type = GetEntityDocumentResponseDto.name;
}
```

2. **Usar objeto de documento no DTO principal:**

```typescript
@ResponseDto()
export class GetEntityResponseDto extends BaseBuildableDtoObject {
  // ❌ ERRADO: Array de strings (apenas base64)
  // @ResponseDtoStringProperty({ required: false, isArray: true })
  // public documents?: string[];

  // ✅ CORRETO: Array de objetos com documento + nome
  @ResponseDtoObjectProperty(() => GetEntityDocumentResponseDto, {
    required: false,
    isArray: true,
  })
  public documents?: GetEntityDocumentResponseDto[];
}
```

3. **Buscar originalFileName no use case:**

```typescript
const documents = await Promise.all(
  entity.documents.map(async (document) => {
    // Busca o conteúdo do arquivo
    const fileBuffer = await this.fileProcessorGateway.getFileBuffer(
      document.document,
    );

    // ✅ OBRIGATÓRIO: Busca o nome original do arquivo
    const originalFileName =
      await this.fileProcessorGateway.getOriginalFileName(
        document.document,
      );

    return GetEntityDocumentResponseDto.build({
      document: Base64.encodeBuffer(fileBuffer).toString(),
      originalFileName,
    });
  }),
);
```

#### Padrão para documentos aninhados

Para documentos dentro de subestruturas (ex: documentos de items dentro de períodos):

```typescript
// No use case
const items = await Promise.all(
  period.items.map(async (item) => {
    const documents = await Promise.all(
      item.documents.map(async (doc) => {
        const fileBuffer = await this.fileProcessorGateway.getFileBuffer(
          doc.document,
        );
        const originalFileName =
          await this.fileProcessorGateway.getOriginalFileName(doc.document);

        return GetItemDocumentResponseDto.build({
          document: Base64.encodeBuffer(fileBuffer).toString(),
          originalFileName,
        });
      }),
    );

    return GetItemResponseDto.build({
      // ...outros campos
      documents,
    });
  }),
);
```

#### Checklist de validação

- [ ] DTO de documento criado com campos `document` e `originalFileName`
- [ ] DTO principal usa `@ResponseDtoObjectProperty` para array de documentos
- [ ] Use case chama `getFileBuffer()` para obter conteúdo
- [ ] Use case chama `getOriginalFileName()` para obter nome original
- [ ] Ambos os campos são passados ao `.build()` do DTO
- [ ] Build compila sem erros: `yarn build`
- [ ] Testar endpoint e verificar que resposta inclui `originalFileName`

#### Exemplo completo (Teacher Retirement Planning)

**Antes (incorreto):**

```typescript
// DTO
public documents?: string[]; // ❌ Array de strings

// Use case
const documents = await Promise.all(
  planning.documents.map(async (document) => {
    const fileBuffer = await this.fileProcessorGateway.getFileBuffer(
      document.document,
    );
    return Base64.encodeBuffer(fileBuffer).toString(); // ❌ Só retorna base64
  }),
);
```

**Depois (correto):**

```typescript
// DTO de documento
@ResponseDto()
export class GetTeacherRetirementPlanningDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public document: string;

  @ResponseDtoStringProperty()
  public originalFileName: string;

  protected override readonly _type =
    GetTeacherRetirementPlanningDocumentResponseDto.name;
}

// DTO principal
@ResponseDtoObjectProperty(() => GetTeacherRetirementPlanningDocumentResponseDto, {
  required: false,
  isArray: true,
})
public documents?: GetTeacherRetirementPlanningDocumentResponseDto[]; // ✅ Array de objetos

// Use case
const documents = await Promise.all(
  planning.documents.map(async (document) => {
    const fileBuffer = await this.fileProcessorGateway.getFileBuffer(
      document.document,
    );
    const originalFileName =
      await this.fileProcessorGateway.getOriginalFileName(document.document);

    return GetTeacherRetirementPlanningDocumentResponseDto.build({
      document: Base64.encodeBuffer(fileBuffer).toString(),
      originalFileName,
    });
  }),
);
```

---

## Correções estruturais e problemas TypeORM comuns

Durante a implementação de novos fluxos, alguns problemas estruturais podem surgir relacionados à configuração do TypeORM. Esta seção documenta erros comuns e suas soluções.

### Erro: "Relation does not have join columns"

#### Sintoma

```
QueryFailedError: ER_BAD_FIELD_ERROR
Relation EntityTypeormEntity.relationName does not have join columns
```

Esse erro ocorre quando você define uma relação `@OneToOne` bidirecionalmente, mas **esquece de adicionar o `@JoinColumn`** em um dos lados.

#### Causa raiz

TypeORM exige que em toda relação `@OneToOne` bidirecional, **um dos lados tenha o `@JoinColumn`** para definir:
- Qual tabela terá a foreign key
- Qual é o nome da coluna de FK

Sem o `@JoinColumn`, o TypeORM não consegue construir o JOIN na query.

#### Solução

**1. Identificar qual lado deve ter a FK**

Analise a migration ou a estrutura do banco para identificar qual tabela possui a coluna de foreign key.

**2. Padrão resultado/análise**

Para entidades `*Result` que armazenam análises geradas:

- **AnalysisEntity** (principal) tem `@JoinColumn` e referencia `AnalysisResultEntity`
- **AnalysisResultEntity** NÃO tem `@JoinColumn`

**Exemplo correto:**

```typescript
// analysis.typeorm.entity.ts
import { Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity({ name: 'analysis' })
export class AnalysisTypeormEntity extends BaseTypeormEntity {
  @OneToOne(
    () => AnalysisResultTypeormEntity,
    (entity) => entity.analysis,
    { nullable: true },
  )
  @JoinColumn({ name: 'analysis_result_id' })
  public result?: AnalysisResultTypeormEntity | undefined;
}

// analysis-result.typeorm.entity.ts
@Entity({ name: 'analysis_result' })
export class AnalysisResultTypeormEntity extends BaseTypeormEntity {
  @Column({ name: 'complete_analysis', type: 'longtext', nullable: true })
  public completeAnalysis: string | null;

  @Column({ name: 'simplified_analysis', type: 'longtext', nullable: true })
  public simplifiedAnalysis: string | null;

  // ✅ CORRETO: Sem @JoinColumn (lado inverso)
  @OneToOne(
    () => AnalysisTypeormEntity,
    (entity) => entity.result,
  )
  public analysis?: AnalysisTypeormEntity;
}
```

**Exemplo errado:**

```typescript
// ❌ ERRADO: Sem @JoinColumn em nenhum lado
@Entity({ name: 'analysis' })
export class AnalysisTypeormEntity extends BaseTypeormEntity {
  @OneToOne(
    () => AnalysisResultTypeormEntity,
    (entity) => entity.analysis,
  )
  public result?: AnalysisResultTypeormEntity | undefined; // ❌ Falta @JoinColumn!
}

@Entity({ name: 'analysis_result' })
export class AnalysisResultTypeormEntity extends BaseTypeormEntity {
  @OneToOne(
    () => AnalysisTypeormEntity,
    (entity) => entity.result,
  )
  public analysis?: AnalysisTypeormEntity; // ❌ Também sem @JoinColumn!
}
```

**3. Gerar migration para adicionar a coluna de FK**

Após adicionar o `@JoinColumn`, gere a migration:

```bash
yarn migration:generate src/migrations/AddResultRelationToEntity
yarn migration:run
```

A migration irá criar a coluna de FK na tabela que possui o `@JoinColumn`.

#### Checklist de validação

- [ ] Relação `@OneToOne` tem `@JoinColumn` em **exatamente um dos lados**
- [ ] Import do `JoinColumn` está correto: `import { JoinColumn } from 'typeorm'`
- [ ] Nome da coluna no `@JoinColumn` segue padrão `snake_case` (ex: `entity_result_id`)
- [ ] Relação marcada como `{ nullable: true }` quando apropriado
- [ ] Migration gerada e executada para criar a FK no banco
- [ ] Build compilando sem erros: `yarn build`

#### Padrões de nomenclatura

| Entidade Principal      | Entidade Resultado            | Coluna FK                              |
|-------------------------|-------------------------------|----------------------------------------|
| `analysis`              | `analysis_result`             | `analysis_result_id`                   |
| `teacher_retirement_planning` | `teacher_retirement_planning_result` | `teacher_retirement_planning_result_id` |
| `rural_timeline`        | `rural_timeline_result`       | `rural_timeline_result_id`             |

---

### Erro: "Cannot load relation" ou "leftJoinAndSelect fails"

#### Sintoma

```
Error loading relation 'result': column not found or join condition incomplete
```

#### Causa

Mesmo com `@JoinColumn` correto, se a **migration não foi executada**, a coluna de FK não existe no banco de dados.

#### Solução

```bash
# 1. Verificar migrations pendentes
yarn migration:show

# 2. Executar migrations
yarn migration:run

# 3. Reiniciar aplicação
yarn dev
```

---

### Regra geral para relações @OneToOne

✅ **Sempre que criar uma relação bidirecionalmente OneToOne:**

1. Decida qual tabela terá a FK (geralmente a principal/aggregate root)
2. Adicione `@JoinColumn({ name: 'fk_column_name' })` nesse lado
3. Não adicione `@JoinColumn` no outro lado
4. Marque como `{ nullable: true }` se a relação for opcional
5. Gere e execute a migration
6. Valide com `yarn build` e teste no runtime

❌ **Nunca:**

- Deixar ambos os lados sem `@JoinColumn`
- Adicionar `@JoinColumn` nos dois lados
- Esquecer de gerar/executar a migration

---

## Instruções: Adicionar Nova Análise na Listagem (Analysis Tool Record)

Quando criar uma nova análise, você DEVE implementar os seguintes 4 pontos obrigatoriamente. Não esqueça nenhum.

### Ponto 1: Query Result Domain

**Arquivo**: `src/module/customer/analysis-tool/domain/repository/analysis-tool-record/query/result/get-analysis-tool-record-with-relations.query.result.ts`

**Ação**:
1. Importar: `import type { Get{NomeDaAnalise}WithRelationsQueryResult } from '@module/customer/analysis-tool/module/{nome-da-analise}/domain/repository/{nome-da-analise}/query/result/get-{nome-da-analise}-with-relations.query.result';`
2. Adicionar propriedade: `public readonly {nomeDaAnalise}: Get{NomeDaAnalise}WithRelationsQueryResult | null;`

### Ponto 2: Use Case de Listagem

**Arquivo**: `src/module/customer/analysis-tool/use-case/list-analysis-tool-record.use-case.ts`

**Ação**: Adicionar `analysisToolRecord.{nomeDaAnalise}` no operador `??` (geralmente após a última análise existente, antes do `;`):

```typescript
const analysis =
  analysisToolRecord.cnisFastAnalysis ??
  analysisToolRecord.retirementPlanningRpps ??
  analysisToolRecord.retirementPlanningRgps ??
  analysisToolRecord.{nomeDaAnalise} ?? // ADICIONAR AQUI
  analysisToolRecord.judicialCaseAnalysis ??
  // ... resto
```

### Ponto 3: Repositório TypeORM

**Arquivo**: `src/infra/database/implementation/typeorm/repository/analysis-tool-record/analysis-tool-record.typeorm.query.repository.ts`

**Ação**:
1. No array `atLeastOneRelationNotNull`: Adicionar `{ {nomeDaAnalise}: Not(IsNull()) },`
2. No método `getEntityRelationsKey()`: Adicionar `'{nomeDaAnalise}',` no array de retorno

### Ponto 4: Use Case de Criação da Análise (CRÍTICO)

**Arquivo**: `src/module/customer/analysis-tool/module/{nome-da-analise}/use-case/create-{nome-da-analise}.use-case.ts`

**Ação**:
1. Importar:
```typescript
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolRecordEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/analysis-tool-record.entity';
import { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-status.enum';
import { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import { AnalysisToolRecordCode } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-code/analysis-tool-record-code.value-object';
import { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
```

2. Injetar no constructor:
```typescript
@Inject(AnalysisToolRecordQueryRepositoryGateway)
private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
@Inject(AnalysisToolRecordCommandRepositoryGateway)
private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
```

3. Converter `analysisToolClient` de QueryResult para Entity:
```typescript
const analysisToolClientQueryResult =
  await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
    dto.analysisToolClientId,
    organizationId,
    AnalysisToolClientNotFoundError,
  );

const analysisToolClient = new AnalysisToolClientEntity({
  ...analysisToolClientQueryResult,
  createdBy: analysisToolClientQueryResult.createdBy.id,
  updatedBy: analysisToolClientQueryResult.updatedBy.id,
});
```

4. Contar registros:
```typescript
const countRecords =
  await this.analysisToolRecordQueryRepositoryGateway.countByOrganizationIdAndAuthIdentityId(
    organizationId,
    authIdentityId,
  );
```

5. Criar `AnalysisToolRecordEntity`:
```typescript
const analysisToolRecord = new AnalysisToolRecordEntity({
  id: new AnalysisToolRecordId(),
  code: new AnalysisToolRecordCode(countRecords + 1),
  type: AnalysisToolRecordTypeEnum.{NOME_DA_ANALISE_ENUM},
  {nomeDaAnalise}: {nomeDaAnalise}Entity,
  analysisToolClient,
  status: AnalysisStatusEnum.IN_PROGRESS,
  createdBy: organizationMember.id,
  updatedBy: organizationMember.id,
});
```

6. Adicionar transação do `analysis_tool_record`:
```typescript
transactionOperations.push(
  this.analysisToolRecordCommandRepositoryGateway.createAnalysisToolRecord(
    analysisToolRecord,
  ),
);
```

### Ordem de Execução

Execute os pontos nesta ordem exata:
1. Ponto 4 (use case de criação - para criar registros no banco)
2. Ponto 1 (query result - para mapear dados)
3. Ponto 2 (use case listagem - para encontrar análise)
4. Ponto 3 (repositório - para fazer join correto)

### Validação

Após implementar os 4 pontos:
- ✅ Criar uma nova análise deve criar registro em `analysis_tool_record`
- ✅ Listar `/customer/analysis-tool-record` deve retornar a nova análise

---

## Conclusão

Este documento deve ser usado como padrão de implementação para qualquer novo fluxo no projeto.

Se você seguir esta ordem e estas regras, evita os problemas mais comuns (principalmente transação sem commit, wiring incompleto de DI, inconsistência de DTO/repositório e relações TypeORM mal configuradas) e mantém o código alinhado ao padrão arquitetural da base.

---

## Referência rápida para a próxima análise (com exemplos reais)

Use esta seção como checklist operacional e template de implementação.

### O que mais precisa ser ressaltado ao criar uma nova análise

1. Defina o **aggregate principal** e quais subentidades realmente pertencem a ele.
2. Garanta o vínculo com `analysis_tool_record` **no create use case** (na mesma transação).
3. Escreveu no banco? Sempre usar `BaseTransactionRepositoryGateway.execute(...)` + `commit()`.
4. Sempre validar contexto de segurança antes da lógica principal:
   - organização membro existe;
   - análise existe para o contexto atual;
   - recurso pertence ao tenant correto.
5. Atualizou TypeORM entity? Gere migration e rode migration.
6. Se houver mapeamento adicional, registrar profile no `AutoMapperModule`.
7. Se análise deve aparecer na listagem geral, aplicar os 4 pontos obrigatórios da seção de listagem.
8. Fechar com `yarn build` antes de validar endpoint em runtime.

### Exemplo 1: rota completa criada no fluxo atual (Teacher Retirement Planning)

Base route:

`/customer/analysis-tool/teacher-retirement-planning`

Rotas relevantes já implementadas:

- `POST /` (create)
- `PATCH /:teacherRetirementPlanningId` (update)
- `GET /:teacherRetirementPlanningId` (get by id)
- `DELETE /:teacherRetirementPlanningId` (delete)
- `POST /:teacherRetirementPlanningId/result` (criar resultado)
- `POST /period` (criar períodos)
- `PATCH /:teacherRetirementPlanningId/period` (atualizar períodos)
- `POST /:teacherRetirementPlanningId/remuneration` (criar remunerações)
- `PATCH /:teacherRetirementPlanningId/remuneration` (atualizar remunerações)
- `GET /:teacherRetirementPlanningId/remuneration` (listar remunerações)
- `GET /:teacherRetirementPlanningId/remuneration-calculation` (cálculo agregado)
- `GET /:teacherRetirementPlanningId/download/complete-version?format=...`
- `GET /:teacherRetirementPlanningId/download/simplified-version?format=...`

### Exemplo 2: payload de create (Teacher Retirement Planning)

```json
{
  "analysisToolClientId": "8ee4d5ef-6d9a-4c5a-9ab8-2bc7b8a5a001",
  "federativeEntity": "MUNICIPAL",
  "state": "SP",
  "municipality": "Campinas",
  "analysisName": "Teste professor 01",
  "currentPosition": "Classroom Teacher",
  "activityType": "TEACHER",
  "publicServiceStartDate": "2010-02-01",
  "careerStartDate": "2012-03-01",
  "inssBenefits": [],
  "legalProceedings": [],
  "documents": []
}
```

### Exemplo 3: payload de períodos

```json
{
  "teacherRetirementPlanningId": "5cfbe3db-1f66-4dcb-aab8-2f7ef84b2c11",
  "periods": [
    {
      "positionName": "Professor de Matemática",
      "careerName": "Magistério Municipal",
      "serviceType": "TEACHER",
      "department": "Secretaria Municipal de Educação",
      "items": [
        {
          "institutionName": "Escola Municipal Alfa",
          "institutionType": "PUBLIC",
          "educationLevel": "ELEMENTARY",
          "rolePerformed": "CLASSROOM",
          "workloadType": "FULL_TIME",
          "weeklyHours": 40,
          "startDate": "2012-03-01",
          "endDate": "2018-12-31",
          "documents": [
            {
              "base64": "data:text/plain;base64,dGVzdGU=",
              "originalFileName": "comprovante-periodo.txt"
            }
          ]
        }
      ]
    }
  ]
}
```

### Exemplo 4: payload de remunerações

```json
{
  "remunerations": [
    {
      "contributionDate": "2021-01-01",
      "amount": 4500.25
    },
    {
      "contributionDate": "2021-02-01",
      "amount": 4700.0
    },
    {
      "contributionDate": "2021-03-01",
      "amount": 4200.75
    }
  ]
}
```

### Exemplo 5: resposta esperada do novo cálculo de remuneração

Endpoint:

`GET /customer/analysis-tool/teacher-retirement-planning/:teacherRetirementPlanningId/remuneration-calculation`

Resposta:

```json
{
  "totalCompetencies": 3,
  "totalAmount": 13401,
  "averageAmount": 4467,
  "topEightyPercentCompetencies": 3,
  "bottomTwentyPercentCompetencies": 0,
  "topEightyPercentAverageAmount": 4467
}
```

### Exemplo 6: arquivos-chave de base para seguir o padrão na próxima análise

1. `module/<nova-analise>/<nova-analise>.controller.ts`
2. `module/<nova-analise>/use-case/create-*.use-case.ts`
3. `module/<nova-analise>/use-case/get-*.use-case.ts`
4. `module/<nova-analise>/dto/request/*.dto.ts`
5. `module/<nova-analise>/dto/response/*.dto.ts`
6. `infra/database/implementation/typeorm/schema/entity/*`
7. `infra/database/implementation/typeorm/repository/*`
8. `module/customer/analysis-tool/domain/repository/analysis-tool-record/*`
9. `module/customer/analysis-tool/use-case/list-analysis-tool-record.use-case.ts`
10. `lib/mapper/implementation/auto-mapper/profile/*`

### Recomendação final para próxima implementação

Antes de começar a nova análise, use o Teacher Retirement Planning como base de referência e implemente o novo fluxo sem duplicar arquivo existente. Faça apenas adaptação de nomes e regras no escopo novo:

1. nomes de entidade/VO/DTO;
2. regras de negócio específicas;
3. enums e payloads próprios;
4. prompts e recursos pagos.

Mantenha o padrão de segurança, transação e listagem exatamente igual para reduzir regressão.

### Regra explícita: não duplicar arquivos

1. Não duplicar arquivo já existente para reaproveitar código.
2. Usar os arquivos de base apenas como referência de estrutura e padrão.
3. Quando houver comportamento comum, extrair para serviço/gateway compartilhado em vez de copiar e colar.
4. Criar arquivo novo somente quando for uma nova responsabilidade do novo módulo.
5. Se um arquivo atual já atende parcialmente, evoluir o arquivo com cuidado no contexto correto, sem clonar versão paralela.

### Nome de entidades

1. Sempre defina explicitamente o nome dos campos
```typescript
  @ManyToOne(
    () => DisabilityRetirementPlanningPeriodTypeormEntity,
    (entity) => entity.disabilities,
  )
  @JoinColumn({ name: 'disability_retirement_planning_period_id' })
  public disabilityRetirementPlanningPeriod?: DisabilityRetirementPlanningPeriodTypeormEntity;
  ```

2. Nunca faça essa forma
```typescript
  @ManyToOne(
    () => DisabilityRetirementPlanningPeriodTypeormEntity,
    (entity) => entity.disabilities,
  )
  @JoinColumn({ name: 'disability_retirement_planning_period_id' })
  public period?: DisabilityRetirementPlanningPeriodTypeormEntity;
  ```