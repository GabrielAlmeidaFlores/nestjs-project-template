import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';

import type { MigrationInterface, QueryRunner } from 'typeorm';

export class PermanentIncapacityBenefitTerminatedPaidResources1779000000005
  implements MigrationInterface
{
  name = 'PermanentIncapacityBenefitTerminatedPaidResources1779000000005';

  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const resource of this.resources) {
      await queryRunner.query(
        `INSERT INTO \`payment_plan_paid_resource\` (\`id\`, \`created_at\`, \`updated_at\`, \`deleted_at\`, \`resource\`, \`credit_cost\`, \`title\`, \`description\`)
         VALUES (?, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6), NULL, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           \`deleted_at\` = NULL,
           \`credit_cost\` = VALUES(\`credit_cost\`),
           \`title\` = VALUES(\`title\`),
           \`description\` = VALUES(\`description\`),
           \`updated_at\` = CURRENT_TIMESTAMP(6)`,
        [
          resource.id,
          resource.resource,
          resource.creditCost,
          resource.title,
          resource.description,
        ],
      );
    }
  }

  public async down(): Promise<void> {
    return;
  }

  private readonly resources = [
    {
      id: 'a1b2c3d4-e5f6-4a7b-9c8d-1e2f3a4b5c6d',
      resource:
        PaymentPlanPaidResourceTypeEnum.PERMANENT_INCAPACITY_BENEFIT_TERMINATED_INSS_DECISION_ANALYSIS,
      creditCost: 5,
      title:
        'Análise de Decisão do INSS (Cessação Aposentadoria por Incapacidade Permanente)',
      description:
        'Análise da carta de cessação e documentos do processo administrativo do INSS com IA para aposentadoria por incapacidade permanente. Examina o fundamento da cessação, identifica erros de cálculo ou enquadramento legal, aponta eventuais irregularidades processuais e orienta sobre a melhor estratégia de reversão administrativa ou judicial.',
    },
    {
      id: 'b2c3d4e5-f6a7-4b8c-ad9e-2f3a4b5c6d7e',
      resource:
        PaymentPlanPaidResourceTypeEnum.PERMANENT_INCAPACITY_BENEFIT_TERMINATED_FIRST_ANALYSIS,
      creditCost: 5,
      title:
        'Primeira Análise (Cessação Aposentadoria por Incapacidade Permanente)',
      description:
        'Primeira análise de cessação de aposentadoria por incapacidade permanente com IA, combinando os dados estruturados do caso com a leitura e interpretação do CNIS. Gera parecer inicial técnico sobre tempo de contribuição, carência, períodos relevantes, pontos de atenção e viabilidade preliminar de reversão da cessação.',
    },
    {
      id: 'c3d4e5f6-a7b8-4c9d-be1f-3a4b5c6d7e8f',
      resource:
        PaymentPlanPaidResourceTypeEnum.PERMANENT_INCAPACITY_BENEFIT_TERMINATED_COMPLETE_ANALYSIS,
      creditCost: 8,
      title:
        'Análise Completa (Cessação Aposentadoria por Incapacidade Permanente)',
      description:
        'Análise completa de cessação de aposentadoria por incapacidade permanente com IA. Consolida o histórico contributivo, os períodos analisados, a decisão de cessação do INSS e a condição de incapacidade, gerando parecer técnico detalhado com enquadramento nas regras aplicáveis, fundamentação jurídica, estratégia processual recomendada e perspectivas do caso.',
    },
    {
      id: 'd4e5f6a7-b8c9-4d0e-8f2a-4b5c6d7e8f9a',
      resource:
        PaymentPlanPaidResourceTypeEnum.PERMANENT_INCAPACITY_BENEFIT_TERMINATED_SIMPLIFIED_ANALYSIS,
      creditCost: 3,
      title:
        'Análise Simplificada (Cessação Aposentadoria por Incapacidade Permanente)',
      description:
        'Análise simplificada de cessação de aposentadoria por incapacidade permanente com IA. Resume os principais achados da análise completa, indica a viabilidade geral do caso, os pontos críticos e os próximos passos recomendados, em linguagem acessível para apresentação ao cliente.',
    },
  ];
}
