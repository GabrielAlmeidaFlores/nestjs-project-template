import { Inject } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { CreatePaymentPlanRequestDto } from '@module/admin/payment-plan/dto/request/create-payment-plan.request.dto';
import { GetPaymentPlanResponseDto } from '@module/admin/payment-plan/dto/response/get-payment-plan.response.dto';
import { PaymentPlanEnabledPaidResourceItemResponseDto } from '@module/admin/payment-plan/dto/response/payment-plan-enabled-paid-resource-item.response.dto';
import { PaymentPlanNotFoundError } from '@module/admin/payment-plan/error/payment-plan-not-found.error';
import { PaymentPlanCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan/command/payment-plan.command.repository,gateway';
import { PaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan/query/payment-plan.query.repository.gateway';
import { PaymentPlanEnablePaidResourceCommandRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-enable-paid-resource/command/payment-plan-enable-paid-resource.command.repository.gateway';
import { PaymentPlanEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/payment-plan.entity';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import { PaymentPlanEnablePaidResourceEntity } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-enable-paid-resource/payment-plan-enable-paid-resource-entity';
import { PaymentPlanEnablePaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-enable-paid-resource/value-object/payment-plan-enable-paid-resource-id/payment-plan-enable-paid-resource-id.value-object';

export class CreatePaymentPlanUseCase {
  protected readonly _type = CreatePaymentPlanUseCase.name;

  public constructor(
    @Inject(PaymentPlanCommandRepositoryGateway)
    private readonly paymentPlanCommandRepositoryGateway: PaymentPlanCommandRepositoryGateway,
    @Inject(PaymentPlanEnablePaidResourceCommandRepositoryGateway)
    private readonly paymentPlanEnablePaidResourceCommandRepositoryGateway: PaymentPlanEnablePaidResourceCommandRepositoryGateway,
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
    const uniquePaidResourceIds = dto.paidResource.filter((id) => {
      const idString = id.toString();
      if (seenIds.has(idString)) {
        return false;
      }
      seenIds.add(idString);
      return true;
    });

    for (const paidResourceId of uniquePaidResourceIds) {
      const paymentPlanEnablePaidResource =
        new PaymentPlanEnablePaidResourceEntity({
          id: new PaymentPlanEnablePaidResourceId(),
          paymentPlan: paymentPlan.id,
          paymentPlanPaidResource: paidResourceId,
          createdAt: now,
          updatedAt: now,
        });

      const createPaymentPlanEnablePaidResource =
        this.paymentPlanEnablePaidResourceCommandRepositoryGateway.createPaymentPlanEnablePaidResource(
          paymentPlanEnablePaidResource,
        );

      transactions.push(createPaymentPlanEnablePaidResource);
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
            id: resource.id,
            resource: resource.resource,
            creditCost: parseFloat(resource.creditCost),
            description: resource.description,
          }),
      ),
    });
  }
}
