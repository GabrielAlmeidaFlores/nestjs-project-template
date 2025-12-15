import { Inject } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { GetPaymentPlanResponseDto } from '@module/admin/payment-plan/dto/response/get-payment-plan.response.dto';
import { ListPaymentPlansResponseDto } from '@module/admin/payment-plan/dto/response/list-payment-plans.response.dto';
import { PaymentPlanEnabledPaidResourceItemResponseDto } from '@module/admin/payment-plan/dto/response/payment-plan-enabled-paid-resource-item.response.dto';
import { PaymentPlanQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan/query/payment-plan.query.repository.gateway';

export class ListPaymentPlansUseCase {
  protected readonly _type = ListPaymentPlansUseCase.name;

  public constructor(
    @Inject(PaymentPlanQueryRepositoryGateway)
    private readonly paymentPlanQueryRepositoryGateway: PaymentPlanQueryRepositoryGateway,
  ) {}

  public async execute(
    listData: ListDataInputModel,
  ): Promise<ListPaymentPlansResponseDto> {
    const paymentPlans =
      await this.paymentPlanQueryRepositoryGateway.listPaymentPlan(listData);

    const resources = paymentPlans.resource.map((paymentPlan) =>
      GetPaymentPlanResponseDto.build({
        ...paymentPlan,
        enabledPaidResources: paymentPlan.enabledPaidResources.map((resource) =>
          PaymentPlanEnabledPaidResourceItemResponseDto.build({
            id: resource.id,
            resource: resource.resource,
            creditCost: parseFloat(resource.creditCost),
            description: resource.description,
          }),
        ),
      }),
    );

    return ListPaymentPlansResponseDto.build({
      ...paymentPlans,
      resource: resources,
    });
  }
}
