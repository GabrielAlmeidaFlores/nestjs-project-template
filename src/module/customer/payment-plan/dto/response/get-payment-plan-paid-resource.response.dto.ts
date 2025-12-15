import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetPaymentPlanPaidResourceResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(PaymentPlanPaidResourceId)
  public id: PaymentPlanPaidResourceId;

  @ResponseDtoEnumProperty(PaymentPlanPaidResourceTypeEnum)
  public resource: PaymentPlanPaidResourceTypeEnum;

  @ResponseDtoStringProperty()
  public creditCost: string;

  @ResponseDtoStringProperty()
  public description: string;

  @ResponseDtoDateProperty()
  public createdBy: string;

  @ResponseDtoDateProperty()
  public updatedBy: string;

  protected override readonly _type =
    GetPaymentPlanPaidResourceResponseDto.name;
}
