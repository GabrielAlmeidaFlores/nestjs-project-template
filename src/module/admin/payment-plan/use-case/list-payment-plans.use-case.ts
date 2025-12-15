import { Inject } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { GetPaymentPlanResponseDto } from '@module/admin/payment-plan/dto/response/get-payment-plan.response.dto';
import { ListPaymentPlansResponseDto } from '@module/admin/payment-plan/dto/response/list-payment-plans.response.dto';
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
      }),
    );

    return ListPaymentPlansResponseDto.build({
      ...paymentPlans,
      resource: resources,
    });
  }
}
