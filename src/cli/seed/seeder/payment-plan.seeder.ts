import { Inject } from '@nestjs/common';

import { PAYMENT_PLAN_PAID_RESOURCE_SEED } from '@cli/seed/seeder/payment-plan-paid-resource.seeder';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { PaymentPlanCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan/command/payment-plan.command.repository.gateway';
import { PaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan/query/payment-plan.query.repository.gateway';
import { PaymentPlanEnabledPaidResourceCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-enabled-paid-resource/command/payment-plan-enabled-paid-resource.command.repository.gateway';
import { PaymentPlanEnabledPaidResourceQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-enabled-paid-resource/query/payment-plan-enabled-paid-resource.query.repository.gateway';
import { PaymentPlanPaidResourceQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource/query/payment-plan-paid-resource.query.repository.gateway';
import { PaymentPlanEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/payment-plan.entity';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import { PaymentPlanEnabledPaidResourceEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-enabled-paid-resource/payment-plan-enabled-paid-resource-entity';
import { PaymentPlanEnabledPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-enabled-paid-resource/value-object/payment-plan-enabled-paid-resource-id/payment-plan-enabled-paid-resource-id.value-object';
import { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value-object';
import { PaymentPlanCycleEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-cycle.enum';

import type { SeederInterface } from '@cli/seed/interface/seeder.interface';

export const PAYMENT_PLAN_SEED_DATA = [
  new PaymentPlanEntity({
    id: new PaymentPlanId('4b03d7d5-078d-46c6-82b9-cf4998140154'),
    name: 'Plano Básico',
    description:
      'Ideal para profissionais autônomos. Inclui análise simplificada de CNIS e peças jurídicas com 50 créditos mensais.',
    price: new DecimalValue('99.9'),
    maxMemberCount: 1,
    monthlyCreditAmount: 50,
    active: true,
    cycle: PaymentPlanCycleEnum.MONTHLY,
  }),
  new PaymentPlanEntity({
    id: new PaymentPlanId('4b03d7d5-078d-46c6-82b9-cf4998140155'),
    name: 'Plano Profissional',
    description:
      'Perfeito para pequenos escritórios. Análise completa e simplificada de CNIS e peças jurídicas com 200 créditos mensais.',
    price: new DecimalValue('149.9'),
    maxMemberCount: 5,
    monthlyCreditAmount: 200,
    active: true,
    cycle: PaymentPlanCycleEnum.MONTHLY_RECURRING,
  }),
  new PaymentPlanEntity({
    id: new PaymentPlanId('4b03d7d5-078d-46c6-82b9-cf4998140156'),
    name: 'Plano Empresarial',
    description:
      'Perfeito para grandes empresas. Análise completa e simplificada de CNIS e peças jurídicas com 500 créditos mensais.',
    price: new DecimalValue('299.9'),
    maxMemberCount: 10,
    monthlyCreditAmount: 500,
    active: true,
    cycle: PaymentPlanCycleEnum.YEARLY,
  }),
];

export class PaymentPlanSeeder implements SeederInterface {
  protected readonly _type = PaymentPlanSeeder.name;

  public constructor(
    @Inject(PaymentPlanCommandRepositoryGateway)
    public readonly paymentPlanCommandRepositoryGateway: PaymentPlanCommandRepositoryGateway,
    @Inject(PaymentPlanQueryRepositoryGateway)
    public readonly paymentPlanQueryRepositoryGateway: PaymentPlanQueryRepositoryGateway,
    @Inject(PaymentPlanEnabledPaidResourceCommandRepositoryGateway)
    public readonly paymentPlanEnabledPaidResourceCommandRepositoryGateway: PaymentPlanEnabledPaidResourceCommandRepositoryGateway,
    @Inject(PaymentPlanEnabledPaidResourceQueryRepositoryGateway)
    public readonly paymentPlanEnabledPaidResourceQueryRepositoryGateway: PaymentPlanEnabledPaidResourceQueryRepositoryGateway,
    @Inject(PaymentPlanPaidResourceQueryRepositoryGateway)
    public readonly paymentPlanPaidResourceQueryRepositoryGateway: PaymentPlanPaidResourceQueryRepositoryGateway,
  ) {}

  public async execute(): Promise<Array<TransactionType>> {
    const transactions: Array<TransactionType> = [];

    const allPaidResources = PAYMENT_PLAN_PAID_RESOURCE_SEED;
    const paidResourceIdsByType = new Map<string, string>();

    for (const paidResource of allPaidResources) {
      const resourceFromDb =
        await this.paymentPlanPaidResourceQueryRepositoryGateway.findOnePaymentPlanPaidResourceByResourceType(
          paidResource.resource,
        );

      if (!resourceFromDb) {
        continue;
      }

      paidResourceIdsByType.set(
        paidResource.resource,
        resourceFromDb.id.toString(),
      );
    }

    for (const planData of PAYMENT_PLAN_SEED_DATA) {
      const existingPlan =
        await this.paymentPlanQueryRepositoryGateway.findOnePaymentPlanById(
          planData.id,
        );

      if (!existingPlan) {
        transactions.push(
          this.paymentPlanCommandRepositoryGateway.createPaymentPlan(planData),
        );
      }

      const existingEnabledResources =
        await this.paymentPlanEnabledPaidResourceQueryRepositoryGateway.findManyByPaymentPlanId(
          planData.id,
        );

      const existingResourceIds = new Set(
        existingEnabledResources.map((resource) =>
          resource.paymentPlanPaidResourceId.toString(),
        ),
      );

      for (const paidResource of allPaidResources) {
        const resourceIdString = paidResourceIdsByType.get(
          paidResource.resource,
        );

        if (resourceIdString === undefined) {
          continue;
        }

        if (existingResourceIds.has(resourceIdString)) {
          continue;
        }

        const enablePaidResource = new PaymentPlanEnabledPaidResourceEntity({
          id: new PaymentPlanEnabledPaidResourceId(),
          paymentPlan: planData.id,
          paymentPlanPaidResource: new PaymentPlanPaidResourceId(
            resourceIdString,
          ),
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        transactions.push(
          this.paymentPlanEnabledPaidResourceCommandRepositoryGateway.createPaymentPlanEnabledPaidResource(
            enablePaidResource,
          ),
        );
      }
    }

    return transactions;
  }
}
