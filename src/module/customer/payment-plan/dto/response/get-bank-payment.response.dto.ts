import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { PaymentStatusEnum } from '@module/generic/bank/domain/schema/entity/bank-payment/enum/payment-status.enum';
import { BankPaymentId } from '@module/generic/bank/domain/schema/entity/bank-payment/value-object/bank-payment-id/bank-payment-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetBankPaymentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(BankPaymentId)
  public id: BankPaymentId;

  @ResponseDtoEnumProperty(PaymentStatusEnum)
  public status: PaymentStatusEnum;

  @ResponseDtoValueObjectProperty(DecimalValue)
  public amount: DecimalValue;

  @ResponseDtoDateProperty({ required: false })
  public paymentDate?: Date;

  @ResponseDtoDateProperty({ required: false })
  public dueDate?: Date;

  @ResponseDtoStringProperty({ required: false })
  public description?: string;

  @ResponseDtoStringProperty({ required: false })
  public paymentReceipt?: string;

  @ResponseDtoStringProperty({ required: false })
  public bankSlipUrl?: string;

  protected override readonly _type = GetBankPaymentResponseDto.name;
}
