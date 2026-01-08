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
      creditCost: 1,
      description:
        'Chat Eloy para perguntas sobre questões previdenciárias gerais.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('056fa86a-6a7e-49fc-941a-477ec9a28f56'),
      resource: PaymentPlanPaidResourceTypeEnum.ELOY_CHAT_LEGISLATION_QUESTIONS,
      creditCost: 1,
      description: 'Chat Eloy para perguntas sobre legislação previdenciária.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('98ce2c1e-52f3-4dbd-a2f9-9a7972db4c17'),
      resource:
        PaymentPlanPaidResourceTypeEnum.ELOY_CHAT_WINNING_LEGAL_THESIS_RESEARCH,
      creditCost: 2,
      description:
        'Chat Eloy para pesquisa de teses jurídicas vencedoras em direito previdenciário.',
    }),
    new PaymentPlanPaidResourceEntity({
      id: new PaymentPlanPaidResourceId('d146fdb8-8511-472e-9f0c-dc9d5fb0d2ad'),
      resource: PaymentPlanPaidResourceTypeEnum.ELOY_CHAT_ANALYSIS,
      creditCost: 3,
      description:
        'Chat Eloy para análise de documentos e casos previdenciários.',
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
