import { Inject, Injectable } from '@nestjs/common';

import { GetPaymentPlanPaidResourceResponseDto } from '@module/admin/payment-plan/dto/response/get-payment-plan-paid-resource.response.dto';
import { PaymentPlanPaidResourceNotFoundError } from '@module/admin/payment-plan/error/payment-plan-paid-resource-not-found.error';
import { PaymentPlanPaidResourceQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource/query/payment-plan-paid-resource.query.repository.gateway';
import { PaymentPlanPaidResourceIaConfigQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource-ia-config/query/payment-plan-paid-resource-ia-config.query.repository.gateway';
import { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value-object';

@Injectable()
export class GetPaymentPlanPaidResourceUseCase {
  protected readonly _type = GetPaymentPlanPaidResourceUseCase.name;

  public constructor(
    @Inject(PaymentPlanPaidResourceQueryRepositoryGateway)
    private readonly paymentPlanPaidResourceQueryRepository: PaymentPlanPaidResourceQueryRepositoryGateway,
    @Inject(PaymentPlanPaidResourceIaConfigQueryRepositoryGateway)
    private readonly paymentPlanPaidResourceIaConfigQueryRepository: PaymentPlanPaidResourceIaConfigQueryRepositoryGateway,
  ) {}

  public async execute(
    paymentPlanPaidResourceId: PaymentPlanPaidResourceId,
  ): Promise<GetPaymentPlanPaidResourceResponseDto> {
    const paidResource =
      await this.paymentPlanPaidResourceQueryRepository.findOnePaymentPlanPaidResourceByIdOrFail(
        paymentPlanPaidResourceId,
        PaymentPlanPaidResourceNotFoundError,
      );

    const iaConfig =
      await this.paymentPlanPaidResourceIaConfigQueryRepository.findOnePaymentPlanPaidResourceIaConfigByPaidResourceId(
        paymentPlanPaidResourceId,
      );

    const response = GetPaymentPlanPaidResourceResponseDto.build({
      id: paidResource.id.toString(),
      resource: paidResource.resource,
      creditCost: parseFloat(paidResource.creditCost),
      description: paidResource.description,
    });

    if (iaConfig) {
      response.prompt = iaConfig.prompt;
    }

    return response;
  }
}
