import { Inject } from '@nestjs/common';

import { ListPaymentPlanPaidResourcesRequestDto } from '@module/admin/payment-plan/dto/request/list-payment-plan-paid-resources.request.dto';
import { GetPaymentPlanPaidResourceResponseDto } from '@module/admin/payment-plan/dto/response/get-payment-plan-paid-resource.response.dto';
import { ListPaymentPlanPaidResourcesResponseDto } from '@module/admin/payment-plan/dto/response/list-payment-plan-paid-resources.response.dto';
import { ListPaymentPlanPaidResourceQueryParam } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource/query/param/list-payment-plan-paid-resource.query.param';
import { PaymentPlanPaidResourceQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource/query/payment-plan-paid-resource.query.repository.gateway';
import { PaymentPlanPaidResourceIaConfigQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource-ia-config/query/payment-plan-paid-resource-ia-config.query.repository.gateway';

export class ListPaymentPlanPaidResourcesUseCase {
  protected readonly _type = ListPaymentPlanPaidResourcesUseCase.name;

  public constructor(
    @Inject(PaymentPlanPaidResourceQueryRepositoryGateway)
    private readonly paymentPlanPaidResourceQueryRepositoryGateway: PaymentPlanPaidResourceQueryRepositoryGateway,
    @Inject(PaymentPlanPaidResourceIaConfigQueryRepositoryGateway)
    private readonly paymentPlanPaidResourceIaConfigQueryRepositoryGateway: PaymentPlanPaidResourceIaConfigQueryRepositoryGateway,
  ) {}

  public async execute(
    listData: ListPaymentPlanPaidResourcesRequestDto,
  ): Promise<ListPaymentPlanPaidResourcesResponseDto> {
    const queryParameter = new ListPaymentPlanPaidResourceQueryParam({
      ...listData,
      resource: listData.resources ?? null,
    });

    const paidResources =
      await this.paymentPlanPaidResourceQueryRepositoryGateway.listPaymentPlanPaidResource(
        queryParameter,
      );

    const resources = paidResources.resource.map(async (paidResource) => {
      const iaConfig =
        await this.paymentPlanPaidResourceIaConfigQueryRepositoryGateway.findOnePaymentPlanPaidResourceIaConfigByPaidResourceId(
          paidResource.id,
        );

      const updatedAt =
        iaConfig && iaConfig.updatedAt > paidResource.updatedAt
          ? iaConfig.updatedAt
          : paidResource.updatedAt;

      const response = GetPaymentPlanPaidResourceResponseDto.build({
        id: paidResource.id,
        resource: paidResource.resource,
        creditCost: paidResource.creditCost,
        description: paidResource.description,
        title: paidResource.title,
        updatedAt,
      });

      if (iaConfig) {
        response.prompt = iaConfig.prompt;
      }

      return response;
    });

    return ListPaymentPlanPaidResourcesResponseDto.build({
      ...paidResources,
      resource: await Promise.all(resources),
    });
  }
}
