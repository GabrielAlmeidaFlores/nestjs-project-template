import { Inject, Injectable } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { PlanSalesCountItemResponseDto } from '@module/admin/dashboard-metrics/dto/response/plan-sales-count-item.response.dto';
import { PlanSalesCountResponseDto } from '@module/admin/dashboard-metrics/dto/response/plan-sales-count.response.dto';
import { PaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan/query/payment-plan.query.repository.gateway';

@Injectable()
export class GetPlanSalesCountUseCase {
  protected readonly _type = GetPlanSalesCountUseCase.name;

  public constructor(
    @Inject(PaymentPlanQueryRepositoryGateway)
    private readonly paymentPlanQueryRepository: PaymentPlanQueryRepositoryGateway,
  ) {}

  public async execute(): Promise<PlanSalesCountResponseDto> {
    // Get active payment plans
    const MAX_ITEMS = 1000;
    const activePlans =
      await this.paymentPlanQueryRepository.listActivePaymentPlan(
        new ListDataInputModel({ page: 1, limit: MAX_ITEMS }),
      );

    // TODO: Need to add method to count subscriptions per plan
    // For now, return plans with 0 sales count
    const plans = activePlans.resource.map((plan) =>
      PlanSalesCountItemResponseDto.build({
        planId: plan.id.toString(),
        planName: plan.name,
        salesCount: 0, // TODO: Calculate actual sales count
      }),
    );

    return PlanSalesCountResponseDto.build({
      plans,
    });
  }
}
