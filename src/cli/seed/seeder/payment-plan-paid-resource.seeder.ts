import { Inject } from '@nestjs/common';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { PaymentPlanPaidResourceCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource/command/payment-plan-paid-resource.command.repository.gateway';
import { PaymentPlanPaidResourceQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource/query/payment-plan-paid-resource.query.repository.gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { PaymentPlanPaidResourceEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/payment-plan-paid-resource.entity';
import { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value-object';

import type { SeederInterface } from '@cli/seed/interface/seeder.interface';

export const PAYMENT_PLAN_PAID_RESOURCE_SEED: Array<PaymentPlanPaidResourceEntity> =
  [
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('36c342c8-6623-4e89-85e1-a5ea88d94cbb'),
      resource:
        PaymentPlanPaidResourceTypeEnum.CNIS_FAST_ANALYSIS_COMPLETE_ANALYSIS,
      creditCost: 5,
      description: 'Análise completa do CNIS com parecer detalhado.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('ff0a1c66-9009-4402-97f8-2b54f5967f28'),
      resource:
        PaymentPlanPaidResourceTypeEnum.CNIS_FAST_ANALYSIS_SIMPLIFIED_ANALYSIS,
      creditCost: 5,
      description: 'Análise simplificada do CNIS com parecer resumido.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('3f8c7e3e-4ee7-400a-a7a5-07114fca359d'),
      resource:
        PaymentPlanPaidResourceTypeEnum.LEGAL_PLEADING_COMPLETE_ANALYSIS,
      creditCost: 5,
      description: 'Análise completa de peças jurídicas com parecer detalhado.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('c2d576bf-323b-4f3f-aec4-dce4e2c90988'),
      resource:
        PaymentPlanPaidResourceTypeEnum.LEGAL_PLEADING_SIMPLIFIED_ANALYSIS,
      creditCost: 5,
      description:
        'Análise simplificada de peças jurídicas com parecer resumido.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('6caaef15-be5f-4f93-84c8-ed8d0c6c283b'),
      resource:
        PaymentPlanPaidResourceTypeEnum.LEGAL_PLEADING_QUICK_DOCUMENT_ANALYSIS,
      creditCost: 3,
      description:
        'Análise rápida de documentos previdenciários (CNIS, CTPS, PPP, CTC).',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('b957684d-1cc4-4cbe-8233-04a22b4bb676'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RPPS_COMPLETE_ANALYSIS,
      creditCost: 8,
      description:
        'Análise completa de planejamento de aposentadoria RPPS com parecer detalhado.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('c32c6734-bb4a-405f-8c84-5199848b1dcb'),
      resource: PaymentPlanPaidResourceTypeEnum.LEGAL_PROCEEDING_MONITORING,
      creditCost: 0,
      description: 'Monitoramento automático de processos jurídicos.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('bd9b379c-0e54-4ede-a3da-476185e69f8e'),
      resource:
        PaymentPlanPaidResourceTypeEnum.ELOY_CHAT_SOCIAL_SECURITY_QUESTIONS,
      creditCost: 0.3,
      description:
        'Chat Eloy para perguntas sobre questões previdenciárias gerais.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('056fa86a-6a7e-49fc-941a-477ec9a28f56'),
      resource: PaymentPlanPaidResourceTypeEnum.ELOY_CHAT_LEGISLATION_QUESTIONS,
      creditCost: 0.3,
      description: 'Chat Eloy para perguntas sobre legislação previdenciária.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('98ce2c1e-52f3-4dbd-a2f9-9a7972db4c17'),
      resource:
        PaymentPlanPaidResourceTypeEnum.ELOY_CHAT_WINNING_LEGAL_THESIS_RESEARCH,
      creditCost: 0.3,
      description:
        'Chat Eloy para pesquisa de teses jurídicas vencedoras em direito previdenciário.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('d146fdb8-8511-472e-9f0c-dc9d5fb0d2ad'),
      resource: PaymentPlanPaidResourceTypeEnum.ELOY_CHAT_ANALYSIS,
      creditCost: 0.3,
      description:
        'Chat Eloy para análise de documentos e casos previdenciários.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('a3f5c2e1-8d4b-4c9a-9f61-1e8c7b6a5d42'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RGPS_CNIS_ANALYSIS,
      creditCost: 5,
      description: 'Análise do CNIS para planejamento de aposentadoria RGPS.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('9b1e7d4a-2f63-4a0d-8c55-6e3b2a1f9c87'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RGPS_COMPARE_CNIS_CTPS,
      creditCost: 4,
      description:
        'Comparação entre CNIS e CTPS para planejamento de aposentadoria RGPS.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('4d8c1a7e-5b2f-4f6c-9a03-e71b6d5c2f98'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RGPS_SPECIAL_PERIOD_PPP_ANALYSIS,
      creditCost: 6,
      description:
        'Análise de períodos especiais com base na PPP para planejamento de aposentadoria RGPS.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e2c9b7a4-6f1d-4e8a-9b55-0c3d2f8a71e6'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RGPS_NO_END_DATE_DOCUMENTS_ANALYSIS,
      creditCost: 5,
      description:
        'Análise de documentos sem data de término para planejamento de aposentadoria RGPS.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('6a5f8c2e-1d4b-4c9e-8a73-f2b1e0d97c34'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RGPS_RURAL_TIME_ANALYSIS,
      creditCost: 4,
      description:
        'Análise de tempo rural para planejamento de aposentadoria RGPS.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('c1d7e5b9-8a2f-4f3c-9e04-6a5b2d1c87f4'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RGPS_MILITARY_SERVICE_ANALYSIS,
      creditCost: 4,
      description:
        'Análise de tempo de serviço militar para planejamento de aposentadoria RGPS.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('8f6a9e2b-5c1d-4a7f-9b34-e2d1c0a578f6'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RGPS_PUBLIC_SERVICE_ANALYSIS,
      creditCost: 5,
      description:
        'Análise de tempo de serviço público para planejamento de aposentadoria RGPS.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('2c5a8e7d-9b1f-4d63-ae04-6f3c1b0a97d8'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RGPS_CTPS_OUTSIDE_CNIS_ANALYSIS,
      creditCost: 4,
      description:
        'Análise de CTPS fora do CNIS para planejamento de aposentadoria RGPS.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('f7e1a2c9-4b6d-4f85-9a03-8c5d2b1e67a4'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RGPS_STUDENT_APPRENTICE_ANALYSIS,
      creditCost: 3,
      description:
        'Análise de tempo como estudante aprendiz para planejamento de aposentadoria RGPS.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('5d8e2c1a-7f4b-4a96-9c03-e6b5f0d1a782'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RGPS_WORK_ABROAD_ANALYSIS,
      creditCost: 5,
      description:
        'Análise de tempo de trabalho no exterior para planejamento de aposentadoria RGPS.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('3c8e5a1d-7b2f-4a96-9e04-d1b6f0c52a78'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RGPS_INFORMAL_WORK_ANALYSIS,
      creditCost: 4,
      description:
        'Análise de tempo de trabalho informal para planejamento de aposentadoria RGPS  .',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('b6a1f9d3-2e7c-4c58-8a04-5e1d0f7b9c62'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RGPS_LABOR_COURT_DECISION_ANALYSIS,
      creditCost: 6,
      description:
        'Análise de decisões da Justiça do Trabalho para planejamento de aposentadoria RGPS.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('8d2f7e1a-5c4b-4f93-9a60-b1e6c3d05897'),
      resource:
        PaymentPlanPaidResourceTypeEnum.RETIREMENT_PLANNING_RGPS_FINAL_RULES_ANALYSIS,
      creditCost: 5,
      description:
        'Análise das regras finais para planejamento de aposentadoria RGPS.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('e9efa47e-d159-4b54-8ef4-05dfc6c655d2'),
      resource:
        PaymentPlanPaidResourceTypeEnum.ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_COMPLETE_ANALYSIS,
      creditCost: 1,
      description: 'Análise completa do procedimento administrativo do INSS.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('87c9db53-a1bb-46da-8fe2-a94bb2b7b703'),
      resource:
        PaymentPlanPaidResourceTypeEnum.ADMINISTRATIVE_PROCEDURE_INSS_ANALYSIS_SIMPLIFIED_ANALYSIS,
      creditCost: 1,
      description:
        'Análise simplificada do procedimento administrativo do INSS.',
    }),
  ];

export class PaymentPlanPaidResourceSeeder implements SeederInterface {
  protected readonly _type = PaymentPlanPaidResourceSeeder.name;

  public constructor(
    @Inject(PaymentPlanPaidResourceCommandRepositoryGateway)
    public readonly paymentPlanPaidResourceCommandRepositoryGateway: PaymentPlanPaidResourceCommandRepositoryGateway,
    @Inject(PaymentPlanPaidResourceQueryRepositoryGateway)
    public readonly paymentPlanPaidResourceQueryRepositoryGateway: PaymentPlanPaidResourceQueryRepositoryGateway,
  ) {}

  public async execute(): Promise<Array<TransactionType>> {
    const transactions: Array<TransactionType> = [];

    for (const resourceData of PAYMENT_PLAN_PAID_RESOURCE_SEED) {
      const existing =
        await this.paymentPlanPaidResourceQueryRepositoryGateway.findOnePaymentPlanPaidResourceByResourceType(
          resourceData.resource,
        );

      if (existing) {
        const entity = new PaymentPlanPaidResourceEntity({
          ...existing,
          ...resourceData,
        });

        transactions.push(
          this.paymentPlanPaidResourceCommandRepositoryGateway.updatePaymentPlanPaidResource(
            existing.id,
            entity,
          ),
        );

        continue;
      }

      const entity = new PaymentPlanPaidResourceEntity(resourceData);

      transactions.push(
        this.paymentPlanPaidResourceCommandRepositoryGateway.createPaymentPlanPaidResource(
          entity,
        ),
      );
    }

    return transactions;
  }
}
