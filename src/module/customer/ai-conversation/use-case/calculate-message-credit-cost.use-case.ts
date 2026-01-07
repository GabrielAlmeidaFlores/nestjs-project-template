import { Inject, Injectable } from '@nestjs/common';

import { CalculateMessageCreditCostRequestDto } from '@module/customer/ai-conversation/dto/request/calculate-message-credit-cost.request.dto';
import { CalculateMessageCreditCostResponseDto } from '@module/customer/ai-conversation/dto/response/calculate-message-credit-cost.response.dto';
import { PaidResourceUnavailableError } from '@module/customer/organization-credit/error/paid-resource-unavailable.error';
import { PaymentPlanPaidResourceQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource/query/payment-plan-paid-resource.query.repository.gateway';

@Injectable()
export class CalculateMessageCreditCostUseCase {
  protected readonly _type = CalculateMessageCreditCostUseCase.name;

  public constructor(
    @Inject(PaymentPlanPaidResourceQueryRepositoryGateway)
    private readonly paymentPlanPaidResourceQueryRepository: PaymentPlanPaidResourceQueryRepositoryGateway,
  ) {}

  public async execute(
    dto: CalculateMessageCreditCostRequestDto,
  ): Promise<CalculateMessageCreditCostResponseDto> {
    const paidResource =
      await this.paymentPlanPaidResourceQueryRepository.findOnePaymentPlanPaidResourceByResourceType(
        dto.paymentPlanPaidResourceType,
      );

    if (!paidResource) {
      throw new PaidResourceUnavailableError();
    }

    const words = dto.message.trim().length;

    const token = words / 2;
    const creditCost = (words / 2) * paidResource.creditCost;

    return CalculateMessageCreditCostResponseDto.build({
      creditCost,
      token,
    });
  }
}
