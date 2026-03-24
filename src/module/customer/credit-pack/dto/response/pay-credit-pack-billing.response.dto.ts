import { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class PayCreditPackBillingResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(BankPaymentId)
  public bankPaymentId: BankPaymentId;

  protected override readonly _type = PayCreditPackBillingResponseDto.name;
}
