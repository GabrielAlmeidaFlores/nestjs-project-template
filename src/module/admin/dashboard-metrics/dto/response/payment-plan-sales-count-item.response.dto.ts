import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class PaymentPlanSalesCountItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(PaymentPlanId)
  public paymentPlanId: PaymentPlanId;

  @ResponseDtoStringProperty()
  public paymentPlanName: string;

  @ResponseDtoNumberProperty()
  public salesCount: number;

  protected override readonly _type = PaymentPlanSalesCountItemResponseDto.name;
}
