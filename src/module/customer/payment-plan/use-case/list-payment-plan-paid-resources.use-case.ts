import { Inject, Injectable } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { PaymentPlanPaidResourceQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource/query/payment-plan-paid-resource.query.repository.gateway';
import { ListPaymentPlanPaidResourcesResponseDto } from '@module/customer/payment-plan/dto/response/list-payment-plan-paid-resources.response.dto';
import { PaymentPlanPaidResourceResponseDto } from '@module/customer/payment-plan/dto/response/payment-plan-paid-resource.response.dto';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

@Injectable()
export class ListPaymentPlanPaidResourcesUseCase {
  protected readonly _type = ListPaymentPlanPaidResourcesUseCase.name;

  public constructor(
    @Inject(PaymentPlanPaidResourceQueryRepositoryGateway)
    private readonly paymentPlanPaidResourceQueryRepositoryGateway: PaymentPlanPaidResourceQueryRepositoryGateway,
  ) {}

  public async execute(
    dto: ListDataRequestDto,
  ): Promise<ListPaymentPlanPaidResourcesResponseDto> {
    const paidResources =
      await this.paymentPlanPaidResourceQueryRepositoryGateway.listPaymentPlanPaidResource(
        new ListDataInputModel({
          ...dto,
        }),
      );

    const resources = paidResources.resource.map((paidResource) =>
      PaymentPlanPaidResourceResponseDto.build({
        id: paidResource.id,
        resource: paidResource.resource,
        creditCost: paidResource.creditCost,
        description: paidResource.description,
      }),
    );

    return ListPaymentPlanPaidResourcesResponseDto.build({
      ...paidResources,
      resource: resources,
    });
  }
}
