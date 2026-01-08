import { Inject, Injectable } from '@nestjs/common';

import { SendMessageRequestDto } from '@module/customer/ai-conversation/dto/request/send-message.request.dto';
import { CalculateMessageCreditCostResponseDto } from '@module/customer/ai-conversation/dto/response/calculate-message-credit-cost.response.dto';
import { PaidResourceUnavailableError } from '@module/customer/organization-credit/error/paid-resource-unavailable.error';
import { PaymentPlanPaidResourceQueryRepositoryGateway } from '@module/customer/payment-plan/domain/repository/payment-plan-paid-resource/query/payment-plan-paid-resource.query.repository.gateway';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';

@Injectable()
export class CalculateMessageCreditCostUseCase {
  protected readonly _type = CalculateMessageCreditCostUseCase.name;

  public constructor(
    @Inject(PaymentPlanPaidResourceQueryRepositoryGateway)
    private readonly paymentPlanPaidResourceQueryRepository: PaymentPlanPaidResourceQueryRepositoryGateway,
  ) {}

  public async execute(
    paymentPlanPaidResourceType: PaymentPlanPaidResourceTypeEnum,
    dto: SendMessageRequestDto,
  ): Promise<CalculateMessageCreditCostResponseDto> {
    const paidResource =
      await this.paymentPlanPaidResourceQueryRepository.findOnePaymentPlanPaidResourceByResourceType(
        paymentPlanPaidResourceType,
      );

    if (!paidResource) {
      throw new PaidResourceUnavailableError();
    }

    const messageLength = dto.json.message.trim().length;

    let token = messageLength / 2;

    if (dto.file) {
      token = token + dto.file.length * 2;
    }

    const creditCost = Math.ceil(token * paidResource.creditCost);

    return CalculateMessageCreditCostResponseDto.build({
      creditCost,
      token,
    });
  }
}
