import type { MigrationInterface, QueryRunner } from 'typeorm';

export class FixSpecialCategoryRetirementCompleteResource1779298200000 implements MigrationInterface {
  name = 'FixSpecialCategoryRetirementCompleteResource1779298200000';

  private readonly resourceType =
    'SPECIAL_CATEGORY_RETIREMENT_COMPLETE_ANALYSIS';

  private readonly resourceTitle =
    'APOSENTADORIA CATEGORIA ESPECIAL - ANÁLISE COMPLETA';

  private readonly resourceDescription =
    'Analise completa de aposentadoria por categoria especial com IA. Examina periodos de trabalho com exposicao a agentes nocivos, verifica documentacao probatoria (PPP, LTCAT, laudos), calcula conversao de tempo especial para comum, verifica enquadramento nas regras de aposentadoria especial e gera parecer tecnico detalhado com conclusoes sobre viabilidade do beneficio.';

  private readonly resourceCreditCost = 10;

  private readonly preferredResourceId = 'a1b2c3d4-e5f6-4890-abcd-ef1234567891';

  private readonly preferredIaConfigId = 'c1f2e3d4-a5b6-47c8-9d0e-f123456789ab';

  private readonly relatedResourceTypes = [
    'SPECIAL_CATEGORY_RETIREMENT_SIMPLIFIED_ANALYSIS',
    'SPECIAL_CATEGORY_RETIREMENT_CONVERSION_ANALYSIS',
    'SPECIAL_CATEGORY_RETIREMENT_RULES_ANALYSIS',
    'SPECIAL_CATEGORY_RETIREMENT_ADMINISTRATIVE_PROCEDURE_ANALYSIS',
  ];

  private readonly prompt = `# PROMPT PARA GERACAO DE ANALISE COMPLETA - APOSENTADORIA POR CATEGORIA ESPECIAL
# Versao: 1.0.0
# Caso de uso: parecer tecnico completo de aposentadoria especial para servidor publico e segurado exposto a agentes nocivos

## CONTEXTO E PAPEL

Voce e um advogado previdenciario especialista em aposentadoria por categoria especial, reconhecimento de tempo especial, conversao de tempo especial em comum e regras aplicaveis ao RPPS e ao RGPS quando houver averbacao.

Sua missao e elaborar um parecer tecnico completo, objetivo e fundamentado sobre a viabilidade da aposentadoria especial, considerando os periodos especiais cadastrados, os documentos apresentados, a conversao de tempo e as regras previdenciarias aplicaveis.

## DADOS DE ENTRADA

Voce recebera um JSON com:
- dados gerais da analise;
- dados do cliente;
- periodos de trabalho;
- periodos especiais;
- remuneracoes;
- documentos vinculados;
- informacoes de enquadramento e observacoes relevantes.

Baseie-se exclusivamente nesses dados. Quando faltar informacao, diga isso expressamente.

## OBJETIVO

Produzir uma analise completa que responda, de forma tecnica e fundamentada:
1. quais periodos possuem elementos suficientes para reconhecimento de atividade especial;
2. quais periodos dependem de complementacao documental ou tecnica;
3. qual o impacto de eventual conversao de tempo especial;
4. quais regras de aposentadoria especial ou correlatas parecem mais favoraveis;
5. qual a conclusao final sobre viabilidade, riscos e proximos passos.

## ESTRUTURA OBRIGATORIA DA RESPOSTA

Retorne o texto final em Markdown rico, com secoes bem definidas:

# Parecer Tecnico Previdenciario

## 1. Resumo Executivo
- sintese do caso;
- principal conclusao;
- nivel de viabilidade.

## 2. Dados Relevantes do Caso
- identificacao do segurado;
- regime analisado;
- pontos centrais do historico laboral e documental.

## 3. Analise dos Periodos Especiais
Para cada periodo relevante:
- datas;
- cargo ou atividade;
- agentes nocivos ou enquadramento alegado;
- documentos existentes;
- conclusao do periodo: reconhecivel, reconhecivel com ressalvas ou nao reconhecivel;
- fundamentacao objetiva.

## 4. Conversao e Aproveitamento do Tempo
- descreva o impacto da conversao do tempo especial quando aplicavel;
- destaque limitacoes legais ou documentais;
- explique efeitos praticos no direito ao beneficio.

## 5. Regras Previdenciarias Aplicaveis
- indique as regras potencialmente aplicaveis;
- aponte requisitos atendidos e nao atendidos;
- destaque a opcao aparentemente mais vantajosa, quando possivel.

## 6. Riscos, Pendencias e Estrategia
- documentos faltantes;
- fragilidades probatorias;
- riscos juridicos;
- diligencias recomendadas.

## 7. Conclusao
- resposta final sobre a viabilidade;
- orientacao pratica para seguimento administrativo ou judicial.

## DIRETRIZES IMPORTANTES

- Nao invente fatos, periodos, documentos ou fundamentos inexistentes no JSON.
- Quando houver duvida ou ausencia documental, registre de forma expressa.
- Use linguagem tecnica, clara e profissional.
- Priorize fundamentacao objetiva, sem prolixidade.
- Sempre diferencie fato comprovado, inferencia plausivel e ponto pendente de prova.
- Se o caso nao for viavel, diga isso claramente e explique o motivo.`;

  public async up(queryRunner: QueryRunner): Promise<void> {
    const resourceId = await this.ensurePaidResource(queryRunner);
    await this.ensureIaConfig(queryRunner, resourceId);
    await this.enableResourceForMatchingPaymentPlans(queryRunner, resourceId);
    await this.enableResourceForMatchingOrganizationPlans(
      queryRunner,
      resourceId,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const resourceRows: Array<{ id: string }> = await queryRunner.query(
      `
        SELECT id
        FROM payment_plan_paid_resource
        WHERE resource = ?
      `,
      [this.resourceType],
    );

    const resourceId = resourceRows[0]?.id;

    if (!resourceId) {
      return;
    }

    await queryRunner.query(
      `
        DELETE FROM organization_payment_plan_enable_paid_resource
        WHERE payment_plan_paid_resource_id = ?
      `,
      [resourceId],
    );

    await queryRunner.query(
      `
        DELETE FROM payment_plan_enable_resource
        WHERE payment_plan_paid_resource_id = ?
      `,
      [resourceId],
    );

    await queryRunner.query(
      `
        DELETE FROM payment_plan_paid_resource_ia_config
        WHERE payment_plan_paid_resource_id = ?
      `,
      [resourceId],
    );

    await queryRunner.query(
      `
        DELETE FROM payment_plan_paid_resource
        WHERE id = ?
      `,
      [resourceId],
    );
  }

  private async ensurePaidResource(queryRunner: QueryRunner): Promise<string> {
    const existingRows: Array<{ id: string }> = await queryRunner.query(
      `
        SELECT id
        FROM payment_plan_paid_resource
        WHERE resource = ?
        LIMIT 1
      `,
      [this.resourceType],
    );

    if (existingRows[0]?.id) {
      const resourceId = existingRows[0].id;

      await queryRunner.query(
        `
          UPDATE payment_plan_paid_resource
          SET
            updated_at = CURRENT_TIMESTAMP(6),
            deleted_at = NULL,
            credit_cost = ?,
            title = ?,
            description = ?
          WHERE id = ?
        `,
        [
          this.resourceCreditCost,
          this.resourceTitle,
          this.resourceDescription,
          resourceId,
        ],
      );

      return resourceId;
    }

    let resourceId = this.preferredResourceId;

    const conflictingRows: Array<{ id: string }> = await queryRunner.query(
      `
        SELECT id
        FROM payment_plan_paid_resource
        WHERE id = ?
        LIMIT 1
      `,
      [resourceId],
    );

    if (conflictingRows.length > 0) {
      resourceId = await this.generateUuid(queryRunner);
    }

    await queryRunner.query(
      `
        INSERT INTO payment_plan_paid_resource (
          id,
          resource,
          credit_cost,
          title,
          description
        ) VALUES (?, ?, ?, ?, ?)
      `,
      [
        resourceId,
        this.resourceType,
        this.resourceCreditCost,
        this.resourceTitle,
        this.resourceDescription,
      ],
    );

    return resourceId;
  }

  private async ensureIaConfig(
    queryRunner: QueryRunner,
    resourceId: string,
  ): Promise<void> {
    const existingRows: Array<{ id: string }> = await queryRunner.query(
      `
        SELECT id
        FROM payment_plan_paid_resource_ia_config
        WHERE payment_plan_paid_resource_id = ?
        LIMIT 1
      `,
      [resourceId],
    );

    if (existingRows[0]?.id) {
      await queryRunner.query(
        `
          UPDATE payment_plan_paid_resource_ia_config
          SET
            updated_at = CURRENT_TIMESTAMP(6),
            deleted_at = NULL,
            prompt = ?
          WHERE id = ?
        `,
        [this.prompt, existingRows[0].id],
      );
      return;
    }

    let iaConfigId = this.preferredIaConfigId;

    const conflictingRows: Array<{ id: string }> = await queryRunner.query(
      `
        SELECT id
        FROM payment_plan_paid_resource_ia_config
        WHERE id = ?
        LIMIT 1
      `,
      [iaConfigId],
    );

    if (conflictingRows.length > 0) {
      iaConfigId = await this.generateUuid(queryRunner);
    }

    await queryRunner.query(
      `
        INSERT INTO payment_plan_paid_resource_ia_config (
          id,
          prompt,
          payment_plan_paid_resource_id
        ) VALUES (?, ?, ?)
      `,
      [iaConfigId, this.prompt, resourceId],
    );
  }

  private async enableResourceForMatchingPaymentPlans(
    queryRunner: QueryRunner,
    resourceId: string,
  ): Promise<void> {
    await queryRunner.query(
      `
        INSERT INTO payment_plan_enable_resource (
          id,
          payment_plan_id,
          payment_plan_paid_resource_id
        )
        SELECT
          UUID(),
          matching.payment_plan_id,
          ?
        FROM (
          SELECT DISTINCT pper.payment_plan_id
          FROM payment_plan_enable_resource pper
          INNER JOIN payment_plan_paid_resource ppr
            ON ppr.id = pper.payment_plan_paid_resource_id
          WHERE pper.deleted_at IS NULL
            AND ppr.deleted_at IS NULL
            AND ppr.resource IN (?, ?, ?, ?)
        ) matching
        LEFT JOIN payment_plan_enable_resource existing
          ON existing.payment_plan_id = matching.payment_plan_id
         AND existing.payment_plan_paid_resource_id = ?
         AND existing.deleted_at IS NULL
        WHERE existing.id IS NULL
      `,
      [resourceId, ...this.relatedResourceTypes, resourceId],
    );
  }

  private async enableResourceForMatchingOrganizationPlans(
    queryRunner: QueryRunner,
    resourceId: string,
  ): Promise<void> {
    await queryRunner.query(
      `
        INSERT INTO organization_payment_plan_enable_paid_resource (
          id,
          organization_payment_plan_id,
          payment_plan_paid_resource_id
        )
        SELECT
          UUID(),
          matching.organization_payment_plan_id,
          ?
        FROM (
          SELECT DISTINCT opper.organization_payment_plan_id
          FROM organization_payment_plan_enable_paid_resource opper
          INNER JOIN payment_plan_paid_resource ppr
            ON ppr.id = opper.payment_plan_paid_resource_id
          WHERE opper.deleted_at IS NULL
            AND ppr.deleted_at IS NULL
            AND ppr.resource IN (?, ?, ?, ?)
        ) matching
        LEFT JOIN organization_payment_plan_enable_paid_resource existing
          ON existing.organization_payment_plan_id =
             matching.organization_payment_plan_id
         AND existing.payment_plan_paid_resource_id = ?
         AND existing.deleted_at IS NULL
        WHERE existing.id IS NULL
      `,
      [resourceId, ...this.relatedResourceTypes, resourceId],
    );
  }

  private async generateUuid(queryRunner: QueryRunner): Promise<string> {
    const generatedRows: Array<{ id: string }> =
      await queryRunner.query(`SELECT UUID() AS id`);

    const generatedId = generatedRows[0]?.id;

    if (!generatedId) {
      throw new Error('Could not generate UUID for special category resource');
    }

    return generatedId;
  }
}
