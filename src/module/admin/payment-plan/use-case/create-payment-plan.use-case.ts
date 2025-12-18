import { Inject } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { CreatePaymentPlanRequestDto } from '@module/admin/payment-plan/dto/request/create-payment-plan.request.dto';
import { GetPaymentPlanResponseDto } from '@module/admin/payment-plan/dto/response/get-payment-plan.response.dto';
import { PaymentPlanEnabledPaidResourceItemResponseDto } from '@module/admin/payment-plan/dto/response/payment-plan-enabled-paid-resource-item.response.dto';
import { PaymentPlanNotFoundError } from '@module/admin/payment-plan/error/payment-plan-not-found.error';
import { PaymentPlanCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan/command/payment-plan.command.repository,gateway';
import { PaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan/query/payment-plan.query.repository.gateway';
import { PaymentPlanEnabledPaidResourceCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-enabled-paid-resource/command/payment-plan-enabled-paid-resource.command.repository.gateway';
import { PaymentPlanEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/payment-plan.entity';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import { PaymentPlanEnabledPaidResourceEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-enabled-paid-resource/payment-plan-enabled-paid-resource-entity';
import { PaymentPlanEnabledPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-enabled-paid-resource/value-object/payment-plan-enabled-paid-resource-id/payment-plan-enabled-paid-resource-id.value-object';

export class CreatePaymentPlanUseCase {
  protected readonly _type = CreatePaymentPlanUseCase.name;

  public constructor(
    @Inject(PaymentPlanCommandRepositoryGateway)
    private readonly paymentPlanCommandRepositoryGateway: PaymentPlanCommandRepositoryGateway,
    @Inject(PaymentPlanEnabledPaidResourceCommandRepositoryGateway)
    private readonly paymentPlanEnabledPaidResourceCommandRepositoryGateway: PaymentPlanEnabledPaidResourceCommandRepositoryGateway,
    @Inject(PaymentPlanQueryRepositoryGateway)
    private readonly paymentPlanQueryRepositoryGateway: PaymentPlanQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    dto: CreatePaymentPlanRequestDto,
  ): Promise<GetPaymentPlanResponseDto> {
    const now = new Date();

    const paymentPlan = new PaymentPlanEntity({
      id: new PaymentPlanId(),
      name: dto.name,
      description: dto.description,
      price: dto.price,
      maxMemberCount: dto.maxMemberCount,
      monthlyCreditAmount: dto.monthlyCreditAmount,
      active: dto.active,
      cycle: dto.cycle,
      createdAt: now,
      updatedAt: now,
    });

    const transactions: TransactionType[] = [];

    const createPaymentPlan =
      this.paymentPlanCommandRepositoryGateway.createPaymentPlan(paymentPlan);

    transactions.push(createPaymentPlan);

    const seenIds = new Set<string>();
    const uniquePaidResourceIds = dto.paidResourceId.filter((id) => {
      const idString = id.toString();
      if (seenIds.has(idString)) {
        return false;
      }
      seenIds.add(idString);
      return true;
    });

    for (const paidResourceId of uniquePaidResourceIds) {
      const paymentPlanEnabledPaidResource =
        new PaymentPlanEnabledPaidResourceEntity({
          id: new PaymentPlanEnabledPaidResourceId(),
          paymentPlan: paymentPlan.id,
          paymentPlanPaidResource: paidResourceId,
          createdAt: now,
          updatedAt: now,
        });

      const createPaymentPlanEnabledPaidResource =
        this.paymentPlanEnabledPaidResourceCommandRepositoryGateway.createPaymentPlanEnabledPaidResource(
          paymentPlanEnabledPaidResource,
        );

      transactions.push(createPaymentPlanEnabledPaidResource);
    }

    const execute =
      await this.baseTransactionRepositoryGateway.execute(transactions);

    await execute.commit();

    const createdPaymentPlan =
      await this.paymentPlanQueryRepositoryGateway.findOnePaymentPlanByIdOrFail(
        paymentPlan.id,
        PaymentPlanNotFoundError,
      );

    return GetPaymentPlanResponseDto.build({
      ...createdPaymentPlan,
      enabledPaidResources: createdPaymentPlan.enabledPaidResources.map(
        (resource) =>
          PaymentPlanEnabledPaidResourceItemResponseDto.build({
            id: resource.paymentPlanPaidResource.id,
            resource: resource.paymentPlanPaidResource.resource,
            creditCost: parseFloat(resource.paymentPlanPaidResource.creditCost),
            description: resource.paymentPlanPaidResource.description,
          }),
      ),
    });
  }
}
