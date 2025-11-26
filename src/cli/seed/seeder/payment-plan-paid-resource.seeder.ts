import { Inject } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { PaymentPlanPaidResourceCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource/command/payment-plan-paid-resource.command.repository.gateway';
import { PaymentPlanPaidResourceQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource/query/payment-plan-paid-resource.query.repository.gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { PaymentPlanPaidResourceEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/payment-plan-paid-resource.entity';

import type { SeederInterface } from '@cli/seed/interface/seeder.interface';

export const PAYMENT_PLAN_PAID_RESOURCE_SEED = [
  {
    resource: PaymentPlanPaidResourceTypeEnum.DOCUMENT_ANALYSIS,
    creditCost: 5,
    description: 'Análise automática de documentos',
  },
  {
    resource: PaymentPlanPaidResourceTypeEnum.FAST_PROCESSING,
    creditCost: 10,
    description: 'Processamento prioritário do documento',
  },
  {
    resource: PaymentPlanPaidResourceTypeEnum.GEN_AI_REPORT,
    creditCost: 20,
    description: 'Geração de relatório por IA',
  },
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

    const listData = new ListDataInputModel({
      page: 1,
      limit: 10,
      sortField: null,
      field: null,
      search: null,
    });

    const existingList =
      await this.paymentPlanPaidResourceQueryRepositoryGateway.listPaymentPlanPaidResource(
        listData,
      );

    for (const resourceData of PAYMENT_PLAN_PAID_RESOURCE_SEED) {
      const existing = existingList.resource.find(
        (item) => item.resource === resourceData.resource,
      );

      if (!existing) {
        const entity = new PaymentPlanPaidResourceEntity(resourceData);

        transactions.push(
          this.paymentPlanPaidResourceCommandRepositoryGateway.createPaymentPlanPaidResource(
            entity,
          ),
        );

        continue;
      }

      const update = new PaymentPlanPaidResourceEntity({
        ...existing,
        ...resourceData,
        id: existing.id,
      });

      transactions.push(
        this.paymentPlanPaidResourceCommandRepositoryGateway.updatePaymentPlanPaidResource(
          existing.id,
          update,
        ),
      );
    }

    return transactions;
  }
}
