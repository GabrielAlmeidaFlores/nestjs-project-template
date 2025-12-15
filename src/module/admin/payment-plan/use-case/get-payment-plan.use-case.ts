import { Inject } from '@nestjs/common';

import { GetPaymentPlanResponseDto } from '@module/admin/payment-plan/dto/response/get-payment-plan.response.dto';
import { PaymentPlanNotFoundError } from '@module/admin/payment-plan/error/payment-plan-not-found.error';
import { PaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan/query/payment-plan.query.repository.gateway';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';

export class GetPaymentPlanUseCase {
  protected readonly _type = GetPaymentPlanUseCase.name;

  public constructor(
    @Inject(PaymentPlanQueryRepositoryGateway)
    private readonly paymentPlanQueryRepositoryGateway: PaymentPlanQueryRepositoryGateway,
  ) {}

  public async execute(
    paymentPlanId: PaymentPlanId,
  ): Promise<GetPaymentPlanResponseDto> {
    const paymentPlan =
      await this.paymentPlanQueryRepositoryGateway.findOnePaymentPlanByIdOrFail(
        paymentPlanId,
        PaymentPlanNotFoundError,
      );

    return GetPaymentPlanResponseDto.build({
      id: paymentPlan.id,
      name: paymentPlan.name,
      description: paymentPlan.description,
      price: paymentPlan.price,
      maxMemberCount: paymentPlan.maxMemberCount,
      monthlyCreditAmount: paymentPlan.monthlyCreditAmount,
      active: paymentPlan.active,
      cycle: paymentPlan.cycle,
      createdAt: paymentPlan.createdAt,
      updatedAt: paymentPlan.updatedAt,
    });
  }
}
