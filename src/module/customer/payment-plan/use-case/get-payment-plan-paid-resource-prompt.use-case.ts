import { Inject, Injectable } from '@nestjs/common';

import { PaymentPlanPaidResourceQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource/query/payment-plan-paid-resource.query.repository.gateway';
import { PaymentPlanPaidResourceIaConfigQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource-ia-config/query/payment-plan-paid-resource-ia-config.query.repository.gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptResponseDto } from '@module/customer/payment-plan/dto/response/get-payment-plan-paid-resource-prompt.response.dto';
import { PaymentPlanPaidResourceIaConfigNotFoundError } from '@module/customer/payment-plan/error/payment-plan-paid-resource-ia-config-not-found.error';
import { GetPaymentPlanPaidResourcePromptUseCaseGateway } from '@module/customer/payment-plan/use-case-gateway/get-payment-plan-paid-resource-prompt.use-case-gateway';

@Injectable()
export class GetPaymentPlanPaidResourcePromptUseCase
  implements GetPaymentPlanPaidResourcePromptUseCaseGateway
{
  protected readonly _type = GetPaymentPlanPaidResourcePromptUseCase.name;

  public constructor(
    @Inject(PaymentPlanPaidResourceQueryRepositoryGateway)
    private readonly paymentPlanPaidResourceQueryRepository: PaymentPlanPaidResourceQueryRepositoryGateway,
    @Inject(PaymentPlanPaidResourceIaConfigQueryRepositoryGateway)
    private readonly paymentPlanPaidResourceIaConfigQueryRepository: PaymentPlanPaidResourceIaConfigQueryRepositoryGateway,
  ) {}

  public async execute(
    resourceType: PaymentPlanPaidResourceTypeEnum,
  ): Promise<GetPaymentPlanPaidResourcePromptResponseDto> {
    const paidResource =
      await this.paymentPlanPaidResourceQueryRepository.findOnePaymentPlanPaidResourceByResourceType(
        resourceType,
      );

    const iaConfig =
      await this.paymentPlanPaidResourceIaConfigQueryRepository.findOnePaymentPlanPaidResourceIaConfigByPaidResourceId(
        paidResource.id,
      );

    if (!iaConfig) {
      throw new PaymentPlanPaidResourceIaConfigNotFoundError({
        resourceType,
      });
    }

    return GetPaymentPlanPaidResourcePromptResponseDto.build({
      prompt: iaConfig.prompt,
    });
  }
}
