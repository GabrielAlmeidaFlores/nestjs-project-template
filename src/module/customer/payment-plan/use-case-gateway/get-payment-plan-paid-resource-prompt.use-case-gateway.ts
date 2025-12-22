import { Injectable } from '@nestjs/common';

import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { GetPaymentPlanPaidResourcePromptResponseDto } from '@module/customer/payment-plan/dto/response/get-payment-plan-paid-resource-prompt.response.dto';

@Injectable()
export abstract class GetPaymentPlanPaidResourcePromptUseCaseGateway {
  public abstract execute(
    resourceType: PaymentPlanPaidResourceTypeEnum,
  ): Promise<GetPaymentPlanPaidResourcePromptResponseDto>;
}
