import { Inject, Injectable } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { PlanSalesCountItemResponseDto } from '@module/admin/dashboard-metrics/dto/response/plan-sales-count-item.response.dto';
import { PlanSalesCountResponseDto } from '@module/admin/dashboard-metrics/dto/response/plan-sales-count.response.dto';
import { OrganizationPaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/organization-payment-plan/query/organization-payment-plan.query.repository.gateway';
import { PaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan/query/payment-plan.query.repository.gateway';

@Injectable()
export class GetPlanSalesCountUseCase {
  protected readonly _type = GetPlanSalesCountUseCase.name;

  public constructor(
    @Inject(PaymentPlanQueryRepositoryGateway)
    private readonly paymentPlanQueryRepository: PaymentPlanQueryRepositoryGateway,
    @Inject(OrganizationPaymentPlanQueryRepositoryGateway)
    private readonly organizationPaymentPlanQueryRepository: OrganizationPaymentPlanQueryRepositoryGateway,
  ) {}

  public async execute(): Promise<PlanSalesCountResponseDto> {
    const MAX_ITEMS = 1000;
    const activePlans =
      await this.paymentPlanQueryRepository.listActivePaymentPlan(
        new ListDataInputModel({ page: 1, limit: MAX_ITEMS }),
      );

    const salesPerPlan =
      await this.organizationPaymentPlanQueryRepository.countSalesPerPaymentPlan();

    const salesMap = new Map(
      salesPerPlan.map((item) => [
        item.paymentPlanId.toString(),
        item.salesCount,
      ]),
    );

    const plans = activePlans.resource.map((plan) =>
      PlanSalesCountItemResponseDto.build({
        paymentPlanId: plan.id,
        planName: plan.name,
        salesCount: salesMap.get(plan.id.toString()) ?? 0,
      }),
    );

    return PlanSalesCountResponseDto.build({
      plans,
    });
  }
}
