import { Inject } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListPaymentPlanPaidResourcesResponseDto } from '@module/admin/payment-plan/dto/response/list-payment-plan-paid-resources.response.dto';
import { PaymentPlanPaidResourceResponseDto } from '@module/admin/payment-plan/dto/response/payment-plan-paid-resource.response.dto';
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
    listData: ListDataInputModel,
  ): Promise<ListPaymentPlanPaidResourcesResponseDto> {
    const paidResources =
      await this.paymentPlanPaidResourceQueryRepositoryGateway.listPaymentPlanPaidResource(
        listData,
      );

    // Buscar todos os IA configs em paralelo
    const iaConfigsPromises = paidResources.resource.map((paidResource) =>
      this.paymentPlanPaidResourceIaConfigQueryRepositoryGateway.findOnePaymentPlanPaidResourceIaConfigByPaidResourceId(
        paidResource.id,
      ),
    );

    const iaConfigs = await Promise.all(iaConfigsPromises);

    // Mapear recursos com seus prompts
    const resources = paidResources.resource.map((paidResource, index) => {
      const iaConfig = iaConfigs[index];
      const response = PaymentPlanPaidResourceResponseDto.build({
        id: paidResource.id,
        resource: paidResource.resource,
        creditCost: paidResource.creditCost,
        description: paidResource.description,
      });

      if (iaConfig) {
        response.prompt = iaConfig.prompt;
      }

      return response;
    });

    return ListPaymentPlanPaidResourcesResponseDto.build({
      ...paidResources,
      resource: resources,
    });
  }
}
