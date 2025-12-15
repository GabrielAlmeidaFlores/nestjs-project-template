import { Inject } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListPaymentPlanPaidResourcesResponseDto } from '@module/admin/payment-plan/dto/response/list-payment-plan-paid-resources.response.dto';
import { PaymentPlanPaidResourceResponseDto } from '@module/admin/payment-plan/dto/response/payment-plan-paid-resource.response.dto';
import { PaymentPlanPaidResourceQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource/query/payment-plan-paid-resource.query.repository.gateway';

export class ListPaymentPlanPaidResourcesUseCase {
  protected readonly _type = ListPaymentPlanPaidResourcesUseCase.name;

  public constructor(
    @Inject(PaymentPlanPaidResourceQueryRepositoryGateway)
    private readonly paymentPlanPaidResourceQueryRepositoryGateway: PaymentPlanPaidResourceQueryRepositoryGateway,
  ) {}

  public async execute(
    listData: ListDataInputModel,
  ): Promise<ListPaymentPlanPaidResourcesResponseDto> {
    const paidResources =
      await this.paymentPlanPaidResourceQueryRepositoryGateway.listPaymentPlanPaidResource(
        listData,
      );

    const resources = paidResources.resource.map((paidResource) =>
      PaymentPlanPaidResourceResponseDto.build({
        id: paidResource.id,
        resource: paidResource.resource,
        creditCost: parseFloat(paidResource.creditCost),
        description: paidResource.description,
      }),
    );

    return ListPaymentPlanPaidResourcesResponseDto.build({
      ...paidResources,
      resource: resources,
    });
  }
}
